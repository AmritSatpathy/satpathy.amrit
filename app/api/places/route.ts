
import { NextResponse } from "next/server";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand
} from "@aws-sdk/client-s3";

// A single JSON object in S3 holds the whole list. We keep it at a stable key
// and overwrite it on every write. Writes require the shared password, which
// is checked here on the server and never shipped to the browser. The AWS
// credentials also live only on the server.

export const dynamic = "force-dynamic";

const OBJECT_KEY = "places/list.json";

type Place = {
  id: string;
  name: string;
  type: "cafe" | "restaurant";
  area: string;
  note: string;
  visited: boolean;
};

type Store = {
  places: Place[];
  updatedAt: string;
};

const emptyStore = (): Store => ({
  places: [],
  updatedAt: new Date().toISOString()
});

function getBucket(): string {
  const bucket = process.env.PLACES_BUCKET;
  if (!bucket) {
    throw new Error("PLACES_BUCKET is not configured.");
  }
  return bucket;
}

// Reuse a single client across invocations. Region and credentials come from
// the standard AWS env vars (AWS_REGION, AWS_ACCESS_KEY_ID, etc.).
let cachedClient: S3Client | null = null;
function getClient(): S3Client {
  if (!cachedClient) {
    cachedClient = new S3Client({
      region: process.env.PLACES_BUCKET_REGION ?? process.env.AWS_REGION ?? "us-east-1"
    });
  }
  return cachedClient;
}

async function streamToString(body: unknown): Promise<string> {
  // In the Node runtime the S3 body is a Readable stream that also exposes
  // transformToString via the SDK's mixin. Prefer that when present.
  const maybe = body as { transformToString?: () => Promise<string> };
  if (maybe && typeof maybe.transformToString === "function") {
    return maybe.transformToString();
  }

  const chunks: Buffer[] = [];
  const stream = body as AsyncIterable<Uint8Array>;
  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString("utf-8");
}

async function readStore(): Promise<Store> {
  const client = getClient();
  try {
    const res = await client.send(
      new GetObjectCommand({ Bucket: getBucket(), Key: OBJECT_KEY })
    );
    if (!res.Body) {
      return emptyStore();
    }
    const text = await streamToString(res.Body);
    const data = JSON.parse(text) as Partial<Store>;
    return {
      places: Array.isArray(data.places) ? (data.places as Place[]) : [],
      updatedAt:
        typeof data.updatedAt === "string"
          ? data.updatedAt
          : new Date().toISOString()
    };
  } catch (error) {
    // A missing object means the list hasn't been created yet.
    const name = (error as { name?: string })?.name;
    if (name === "NoSuchKey" || name === "NotFound") {
      return emptyStore();
    }
    throw error;
  }
}

async function writeStore(store: Store): Promise<void> {
  const client = getClient();
  await client.send(
    new PutObjectCommand({
      Bucket: getBucket(),
      Key: OBJECT_KEY,
      Body: JSON.stringify(store),
      ContentType: "application/json"
    })
  );
}

function isValidPlaces(value: unknown): value is Place[] {
  if (!Array.isArray(value)) return false;
  return value.every((p) => {
    if (typeof p !== "object" || p === null) return false;
    const place = p as Record<string, unknown>;
    return (
      typeof place.id === "string" &&
      typeof place.name === "string" &&
      (place.type === "cafe" || place.type === "restaurant") &&
      typeof place.area === "string" &&
      typeof place.note === "string" &&
      typeof place.visited === "boolean"
    );
  });
}

export async function GET() {
  try {
    const store = await readStore();
    return NextResponse.json(store);
  } catch (error) {
    console.error("Failed to read places store", error);
    return NextResponse.json(
      { error: "Could not load the list right now." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const expected = process.env.PLACES_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { error: "Server is not configured with a password." },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { password, places } = (body ?? {}) as {
    password?: unknown;
    places?: unknown;
  };

  if (typeof password !== "string" || password !== expected) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  if (!isValidPlaces(places)) {
    return NextResponse.json({ error: "Invalid places payload." }, { status: 400 });
  }

  // Cap the list size so a stray client can't write an unbounded object.
  if (places.length > 2000) {
    return NextResponse.json({ error: "Too many places." }, { status: 400 });
  }

  const store: Store = { places, updatedAt: new Date().toISOString() };

  try {
    await writeStore(store);
    return NextResponse.json(store);
  } catch (error) {
    console.error("Failed to write places store", error);
    return NextResponse.json(
      { error: "Could not save the list right now." },
      { status: 500 }
    );
  }
}

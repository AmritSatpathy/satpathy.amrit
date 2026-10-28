#### Back to this world for sometime https://satpathy-amrit.vercel.app/

Personal site built with Next.js (App Router), React, and TypeScript.

## Pages

- `/` — portfolio / resume
- `/travel` — interactive map of visited cities (unlisted; reachable only by URL)
- `/places` — a shared, password-gated list of cafes & restaurants to visit (unlisted; reachable only by URL)

## Local development

Requires Node.js >= 20.9.

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000.

## The /places list

Anyone can view the list. A shared password unlocks adding places and ticking
them as visited. The list is stored as a single JSON object in an S3 bucket;
the password is checked server-side in the `/api/places` route handler and is
never sent to the browser.

### Environment variables

Copy `.env.example` to `.env.local` for local dev, and set the same values in
the Vercel project settings for production:

| Variable | Purpose |
| --- | --- |
| `PLACES_PASSWORD` | Shared password that unlocks editing |
| `PLACES_BUCKET` | S3 bucket that stores the list JSON |
| `PLACES_BUCKET_REGION` | Region of that bucket |
| `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` | Credentials the server uses to read/write the bucket |

Locally the AWS SDK also picks up credentials from `~/.aws` if present, so the
AWS keys can be omitted in `.env.local` on a machine that already has them.

## Deploy

Pushes to `master` deploy via Vercel. Make sure the environment variables above
are configured in the Vercel project before the first deploy, or the `/places`
save action will fail.

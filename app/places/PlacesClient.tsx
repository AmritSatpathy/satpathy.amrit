"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type PlaceType = "cafe" | "restaurant";

type Place = {
  id: string;
  name: string;
  type: PlaceType;
  area: string;
  note: string;
  visited: boolean;
};

type Store = {
  places: Place[];
  updatedAt: string;
};

type Filter = "all" | "todo" | "visited";

const newId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export default function PlacesClient() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [filter, setFilter] = useState<Filter>("all");

  // Add-form state
  const [name, setName] = useState("");
  const [type, setType] = useState<PlaceType>("cafe");
  const [area, setArea] = useState("");
  const [note, setNote] = useState("");

  const nameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/places", { cache: "no-store" });
        if (!res.ok) throw new Error("load failed");
        const data = (await res.json()) as Store;
        if (!cancelled) setPlaces(Array.isArray(data.places) ? data.places : []);
      } catch {
        if (!cancelled) setLoadError("Could not load the list. Try refreshing.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const counts = useMemo(() => {
    const visited = places.filter((p) => p.visited).length;
    return { total: places.length, visited, todo: places.length - visited };
  }, [places]);

  const visible = useMemo(() => {
    if (filter === "todo") return places.filter((p) => !p.visited);
    if (filter === "visited") return places.filter((p) => p.visited);
    return places;
  }, [places, filter]);

  // Persist a new list to the server. On success, commit to state.
  // On failure, revert by reloading from the server-reported state.
  const persist = async (next: Place[]): Promise<boolean> => {
    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetch("/api/places", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, places: next })
      });
      const data = (await res.json()) as Store & { error?: string };
      if (!res.ok) {
        if (res.status === 401) {
          setUnlocked(false);
          setSaveError("Wrong password. Unlock again to make changes.");
        } else {
          setSaveError(data.error ?? "Could not save. Try again.");
        }
        return false;
      }
      setPlaces(Array.isArray(data.places) ? data.places : next);
      return true;
    } catch {
      setSaveError("Network error while saving.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    // Validate the password by doing a no-op write (resubmit current list).
    const ok = await persist(places);
    if (ok) {
      setUnlocked(true);
      setSaveError(null);
      requestAnimationFrame(() => nameInputRef.current?.focus());
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    const place: Place = {
      id: newId(),
      name: trimmed,
      type,
      area: area.trim(),
      note: note.trim(),
      visited: false
    };
    const next = [place, ...places];
    const ok = await persist(next);
    if (ok) {
      setName("");
      setArea("");
      setNote("");
      setType("cafe");
      nameInputRef.current?.focus();
    }
  };

  const toggleVisited = async (id: string) => {
    const next = places.map((p) =>
      p.id === id ? { ...p, visited: !p.visited } : p
    );
    // optimistic update
    setPlaces(next);
    const ok = await persist(next);
    if (!ok) {
      // revert optimistic change
      setPlaces(places);
    }
  };

  const removePlace = async (id: string) => {
    const next = places.filter((p) => p.id !== id);
    const prev = places;
    setPlaces(next);
    const ok = await persist(next);
    if (!ok) setPlaces(prev);
  };

  return (
    <div className="places-wrap">
      <aside className="places-sidebar">
      <div className="places-intro">
        <p className="eyebrow">our little list</p>
        <h1 id="places-title">
          Cafes <span className="places-amp">&amp;</span> Eats
        </h1>
        <p className="lead">
          A cozy list of spots we want to try, and the happy little ones
          we&apos;ve crossed off together.
        </p>
      </div>

      <div className="places-toolbar">
        <div className="places-filters" role="tablist" aria-label="Filter places">
          {(["all", "todo", "visited"] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              className={`places-chip ${filter === f ? "active" : ""}`}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              <span className="places-chip-label">
                {f === "all"
                  ? "\u2728 Everything"
                  : f === "todo"
                  ? "\uD83D\uDCCD Wanna go"
                  : "\uD83D\uDC9A Been there"}
              </span>
              <span className="places-chip-count">
                {f === "all"
                  ? counts.total
                  : f === "todo"
                  ? counts.todo
                  : counts.visited}
              </span>
            </button>
          ))}
        </div>
      </div>

      {!unlocked && (
        <form className="places-unlock" onSubmit={handleUnlock}>
          <label className="places-field">
            <span className="card-label">psst, what&apos;s the secret word?</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="our little password"
              autoComplete="current-password"
            />
          </label>
          <button className="button primary" type="submit" disabled={saving}>
            {saving ? "Checking..." : "\uD83D\uDD13 Let me in"}
          </button>
          {saveError && <p className="places-error">{saveError}</p>}
        </form>
      )}

      {unlocked && (
        <form className="places-add" onSubmit={handleAdd}>
          <div className="places-add-grid">
            <label className="places-field">
              <span className="card-label">what&apos;s it called?</span>
              <input
                ref={nameInputRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Blue Tokai, etc."
                required
              />
            </label>
            <label className="places-field">
              <span className="card-label">cafe or eats?</span>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as PlaceType)}
              >
                <option value="cafe">&#9749; Cafe</option>
                <option value="restaurant">&#127869; Eats</option>
              </select>
            </label>
            <label className="places-field">
              <span className="card-label">where is it?</span>
              <input
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Indiranagar"
              />
            </label>
            <label className="places-field places-field-wide">
              <span className="card-label">a little note</span>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Famous for filter coffee"
              />
            </label>
          </div>
          <div className="places-add-actions">
            <button className="button primary" type="submit" disabled={saving}>
              {saving ? "Saving..." : "\uD83D\uDC96 Add it"}
            </button>
            <button
              className="button secondary"
              type="button"
              onClick={() => setUnlocked(false)}
            >
              Lock up
            </button>
            {saveError && <p className="places-error">{saveError}</p>}
          </div>
        </form>
      )}
      </aside>

      <section className="places-main">
      <div className="places-list">
        {loading && (
          <p className="places-hint">Fetching our little list... &#9749;</p>
        )}
        {loadError && <p className="places-error">{loadError}</p>}
        {!loading && !loadError && visible.length === 0 && (
          <p className="places-hint">
            {places.length === 0
              ? "No spots yet. Unlock editing and add the very first one! \u2728"
              : "Nothing here yet in this view. \uD83C\uDF43"}
          </p>
        )}

        {visible.map((place) => (
          <article
            key={place.id}
            className={`places-card ${place.visited ? "is-visited" : ""}`}
          >
            <label className="places-check">
              <input
                type="checkbox"
                checked={place.visited}
                disabled={!unlocked || saving}
                onChange={() => toggleVisited(place.id)}
                aria-label={`Mark ${place.name} as visited`}
              />
              <span className="places-checkbox" aria-hidden="true" />
            </label>

            <span className="places-emoji" aria-hidden="true">
              {place.type === "cafe" ? "\u2615" : "\uD83C\uDF7D\uFE0F"}
            </span>

            <div className="places-card-body">
              <div className="places-card-head">
                <h3>{place.name}</h3>
                <span className={`places-tag places-tag-${place.type}`}>
                  {place.type === "cafe" ? "cafe" : "eats"}
                </span>
              </div>
              <p className="places-meta">
                {place.area && <span>{place.area}</span>}
                {place.note && <span>{place.note}</span>}
                {!place.area && !place.note && <span>&mdash;</span>}
              </p>
            </div>

            {unlocked && (
              <button
                type="button"
                className="places-remove"
                onClick={() => removePlace(place.id)}
                disabled={saving}
                aria-label={`Remove ${place.name}`}
              >
                Remove
              </button>
            )}
          </article>
        ))}
      </div>
      </section>
    </div>
  );
}

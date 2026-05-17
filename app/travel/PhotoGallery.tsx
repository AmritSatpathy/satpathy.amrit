"use client";

import { useEffect, useRef, useState } from "react";

type City = {
  city: string;
  slug: string;
  country: string;
  note: string;
};

export default function PhotoGallery({ cities }: { cities: City[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const autoplayRef = useRef<number | null>(null);

  const city = cities.find((c) => c.slug === openSlug) ?? {
    city: "",
    slug: "",
    country: "",
    note: ""
  };

  const photos = Array.from({ length: 6 }).map((_, i) =>
    `https://source.unsplash.com/1600x900/?${encodeURIComponent(
      city.city
    )}&sig=${i}`
  );

  const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setIndex((i) => (i + 1) % photos.length);
  const go = (i: number) => setIndex(i);

  useEffect(() => {
    const handler = (e: Event) => {
      const ev = e as CustomEvent;
      if (ev?.detail?.slug) {
        setOpenSlug(ev.detail.slug);
        setIndex(0);
      }
    };

    window.addEventListener("openGallery", handler as EventListener);
    return () => {
      window.removeEventListener("openGallery", handler as EventListener);
    };
  }, []);

  useEffect(() => {
    if (openSlug) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openSlug]);

  useEffect(() => {
    if (!openSlug) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenSlug(null);
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + photos.length) % photos.length);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openSlug, photos.length]);

  useEffect(() => {
    if (!openSlug) return;
    // advance every 3500ms
    autoplayRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, 3500);

    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    };
  }, [openSlug, photos.length]);

  const onTouchStart = (e: any) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: any) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 40) prev();
    else if (delta < -40) next();
    touchStartX.current = null;
  };

  if (!openSlug) return null;

  return (
    <div className="photo-modal" role="dialog" aria-modal="true">
      <div
        className="photo-modal-backdrop"
        onClick={() => setOpenSlug(null)}
      />
      <div className="photo-modal-panel">
        <header className="photo-modal-header">
          <div>
            <p className="card-label">{city.country}</p>
            <h2>{city.city}</h2>
          </div>
          <div>
            <button
              className="button"
              onClick={() => setOpenSlug(null)}
              aria-label="Close gallery"
            >
              Close
            </button>
          </div>
        </header>

        <div
          className="photo-carousel"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
            <div className="carousel-track">
              {photos.map((p, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={p}
                  src={p}
                  alt={`${city.city} photo ${i + 1}`}
                  className={`carousel-image ${i === index ? "active" : ""}`}
                  aria-hidden={i === index ? "false" : "true"}
                />
              ))}
            </div>
          </div>
      </div>
    </div>
  );
}

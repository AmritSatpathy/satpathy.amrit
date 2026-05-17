"use client";

import { useEffect, useRef } from "react";

type TravelCity = {
  city: string;
  slug: string;
  country: string;
  note: string;
  latitude: number;
  longitude: number;
};

type LeafletMarker = {
  bindTooltip: (
    content: string,
    options: Record<string, unknown>
  ) => LeafletMarker;
  on: (event: string, handler: () => void) => LeafletMarker;
};

type LeafletApi = {
  map: (
    element: HTMLDivElement,
    options: Record<string, unknown>
  ) => {
    remove: () => void;
    setView: (center: [number, number], zoom: number) => void;
    invalidateSize: () => void;
  };
  tileLayer: (
    url: string,
    options: Record<string, unknown>
  ) => {
    addTo: (map: unknown) => void;
  };
  circleMarker: (
    coordinates: [number, number],
    options: Record<string, unknown>
  ) => {
    addTo: (map: unknown) => LeafletMarker;
  };
};

declare global {
  interface Window {
    L?: LeafletApi;
  }
}

const loadLeaflet = () =>
  new Promise<LeafletApi>((resolve, reject) => {
    if (window.L) {
      resolve(window.L);
      return;
    }

    if (!document.querySelector("[data-leaflet-css]")) {
      const link = document.createElement("link");
      link.dataset.leafletCss = "true";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      "[data-leaflet-script]"
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => {
        if (window.L) {
          resolve(window.L);
        }
      });
      existingScript.addEventListener("error", reject);
      return;
    }

    const script = document.createElement("script");
    script.dataset.leafletScript = "true";
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.async = true;
    script.onload = () => {
      if (window.L) {
        resolve(window.L);
      } else {
        reject(new Error("Leaflet failed to load."));
      }
    };
    script.onerror = reject;
    document.body.appendChild(script);
  });

export default function TravelMap({ cities }: { cities: TravelCity[] }) {
  const mapElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let map: ReturnType<LeafletApi["map"]> | null = null;
    let cancelled = false;

    loadLeaflet()
      .then((L) => {
        if (!mapElementRef.current || cancelled) {
          return;
        }

        const createdMap = L.map(mapElementRef.current, {
          attributionControl: false,
          maxBounds: [
            [-85, -190],
            [85, 190]
          ],
          maxBoundsViscosity: 0.8,
          scrollWheelZoom: false,
          worldCopyJump: true,
          zoomControl: true
        });

        map = createdMap;
        createdMap.setView([18, 78], 3);

        L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
          {
            maxZoom: 19,
            subdomains: "abcd"
          }
        ).addTo(map);

        // Ensure Leaflet redraws to the actual container size after layout is applied.
        setTimeout(() => createdMap.invalidateSize(), 0);

        cities.forEach((place) => {
          L.circleMarker([place.latitude, place.longitude], {
            className: "leaflet-city-marker",
            color: "#d4ff8f",
            fillColor: "#d4ff8f",
            fillOpacity: 0.75,
            radius: 4,
            weight: 0.95
          })
            .addTo(map)
            .bindTooltip(place.city, {
              className: "leaflet-city-tooltip",
              direction: "top",
              offset: [0, -8]
            })
            .on("click", () => {
              // Emit a DOM event so the page can open the gallery modal
              window.dispatchEvent(
                new CustomEvent("openGallery", { detail: { slug: place.slug } })
              );
            });
        });
      })
      .catch(() => {
        if (mapElementRef.current) {
          mapElementRef.current.dataset.failed = "true";
        }
      });

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [cities]);

  return (
    <div className="leaflet-map-frame">
      <div ref={mapElementRef} className="leaflet-map" />
      <div className="map-fallback">
        Map tiles could not be loaded. City photo links are still available
        below.
      </div>
    </div>
  );
}

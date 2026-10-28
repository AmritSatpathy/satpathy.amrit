import type { Metadata } from "next";
import PlacesClient from "./PlacesClient";

export const metadata: Metadata = {
  title: "Places | Amrit Satpathy",
  description: "A shared to-visit list of cafes and restaurants."
};

export default function Places() {
  return (
    <main className="page-shell places-page">
      <section className="places-section" aria-labelledby="places-title">
        <PlacesClient />
      </section>
    </main>
  );
}

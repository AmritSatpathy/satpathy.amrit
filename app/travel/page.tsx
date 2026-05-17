import type { Metadata } from "next";
import TravelMap from "./TravelMap";
import PhotoGallery from "./PhotoGallery";

const travelCities = [
  { city: "Bhubaneswar", slug: "bhubaneswar", country: "India", note: "Home base", latitude: 20.2961, longitude: 85.8245 },
  { city: "Chennai", slug: "chennai", country: "India", note: "University years", latitude: 13.0827, longitude: 80.2707 },
  { city: "Bangalore", slug: "bangalore", country: "India", note: "Work", latitude: 12.9716, longitude: 77.5946 },
  { city: "Singapore", slug: "singapore", country: "Singapore", note: "Graduate study", latitude: 1.3521, longitude: 103.8198 },

  { city: "Osaka", slug: "osaka", country: "Japan", note: "", latitude: 34.6937, longitude: 135.5023 },
  { city: "Kyoto", slug: "kyoto", country: "Japan", note: "", latitude: 35.0116, longitude: 135.7681 },
  { city: "Tokyo", slug: "tokyo", country: "Japan", note: "", latitude: 35.6762, longitude: 139.6503 },
  { city: "Nara", slug: "nara", country: "Japan", note: "", latitude: 34.6851, longitude: 135.8048 },

  { city: "Abu Dhabi", slug: "abu-dhabi", country: "UAE", note: "", latitude: 24.4539, longitude: 54.3773 },
  { city: "Dubai", slug: "dubai", country: "UAE", note: "", latitude: 25.2048, longitude: 55.2708 },

  { city: "Kuala Lumpur", slug: "kuala-lumpur", country: "Malaysia", note: "", latitude: 3.1390, longitude: 101.6869 },

  { city: "Cherrapunji", slug: "cherrapunji", country: "India", note: "", latitude: 25.2866, longitude: 91.5822 },
  { city: "Goa", slug: "goa", country: "India", note: "", latitude: 15.4909, longitude: 73.8278 },
  { city: "Hampi", slug: "hampi", country: "India", note: "", latitude: 15.3350, longitude: 76.4600 },

  { city: "Amsterdam", slug: "amsterdam", country: "Netherlands", note: "", latitude: 52.3676, longitude: 4.9041 },
  { city: "Madrid", slug: "madrid", country: "Spain", note: "", latitude: 40.4168, longitude: -3.7038 },
  { city: "Barcelona", slug: "barcelona", country: "Spain", note: "", latitude: 41.3851, longitude: 2.1734 },
  { city: "Paris", slug: "paris", country: "France", note: "", latitude: 48.8566, longitude: 2.3522 },

  { city: "Alleppey", slug: "alleppey", country: "India", note: "", latitude: 9.4981, longitude: 76.3388 },
  { city: "Varkala", slug: "varkala", country: "India", note: "", latitude: 8.7379, longitude: 76.7217 },
  { city: "Thekkady", slug: "thekkady", country: "India", note: "", latitude: 9.5986, longitude: 77.1456 },
  { city: "Rameswaram", slug: "rameswaram", country: "India", note: "", latitude: 9.2886, longitude: 79.3129 },

  { city: "Kanchipuram", slug: "kanchipuram", country: "India", note: "", latitude: 12.8342, longitude: 79.7036 },
  { city: "Madurai", slug: "madurai", country: "India", note: "", latitude: 9.9252, longitude: 78.1198 },
  { city: "Kanyakumari", slug: "kanyakumari", country: "India", note: "", latitude: 8.0883, longitude: 77.5385 },
  { city: "Thanjavur", slug: "thanjavur", country: "India", note: "", latitude: 10.7867, longitude: 79.1378 },

  { city: "Gokarna", slug: "gokarna", country: "India", note: "", latitude: 14.5466, longitude: 74.3182 },
  { city: "Udupi", slug: "udupi", country: "India", note: "", latitude: 13.3409, longitude: 74.7421 },
  { city: "Kodaikanal", slug: "kodaikanal", country: "India", note: "", latitude: 10.2381, longitude: 77.4898 },
  { city: "Yercaud", slug: "yercaud", country: "India", note: "", latitude: 11.8058, longitude: 78.2211 },

  { city: "Kochi", slug: "kochi", country: "India", note: "", latitude: 9.9312, longitude: 76.2673 },
  { city: "Wayanad", slug: "wayanad", country: "India", note: "", latitude: 11.6856, longitude: 76.1319 },

  { city: "Hiroshima", slug: "hiroshima", country: "Japan", note: "", latitude: 34.3853, longitude: 132.4553 },
  { city: "Ooty", slug: "ooty", country: "India", note: "", latitude: 11.4064, longitude: 76.6950 },
  { city: "Coorg", slug: "coorg", country: "India", note: "", latitude: 12.4244, longitude: 75.7382 },
  { city: "Nongriat", slug: "nongriat", country: "India", note: "", latitude: 25.2833, longitude: 91.5833 },

  { city: "Delhi", slug: "delhi", country: "India", note: "", latitude: 28.6139, longitude: 77.2090 },
  { city: "Kolkata", slug: "kolkata", country: "India", note: "", latitude: 22.5726, longitude: 88.3639 },
  { city: "Sambalpur", slug: "sambalpur", country: "India", note: "", latitude: 21.4667, longitude: 83.9667 },
  { city: "Angul", slug: "angul", country: "India", note: "", latitude: 20.8406, longitude: 85.1013 },
  { city: "Damanjodi", slug: "damanjodi", country: "India", note: "", latitude: 20.2833, longitude: 84.8333 },
  { city: "Mysore", slug: "mysore", country: "India", note: "", latitude: 12.2958, longitude: 76.6394 },
  { city: "Munnar", slug: "munnar", country: "India", note: "", latitude: 10.0889, longitude: 77.0595 },
  { city: "Mangalore", slug: "mangalore", country: "India", note: "", latitude: 12.9141, longitude: 74.8560 },
  { city: "Murudeshwar", slug: "murudeshwar", country: "India", note: "", latitude: 14.0949, longitude: 74.4202 },
  { city: "Yana", slug: "yana-caves", country: "India", note: "Yana Caves", latitude: 14.99, longitude: 74.56 },
  { city: "Jog Falls", slug: "jog-falls", country: "India", note: "", latitude: 14.2321, longitude: 74.5075 },
  { city: "Bekal", slug: "bekal", country: "India", note: "", latitude: 12.4764, longitude: 74.9956 },
  { city: "Kannur", slug: "kannur", country: "India", note: "", latitude: 11.8745, longitude: 75.3704 },
  { city: "Kozhikode", slug: "kozhikode", country: "India", note: "", latitude: 11.2588, longitude: 75.7804 },
  { city: "Thiruvananthapuram", slug: "trivandrum", country: "India", note: "", latitude: 8.5241, longitude: 76.9366 },
  { city: "Kovalam", slug: "kovalam", country: "India", note: "", latitude: 8.4029, longitude: 76.9803 },
  { city: "Poovar", slug: "poovar", country: "India", note: "", latitude: 8.3570, longitude: 76.9720 },
  { city: "Dhanushkodi", slug: "dhanushkodi", country: "India", note: "", latitude: 9.4260, longitude: 79.4333 },
  { city: "Vagamon", slug: "vagamon", country: "India", note: "", latitude: 9.7389, longitude: 76.9289 },
  { city: "Mahabalipuram", slug: "mahabalipuram", country: "India", note: "", latitude: 12.6190, longitude: 80.1939 },
  { city: "Krishnagiri", slug: "krishnagiri", country: "India", note: "", latitude: 12.5197, longitude: 78.2136 },
  { city: "Kumbakonam", slug: "kumbakonam", country: "India", note: "", latitude: 10.9601, longitude: 79.3836 },
  { city: "Tiruchirappalli", slug: "trichy", country: "India", note: "", latitude: 10.7905, longitude: 78.7047 },
  { city: "Dindigul", slug: "dindigul", country: "India", note: "", latitude: 10.3673, longitude: 77.9803 },
  { city: "Pollachi", slug: "pollachi", country: "India", note: "", latitude: 10.6540, longitude: 77.0180 },
  { city: "Mawlynnong", slug: "mawlynnong", country: "India", note: "", latitude: 25.1839, longitude: 91.7330 },
  { city: "Shillong", slug: "shillong", country: "India", note: "", latitude: 25.5788, longitude: 91.8933 },
  { city: "Sakleshpur", slug: "sakleshpur", country: "India", note: "", latitude: 12.7128, longitude: 75.4050 },
  { city: "Pondicherry", slug: "pondicherry", country: "India", note: "", latitude: 11.9416, longitude: 79.8083 }
];

export const metadata: Metadata = {
  title: "Travel | Amrit Satpathy",
  description: "Places visited by Amrit Satpathy."
};

export default function Travel() {
  return (
    <main className="page-shell travel-fullscreen-map">
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="/" aria-label="Amrit Satpathy home">
          AS
        </a>
        <div className="nav-links">
          <a href="/">Home</a>
        </div>
      </nav>

      <section className="map-section" aria-label="Visited cities map">
        <div className="map-shell">
          <div className="travel-overlay">
            <div className="travel-overlay-copy">
              <p className="eyebrow">Travel log</p>
              <h1>Places Visited</h1>
              <p className="lead">
                A growing map of cities that have shaped me.
              </p>
            </div>
          </div>
          <TravelMap cities={travelCities} />
        </div>
      </section>
      <PhotoGallery cities={travelCities} />
    </main>
  );
}

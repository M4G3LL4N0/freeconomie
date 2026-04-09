"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { captureEvent } from "@/lib/analytics";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { toast } from "react-hot-toast";

export default function MapPage() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [center, setCenter] = useState([37.7749, -122.4194]); // Default to SF

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter([position.coords.latitude, position.coords.longitude]);
          captureEvent("map_location_detected");
        },
        () => {
          toast.error("Could not detect your location");
          captureEvent("map_location_error");
        }
      );
    }

    // Fetch locations
    const fetchLocations = async () => {
      try {
        const response = await fetch("/api/locations");
        const data = await response.json();
        setLocations(data);
        captureEvent("map_locations_loaded");
      } catch (error) {
        toast.error("Failed to load locations");
        captureEvent("map_locations_error");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div className="h-[calc(100vh-64px)]">
      <MapContainer 
        center={center}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {locations.map((location) => (
          <Marker 
            key={location.id}
            position={[location.lat, location.lng]}
          >
            <Popup>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <h3 className="font-semibold">{location.name}</h3>
                </div>
                <p className="text-sm">{location.address}</p>
                <p className="text-sm text-green-500">
                  Free until: {location.freeUntil}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="rounded-lg bg-white/10 p-6 text-white backdrop-blur-sm">
            Loading map...
          </div>
        </div>
      )}
    </div>
  );
}

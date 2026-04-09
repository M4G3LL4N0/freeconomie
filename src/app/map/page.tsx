"use client";

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapPin, RefreshCw } from "lucide-react";
import { captureEvent } from "@/lib/analytics";
import { toast } from "react-hot-toast";

function MapControls({ onRefresh }: { onRefresh: () => void }) {
  const map = useMapEvents({
    moveend() {
      captureEvent("map_moved", {
        center: map.getCenter(),
        zoom: map.getZoom()
      });
    }
  });

  return null;
}

export default function MapPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [center, setCenter] = useState([37.7749, -122.4194]);

  const fetchLocations = async (lat: number, lng: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/locations?lat=${lat}&lng=${lng}&radius=10`
      );
      if (!response.ok) throw new Error("Failed to load");
      const data = await response.json();
      setLocations(data);
    } catch (error) {
      toast.error("Failed to load locations");
      captureEvent("map_error", { error: (error as Error).message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCenter([pos.coords.latitude, pos.coords.longitude]);
          fetchLocations(pos.coords.latitude, pos.coords.longitude);
        },
        () => {
          fetchLocations(center[0], center[1]);
        }
      );
    }
  }, []);

  return (
    <div className="relative h-[calc(100vh-80px)]">
      <MapContainer
        center={center}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapControls onRefresh={() => fetchLocations(center[0], center[1])} />
        
        {locations.map((location) => (
          <Marker key={location.id} position={[location.lat, location.lng]}>
            <Popup className="rounded-xl border border-white/10 glass-panel backdrop-blur-[12px]">
              <div className="space-y-2 p-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-cyan-300" />
                  <h3 className="font-semibold text-white">{location.name}</h3>
                </div>
                <p className="text-sm text-white/80">{location.address}</p>
                {location.expires_at && (
                  <p className="text-sm text-emerald-400">
                    Valid until: {new Date(location.expires_at).toLocaleDateString()}
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="rounded-xl bg-white/10 p-8 text-white backdrop-blur-sm flex items-center gap-4">
            <RefreshCw className="h-6 w-6 animate-spin" />
            <span className="text-lg">Loading locations...</span>
          </div>
        </div>
      )}
    </div>
  );
}

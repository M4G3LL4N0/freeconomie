"use client";

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapPin, RefreshCw, Search } from "lucide-react";
import LoadingState from "@/components/freewash-finder/LoadingState";
import { captureEvent } from "@/lib/analytics";
import { toast } from "react-hot-toast";
import { bayAreaStaticOffers } from "@/lib/freewash-data";

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
      
      // Focus on core launch geography
      const launchCities = new Set([
        "Palo Alto",
        "Redwood City",
        "Sunnyvale", 
        "San Jose",
        "San Mateo",
        "Hayward"
      ]);

      const verifiedLocations = bayAreaStaticOffers
        .filter(offer => 
          launchCities.has(offer.city) &&
          offer.verification.confidenceScore >= 80
        )
        .map(offer => ({
          id: offer.id,
          name: offer.businessName,
          address: offer.address,
          lat: offer.latitude,
          lng: offer.longitude,
          offer_type: offer.category,
          details: offer.summary,
          expires_at: offer.expirationDate || '',
          verified_at: offer.verification.verifiedAt,
          verification_score: offer.verification.confidenceScore
        }));
        
      setLocations(mappedLocations);
      captureEvent("map_locations_loaded", {
        count: mappedLocations.length,
        center: [lat, lng]
      });
    } catch (error) {
      toast.error("Failed to load locations");
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

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (query: string) => {
    try {
      const results = bayAreaStaticOffers
        .filter(offer =>
          offer.businessName.toLowerCase().includes(query.toLowerCase()) ||
          offer.city.toLowerCase().includes(query.toLowerCase()) ||
          offer.address.toLowerCase().includes(query.toLowerCase())
        )
        .map(offer => ({
          id: offer.id,
          name: offer.businessName,
          address: offer.address,
          lat: offer.latitude || 37.7749,
          lng: offer.longitude || -122.4194,
          offer_type: offer.category === 'free-first-wash' ? 'wash' : 'trial',
          details: offer.summary,
          expires_at: offer.expirationDate || '',
          created_at: new Date().toISOString(),
          distance_in_km: 0
        }));
      
      setLocations(results);
      captureEvent("map_search", {
        query,
        count: results.length
      });
    } catch (error) {
      toast.error('Search failed');
      captureEvent('search_error', { query, error: error.message });
    }
  };

  return (
    <div className="relative h-[calc(100vh-80px)]">
      <div className="absolute top-4 left-4 right-4 z-[1000] flex flex-col gap-4">
        <RouteIntelligencePanel
          origin="Current Location"
          destination="Redwood City"
          optimizedRoute={{
            distance: "5.2 miles",
            time: "12 min",
            washes: 3
          }}
          theme="cyan"
        />
        <div className="glass-panel backdrop-blur-xl rounded-xl overflow-hidden border border-white/15">
          <div className="flex items-center px-4 py-3 gap-3">
            <Search className="h-4 w-4 text-white/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
              placeholder="Search locations..."
              className="bg-transparent border-none outline-none text-white placeholder-white/50 text-sm w-48 focus:ring-0"
            />
          </div>
        </div>
      </div>
      <MapContainer
        center={center}
        zoom={13}
        className="h-full w-full"
        aria-label="Interactive map of free car wash locations"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapControls onRefresh={() => fetchLocations(center[0], center[1])} />
        
        {locations.map((location) => (
          <Marker key={location.id} position={[location.lat, location.lng]}>
            <Popup className="rounded-xl border border-white/10 glass-panel backdrop-blur-[12px]">
              <div className="space-y-3 p-3">
                <div className="flex items-center gap-2">
                  <VerifiedIcon className="h-4 w-4 text-emerald-400" />
                  <h3 className="font-semibold text-white">{location.name}</h3>
                </div>
                <p className="text-sm text-white/80">{location.address}</p>
                {location.expires_at && (
                  <p className="text-sm text-emerald-400">
                    Valid until: {new Date(location.expires_at).toLocaleDateString()}
                  </p>
                )}
                <a
                  href={bayAreaStaticOffers.find(o => o.id === location.id)?.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/90 hover:bg-white/10 backdrop-blur-sm transition-colors"
                >
                  Verify Offer
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-[1000]">
          <LoadingState 
            message="Finding nearby washes..." 
            className="bg-white/10 p-8"
          />
        </div>
      )}
    </div>
  );
}

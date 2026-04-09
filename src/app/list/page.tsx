import { bayAreaStaticOffers } from '@/lib/freewash-data';
import { FilterIcon, MapPinIcon, VerifiedIcon } from "@/components/icons";
import { useState } from "react";

export default function OffersListPage() {
  const [regionFilter, setRegionFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<"distance" | "expiration" | "rating">("distance");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filterOffers = (offers: StaticOffer[]) => {
    return offers.filter(offer => {
      const matchesRegion = !regionFilter || offer.region === regionFilter;
      const matchesCategory = !categoryFilter || offer.category === categoryFilter;
      const matchesSearch = !searchQuery || 
        offer.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.address.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesRegion && matchesCategory && matchesSearch;
    });
  };

  const sortOffers = (offers: StaticOffer[]) => {
    return offers.sort((a, b) => {
      if (sortBy === "distance") {
        return (a.distance || 0) - (b.distance || 0);
      } else if (sortBy === "expiration") {
        const aExpiry = a.expirationDate ? new Date(a.expirationDate).getTime() : Infinity;
        const bExpiry = b.expirationDate ? new Date(b.expirationDate).getTime() : Infinity;
        return aExpiry - bExpiry;
      } else if (sortBy === "rating") {
        return (b.rating || 0) - (a.rating || 0);
      }
      return 0;
    });
  };

  const enhanceOffers = (offers: StaticOffer[]) => {
    return offers.map(offer => ({
      ...offer,
      daysUntilExpiration: offer.expirationDate 
        ? Math.floor((new Date(offer.expirationDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        : undefined,
      isExpired: offer.expirationDate 
        ? new Date(offer.expirationDate) < new Date()
        : false
    }));
  };

  const filteredOffers = bayAreaStaticOffers
    .filter(offer => {
      // Focus on core launch cities
      const launchCities = new Set([
        "Palo Alto",
        "Redwood City", 
        "Sunnyvale",
        "San Jose",
        "San Mateo",
        "San Leandro"
      ]);
      
      const matchesRegion = !regionFilter || offer.region === regionFilter;
      const matchesCategory = !categoryFilter || offer.category === categoryFilter;
      const matchesSearch = !searchQuery || 
        offer.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.address.toLowerCase().includes(searchQuery.toLowerCase());
      
      return launchCities.has(offer.city) && 
             matchesRegion && 
             matchesCategory && 
             matchesSearch;
    })
    .map(offer => ({
      ...offer,
      daysUntilExpiration: offer.expirationDate 
        ? Math.floor((new Date(offer.expirationDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        : undefined,
      isExpired: offer.expirationDate 
        ? new Date(offer.expirationDate) < new Date()
        : false,
      verificationScore: offer.verification.confidenceScore,
      lastVerifiedAt: offer.lastVerifiedAt,
      accessibilityFeatures: offer.accessibilityFeatures,
      verification_badge: (
        <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
          <VerifiedIcon className="h-3 w-3" />
          Verified {new Date(offer.lastVerifiedAt).toLocaleDateString()}
        </span>
      ),
      verification_details: `Verified via ${offer.verification.verificationMethod}`
    }))
    .sort((a, b) => {
      if (sortBy === "distance") {
        return (a.distance || 0) - (b.distance || 0);
      } else if (sortBy === "expiration") {
        const aExpiry = a.expirationDate ? new Date(a.expirationDate).getTime() : Infinity;
        const bExpiry = b.expirationDate ? new Date(b.expirationDate).getTime() : Infinity;
        return aExpiry - bExpiry;
      } else if (sortBy === "rating") {
        return (b.rating || 0) - (a.rating || 0);
      }
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters sidebar */}
        <div className="w-full md:w-64 space-y-6">
          <div className="bg-white/5 rounded-xl border border-white/10 p-4">
            <h3 className="flex items-center gap-2 text-sm font-medium text-white/80 mb-4">
              <FilterIcon className="h-4 w-4" />
              Filters
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-white/60 mb-1">Region</label>
                <select
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  <option value="">All Regions</option>
                  <option value="South Bay">South Bay</option>
                  <option value="Peninsula">Peninsula</option>
                  <option value="East Bay">East Bay</option>
                  <option value="North Bay">North Bay</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-white/60 mb-1">Offer Type</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  <option value="">All Types</option>
                  <option value="free-first-wash">Free First Wash</option>
                  <option value="free-membership-trial">Membership Trial</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Offers list */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
            <h1 className="text-2xl font-bold text-white">
              Verified Car Wash Offers
              <span className="ml-2 text-sm font-normal text-white/60">
                ({filteredOffers.length} results)
              </span>
            </h1>
            
            <div className="flex gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search businesses..."
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                <option value="distance">Sort by Distance</option>
                <option value="expiration">Sort by Expiration</option>
                <option value="rating">Sort by Rating</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredOffers.map((offer) => (
              <div
                key={offer.id}
                className="rounded-xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/10 transition-colors"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium text-white">{offer.businessName}</h3>
                    {offer.verification && (
                      <div className="flex items-center gap-1 text-xs text-emerald-400">
                        <VerifiedIcon className="h-3 w-3" />
                        <span>Verified {offer.verification.verifiedAt}</span>
                        <span className="text-white/40">•</span>
                        <span>{offer.verification.verificationMethod.replace('-', ' ')}</span>
                      </div>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-white/80">{offer.offerTitle}</p>
                  
                  <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
                    <MapPinIcon className="h-3 w-3" />
                    <span>
                      {offer.city}, {offer.region}
                    </span>
                  </div>

                  <div className="mt-4 text-sm text-white/70">
                    {offer.summary}
                  </div>

                  <div className="mt-4 text-xs text-white/60">
                    <h4 className="font-medium text-white/80">How to redeem:</h4>
                    <p className="mt-1">{offer.redemptionInstructions}</p>
                    {offer.restrictions && (
                      <p className="mt-1 text-amber-300">Note: {offer.restrictions}</p>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {offer.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/60"
                        aria-label={`Tag: ${tag}`}
                      >
                        {tag}
                      </span>
                    ))}
                    {offer.accessibilityFeatures?.map((feature) => (
                      <span
                        key={feature}
                        className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-300"
                        aria-label={`Accessibility feature: ${feature}`}
                      >
                        {feature}
                      </span>
                    ))}
                    {offer.expirationDate && (
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs ${
                          offer.isExpired
                            ? 'border-red-400/30 bg-red-500/10 text-red-300'
                            : offer.daysUntilExpiration && offer.daysUntilExpiration <= 7
                            ? 'border-amber-400/30 bg-amber-500/10 text-amber-300'
                            : 'border-emerald-400/30 bg-emerald-500/10 text-emerald-300'
                        }`}
                      >
                        {offer.isExpired
                          ? 'Expired'
                          : `Expires in ${offer.daysUntilExpiration} day${offer.daysUntilExpiration === 1 ? '' : 's'}`}
                      </span>
                    )}
                  </div>

                  <a
                    href={offer.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                  >
                    View Offer
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

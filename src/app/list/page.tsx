import { bayAreaStaticOffers } from '@/lib/freewash-data';
import { FilterIcon, MapPinIcon, VerifiedIcon } from "@/components/icons";
import { useState } from "react";

export default function OffersListPage() {
  const [regionFilter, setRegionFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<"distance" | "expiration" | "rating">("distance");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [verificationFilter, setVerificationFilter] = useState<string>("all");
  const [signupFilter, setSignupFilter] = useState<string>("all");
  const [expirationFilter, setExpirationFilter] = useState<string>("all");

  const filterOffers = (offers: StaticOffer[]) => {
    return offers.filter(offer => {
      const matchesRegion = !regionFilter || 
        (regionFilter === "Hayward" ? offer.city === "Hayward" : offer.region === regionFilter);
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
      // Core launch cities filter
      const launchCities = new Set([
        "Palo Alto",
        "Redwood City", 
        "Sunnyvale",
        "San Jose",
        "Santa Clara",
        "San Mateo",
        "Brentwood",
        "Morgan Hill"
      ]);
      
      const matchesRegion = !regionFilter || 
        (regionFilter === "Hayward" ? offer.city === "Hayward" : offer.region === regionFilter);
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
      verificationDetails: `Verified via ${offer.verification.verificationMethod.replace('-', ' ')}`,
      verificationDate: new Date(offer.verification.verifiedAt).toLocaleDateString()
    }))
    .sort((a, b) => {
      if (sortBy === "distance") {
        return (a.distance || 0) - (b.distance || 0);
      } else if (sortBy === "expiration") {
        const aExpiry = a.expirationDate ? new Date(a.expirationDate).getTime() : Infinity;
        const bExpiry = b.expirationDate ? new Date(b.expirationDate).getTime() : Infinity;
        return aExpiry - bExpiry;
      } else if (sortBy === "rating") {
        return (b.verificationScore || 0) - (a.verificationScore || 0);
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
              Inventory Filters
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-white/60 mb-1">Verification Score</label>
                <select
                  value={verificationFilter}
                  onChange={(e) => setVerificationFilter(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  <option value="all">All Offers</option>
                  <option value="high">High (90%+)</option>
                  <option value="medium">Medium (80-89%)</option>
                  <option value="verified">Verified (70%+)</option>
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
                  <option value="free-first-wash">First Wash Free</option>
                  <option value="free-membership-trial">Membership Trial</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-white/60 mb-1">Signup Required</label>
                <select
                  value={signupFilter}
                  onChange={(e) => setSignupFilter(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  <option value="all">Any</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-white/60 mb-1">Expiration</label>
                <select
                  value={expirationFilter}
                  onChange={(e) => setExpirationFilter(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  <option value="all">Any</option>
                  <option value="active">Active Only</option>
                  <option value="expiring">Expiring Soon</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Offers list */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Bay Area Free Wash Inventory
              </h1>
              <p className="mt-2 text-white/60">
                Verified offers across {new Set(bayAreaStaticOffers.map(o => o.city)).size} cities
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm">
                <span className="text-emerald-400">
                  {bayAreaStaticOffers.filter(o => o.verification.confidenceScore >= 90).length}
                </span>
                <span className="text-white/60 ml-1">High Confidence</span>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm">
                <span className="text-white">
                  {filteredOffers.length}
                </span>
                <span className="text-white/60 ml-1">Showing</span>
              </div>
            </div>
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

          <div className="mb-6 overflow-x-auto">
            <div className="flex gap-2 pb-2">
              {['All', ...Array.from(new Set(bayAreaStaticOffers.map(o => o.city)))].map(city => (
                <button
                  key={city}
                  onClick={() => setSearchQuery(city === 'All' ? '' : city)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm ${
                    searchQuery === city || (city === 'All' && !searchQuery)
                      ? 'bg-white/10 border border-white/20 text-white'
                      : 'border border-white/10 text-white/60 hover:bg-white/5'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredOffers.map((offer) => (
              <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/10 transition-colors">
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-medium text-white">{offer.businessName}</h3>
                      <p className="mt-1 text-sm text-white/80">{offer.offerTitle}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1 text-xs text-emerald-400">
                        <VerifiedIcon className="h-3 w-3" />
                        <span>{offer.verification.confidenceScore}%</span>
                      </div>
                      <div className="mt-1 text-[11px] text-white/40">
                        {new Date(offer.verification.verifiedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
                    <MapPinIcon className="h-3 w-3" />
                    <span>{offer.city}, {offer.region}</span>
                    <span className="text-white/20">•</span>
                    <span>{offer.distance ? `${offer.distance.toFixed(1)} mi` : '--'}</span>
                  </div>

                  <div className="mt-4 text-sm text-white/70">
                    {offer.summary}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-lg border border-white/10 bg-white/5 p-2 text-xs">
                      <div className="text-white/50">Type</div>
                      <div className="mt-1 font-medium">
                        {offer.category === 'free-first-wash' ? 'First Wash' : 'Trial'}
                      </div>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/5 p-2 text-xs">
                      <div className="text-white/50">Signup</div>
                      <div className="mt-1 font-medium">
                        {offer.signupRequired ? 'Required' : 'Not Needed'}
                      </div>
                    </div>
                  </div>

                  {offer.expirationDate && (
                    <div className={`mt-4 text-xs ${
                      offer.isExpired 
                        ? 'text-red-400' 
                        : offer.daysUntilExpiration && offer.daysUntilExpiration <= 7 
                          ? 'text-amber-400' 
                          : 'text-emerald-400'
                    }`}>
                      {offer.isExpired
                        ? 'Offer expired'
                        : `Expires in ${offer.daysUntilExpiration} day${offer.daysUntilExpiration === 1 ? '' : 's'}`}
                    </div>
                  )}

                  <a
                    href={offer.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                  >
                    Verify Offer Details
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/60">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <VerifiedIcon className="h-3 w-3 text-emerald-400" />
                <span>90-100%</span>
                <span className="ml-1">High Confidence</span>
              </div>
              <div className="flex items-center gap-1">
                <VerifiedIcon className="h-3 w-3 text-amber-400" />
                <span>80-89%</span>
                <span className="ml-1">Medium Confidence</span>
              </div>
              <div className="flex items-center gap-1">
                <VerifiedIcon className="h-3 w-3 text-white/40" />
                <span>Below 80%</span>
                <span className="ml-1">Needs Review</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

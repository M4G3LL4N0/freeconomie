import { bayAreaStaticOffers } from '@/lib/freewash-data';
import { FilterIcon, MapPinIcon, VerifiedIcon } from "@/components/icons";
import { useState } from "react";

export default function OffersListPage() {
  type InventoryFilter = {
    region: BayAreaRegion | '';
    city: BayAreaCity | '';
    category: RouteCategory | '';
    verification: 'verified' | 'all';
    status: 'active' | 'expired' | 'all';
  };

  const [filters, setFilters] = useState<InventoryFilter>({
    region: '',
    city: '',
    category: '',
    verification: 'verified',
    status: 'active'
  });

  const [sortBy, setSortBy] = useState<'distance' | 'expiration' | 'rating' | 'verification'>('verification');
  const [searchQuery, setSearchQuery] = useState<string>("");
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
      
      const matchesRegion = !filters.region || offer.region === filters.region;
      const matchesCity = !filters.city || offer.city === filters.city;
      const matchesCategory = !filters.category || offer.category === filters.category;
      const matchesVerification = filters.verification === 'all' || offer.verification.confidenceScore >= 80;
      const matchesStatus = filters.status === 'all' || 
        (filters.status === 'active' 
          ? !offer.expirationDate || new Date(offer.expirationDate) > new Date()
          : offer.expirationDate && new Date(offer.expirationDate) <= new Date());
      const matchesSearch = !searchQuery || 
        offer.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.address.toLowerCase().includes(searchQuery.toLowerCase());
      
      return launchCities.has(offer.city) && 
             matchesRegion && 
             matchesCity &&
             matchesCategory && 
             matchesVerification &&
             matchesStatus &&
             matchesSearch;
    })
    .map(offer => ({
      ...offer,
      daysUntilExpiration: offer.expirationDate 
        ? Math.floor((new Date(offer.expirationDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        : undefined,
      isExpired: offer.expirationDate 
        ? new Date(offer.expirationDate) < new Date()
        : false
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
      } else {
        // Default sort by verification score
        return b.verification.confidenceScore - a.verification.confidenceScore;
      }
    });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters sidebar */}
        <div className="w-full md:w-72 space-y-6">
          <div className="glass-panel rounded-xl p-4">
            <h3 className="flex items-center gap-2 text-sm font-medium text-white/80 mb-4">
              <FilterIcon className="h-4 w-4" />
              Inventory Filters
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-white/60 mb-1">Region</label>
                <select
                  value={filters.region}
                  onChange={(e) => setFilters({...filters, region: e.target.value as BayAreaRegion})}
                  className="w-full glass-input"
                >
                  <option value="">All Regions</option>
                  <option value="South Bay">South Bay</option>
                  <option value="Peninsula">Peninsula</option>
                  <option value="East Bay">East Bay</option>
                  <option value="North Bay">North Bay</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-white/60 mb-1">City</label>
                <select
                  value={filters.city}
                  onChange={(e) => setFilters({...filters, city: e.target.value as BayAreaCity})}
                  className="w-full glass-input"
                >
                  <option value="">All Cities</option>
                  {Array.from(new Set(bayAreaStaticOffers.map(o => o.city))).map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-white/60 mb-1">Offer Type</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value as RouteCategory})}
                  className="w-full glass-input"
                >
                  <option value="">All Types</option>
                  <option value="free-first-wash">Free First Wash</option>
                  <option value="free-membership-trial">Membership Trial</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-white/60 mb-1">Verification</label>
                <select
                  value={filters.verification}
                  onChange={(e) => setFilters({...filters, verification: e.target.value as 'verified' | 'all'})}
                  className="w-full glass-input"
                >
                  <option value="verified">Verified Only</option>
                  <option value="all">All Offers</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-white/60 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value as 'active' | 'expired' | 'all'})}
                  className="w-full glass-input"
                >
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                  <option value="all">All</option>
                </select>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-xl p-4">
            <h3 className="text-sm font-medium text-white/80 mb-4">
              Inventory Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Total Offers</span>
                <span className="font-medium text-white">{bayAreaStaticOffers.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Verified</span>
                <span className="font-medium text-emerald-400">
                  {bayAreaStaticOffers.filter(o => o.verification.confidenceScore >= 80).length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Active</span>
                <span className="font-medium text-white">
                  {bayAreaStaticOffers.filter(o => !o.expirationDate || new Date(o.expirationDate) > new Date()).length}
                </span>
              </div>
            </div>
          </div>
        </div>
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
              <div key={offer.id} className="glass-panel rounded-xl overflow-hidden hover:bg-white/5 transition-colors">
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-white">{offer.businessName}</h3>
                      <p className="mt-1 text-sm text-white/80">{offer.city}, {offer.region}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`text-xs font-medium ${
                        offer.verification.confidenceScore >= 90 ? 'text-emerald-400' : 
                        offer.verification.confidenceScore >= 80 ? 'text-cyan-400' : 
                        'text-amber-400'
                      }`}>
                        {offer.verification.confidenceScore}% Verified
                      </span>
                      <span className="mt-1 text-xs text-white/50">
                        {new Date(offer.verification.verifiedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      offer.category === 'free-first-wash' 
                        ? 'bg-cyan-500/15 text-cyan-400' 
                        : 'bg-violet-500/15 text-violet-400'
                    }`}>
                      {offer.category === 'free-first-wash' ? 'First Wash' : 'Membership Trial'}
                    </span>
                    {offer.expirationDate && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        offer.isExpired
                          ? 'bg-red-500/15 text-red-400'
                          : offer.daysUntilExpiration && offer.daysUntilExpiration <= 7
                          ? 'bg-amber-500/15 text-amber-400'
                          : 'bg-emerald-500/15 text-emerald-400'
                      }`}>
                      {offer.isExpired ? 'Expired' : `Expires in ${offer.daysUntilExpiration}d`}
                    </span>
                    )}
                  </div>

                  <div className="mt-4 text-sm text-white/70">
                    {offer.summary}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {offer.tags.filter(tag => !['verified', 'official-site'].includes(tag)).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <a
                      href={offer.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-white/60 hover:text-white/80"
                    >
                      View Source
                    </a>
                    <button 
                      className="text-xs text-white/60 hover:text-white/80"
                      onClick={() => navigator.clipboard.writeText(offer.address)}
                    >
                      Copy Address
                    </button>
                  </div>
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

import { bayAreaStaticOffers } from '@/lib/freewash-data';
import { ChevronDownIcon, FilterIcon, VerifiedIcon } from "@/components/icons";
import { MapPin } from 'lucide-react';

function InventoryStatusBadge({ status, count }: { status: string; count: number }) {
  const statusClasses = {
    [INVENTORY_STATUS.ACTIVE]: 'text-emerald-400 border-emerald-400/20 bg-emerald-400/10',
    [INVENTORY_STATUS.EXPIRING_SOON]: 'text-amber-400 border-amber-400/20 bg-amber-400/10',
    [INVENTORY_STATUS.NEWLY_ADDED]: 'text-cyan-400 border-cyan-400/20 bg-cyan-400/10'
  };

  return (
    <div className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${statusClasses[status]}`}>
      <div className="w-2 h-2 rounded-full mr-2 bg-current opacity-80" />
      <span className="mr-1">{status}</span>
      <span className="font-semibold">{count}</span>
    </div>
  );
}

function VerificationScoreBadge({ score }: { score: number }) {
  const getScoreClass = (s: number) => {
    if (s >= 90) return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    if (s >= 75) return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
    return 'text-red-400 bg-red-400/10 border-red-400/20';
  };

  return (
    <div className={`inline-flex items-center rounded-full border px-2 text-xs ${getScoreClass(score)}`}>
      {score}% Confidence
    </div>
  );
}
import { useState } from "react";

type CityFilterProps = {
  cities: BayAreaCity[];
  selectedCity: BayAreaCity | '';
  onSelect: (city: BayAreaCity | '') => void;
};

function CityFilterShell({ cities, selectedCity, onSelect }: CityFilterProps) {
  return (
    <div className="bg-white/5 rounded-xl border border-white/10 p-4">
      <h3 className="text-sm font-medium text-white/80 mb-4">Cities</h3>
      <div className="relative">
        <select
          value={selectedCity}
          onChange={(e) => onSelect(e.target.value as BayAreaCity | '')}
          className="w-full glass-input appearance-none bg-gradient-to-b from-white/5 to-white/3 backdrop-blur-lg"
        >
          <option value="">All Cities</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        <ChevronDownIcon className="absolute right-3 top-3 h-4 w-4 text-white/60 pointer-events-none" />
      </div>
      
      <div className="mt-3 flex flex-wrap gap-2">
        {['Palo Alto', 'Redwood City', 'San Jose', 'Sunnyvale'].map(city => (
          <button
            key={city}
            onClick={() => onSelect(city === selectedCity ? '' : city as BayAreaCity)}
            className={`text-xs px-3 py-1 rounded-full border transition-colors ${
              city === selectedCity
                ? 'bg-white/10 border-white/20 text-white'
                : 'border-white/10 text-white/60 hover:bg-white/5'
            }`}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}

const REGION_FILTERS = [
  { value: "", label: "All Regions" },
  { value: "South Bay", label: "South Bay" },
  { value: "Peninsula", label: "Peninsula" },
  { value: "East Bay", label: "East Bay" },
  { value: "North Bay", label: "North Bay" }
] as const;

export default function OffersListPage() {
const INVENTORY_STATUS = {
  ACTIVE: 'Active',
  EXPIRING_SOON: 'Expiring Soon',
  NEWLY_ADDED: 'Newly Added'
} as const;

type InventoryFilter = {
  status: typeof INVENTORY_STATUS[keyof typeof INVENTORY_STATUS] | 'All';
  verification: 'All' | 'High Confidence' | 'Medium Confidence' | 'Verified';
  region: BayAreaRegion | 'All';
  city: BayAreaCity | 'All';
  category: RouteCategory | 'All';
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
      // Region filter
      const matchesRegion = !filters.region || offer.region === filters.region;
      
      // City filter
      const matchesCity = !filters.city || offer.city === filters.city;
      
      // Category filter
      const matchesCategory = !filters.category || offer.category === filters.category;
      
      // Verification filter
      const matchesVerification = 
        filters.verification === 'all' || 
        (filters.verification === 'verified' && offer.verification.confidenceScore >= 80) ||
        (filters.verification === 'high' && offer.verification.confidenceScore >= 90);
      
      // Status filter
      const matchesStatus = 
        filters.status === 'all' || 
        (filters.status === 'active' && 
          (!offer.expirationDate || new Date(offer.expirationDate) > new Date())) ||
        (filters.status === 'expiring' && 
          offer.expirationDate && 
          new Date(offer.expirationDate).getTime() - Date.now() <= 7 * 24 * 60 * 60 * 1000);
      
      // Search query
      const matchesSearch = !searchQuery || 
        offer.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.address.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesRegion && 
             matchesCity &&
             matchesCategory && 
             matchesVerification &&
             matchesStatus &&
             matchesSearch;
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

  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);

  const getCityOptions = (): FilterOption[] => {
    const cityCounts: Record<string, number> = {};
    
    bayAreaStaticOffers.forEach(offer => {
      cityCounts[offer.city] = (cityCounts[offer.city] || 0) + 1;
    });

    return Object.entries(cityCounts).map(([city, count]) => ({
      value: city,
      label: city,
      count
    })).sort((a, b) => b.count - a.count);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveFilter(activeFilter === FilterType.CITY ? null : FilterType.CITY)}
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm ${
            activeFilter === FilterType.CITY
              ? 'bg-white/10 border border-white/20 text-white'
              : 'border border-white/10 text-white/60 hover:bg-white/5'
          }`}
        >
          <span>Cities {filters.city && `(${filters.city})`}</span>
          <ChevronDownIcon className={`h-4 w-4 transition-transform ${
            activeFilter === FilterType.CITY ? 'rotate-180' : ''
          }`} />
        </button>
      </div>

      {activeFilter === FilterType.CITY && (
        <div className="glass-panel rounded-xl p-4 mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
            {Array.from(new Set(bayAreaStaticOffers.map(o => o.city))).map(city => (
              <button
                key={city}
                onClick={() => {
                  setFilters({...filters, city});
                  setActiveFilter(null);
                }}
                className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                  city === filters.city
                    ? 'bg-white/15 border border-white/15'
                    : 'border border-white/10 hover:bg-white/5'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
          <button 
            onClick={() => {
              setFilters({...filters, city: ''});
              setActiveFilter(null);
            }}
            className="mt-3 text-xs text-white/60 hover:text-white/80"
          >
            Clear filter
          </button>
        </div>
      )}

      {searchQuery && (
        <div className="flex items-center gap-2 mb-4 px-3 py-1.5 rounded-lg bg-white/5">
          <span className="text-sm text-white/80">Filtered by: {searchQuery}</span>
          <button 
            onClick={() => setSearchQuery('')} 
            className="text-white/50 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {REGION_FILTERS.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setFilters({...filters, region: filter.value as BayAreaRegion})}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm ${
              filters.region === filter.value
                ? 'bg-white/10 border border-white/20 text-white'
                : 'border border-white/10 text-white/60 hover:bg-white/5'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {['Palo Alto', 'Redwood City', 'Sunnyvale', 'San Jose'].map(city => (
          <button
            key={city}
            onClick={() => setSearchQuery(city)}
            className={`text-xs px-3 py-1 rounded-full ${
              searchQuery === city
                ? 'bg-white/10 border border-white/15 text-white'
                : 'border border-white/10 text-white/60 hover:bg-white/5'
            }`}
          >
            {city}
          </button>
        ))}
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters sidebar */}
        <div className="w-full md:w-72 space-y-6">
          <div className="glass-panel rounded-xl p-4">
            <h3 className="flex items-center gap-2 text-sm font-medium text-white/80 mb-4">
              <FilterIcon className="h-4 w-4" />
              Inventory Filters
            </h3>
            
            <div className="space-y-4">
              <CityFilterShell 
                cities={Array.from(new Set(bayAreaStaticOffers.map(o => o.city)))} 
                selectedCity={filters.city}
                onSelect={(city) => setFilters({...filters, city})}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/60 mb-1">Offer Type</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({...filters, category: e.target.value as RouteCategory})}
                    className="w-full glass-input"
                  >
                    <option value="">All Types</option>
                    {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                      <option key={key} value={key}>{label.text}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-white/60 mb-1">Verification</label>
                  <select
                    value={filters.verification}
                    onChange={(e) => setFilters({...filters, verification: e.target.value as typeof filters.verification})}
                    className="w-full glass-input"
                  >
                    <option value="all">All</option>
                    <option value="verified">Verified (80%+)</option>
                    <option value="high">High (90%+)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-xl p-4">
            <h3 className="text-sm font-medium text-white/80 mb-4">
              Inventory Stats
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="text-xs text-white/60">Total Offers</div>
                  <div className="mt-1 text-lg font-medium">
                    {bayAreaStaticOffers.length}
                  </div>
                </div>
                {REGION_FILTERS.filter(f => f.value).map(region => (
                  <div key={region.value} className="rounded-lg border border-white/10 bg-white/5 p-3">
                    <div className="text-xs text-white/60">{region.label}</div>
                    <div className="mt-1 text-lg font-medium">
                      {bayAreaStaticOffers.filter(o => o.region === region.value).length}
                    </div>
                  </div>
                ))}
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
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Bay Area Free Wash Inventory
                </h1>
                <p className="mt-2 text-white/60">
                  {filteredOffers.length} verified offers across {new Set(bayAreaStaticOffers.map(o => o.city)).size} cities
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-3">
                  <InventoryStatusBadge 
                    status={INVENTORY_STATUS.ACTIVE}
                    count={bayAreaStaticOffers.filter(o => !o.expirationDate || new Date(o.expirationDate) > new Date()).length}
                  />
                  <InventoryStatusBadge 
                    status={INVENTORY_STATUS.EXPIRING_SOON}
                    count={bayAreaStaticOffers.filter(o => {
                      if (!o.expirationDate) return false;
                      const daysLeft = Math.floor((new Date(o.expirationDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                      return daysLeft <= 7 && daysLeft >= 0;
                    }).length}
                  />
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm">
                  <span className="text-emerald-400">
                    {bayAreaStaticOffers.filter(o => o.verification.confidenceScore >= 90).length}
                  </span>
                  <span className="text-white/60 ml-1">High Confidence</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search businesses..."
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  <option value="verification">Sort by Verification</option>
                  <option value="distance">Sort by Distance</option>
                  <option value="expiration">Sort by Expiration</option>
                </select>
              </div>
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
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-sm text-white/80">{offer.city}, {offer.region}</span>
                        {offer.daysUntilExpiration !== undefined && offer.daysUntilExpiration <= 7 && (
                          <span className="text-xs text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">
                            Ending Soon
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <VerifiedBadge 
                        confidenceScore={offer.verification.confidenceScore}
                        verifiedAt={offer.verification.verifiedAt}
                        lastCheckedAt={offer.lastVerifiedAt}
                        size="sm"
                        showDate={false}
                      />
                      <SourceBadge 
                        sourceName={offer.source.name}
                        verificationMethod={offer.verification.verificationMethod}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10">
                      {offer.region}
                    </span>
                    {offer.daysUntilExpiration !== undefined && offer.daysUntilExpiration <= 7 && (
                      <span className="text-xs px-2 py-1 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-400">
                        Ending Soon
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className={`text-xs px-3 py-1 rounded-full border whitespace-nowrap ${
                      CATEGORY_LABELS[offer.category].bg
                    } ${
                      CATEGORY_LABELS[offer.category].border
                    } ${
                      CATEGORY_LABELS[offer.category].textColor
                    }`}>
                      {CATEGORY_LABELS[offer.category].text}
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
                  
                  <div className="mt-4 text-xs text-white/60">
                    <div className="flex items-center gap-2">
                      <span>Verified by: {offer.verification.verifiedBy}</span>
                      <span>•</span>
                      <span>{new Date(offer.verification.verifiedAt).toLocaleDateString()}</span>
                    </div>
                    {offer.verificationNotes && (
                      <p className="mt-1 italic">Note: {offer.verificationNotes}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/60">
            <div className="flex flex-wrap items-center gap-4">
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
              <div className="flex items-center gap-1">
                <SourceBadge 
                  sourceName="Official Site" 
                  verificationMethod="official-site" 
                  className="text-xs"
                />
                <span>Official Website</span>
              </div>
              <div className="flex items-center gap-1">
                <SourceBadge 
                  sourceName="Phone" 
                  verificationMethod="phone-confirmation" 
                  className="text-xs"
                />
                <span>Phone Verified</span>
              </div>
              <div className="flex items-center gap-1">
                <SourceBadge 
                  sourceName="In-Person" 
                  verificationMethod="in-person" 
                  className="text-xs"
                />
                <span>Visited Location</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/60">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <VerifiedBadge 
              confidenceScore={95} 
              verifiedAt={new Date().toISOString()} 
              lastCheckedAt={new Date().toISOString()}
              className="text-xs"
            />
            <span>High Confidence (90-100%)</span>
          </div>
          <div className="flex items-center gap-1">
            <VerifiedBadge 
              confidenceScore={85} 
              verifiedAt={new Date().toISOString()} 
              lastCheckedAt={new Date().toISOString()}
              className="text-xs"
            />
            <span>Medium Confidence (80-89%)</span>
          </div>
          <div className="flex items-center gap-1">
            <VerifiedBadge 
              confidenceScore={70} 
              verifiedAt={new Date().toISOString()} 
              lastCheckedAt={new Date().toISOString()}
              className="text-xs"
            />
            <span>Needs Review (Below 80%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

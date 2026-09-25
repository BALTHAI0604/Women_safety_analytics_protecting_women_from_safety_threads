import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  MapPin,
  X,
  Navigation,
  ChevronRight,
  ChevronDown,
  Building2,
  Shield,
  Phone,
  Sparkles,
  Globe2,
  CheckCircle,
  Compass
} from 'lucide-react';
import { useLocation } from '../context/LocationContext';
import { INDIA_STATES_DATA, POPULAR_LOCATIONS, GLOBAL_HUBS, searchLocations } from '../utils/indiaLocations';

export const LocationSelectorModal = () => {
  const { coords, isSelectorOpen, closeLocationSelector, setManualLocation, refreshLocation, isLoading } = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('india'); // 'india' | 'global' | 'custom'
  const [expandedState, setExpandedState] = useState('Tamil Nadu'); // Default expanded to Tamil Nadu so Karur is readily visible!
  const [customQuery, setCustomQuery] = useState('');
  const [customSearching, setCustomSearching] = useState(false);
  const [customResults, setCustomResults] = useState([]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isSelectorOpen) {
        closeLocationSelector();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSelectorOpen, closeLocationSelector]);

  // Live filtered search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchLocations(searchQuery);
  }, [searchQuery]);

  const handleSelect = (loc) => {
    const cityName = loc.city || loc.name;
    const stateName = loc.state || '';
    const countryName = loc.country || 'India';
    const address = `${cityName}, ${stateName ? stateName + ', ' : ''}${countryName}`;

    setManualLocation(loc.latitude || loc.lat, loc.longitude || loc.lon, cityName, stateName, countryName, address);
    closeLocationSelector();
  };

  const handleGpsDetect = () => {
    refreshLocation();
    closeLocationSelector();
  };

  const handleCustomSearch = async (e) => {
    e.preventDefault();
    if (!customQuery.trim()) return;
    setCustomSearching(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(customQuery)}&countrycodes=in&limit=5`, {
        headers: { 'Accept-Language': 'en' }
      });
      if (res.ok) {
        const data = await res.json();
        setCustomResults(data);
      }
    } catch (err) {
      console.warn('Custom geocode search error:', err);
    } finally {
      setCustomSearching(false);
    }
  };

  if (!isSelectorOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      {/* Modal Card */}
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] glass-panel bg-[#0b1120]/95 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Compass className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
                  Select State & Safety Zone
                </h2>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  All India & Global
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Choose any Indian State, District (e.g. Karur, Tamil Nadu) or search any location
              </p>
            </div>
          </div>

          <button
            onClick={closeLocationSelector}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar with GPS Quick Action */}
        <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-950/50 space-y-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-rose-400 absolute left-3.5 top-3" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type city, district or state (e.g. Karur, Tamil Nadu, Chennai, Bengaluru...)"
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-2xl py-2.5 pl-10 pr-9 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500/50 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              onClick={handleGpsDetect}
              disabled={isLoading}
              title="Detect Current Device GPS"
              className="px-3.5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap transition"
            >
              <Navigation className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Use GPS</span>
            </button>
          </div>

          {/* Quick Trending / Popular Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap mr-1">
              Popular:
            </span>
            {POPULAR_LOCATIONS.map((loc) => {
              const isCurrent = coords.city === loc.name;
              return (
                <button
                  key={loc.name}
                  onClick={() => handleSelect(loc)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold whitespace-nowrap transition border flex items-center gap-1 ${
                    isCurrent
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 ring-1 ring-rose-500/30'
                      : loc.isHighlight
                      ? 'bg-rose-950/60 text-rose-300 border-rose-700/50 hover:bg-rose-900/50'
                      : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  {loc.isHighlight && <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>}
                  <span>{loc.name}</span>
                  <span className="text-[9px] text-slate-400">({loc.state.slice(0, 2)})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 max-h-[50vh]">
          
          {/* 1. SEARCH RESULTS VIEW (when user types something) */}
          {searchQuery.trim().length > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Matching Locations ({searchResults.length})</span>
                <span>Click to activate zone</span>
              </div>

              {searchResults.length === 0 ? (
                <div className="text-center py-8 space-y-3">
                  <p className="text-sm text-slate-400">No built-in districts found for "{searchQuery}".</p>
                  <button
                    onClick={() => {
                      setActiveTab('custom');
                      setCustomQuery(searchQuery);
                    }}
                    className="px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-semibold inline-flex items-center gap-1.5 transition"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Search OpenStreetMap for "{searchQuery}"</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {searchResults.map((loc, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSelect(loc)}
                      className={`p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between group ${
                        coords.city === loc.city
                          ? 'bg-rose-950/40 border-rose-500/50'
                          : 'bg-slate-900/60 border-slate-800 hover:border-rose-500/40 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform flex-shrink-0">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-white group-hover:text-rose-300 transition">
                              {loc.city}
                            </span>
                            {loc.isSpecial && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold">
                                Highlighted
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-400 truncate">
                            {loc.state}, {loc.country}
                          </p>
                        </div>
                      </div>

                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-rose-400 group-hover:translate-x-0.5 transition" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* 2. TABBED EXPLORER VIEW (All Indian States & Districts) */
            <div className="space-y-4">
              
              {/* Category Tabs */}
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <button
                  onClick={() => setActiveTab('india')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    activeTab === 'india'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Indian States & Districts ({INDIA_STATES_DATA.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('global')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    activeTab === 'global'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Globe2 className="w-3.5 h-3.5" />
                  <span>International Hubs</span>
                </button>

                <button
                  onClick={() => setActiveTab('custom')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    activeTab === 'custom'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Custom Town Search</span>
                </button>
              </div>

              {/* TAB CONTENT: INDIA STATES ACCORDION */}
              {activeTab === 'india' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400 pb-1">
                    <span>Select a State to view and pick its Districts / Cities</span>
                    <span className="text-[11px] text-rose-400">All 28 States + 8 UTs</span>
                  </div>

                  <div className="space-y-2">
                    {INDIA_STATES_DATA.map((stateObj) => {
                      const isExpanded = expandedState === stateObj.state;
                      const hasCurrentCity = stateObj.districts.some(d => d.name === coords.city);

                      return (
                        <div
                          key={stateObj.state}
                          className={`rounded-2xl border transition overflow-hidden ${
                            isExpanded
                              ? 'bg-slate-900/90 border-rose-500/40 shadow-lg shadow-rose-500/5'
                              : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {/* State Header Button */}
                          <button
                            onClick={() => setExpandedState(isExpanded ? '' : stateObj.state)}
                            className="w-full p-3 flex items-center justify-between text-left transition"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="w-7 h-7 rounded-xl bg-slate-800 text-rose-400 text-xs font-bold flex items-center justify-center border border-slate-700">
                                {stateObj.code}
                              </span>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-xs sm:text-sm text-white">
                                    {stateObj.state}
                                  </span>
                                  {hasCurrentCity && (
                                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                                      Active Zone
                                    </span>
                                  )}
                                  {stateObj.state === 'Tamil Nadu' && (
                                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
                                      Karur & 35 Districts
                                    </span>
                                  )}
                                </div>
                                <span className="text-[10px] text-slate-400">
                                  {stateObj.districts.length} Districts / Cities • Helplines: {stateObj.womenHelpline}
                                </span>
                              </div>
                            </div>

                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4 text-rose-400" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-slate-500" />
                            )}
                          </button>

                          {/* Expanded Districts Grid */}
                          {isExpanded && (
                            <div className="p-3 pt-0 border-t border-slate-800/80 mt-1">
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-2">
                                {stateObj.districts.map((dist) => {
                                  const isSelected = coords.city === dist.name;
                                  return (
                                    <button
                                      key={dist.name}
                                      onClick={() => handleSelect({
                                        city: dist.name,
                                        state: stateObj.state,
                                        country: 'India',
                                        latitude: dist.lat,
                                        longitude: dist.lon
                                      })}
                                      className={`p-2 rounded-xl text-left transition border group ${
                                        isSelected
                                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-sm'
                                          : dist.isSpecial
                                          ? 'bg-rose-950/50 text-white border-rose-600/60 hover:bg-rose-900/60'
                                          : 'bg-slate-950/70 text-slate-300 border-slate-800 hover:border-rose-500/40 hover:text-white'
                                      }`}
                                    >
                                      <div className="flex items-center justify-between gap-1">
                                        <span className="font-bold text-xs truncate">
                                          {dist.name}
                                        </span>
                                        {dist.isSpecial && (
                                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping"></span>
                                        )}
                                      </div>
                                      <p className="text-[9px] text-slate-400 truncate mt-0.5">
                                        {dist.desc || `${dist.lat.toFixed(2)}, ${dist.lon.toFixed(2)}`}
                                      </p>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB CONTENT: GLOBAL HUBS */}
              {activeTab === 'global' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {GLOBAL_HUBS.map((hub) => (
                    <div
                      key={hub.name}
                      onClick={() => handleSelect(hub)}
                      className={`p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between group ${
                        coords.city === hub.name
                          ? 'bg-rose-950/40 border-rose-500/50'
                          : 'bg-slate-900/60 border-slate-800 hover:border-rose-500/40 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform">
                          <Globe2 className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-xs text-white group-hover:text-rose-300 transition">
                            {hub.name}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {hub.state}, {hub.country}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-rose-400 group-hover:translate-x-0.5 transition" />
                    </div>
                  ))}
                </div>
              )}

              {/* TAB CONTENT: CUSTOM NOMINATIM SEARCH */}
              {activeTab === 'custom' && (
                <div className="space-y-3">
                  <form onSubmit={handleCustomSearch} className="flex gap-2">
                    <input
                      type="text"
                      value={customQuery}
                      onChange={(e) => setCustomQuery(e.target.value)}
                      placeholder="Type any village, neighborhood, pin code or town in India..."
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                    />
                    <button
                      type="submit"
                      disabled={customSearching}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition"
                    >
                      {customSearching ? 'Searching...' : 'Search'}
                    </button>
                  </form>

                  <div className="space-y-2">
                    {customResults.map((item, i) => (
                      <div
                        key={i}
                        onClick={() => handleSelect({
                          city: item.name || item.display_name.split(',')[0],
                          state: '',
                          country: 'India',
                          latitude: parseFloat(item.lat),
                          longitude: parseFloat(item.lon)
                        })}
                        className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-rose-500/40 cursor-pointer flex items-center justify-between text-xs"
                      >
                        <div className="truncate mr-2">
                          <p className="font-semibold text-white truncate">{item.display_name}</p>
                          <p className="text-[10px] text-slate-400">Lat: {parseFloat(item.lat).toFixed(4)}, Lon: {parseFloat(item.lon).toFixed(4)}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-rose-400 flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Footer info bar */}
        <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5 truncate">
            <span className="text-emerald-400 font-bold">Currently Active:</span>
            <span className="text-white font-medium truncate">{coords.city || 'Bengaluru'}, {coords.state || 'Karnataka'}</span>
          </div>

          <button
            onClick={closeLocationSelector}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};

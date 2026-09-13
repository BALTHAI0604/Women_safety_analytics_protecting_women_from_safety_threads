import React, { useState, useEffect } from 'react';
import {
  MapPin,
  PhoneCall,
  Navigation,
  Shield,
  Building2,
  Cross,
  Radio,
  ExternalLink,
  Search,
  Filter,
  Sparkles
} from 'lucide-react';
import { useLocation } from '../context/LocationContext';
import { resourcesApi } from '../utils/api';
import { InteractiveMap } from '../components/InteractiveMap';

export const NearbyResourcesPage = () => {
  const { coords } = useLocation();
  const [resources, setResources] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const data = await resourcesApi.getAll({
        city: selectedCity,
        type: selectedType,
        latitude: coords.latitude,
        longitude: coords.longitude
      });
      if (data?.resources) setResources(data.resources);
    } catch (e) {
      console.warn('Resources fetch error:', e);
      // Fallback sample resources
      setResources([
        { id: 1, name: 'Indiranagar Women Police Station', type: 'Police Station', phone: '+91 80 2294 2533', address: '100 Feet Rd, Indiranagar', city: 'Bengaluru', distance_km: 1.2, is_24_7: 1, latitude: 12.9719, longitude: 77.6412 },
        { id: 2, name: 'Koramangala Police Station', type: 'Police Station', phone: '+91 80 2294 2565', address: '80 Feet Rd, 6th Block, Koramangala', city: 'Bengaluru', distance_km: 2.8, is_24_7: 1, latitude: 12.9344, longitude: 77.6192 },
        { id: 3, name: 'Manipal Hospital 24/7 Trauma Care', type: 'Hospital', phone: '+91 80 2502 4444', address: '98, HAL Old Airport Rd', city: 'Bengaluru', distance_km: 2.4, is_24_7: 1, latitude: 12.9583, longitude: 77.6483 },
        { id: 4, name: 'National Emergency Response Service', type: 'Women Helpline', phone: '112', address: 'All-India National Helpline', city: 'All Cities', distance_km: 0.1, is_24_7: 1, latitude: 28.6139, longitude: 77.2090 },
        { id: 5, name: 'Women in Distress Helpline', type: 'Women Helpline', phone: '1091', address: '24/7 Women Police Assistance', city: 'All Cities', distance_km: 0.1, is_24_7: 1, latitude: 28.6139, longitude: 77.2090 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [selectedType, selectedCity, coords.latitude, coords.longitude]);

  const filteredResources = resources.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const helplines = [
    { name: 'National Emergency Universal Service', number: '112', category: 'Police, Ambulance & Fire' },
    { name: 'Women in Distress Helpline', number: '1091', category: 'Immediate Police Assistance' },
    { name: 'National Commission for Women (NCW)', number: '7827170170', category: 'Harassment & Domestic Abuse' },
    { name: 'Women Safety & Cyber Stalking Cell', number: '1930', category: 'Cyber Crime Reporting' },
    { name: 'National Ambulance Medical Service', number: '102', category: 'Emergency Trauma Ambulance' }
  ];

  return (
    <div className="space-y-6 pb-16">
      
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
            24/7 Emergency Directory
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] mt-1">
          Nearby Safety Resources & Helplines
        </h1>
        <p className="text-xs text-slate-400">
          Find verified police stations, hospital emergency rooms, pink booths, and instant one-touch emergency helplines.
        </p>
      </div>

      {/* 24/7 Quick National Helplines Carousel / Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {helplines.map((h, i) => (
          <a
            key={i}
            href={`tel:${h.number}`}
            className="glass-card p-3 rounded-2xl border border-slate-800 hover:border-rose-500/40 text-center space-y-1 group transition"
          >
            <span className="text-[10px] font-semibold text-slate-400 truncate block">{h.category}</span>
            <p className="text-lg font-black text-rose-400 font-['Outfit'] group-hover:scale-105 transition-transform flex items-center justify-center gap-1">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{h.number}</span>
            </p>
            <p className="text-[10px] text-slate-300 font-bold truncate">{h.name}</p>
          </a>
        ))}
      </div>

      {/* Interactive Map */}
      <div className="space-y-2">
        <h2 className="text-sm font-bold text-white font-['Outfit'] flex items-center gap-2">
          <MapPin className="w-4 h-4 text-rose-400" />
          Interactive Safe Haven Map
        </h2>
        <InteractiveMap height="400px" />
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search station or hospital..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
        </div>

        {/* Type & City Filters */}
        <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Police Station">Police Stations</option>
            <option value="Hospital">Hospitals & Trauma</option>
            <option value="Women Helpline">Women Helplines</option>
            <option value="Pink Booth">Pink Booths</option>
          </select>

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none"
          >
            <option value="All">All Cities</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
          </select>
        </div>

      </div>

      {/* Resources List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredResources.map((res) => (
          <div key={res.id} className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  res.type === 'Police Station'
                    ? 'bg-blue-500/20 text-blue-300'
                    : res.type === 'Hospital'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-rose-500/20 text-rose-300'
                }`}>
                  {res.type}
                </span>
                {res.distance_km !== null && (
                  <span className="text-xs font-bold text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-500/30">
                    {res.distance_km} km away
                  </span>
                )}
              </div>

              <h3 className="text-sm font-bold text-white font-['Outfit']">{res.name}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{res.address}</p>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-slate-800/80">
              <a
                href={`tel:${res.phone}`}
                className="flex-1 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call {res.phone}</span>
              </a>

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${res.latitude},${res.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                title="Get Google Maps Directions"
              >
                <Navigation className="w-3.5 h-3.5 text-rose-400" />
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

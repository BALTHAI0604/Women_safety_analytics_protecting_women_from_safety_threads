import React, { useEffect, useState } from 'react';
import { MapPin, Navigation, Phone, ExternalLink, Shield, Building2, Cross, AlertTriangle } from 'lucide-react';
import { useLocation } from '../context/LocationContext';

export const InteractiveMap = ({ resources = [], showControls = true, height = "420px", centerCoords = null, highRiskAreas = [] }) => {
  const { coords, refreshLocation, setManualLocation } = useLocation();
  const [selectedPin, setSelectedPin] = useState(null);

  const activeLat = centerCoords?.latitude || coords.latitude || 12.9716;
  const activeLon = centerCoords?.longitude || coords.longitude || 77.5946;

  // Preset quick cities for testing
  const presetCities = [
    { name: 'Bengaluru', lat: 12.9716, lon: 77.5946 },
    { name: 'Delhi NCR', lat: 28.6139, lon: 77.2090 },
    { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
    { name: 'New York', lat: 40.7128, lon: -74.0060 },
    { name: 'London', lat: 51.5074, lon: -0.1278 }
  ];

  // Leaflet Map embed via OpenStreetMap iframe or Leaflet container
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${activeLon - 0.05}%2C${activeLat - 0.03}%2C${activeLon + 0.05}%2C${activeLat + 0.03}&layer=mapnik&marker=${activeLat}%2C${activeLon}`;

  return (
    <div className="w-full rounded-2xl overflow-hidden glass-panel border border-slate-800 flex flex-col">
      {/* Map Header Toolbar */}
      {showControls && (
        <div className="p-3 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
            <span className="font-semibold text-slate-200">
              Live Radar: {coords.city || 'Active Zone'}
            </span>
            <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
              ({activeLat.toFixed(4)}, {activeLon.toFixed(4)})
            </span>
          </div>

          {/* Quick city simulator buttons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-slate-400 mr-1">Switch Zone:</span>
            {presetCities.map((c) => (
              <button
                key={c.name}
                onClick={() => setManualLocation(c.lat, c.lon, c.name)}
                className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition border ${
                  coords.city === c.name
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                {c.name}
              </button>
            ))}
            <button
              onClick={refreshLocation}
              title="Get device GPS location"
              className="p-1 rounded-lg bg-slate-800 text-rose-400 hover:bg-slate-700 border border-slate-700 ml-1"
            >
              <Navigation className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Map Frame Container */}
      <div className="relative w-full" style={{ height }}>
        <iframe
          title="Safety Map"
          src={osmEmbedUrl}
          className="w-full h-full border-0 filter invert-[0.88] hue-rotate-180 contrast-125"
          loading="lazy"
        />

        {/* Floating Quick Summary Overlay */}
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto max-w-sm glass-panel bg-slate-950/90 border border-slate-700/80 rounded-xl p-3 shadow-xl pointer-events-auto">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-400" />
              <p className="text-xs font-bold text-white">Your Safe Perimeter</p>
            </div>
            <a
              href={`https://www.google.com/maps?q=${activeLat},${activeLon}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-rose-400 hover:underline flex items-center gap-0.5"
            >
              Open Google Maps <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
          <p className="text-[11px] text-slate-300 truncate" title={coords.address}>
            {coords.address}
          </p>
          <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
            <span>Accuracy: ±{coords.accuracy}m</span>
            <span className="text-emerald-400 font-medium">GPS Synchronized</span>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { MapPin, Navigation, Phone, ExternalLink, Shield, Building2, Cross, AlertTriangle, Compass, Layers } from 'lucide-react';
import { useLocation } from '../context/LocationContext';

export const InteractiveMap = ({ resources = [], showControls = true, height = "420px", centerCoords = null, highRiskAreas = [] }) => {
  const { coords, refreshLocation, setManualLocation, openLocationSelector } = useLocation();

  const activeLat = centerCoords?.latitude || coords.latitude || 10.9601;
  const activeLon = centerCoords?.longitude || coords.longitude || 78.0766;

  // Preset popular hubs including Karur, Tamil Nadu
  const presetCities = [
    { name: 'Karur', state: 'Tamil Nadu', lat: 10.9601, lon: 78.0766, highlight: true },
    { name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lon: 80.2707 },
    { name: 'Bengaluru', state: 'Karnataka', lat: 12.9716, lon: 77.5946 },
    { name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lon: 72.8777 },
    { name: 'Delhi NCR', state: 'Delhi', lat: 28.6139, lon: 77.2090 },
    { name: 'Coimbatore', state: 'Tamil Nadu', lat: 11.0168, lon: 76.9558 },
    { name: 'Madurai', state: 'Tamil Nadu', lat: 9.9252, lon: 78.1198 }
  ];

  // Leaflet Map embed via OpenStreetMap iframe
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
            <span className="font-bold text-slate-200">
              Live Radar: {coords.city || 'Karur'}{coords.state ? `, ${coords.state}` : ''}
            </span>
            <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
              ({activeLat.toFixed(4)}, {activeLon.toFixed(4)})
            </span>
          </div>

          {/* Quick city simulator buttons + State Selector trigger */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-slate-400 mr-1 hidden sm:inline">Quick Hubs:</span>
            {presetCities.map((c) => (
              <button
                key={c.name}
                onClick={() => setManualLocation(c.lat, c.lon, c.name, c.state, 'India', `${c.name}, ${c.state}, India`)}
                className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition border flex items-center gap-1 ${
                  coords.city === c.name
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 ring-1 ring-rose-500/30'
                    : c.highlight
                    ? 'bg-rose-950/60 text-rose-300 border-rose-700/50 hover:bg-rose-900/60'
                    : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                {c.highlight && <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>}
                <span>{c.name}</span>
              </button>
            ))}

            {/* All Indian States & Districts Trigger Modal */}
            <button
              onClick={openLocationSelector}
              className="px-2.5 py-1 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 text-[10px] font-bold flex items-center gap-1 transition cursor-pointer"
            >
              <Compass className="w-3 h-3 text-rose-400" />
              <span>All States / Districts</span>
            </button>

            {/* Live GPS Refresh */}
            <button
              onClick={refreshLocation}
              title="Get device GPS location"
              className="p-1.5 rounded-lg bg-slate-800 text-emerald-400 hover:bg-slate-700 border border-slate-700 ml-0.5 transition"
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
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto max-w-sm glass-panel bg-slate-950/95 border border-slate-700/80 rounded-2xl p-3 shadow-2xl pointer-events-auto">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-400" />
              <p className="text-xs font-bold text-white">Safe Haven Perimeter</p>
            </div>
            <a
              href={`https://www.google.com/maps?q=${activeLat},${activeLon}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-rose-400 hover:underline flex items-center gap-0.5 font-medium"
            >
              Open Google Maps <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
          <p className="text-[11px] text-slate-300 truncate font-medium" title={coords.address}>
            {coords.address || `${coords.city}, ${coords.state}, India`}
          </p>
          <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
            <span>Accuracy: ±{coords.accuracy || 10}m</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              {coords.city || 'Karur'} Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

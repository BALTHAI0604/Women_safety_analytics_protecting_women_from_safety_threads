import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  MapPin,
  PhoneCall,
  Volume2,
  VolumeX,
  Eye,
  CheckCircle2,
  ExternalLink,
  Users,
  Navigation,
  Clock,
  Radio,
  Building2,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from '../context/LocationContext';
import { useSOS } from '../context/SOSContext';
import { sosApi, resourcesApi, contactsApi } from '../utils/api';

export const SOSPage = () => {
  const { user } = useAuth();
  const { coords, isLoading: isLocLoading, refreshLocation } = useLocation();
  const {
    initiateSOS,
    isActive: isSOSActive,
    activeSOSData,
    resolveActiveSOS,
    isSirenOn,
    toggleSiren,
    isStrobeOn,
    toggleStrobe
  } = useSOS();

  const [nearbyStations, setNearbyStations] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [sosHistory, setSosHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSOSPageData = async () => {
      setLoading(true);
      try {
        // Nearest police stations & hospitals
        const resData = await resourcesApi.getAll({
          latitude: coords.latitude,
          longitude: coords.longitude
        });
        if (resData?.resources) {
          setNearbyStations(resData.resources.slice(0, 4));
        }
      } catch (e) {
        console.warn('Resources fetch error:', e);
      }

      try {
        const contactsData = await contactsApi.getAll(user?.id || 2);
        if (contactsData?.contacts) {
          setContacts(contactsData.contacts);
        }
      } catch (e) {
        console.warn('Contacts fetch error:', e);
      }

      try {
        const histData = await sosApi.getHistory(user?.id);
        if (histData?.sos_history) {
          setSosHistory(histData.sos_history.slice(0, 4));
        }
      } catch (e) {
        console.warn('SOS History fetch error:', e);
      }
      setLoading(false);
    };

    loadSOSPageData();
  }, [coords.latitude, coords.longitude, user?.id]);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <span>Rapid Emergency Response Command</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] tracking-tight">
          Emergency <span className="text-rose-500">SOS Hub</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          In an emergency, activating SOS triggers an immediate distress broadcast with your live GPS location to your emergency contacts and local authorities.
        </p>
      </div>

      {/* GIANT SOS TRIGGER CONTAINER */}
      <div className="max-w-xl mx-auto glass-panel-glow rounded-3xl p-8 sm:p-12 text-center border-2 border-rose-500/50 relative overflow-hidden shadow-2xl shadow-rose-600/30">
        
        <div className="relative flex flex-col items-center justify-center space-y-6">
          
          {/* Big Circular Pulsating Button */}
          <button
            onClick={initiateSOS}
            className={`w-48 h-48 sm:w-56 sm:h-56 rounded-full flex flex-col items-center justify-center text-white shadow-2xl transition-all duration-300 transform active:scale-95 group relative ${
              isSOSActive
                ? 'bg-rose-600 animate-pulse-fast ring-[16px] ring-rose-500/50 shadow-rose-600/80 scale-105'
                : 'bg-gradient-to-tr from-red-600 via-rose-600 to-pink-600 hover:scale-105 shadow-rose-600/50 hover:shadow-rose-600/80 ring-8 ring-rose-500/30'
            }`}
          >
            <ShieldAlert className="w-16 h-16 sm:w-20 sm:h-20 mb-1 group-hover:animate-bounce" />
            <span className="font-black text-2xl sm:text-3xl font-['Outfit'] tracking-wider uppercase">
              {isSOSActive ? 'ACTIVE' : 'SOS'}
            </span>
            <span className="text-[10px] font-bold text-rose-200 uppercase tracking-widest mt-0.5">
              {isSOSActive ? 'Distress Sent' : 'Press For Help'}
            </span>
          </button>

          {/* Quick status message */}
          <div className="space-y-1">
            <p className="text-sm font-extrabold text-white">
              {isSOSActive ? '🚨 SOS EMERGENCY SIGNAL ACTIVE' : 'Tap once to initiate 3s emergency countdown'}
            </p>
            <p className="text-xs text-slate-400">
              {isSOSActive
                ? 'Your guardians have received your live GPS coordinates.'
                : 'Includes 3-second safety abort window to prevent accidental triggers.'}
            </p>
          </div>

          {/* Quick Active Controls when SOS is active */}
          {isSOSActive && (
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={toggleSiren}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border ${
                  isSirenOn
                    ? 'bg-amber-500 text-slate-950 border-amber-400'
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}
              >
                {isSirenOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                {isSirenOn ? 'Audible Siren Running' : 'Turn Siren On'}
              </button>

              <button
                onClick={toggleStrobe}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border ${
                  isStrobeOn
                    ? 'bg-rose-600 text-white border-rose-500'
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}
              >
                <Eye className="w-4 h-4" />
                {isStrobeOn ? 'Strobe Flashing' : 'Enable Strobe'}
              </button>

              <button
                onClick={() => resolveActiveSOS('Resolved')}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500 flex items-center gap-2 shadow-lg shadow-emerald-600/40"
              >
                <CheckCircle2 className="w-4 h-4" />
                Mark Safe / Resolve Alert
              </button>
            </div>
          )}

        </div>
      </div>

      {/* GPS LOCATION & REGISTERED GUARDIANS STATUS */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Current GPS Coordinates Card */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Current GPS Lock</h3>
                <p className="text-[11px] text-slate-400">High-accuracy satellite positioning</p>
              </div>
            </div>
            <button
              onClick={refreshLocation}
              disabled={isLocLoading}
              className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-rose-300 border border-slate-700 flex items-center gap-1.5"
            >
              <Navigation className={`w-3 h-3 ${isLocLoading ? 'animate-spin' : ''}`} />
              <span>Update GPS</span>
            </button>
          </div>

          <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800/80 space-y-2 text-xs">
            <div className="flex items-start justify-between gap-2">
              <span className="text-slate-400 font-semibold">Street Address:</span>
              <span className="text-white text-right font-medium max-w-xs">{coords.address}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Latitude:</span>
              <span className="font-mono text-slate-200">{coords.latitude.toFixed(6)}° N</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Longitude:</span>
              <span className="font-mono text-slate-200">{coords.longitude.toFixed(6)}° E</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Position Accuracy:</span>
              <span className="text-emerald-400 font-semibold">±{coords.accuracy} meters</span>
            </div>
          </div>

          <a
            href={`https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center justify-center gap-2 transition"
          >
            <span>Open in Google Maps Navigation</span>
            <ExternalLink className="w-3.5 h-3.5 text-rose-400" />
          </a>
        </div>

        {/* Registered Guardians Alert Destination */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Emergency Contacts Receiving Alert</h3>
                <p className="text-[11px] text-slate-400">{contacts.length} guardians registered</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {contacts.map((c) => (
              <div key={c.id} className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{c.name}</span>
                    {c.is_primary ? (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-500/20 text-rose-300">
                        Primary
                      </span>
                    ) : null}
                  </div>
                  <p className="text-[11px] text-slate-400">{c.phone} • {c.relationship}</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5" /> Ready
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* NEAREST EMERGENCY POLICE & HOSPITALS */}
      <div className="max-w-5xl mx-auto space-y-4">
        <h2 className="text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
          <Building2 className="w-5 h-5 text-rose-400" />
          Nearby Verified Police Stations & 24/7 Trauma Centers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {nearbyStations.map((station) => (
            <div key={station.id} className="glass-card rounded-2xl p-4 border border-slate-800 flex flex-col justify-between space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    station.type === 'Police Station'
                      ? 'bg-blue-500/20 text-blue-300'
                      : station.type === 'Hospital'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {station.type}
                  </span>
                  <h4 className="text-xs font-bold text-white mt-1">{station.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{station.address}</p>
                </div>
                {station.distance_km !== null && (
                  <span className="text-xs font-bold text-rose-400 bg-rose-950/50 px-2 py-1 rounded-lg border border-rose-500/30 flex-shrink-0">
                    {station.distance_km} km
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                <a
                  href={`tel:${station.phone}`}
                  className="flex-1 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call {station.phone}</span>
                </a>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1 transition"
                  title="Navigate with Google Maps"
                >
                  <Navigation className="w-3.5 h-3.5 text-rose-400" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

import React from 'react';
import { ShieldAlert, Volume2, VolumeX, Eye, CheckCircle2, PhoneCall, ExternalLink, MapPin, Radio } from 'lucide-react';
import { useSOS } from '../context/SOSContext';

export const SOSActiveBanner = () => {
  const { isActive, activeSOSData, resolveActiveSOS, isSirenOn, toggleSiren, isStrobeOn, toggleStrobe } = useSOS();

  if (!isActive) return null;

  return (
    <div className={`w-full border-b border-rose-500/50 transition-colors duration-300 ${
      isStrobeOn ? 'animate-strobe' : 'bg-gradient-to-r from-red-950/90 via-rose-950/90 to-red-950/90'
    } backdrop-blur-md px-4 py-3 text-white shadow-2xl relative z-30`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Left Status */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center animate-pulse flex-shrink-0 shadow-lg shadow-rose-600/50">
            <Radio className="w-5 h-5 text-white animate-spin" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm uppercase tracking-wider text-rose-300 font-['Outfit']">
                🚨 EMERGENCY SOS BROADCAST ACTIVE
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white animate-pulse">
                LIVE
              </span>
            </div>
            <p className="text-xs text-slate-200 truncate max-w-xl">
              Distress coordinates broadcasted to <strong className="text-white">{activeSOSData?.contacts_notified || 3} registered contacts</strong> and regional emergency response.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          
          {/* Siren toggle */}
          <button
            onClick={toggleSiren}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition border ${
              isSirenOn
                ? 'bg-amber-500 text-slate-950 border-amber-400 hover:bg-amber-400'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="Toggle audible alarm siren"
          >
            {isSirenOn ? <Volume2 className="w-3.5 h-3.5 animate-bounce" /> : <VolumeX className="w-3.5 h-3.5" />}
            {isSirenOn ? 'Siren On' : 'Siren Off'}
          </button>

          {/* Strobe toggle */}
          <button
            onClick={toggleStrobe}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition border ${
              isStrobeOn
                ? 'bg-rose-500 text-white border-rose-400'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="Toggle visual screen flasher"
          >
            <Eye className="w-3.5 h-3.5" />
            {isStrobeOn ? 'Strobe Active' : 'Strobe'}
          </button>

          {/* Call National Helpline 112 */}
          <a
            href="tel:112"
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-500 text-white border border-red-500 flex items-center gap-1.5 transition shadow"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            Call 112
          </a>

          {/* Resolve / I Am Safe Button */}
          <button
            onClick={() => resolveActiveSOS('Resolved')}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500 flex items-center gap-1.5 transition shadow-lg shadow-emerald-600/30"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            I Am Safe / Stand Down
          </button>
        </div>

      </div>
    </div>
  );
};

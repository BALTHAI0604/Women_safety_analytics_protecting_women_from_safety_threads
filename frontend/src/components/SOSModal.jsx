import React from 'react';
import { ShieldAlert, AlertTriangle, X, Zap, MapPin } from 'lucide-react';
import { useSOS } from '../context/SOSContext';
import { useLocation } from '../context/LocationContext';

export const SOSModal = () => {
  const { isModalOpen, countdown, cancelSOSCountdown, executeSOSDispatch, isTriggering } = useSOS();
  const { coords } = useLocation();

  if (!isModalOpen && !isTriggering) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border-2 border-rose-500 rounded-3xl p-6 shadow-2xl shadow-rose-600/40 text-center overflow-hidden">
        
        {/* Animated background glow */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-rose-600/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-pink-600/30 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close / Abort button */}
        <button
          onClick={cancelSOSCountdown}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          aria-label="Cancel emergency alert"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-rose-600/20 border-2 border-rose-500 flex items-center justify-center mb-4 animate-pulse">
          <ShieldAlert className="w-10 h-10 text-rose-500 animate-bounce" />
        </div>

        <h2 className="text-2xl font-black text-white font-['Outfit'] tracking-tight mb-1">
          EMERGENCY SOS TRIGGERED
        </h2>
        <p className="text-sm text-rose-300 font-medium mb-4">
          Transmitting live distress signal & GPS coordinates to emergency guardians...
        </p>

        {/* Big Countdown Circle */}
        <div className="my-6 flex items-center justify-center">
          <div className="w-28 h-28 rounded-full border-4 border-rose-500/30 border-t-rose-500 flex flex-col items-center justify-center bg-rose-950/40 shadow-inner">
            <span className="text-4xl font-black text-white font-['Outfit'] animate-scale">
              {countdown > 0 ? countdown : '🚨'}
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              {countdown > 0 ? 'Seconds' : 'Dispatching'}
            </span>
          </div>
        </div>

        {/* Current GPS coordinates info box */}
        <div className="bg-slate-950/70 rounded-2xl p-3 border border-slate-800 mb-6 text-left text-xs space-y-1">
          <div className="flex items-center gap-1.5 text-rose-400 font-semibold">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">GPS Location Locked:</span>
          </div>
          <p className="text-slate-300 text-[11px] truncate pl-5">
            {coords.address || `${coords.latitude}, ${coords.longitude}`}
          </p>
          <p className="text-[10px] text-slate-500 pl-5">
            Coords: {coords.latitude.toFixed(5)}, {coords.longitude.toFixed(5)} (±{coords.accuracy}m)
          </p>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={cancelSOSCountdown}
            className="py-3 px-4 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            Cancel / False Alarm
          </button>
          
          <button
            onClick={executeSOSDispatch}
            disabled={isTriggering}
            className="py-3 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-rose-600/40 flex items-center justify-center gap-1.5 transition transform active:scale-95"
          >
            <Zap className="w-3.5 h-3.5" />
            Send Instantly Now
          </button>
        </div>
      </div>
    </div>
  );
};

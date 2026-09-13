import React from 'react';
import { Shield, AlertTriangle, MapPin, User, LogOut, ShieldAlert, Sparkles, Menu, X, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from '../context/LocationContext';
import { useSOS } from '../context/SOSContext';

export const Navbar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  const { user, isAuthenticated, isAdmin, openAuth, logout, loginAsDemoUser, loginAsDemoAdmin } = useAuth();
  const { coords, isLoading: isLocLoading } = useLocation();
  const { initiateSOS, isActive: isSOSActive } = useSOS();

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-[#090d16]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand & Mobile Sidebar Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition"
            aria-label="Toggle navigation menu"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div 
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-500 to-pink-400 flex items-center justify-center shadow-lg shadow-rose-500/25 group-hover:scale-105 transition-transform duration-200">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg text-white tracking-tight font-['Outfit']">
                  Women Safety <span className="text-rose-400">Analytics</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/20">
                  AI Active
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden md:block">
                Protecting Women from Safety Threats
              </p>
            </div>
          </div>
        </div>

        {/* Center: Live Location Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <MapPin className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
          <span className="truncate max-w-[240px] text-slate-300 font-medium" title={coords.address}>
            {isLocLoading ? 'Locating GPS...' : coords.city || coords.address}
          </span>
        </div>

        {/* Right: Emergency SOS Button & User Profile / Demo Controls */}
        <div className="flex items-center gap-2.5">
          
          {/* Big Prominent Emergency SOS Button */}
          <button
            onClick={initiateSOS}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm text-white shadow-lg transition-all transform active:scale-95 ${
              isSOSActive
                ? 'bg-rose-600 animate-pulse-fast ring-4 ring-rose-500/50 shadow-rose-600/50'
                : 'bg-gradient-to-r from-red-600 via-rose-600 to-rose-500 hover:from-red-500 hover:to-rose-500 shadow-rose-600/30 hover:shadow-rose-600/50'
            }`}
          >
            <ShieldAlert className="w-4 h-4 animate-bounce" />
            <span className="tracking-wide uppercase font-['Outfit']">
              {isSOSActive ? 'SOS ACTIVE' : 'EMERGENCY SOS'}
            </span>
          </button>

          {/* User Auth controls */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('profile')}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition"
              >
                <img
                  src={user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'}
                  alt={user.fullname}
                  className="w-7 h-7 rounded-full object-cover border border-rose-400/40"
                />
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-semibold text-white leading-tight">{user.fullname}</p>
                  <p className="text-[10px] text-slate-400 capitalize">{user.role || 'User'}</p>
                </div>
              </button>

              <button
                onClick={logout}
                title="Sign Out"
                className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuth('login')}
                className="text-xs font-semibold px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition"
              >
                Sign In
              </button>
              <button
                onClick={() => openAuth('register')}
                className="text-xs font-semibold px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition hidden sm:inline-flex"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

import React, { useState, useEffect } from 'react';
import {
  Shield,
  ShieldAlert,
  MapPin,
  Users,
  AlertTriangle,
  FileWarning,
  Bot,
  BarChart3,
  PhoneCall,
  CheckCircle2,
  Navigation,
  Sparkles,
  ArrowRight,
  Clock,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from '../context/LocationContext';
import { useSOS } from '../context/SOSContext';
import { InteractiveMap } from '../components/InteractiveMap';
import { analyticsApi, incidentsApi, contactsApi } from '../utils/api';

export const DashboardPage = ({ setActiveTab }) => {
  const { user } = useAuth();
  const { coords, isLoading: isLocLoading, refreshLocation } = useLocation();
  const { initiateSOS, isActive: isSOSActive } = useSOS();

  const [safetyRiskData, setSafetyRiskData] = useState({
    safety_score: 88,
    risk_label: 'Low Risk (Safe Zone)',
    is_night_time: false,
    recommendations: [
      'Keep emergency SOS speed-dial active',
      'Share live trip GPS if traveling alone at night',
      'Verify ride-share vehicle registration before boarding'
    ]
  });

  const [contacts, setContacts] = useState([]);
  const [recentIncidents, setRecentIncidents] = useState([]);
  const [loadingDashboard, setLoadingDashboard] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoadingDashboard(true);
      try {
        // 1. Calculate real-time risk
        const riskRes = await analyticsApi.calculateRisk({
          latitude: coords.latitude,
          longitude: coords.longitude
        });
        if (riskRes) setSafetyRiskData(riskRes);
      } catch (e) {
        console.warn('Risk calc fallback:', e);
      }

      try {
        // 2. Fetch emergency contacts
        if (user?.id) {
          const contactsRes = await contactsApi.getAll(user.id);
          if (contactsRes?.contacts) setContacts(contactsRes.contacts);
        } else {
          setContacts([]);
        }
      } catch (e) {
        console.warn('Contacts fallback:', e);
        setContacts([]);
      }

      try {
        // 3. Fetch recent incidents
        const incidentsRes = await incidentsApi.getAll();
        if (incidentsRes?.incidents) setRecentIncidents(incidentsRes.incidents.slice(0, 3));
      } catch (e) {
        console.warn('Incidents fallback:', e);
      }

      setLoadingDashboard(false);
    };

    fetchDashboardData();
  }, [coords.latitude, coords.longitude, user?.id]);

  const primaryContact = contacts.find(c => c.is_primary) || contacts[0];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Welcome & Fast SOS Bar */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Glow */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-rose-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="space-y-2 text-center md:text-left z-10">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Safety Network Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
            Welcome, {user?.fullname || 'Safety Network Member'} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg">
            Your personal safety perimeter is monitored. In case of any threat, tap the Emergency SOS button below immediately.
          </p>
        </div>

        {/* Big Dashboard SOS Trigger Button */}
        <div className="flex-shrink-0 z-10">
          <button
            onClick={initiateSOS}
            className={`px-8 py-5 rounded-3xl font-black text-base sm:text-lg text-white shadow-2xl flex items-center gap-3 transition transform hover:scale-105 active:scale-95 uppercase tracking-wider font-['Outfit'] ${
              isSOSActive
                ? 'bg-rose-600 animate-pulse-fast ring-8 ring-rose-500/40 shadow-rose-600/60'
                : 'bg-gradient-to-r from-red-600 via-rose-600 to-rose-500 shadow-rose-600/40 hover:shadow-rose-600/70 border-2 border-rose-400/40'
            }`}
          >
            <ShieldAlert className="w-7 h-7 animate-bounce" />
            <div className="text-left">
              <p className="leading-none text-xs text-rose-100 font-semibold lowercase">tap for instant help</p>
              <p className="leading-tight text-xl font-black">EMERGENCY SOS</p>
            </div>
          </button>
        </div>

      </div>

      {/* 3 Main Summary Cards: Location & Map, Safety Score Gauge, Emergency Contacts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* 1. Live Location Card */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-200">Current GPS Location</h3>
                <p className="text-[10px] text-slate-500">Live coordinates locked</p>
              </div>
            </div>
            <button
              onClick={refreshLocation}
              disabled={isLocLoading}
              title="Refresh GPS"
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition"
            >
              <Navigation className={`w-3.5 h-3.5 ${isLocLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800/80 space-y-1">
            <p className="text-xs text-white font-semibold line-clamp-2">
              {coords.address}
            </p>
            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
              <span>{coords.latitude.toFixed(4)}, {coords.longitude.toFixed(4)}</span>
              <span className="text-emerald-400 font-medium">±{coords.accuracy}m accuracy</span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('resources')}
            className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center justify-between pt-1"
          >
            <span>View Nearby Police & Hospitals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 2. Dynamic Safety Score Card */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-200">Area Safety Index</h3>
                <p className="text-[10px] text-slate-500">Predictive threat score</p>
              </div>
            </div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              safetyRiskData.safety_score >= 80 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
            }`}>
              {safetyRiskData.safety_score >= 80 ? 'Safe' : 'Caution'}
            </span>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/70 rounded-xl p-3 border border-slate-800/80">
            <div className="text-3xl font-black text-transparent bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text font-['Outfit']">
              {safetyRiskData.safety_score}<span className="text-xs text-slate-500 font-normal">/100</span>
            </div>
            <div className="text-xs">
              <p className="font-bold text-slate-200">{safetyRiskData.risk_label}</p>
              <p className="text-[10px] text-slate-400">
                {safetyRiskData.is_night_time ? '🌙 Night mode risk factors applied' : '☀️ Daytime risk profile active'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('analytics')}
            className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center justify-between pt-1"
          >
            <span>Explore City Crime Trends</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3. Emergency Contacts Card */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-200">Guardian Network</h3>
                <p className="text-[10px] text-slate-500">{contacts.length} Registered Guardians</p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('contacts')}
              className="text-[10px] font-bold text-purple-400 hover:underline"
            >
              Manage
            </button>
          </div>

          <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800/80 space-y-1">
            {primaryContact ? (
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{primaryContact.name}</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-500/20 text-rose-300">
                    Primary
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{primaryContact.phone} • {primaryContact.relationship}</p>
              </div>
            ) : (
              <p className="text-xs text-slate-400">No emergency contacts registered yet.</p>
            )}
          </div>

          <button
            onClick={() => setActiveTab('contacts')}
            className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center justify-between pt-1"
          >
            <span>Send Test Alert / Add Contact</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Interactive Safety Map Preview & Quick Access Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Live Radar Map */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-400" />
              Live Safety Radar & Perimeter
            </h2>
            <button
              onClick={() => setActiveTab('resources')}
              className="text-xs font-semibold text-slate-400 hover:text-white"
            >
              Full Screen Map →
            </button>
          </div>
          <InteractiveMap height="360px" />
        </div>

        {/* Right 1 Col: Quick Feature Launchers */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            Quick Safety Access
          </h2>

          <div className="space-y-2.5">
            
            {/* AI Assistant card */}
            <div
              onClick={() => setActiveTab('ai-assistant')}
              className="glass-card p-3.5 rounded-2xl border border-slate-800 hover:border-purple-500/40 cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Ask Aegis AI</h4>
                  <p className="text-[11px] text-slate-400">Suspicious situations & self-defense</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition" />
            </div>

            {/* Crime Analytics card */}
            <div
              onClick={() => setActiveTab('analytics')}
              className="glass-card p-3.5 rounded-2xl border border-slate-800 hover:border-rose-500/40 cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Crime Analytics</h4>
                  <p className="text-[11px] text-slate-400">View high-risk areas & patterns</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-rose-400 transition" />
            </div>

            {/* Report Incident card */}
            <div
              onClick={() => setActiveTab('incidents')}
              className="glass-card p-3.5 rounded-2xl border border-slate-800 hover:border-blue-500/40 cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileWarning className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Report an Incident</h4>
                  <p className="text-[11px] text-slate-400">Log harassment or hazard with photo</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition" />
            </div>

            {/* Safety Tips card */}
            <div
              onClick={() => setActiveTab('tips')}
              className="glass-card p-3.5 rounded-2xl border border-slate-800 hover:border-emerald-500/40 cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Safety Guides & Defense</h4>
                  <p className="text-[11px] text-slate-400">Travel, workplace & self-defense</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition" />
            </div>

          </div>
        </div>

      </div>

      {/* Recent Incidents Feed */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            Recent Area Incident Activity
          </h2>
          <button
            onClick={() => setActiveTab('incidents')}
            className="text-xs font-semibold text-rose-400 hover:underline"
          >
            View All Reports →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentIncidents.map((inc) => (
            <div key={inc.id} className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  inc.severity === 'High' || inc.severity === 'Critical'
                    ? 'bg-rose-500/20 text-rose-300'
                    : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {inc.severity} Severity
                </span>
                <span className="text-[10px] text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {inc.incident_date}
                </span>
              </div>
              <h4 className="text-xs font-bold text-white truncate">{inc.incident_type}</h4>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {inc.description}
              </p>
              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
                <span className="truncate max-w-[160px]">{inc.location}</span>
                <span className="text-emerald-400 font-semibold">{inc.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

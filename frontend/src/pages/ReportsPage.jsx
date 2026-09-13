import React, { useState, useEffect } from 'react';
import {
  FileText,
  Download,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Filter,
  BarChart3,
  MapPin,
  Sparkles,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from '../context/LocationContext';
import { analyticsApi, incidentsApi, sosApi } from '../utils/api';

export const ReportsPage = () => {
  const { user } = useAuth();
  const { coords } = useLocation();

  const [city, setCity] = useState('All');
  const [dateRange, setDateRange] = useState('90days');
  const [generating, setGenerating] = useState(false);
  const [reportReady, setReportReady] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await analyticsApi.getOverview(city);
        setStats(data);
      } catch (e) {
        console.warn('Analytics report fallback:', e);
      }
    };
    loadStats();
  }, [city]);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setReportReady(true);
    }, 800);
  };

  const handlePrint = () => {
    window.print();
  };

  const downloadJSON = () => {
    const reportObj = {
      report_title: "Women Safety Analytics - Comprehensive Audit & Security Assessment",
      generated_for: user?.fullname || "Sarah Jenkins",
      generated_at: new Date().toISOString(),
      scope_city: city,
      timeframe: dateRange,
      safety_score: stats?.safety_index || 84,
      total_incidents_analyzed: stats?.total_crimes_analyzed || 340,
      high_risk_hotspots: stats?.high_risk_areas || [],
      crime_type_breakdown: stats?.crime_type_breakdown || [],
      system_recommendations: [
        "Maintain active guardian speed-dials",
        "Avoid unverified cabs in identified hot-zones after 20:00",
        "Enable GPS tracking and Aegis AI live check-in"
      ]
    };

    const blob = new Blob([JSON.stringify(reportObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Women_Safety_Audit_${city}_${dateRange}.json`;
    a.click();
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-300 border border-blue-500/20">
            Safety Intelligence & Documentation
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] mt-1">
          Safety Audit & Analytics Reports
        </h1>
        <p className="text-xs text-slate-400">
          Generate, print, and export comprehensive safety analysis certificates and neighborhood risk audit summaries.
        </p>
      </div>

      {/* Report Configurator Card */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold text-white font-['Outfit'] flex items-center gap-2">
          <Filter className="w-4 h-4 text-rose-400" />
          Customize Safety Audit Scope
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">Target City / Jurisdiction</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-rose-500"
            >
              <option value="All">All Monitored Jurisdictions</option>
              <option value="Bengaluru">Bengaluru Metropolitan</option>
              <option value="Delhi">Delhi NCR Region</option>
              <option value="Mumbai">Mumbai Suburbs & Central</option>
              <option value="New York">New York City Districts</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">Analysis Timeframe</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-rose-500"
            >
              <option value="30days">Last 30 Days (Real-time)</option>
              <option value="90days">Last 90 Days (Quarterly Audit)</option>
              <option value="full_year">Full Year (2025 - 2026 Aggregate)</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 flex items-center justify-center gap-1.5 transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{generating ? 'Compiling Metrics...' : 'Generate Official Report'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Generated Report Document View */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-6">
        
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center text-white shadow-xl shadow-rose-600/30">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white font-['Outfit']">
                OFFICIAL WOMEN SAFETY AUDIT CERTIFICATE
              </h3>
              <p className="text-xs text-slate-400">
                Issued by Women Safety Analytics AI Platform • Document ID: WSA-{Date.now().toString().slice(-6)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5 text-rose-400" />
              <span>Print Document</span>
            </button>

            <button
              onClick={downloadJSON}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition"
            >
              <Download className="w-3.5 h-3.5 text-rose-400" />
              <span>Export JSON</span>
            </button>
          </div>
        </div>

        {/* Audit Meta Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs">
          <div>
            <span className="text-slate-500 block text-[10px]">Recipient User</span>
            <span className="font-bold text-white">{user?.fullname || 'Sarah Jenkins'}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Jurisdiction</span>
            <span className="font-bold text-white">{city} Region</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Composite Safety Index</span>
            <span className="font-bold text-emerald-400">{stats?.safety_index || 84} / 100 (Safe Rating)</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Audit Generation Date</span>
            <span className="font-bold text-slate-300">{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Breakdown Summary Section */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">
            Threat & Incident Distribution Overview
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80 space-y-2">
              <p className="text-xs font-bold text-slate-200">Key Crime Classifications</p>
              {(stats?.crime_type_breakdown || []).slice(0, 4).map((c, i) => (
                <div key={i} className="flex items-center justify-between text-xs text-slate-300">
                  <span>{c.name}</span>
                  <span className="font-mono font-bold text-slate-400">{c.value} logged cases</span>
                </div>
              ))}
            </div>

            <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80 space-y-2">
              <p className="text-xs font-bold text-slate-200">High-Risk Area Hotspots</p>
              {(stats?.high_risk_areas || []).slice(0, 3).map((a, i) => (
                <div key={i} className="flex items-center justify-between text-xs text-slate-300">
                  <span className="truncate max-w-[200px]">{a.area_name}</span>
                  <span className="text-rose-400 font-bold">{a.risk_level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security Recommendations */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
          <p className="font-bold text-white flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Certified Platform Recommendations:
          </p>
          <ul className="space-y-1.5 text-slate-300 pl-5 list-disc leading-relaxed">
            <li>Ensure at least 3 emergency contacts are registered with verified phone numbers.</li>
            <li>Use the Aegis AI Safety Assistant during late-night transit for real-time check-in and situational advice.</li>
            <li>Maintain location permissions to enable sub-second emergency SOS coordinate transmission.</li>
          </ul>
        </div>

      </div>

    </div>
  );
};

import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Shield,
  MapPin,
  Clock,
  Calendar,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';
import { analyticsApi } from '../utils/api';
import { useLocation } from '../context/LocationContext';

const COLORS = ['#f43f5e', '#a855f7', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#6366f1'];

export const AnalyticsPage = () => {
  const { coords, openLocationSelector } = useLocation();
  const [selectedCity, setSelectedCity] = useState(coords.city || 'Karur');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async (city) => {
    setLoading(true);
    try {
      const data = await analyticsApi.getOverview(city);
      setAnalyticsData(data);
    } catch (e) {
      console.warn('Analytics fetch fallback:', e);
      // Fallback sample data
      setAnalyticsData({
        city: city,
        total_crimes_analyzed: 342,
        monitored_hotspots: 18,
        safety_index: 84,
        risk_level: 'Moderate',
        crime_type_breakdown: [
          { name: 'Harassment', value: 88 },
          { name: 'Stalking', value: 52 },
          { name: 'Theft / Snatching', value: 110 },
          { name: 'Eve Teasing', value: 65 },
          { name: 'Verbal Abuse', value: 27 }
        ],
        high_risk_areas: [
          { area_name: 'Metro Station Gate 2', frequency: 65, risk_level: 'Critical', time_slot: 'Late Night' },
          { area_name: 'Central Bus Terminal', frequency: 58, risk_level: 'High', time_slot: 'Night' },
          { area_name: 'District Mall Back Road', frequency: 44, risk_level: 'High', time_slot: 'Evening' },
          { area_name: 'Dark Transit Underpass', frequency: 38, risk_level: 'Critical', time_slot: 'Late Night' }
        ],
        time_slot_breakdown: [
          { time_slot: 'Morning (6-12)', count: 32 },
          { time_slot: 'Afternoon (12-17)', count: 48 },
          { time_slot: 'Evening (17-21)', count: 124 },
          { time_slot: 'Night (21-00)', count: 98 },
          { time_slot: 'Late Night (00-6)', count: 40 }
        ],
        monthly_trends: [
          { month: 'Jan', reported: 32, prevented: 45, safety_score: 78 },
          { month: 'Feb', reported: 28, prevented: 52, safety_score: 81 },
          { month: 'Mar', reported: 35, prevented: 48, safety_score: 79 },
          { month: 'Apr', reported: 22, prevented: 60, safety_score: 85 },
          { month: 'May', reported: 25, prevented: 58, safety_score: 84 },
          { month: 'Jun', reported: 19, prevented: 65, safety_score: 88 },
          { month: 'Jul', reported: 15, prevented: 72, safety_score: 91 }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics(selectedCity);
  }, [selectedCity]);

  const exportCSV = () => {
    if (!analyticsData) return;
    let csv = "Crime Type,Frequency\n";
    analyticsData.crime_type_breakdown.forEach(c => {
      csv += `"${c.name}",${c.value}\n`;
    });
    csv += "\nHigh Risk Hotspot,Frequency,Risk Level,Time Slot\n";
    analyticsData.high_risk_areas.forEach(a => {
      csv += `"${a.area_name}",${a.frequency},"${a.risk_level}","${a.time_slot}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Women_Safety_Analytics_${selectedCity}_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const cities = ['All', 'Karur', 'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Erode', 'Bengaluru', 'Delhi', 'Mumbai', 'Hyderabad', 'Kochi', 'New York'];

  return (
    <div className="space-y-6 pb-16">
      
      {/* Top Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-300 border border-rose-500/20">
              Predictive AI Analytics
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              Region: {selectedCity}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] mt-1">
            Crime Analytics & High-Risk Zones
          </h1>
          <p className="text-xs text-slate-400">
            Real-time multi-dimensional crime pattern recognition and vulnerability mapping for {selectedCity} and nationwide.
          </p>
        </div>

        {/* City Filter & Export Button */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400 ml-2" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent text-white text-xs font-semibold focus:outline-none pr-2"
            >
              {cities.map(c => (
                <option key={c} value={c} className="bg-slate-900 text-white">{c} {c === 'All' ? 'Jurisdictions' : 'Region'}</option>
              ))}
            </select>
          </div>

          <button
            onClick={openLocationSelector}
            className="px-3 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 text-xs font-semibold border border-rose-500/40 flex items-center gap-1.5 transition cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>Select State / District</span>
          </button>

          <button
            onClick={exportCSV}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5 text-rose-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 4 Overview Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Total Crimes Analyzed</span>
            <BarChart3 className="w-4 h-4 text-rose-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
            {analyticsData?.total_crimes_analyzed || 340}
          </p>
          <p className="text-[10px] text-emerald-400">↓ 14% drop from previous period</p>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Monitored Hotspots</span>
            <MapPin className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
            {analyticsData?.monitored_hotspots || 18}
          </p>
          <p className="text-[10px] text-slate-500">Live surveillance active</p>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Safety Index</span>
            <Shield className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-['Outfit']">
            {analyticsData?.safety_index || 84}/100
          </p>
          <p className="text-[10px] text-emerald-300">Composite safe rating</p>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Threat Severity</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-amber-400 font-['Outfit']">
            {analyticsData?.risk_level || 'Moderate'}
          </p>
          <p className="text-[10px] text-slate-500">Night vigilance recommended</p>
        </div>
      </div>

      {/* High-Risk Area Alert Banner */}
      <div className="bg-rose-950/40 border border-rose-500/40 rounded-2xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5 animate-bounce" />
        <div className="space-y-0.5 text-xs">
          <h4 className="font-bold text-rose-200 uppercase tracking-wide">High-Risk Area Warning Notice</h4>
          <p className="text-slate-300 leading-relaxed">
            Predictive modeling indicates increased harassment and theft incidents near transit terminals and poorly lit side roads between <strong className="text-white">8:00 PM and 2:00 AM</strong>. Avoid unverified solo cabs in these zones.
          </p>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Crime Trend Over Time (Area Chart) */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-['Outfit'] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-rose-400" />
              Monthly Incident Trend vs Prevention Rate
            </h3>
            <span className="text-[10px] text-slate-400">2025 - 2026</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData?.monthly_trends || []}>
                <defs>
                  <linearGradient id="colorReported" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPrevented" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="reported" name="Incidents Reported" stroke="#f43f5e" fillOpacity={1} fill="url(#colorReported)" strokeWidth={2} />
                <Area type="monotone" dataKey="prevented" name="Incidents Prevented" stroke="#10b981" fillOpacity={1} fill="url(#colorPrevented)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Crime Type Distribution (Donut Chart) */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-['Outfit'] flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-purple-400" />
              Crime Breakdown by Category
            </h3>
            <span className="text-[10px] text-slate-400">Total: {analyticsData?.total_crimes_analyzed}</span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData?.crime_type_breakdown || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {(analyticsData?.crime_type_breakdown || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Incident Frequency by Time of Day (Bar Chart) */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-['Outfit'] flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              Incident Occurrence by Time of Day
            </h3>
            <span className="text-[10px] text-amber-400 font-semibold">Peak: Evening & Night</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData?.time_slot_breakdown || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time_slot" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }} />
                <Bar dataKey="count" name="Incident Frequency" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* High-Risk Areas List */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white font-['Outfit'] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                Top High-Risk Hotspots ({selectedCity})
              </h3>
              <span className="text-[10px] text-slate-400">Ranked by threat index</span>
            </div>

            <div className="space-y-2">
              {(analyticsData?.high_risk_areas || []).map((area, idx) => (
                <div key={idx} className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{area.area_name}</span>
                      <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                        area.risk_level === 'Critical' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {area.risk_level}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Crime: {area.crime_type || 'General'} • Peak Slot: {area.time_slot}
                    </p>
                  </div>
                  <span className="font-mono font-bold text-rose-400 bg-rose-950/40 px-2 py-1 rounded-lg border border-rose-500/20">
                    {area.frequency} cases
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

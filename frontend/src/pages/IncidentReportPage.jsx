import React, { useState, useEffect } from 'react';
import {
  FileWarning,
  Send,
  Camera,
  MapPin,
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Shield,
  EyeOff,
  Navigation,
  Image as ImageIcon,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from '../context/LocationContext';
import { incidentsApi } from '../utils/api';

export const IncidentReportPage = () => {
  const { user } = useAuth();
  const { coords } = useLocation();

  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const [formData, setFormData] = useState({
    incident_type: 'Harassment / Eve Teasing',
    incident_date: new Date().toISOString().split('T')[0],
    incident_time: new Date().toTimeString().slice(0, 5),
    location: coords.address || 'Bengaluru, India',
    latitude: coords.latitude,
    longitude: coords.longitude,
    severity: 'Medium',
    description: '',
    evidence_image: null,
    is_anonymous: false
  });

  const [imagePreview, setImagePreview] = useState(null);

  const fetchIncidents = async () => {
    try {
      const res = await incidentsApi.getAll();
      if (res?.incidents) setIncidents(res.incidents);
    } catch (e) {
      console.warn('Incidents fetch fallback:', e);
      setIncidents([
        {
          id: 1,
          reporter_name: 'Sarah Jenkins',
          incident_type: 'Stalking / Following',
          incident_date: '2026-08-20',
          incident_time: '22:15',
          location: 'Near Metro Station Gate 2',
          severity: 'High',
          description: 'A person in a black hoodie was persistently following me from the ticket counter to the cab stand. Alerted security.',
          status: 'Verified',
          is_anonymous: 0
        },
        {
          id: 2,
          reporter_name: 'Anonymous Reporter',
          incident_type: 'Verbal Harassment',
          incident_date: '2026-08-22',
          incident_time: '19:40',
          location: 'Central Bus Depot Platform 4',
          severity: 'Medium',
          description: 'Group passing inappropriate comments near ladies waiting lounge.',
          status: 'Resolved',
          is_anonymous: 1
        }
      ]);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, evidence_image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAutoGPS = () => {
    setFormData(prev => ({
      ...prev,
      location: coords.address,
      latitude: coords.latitude,
      longitude: coords.longitude
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await incidentsApi.submit({
        ...formData,
        user_id: formData.is_anonymous ? null : user?.id || 2,
        reporter_name: formData.is_anonymous ? 'Anonymous Reporter' : user?.fullname || 'Sarah'
      });

      setSubmittedSuccess(true);
      fetchIncidents();
      setFormData({
        incident_type: 'Harassment / Eve Teasing',
        incident_date: new Date().toISOString().split('T')[0],
        incident_time: new Date().toTimeString().slice(0, 5),
        location: coords.address,
        latitude: coords.latitude,
        longitude: coords.longitude,
        severity: 'Medium',
        description: '',
        evidence_image: null,
        is_anonymous: false
      });
      setImagePreview(null);
      setTimeout(() => setSubmittedSuccess(false), 6000);
    } catch (err) {
      console.error('Submit incident error:', err);
    } finally {
      setLoading(false);
    }
  };

  const incidentTypes = [
    'Harassment / Eve Teasing',
    'Stalking / Following',
    'Physical Threat / Assault Attempt',
    'Unsafe Transit / Cab Misconduct',
    'Dark / Poorly Lit Route Hazard',
    'Cyber Harassment / Stalking',
    'Domestic Abuse / Disturbance',
    'Other Safety Hazard'
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-300 border border-blue-500/20">
            Confidential & Verified Reporting
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] mt-1">
          Incident Reporting & Threat Logging
        </h1>
        <p className="text-xs text-slate-400">
          Document safety hazards, harassment, or threats. Reports are routed to safety moderators and crime mapping algorithms.
        </p>
      </div>

      {submittedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div>
              <p className="font-bold">Incident Report Submitted Successfully</p>
              <p className="text-[11px] text-emerald-300">Your record has been logged and assigned an incident tracking ID.</p>
            </div>
          </div>
          <button onClick={() => setSubmittedSuccess(false)} className="text-emerald-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Grid: Form Left, Community Feed Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form Container (7 Cols) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <h2 className="text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
            <FileWarning className="w-5 h-5 text-rose-400" />
            File Safety Incident Report
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Incident Type */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Type of Incident</label>
              <select
                value={formData.incident_type}
                onChange={(e) => setFormData({ ...formData, incident_type: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-rose-500"
              >
                {incidentTypes.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Date & Time Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.incident_date}
                    onChange={(e) => setFormData({ ...formData, incident_date: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Time</label>
                <input
                  type="time"
                  value={formData.incident_time}
                  onChange={(e) => setFormData({ ...formData, incident_time: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            {/* Location with Auto GPS */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-semibold text-slate-300">Location / Landmark</label>
                <button
                  type="button"
                  onClick={handleAutoGPS}
                  className="text-[10px] text-rose-400 font-semibold hover:underline flex items-center gap-1"
                >
                  <Navigation className="w-2.5 h-2.5" /> Auto-fill GPS
                </button>
              </div>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Metro Station Gate 2, near bus stop"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
            </div>

            {/* Severity Level */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Severity Level</label>
              <div className="grid grid-cols-4 gap-2">
                {['Low', 'Medium', 'High', 'Critical'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData({ ...formData, severity: level })}
                    className={`py-2 rounded-xl text-xs font-bold transition border ${
                      formData.severity === level
                        ? level === 'Critical' || level === 'High'
                          ? 'bg-rose-600 text-white border-rose-500 shadow-md'
                          : 'bg-amber-600 text-white border-amber-500 shadow-md'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed Description */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Incident Description</label>
              <textarea
                rows={4}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Provide details: appearance of suspects, sequence of events, vehicle number, action taken..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
            </div>

            {/* Evidence Image Upload */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Optional Photo Evidence</label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold cursor-pointer transition">
                  <Camera className="w-4 h-4 text-rose-400" />
                  <span>Attach Image</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
                {imagePreview && (
                  <div className="relative">
                    <img src={imagePreview} alt="Evidence Preview" className="w-12 h-12 rounded-lg object-cover border border-rose-500/40" />
                    <button
                      type="button"
                      onClick={() => { setImagePreview(null); setFormData(p => ({ ...p, evidence_image: null })); }}
                      className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px]"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Anonymous Toggle */}
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <EyeOff className="w-4 h-4 text-purple-400" />
                <div>
                  <p className="font-bold text-white text-xs">Submit Anonymously</p>
                  <p className="text-[10px] text-slate-400">Do not attach your user name or profile to this report</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={formData.is_anonymous}
                onChange={(e) => setFormData({ ...formData, is_anonymous: e.target.checked })}
                className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 bg-slate-900 border-slate-700"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 hover:from-rose-500 hover:to-pink-500 text-white font-extrabold text-xs shadow-xl shadow-rose-600/30 flex items-center justify-center gap-2 transition transform active:scale-98 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Submitting Report...' : 'Submit Incident Report'}</span>
            </button>

          </form>
        </div>

        {/* Community Reports Feed (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              Verified Incident Feed ({incidents.length})
            </h2>
            <span className="text-[10px] text-slate-500">Live community log</span>
          </div>

          <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
            {incidents.map((inc) => (
              <div key={inc.id} className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    inc.severity === 'Critical' || inc.severity === 'High'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {inc.severity} Severity
                  </span>

                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {inc.incident_date} • {inc.incident_time}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white">{inc.incident_type}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{inc.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400 flex items-center gap-1 truncate max-w-[170px]">
                    <MapPin className="w-3 h-3 text-rose-400 flex-shrink-0" />
                    <span className="truncate">{inc.location}</span>
                  </span>
                  <span className="font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                    {inc.status || 'Under Review'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

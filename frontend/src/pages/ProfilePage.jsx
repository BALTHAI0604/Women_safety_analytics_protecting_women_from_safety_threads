import React, { useState } from 'react';
import {
  User,
  Phone,
  Mail,
  Shield,
  Heart,
  Save,
  CheckCircle2,
  Lock,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ProfilePage = ({ setActiveTab }) => {
  const { user, updateProfile, openAuth } = useAuth();

  const [formData, setFormData] = useState({
    fullname: user?.fullname || '',
    phone: user?.phone || '',
    medical_info: user?.medical_info || ''
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  React.useEffect(() => {
    if (user) {
      setFormData({
        fullname: user.fullname || '',
        phone: user.phone || '',
        medical_info: user.medical_info || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(formData);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 5000);
    } catch (e) {
      console.error('Update profile error:', e);
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-12 glass-panel rounded-3xl p-8 border border-slate-800 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/30">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white font-['Outfit']">Sign In to View Profile</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Please log in to manage your identity, emergency medical information, and contact credentials.
        </p>
        <button
          onClick={() => openAuth('login')}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition"
        >
          Sign In / Enter
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      
      {/* Top Header & Fast Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-300 border border-rose-500/20">
              Protected Identity & Guardian Data
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] mt-1">
            User Profile & Emergency Medical Notes
          </h1>
          <p className="text-xs text-slate-400">
            Information here is encrypted and provided to verified responders and emergency doctors if SOS is triggered.
          </p>
        </div>

        {/* Top Direct Go to Dashboard CTA */}
        {setActiveTab && (
          <button
            onClick={() => setActiveTab('dashboard')}
            className="flex-shrink-0 px-4 py-2.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 hover:text-white border border-rose-500/40 text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-rose-600/10"
          >
            <span>Go to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn shadow-lg shadow-emerald-950/50">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span className="font-semibold">Profile and emergency medical notes updated successfully!</span>
          </div>
          {setActiveTab && (
            <button
              onClick={() => setActiveTab('dashboard')}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5 self-start sm:self-auto"
            >
              <span>Open Dashboard Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Profile Form */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-xl">
        
        {/* User Card */}
        <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
          <img
            src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
            alt="Profile Avatar"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-rose-500/50 shadow-lg shadow-rose-600/20"
          />
          <div>
            <h3 className="text-lg font-bold text-white font-['Outfit']">{user.fullname || 'User'}</h3>
            <p className="text-xs text-slate-400">{user.email}</p>
            <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 capitalize">
              Role: {user.role || 'User'}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">Full Legal Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={formData.fullname}
                onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">Emergency Phone Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Critical Medical & Responder Notes (Blood group, Allergies, Medical conditions)
            </label>
            <div className="relative">
              <textarea
                rows={3}
                value={formData.medical_info}
                onChange={(e) => setFormData({ ...formData, medical_info: e.target.value })}
                placeholder="e.g. Blood Type: A+, Asthmatic (inhaler in bag), Penicillin allergy"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-rose-500 leading-relaxed"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              This information is shared with paramedic responders during active SOS emergencies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 flex items-center justify-center gap-1.5 transition active:scale-98"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving Changes...' : 'Save Profile Changes'}</span>
            </button>

            {setActiveTab && (
              <button
                type="button"
                onClick={() => setActiveTab('dashboard')}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs border border-slate-700 transition flex items-center justify-center gap-1.5"
              >
                <span>Continue to Dashboard</span>
                <ArrowRight className="w-4 h-4 text-rose-400" />
              </button>
            )}
          </div>
        </form>

      </div>

      {/* Quick Access Next Pages / Features Grid */}
      {setActiveTab && (
        <div className="space-y-3 pt-2">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-400" />
            Quick Navigation & Safety Hubs
          </h2>
          <p className="text-xs text-slate-400">
            Tap any safety module below to navigate directly:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className="glass-card p-4 rounded-2xl border border-slate-800 hover:border-rose-500/50 text-left group transition flex flex-col justify-between space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center group-hover:scale-110 transition">
                  <Shield className="w-4 h-4" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-rose-400 transition" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-rose-300">Safety Dashboard</h4>
                <p className="text-[10px] text-slate-400">Live safety score & radar map</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('ai-assistant')}
              className="glass-card p-4 rounded-2xl border border-slate-800 hover:border-purple-500/50 text-left group transition flex flex-col justify-between space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition">
                  <Sparkles className="w-4 h-4" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-purple-300">AI Safety Assistant</h4>
                <p className="text-[10px] text-slate-400">24/7 intelligent advice & coaching</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('contacts')}
              className="glass-card p-4 rounded-2xl border border-slate-800 hover:border-amber-500/50 text-left group transition flex flex-col justify-between space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition">
                  <Phone className="w-4 h-4" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-amber-300">Emergency Contacts</h4>
                <p className="text-[10px] text-slate-400">Guardian alerts & SOS dispatch</p>
              </div>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

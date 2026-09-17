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

export const ProfilePage = () => {
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
      setTimeout(() => setSavedSuccess(false), 4000);
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
    <div className="max-w-2xl mx-auto space-y-6 pb-16">
      
      {/* Top Header */}
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

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Profile and emergency medical notes updated successfully.</span>
        </div>
      )}

      {/* Profile Form */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
        
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

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 flex items-center justify-center gap-1.5 transition"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
          </button>
        </form>

      </div>

    </div>
  );
};

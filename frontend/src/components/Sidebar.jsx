import React from 'react';
import {
  LayoutDashboard,
  ShieldAlert,
  Bot,
  BarChart3,
  Users,
  FileWarning,
  BookOpen,
  MapPin,
  FileText,
  ShieldCheck,
  Home,
  UserCheck,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSOS } from '../context/SOSContext';

export const Sidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  const { user, isAdmin, loginAsDemoUser, loginAsDemoAdmin } = useAuth();
  const { isActive: isSOSActive } = useSOS();

  const navItems = [
    { id: 'landing', label: 'Home / Overview', icon: Home },
    { id: 'dashboard', label: 'Safety Dashboard', icon: LayoutDashboard, badge: 'Live' },
    { id: 'sos', label: 'Emergency SOS', icon: ShieldAlert, highlight: isSOSActive, alertCount: isSOSActive ? '!' : null },
    { id: 'ai-assistant', label: 'AI Safety Assistant', icon: Bot, isNew: true },
    { id: 'analytics', label: 'Crime Analytics', icon: BarChart3 },
    { id: 'contacts', label: 'Emergency Contacts', icon: Users },
    { id: 'incidents', label: 'Incident Reporting', icon: FileWarning },
    { id: 'resources', label: 'Nearby Resources & Map', icon: MapPin },
    { id: 'tips', label: 'Safety Guidelines', icon: BookOpen },
    { id: 'reports', label: 'Audit & Reports', icon: FileText },
  ];

  if (isAdmin) {
    navItems.push({ id: 'admin', label: 'Admin Moderation', icon: ShieldCheck, adminOnly: true });
  }

  const handleSelect = (id) => {
    setActiveTab(id);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-16 bottom-0 left-0 z-30 w-64 bg-[#090d16]/95 border-r border-slate-800/80 transform transition-transform duration-200 ease-in-out lg:translate-x-0 overflow-y-auto flex flex-col justify-between p-3 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Navigation Items */}
        <div className="space-y-1">
          <p className="px-3 py-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Safety Navigation
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 group ${
                  isSelected
                    ? 'bg-gradient-to-r from-rose-500/20 to-pink-500/10 text-rose-300 border border-rose-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                } ${item.highlight ? 'ring-2 ring-rose-500/50 bg-rose-950/30' : ''}`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${
                      isSelected ? 'text-rose-400' : 'text-slate-400'
                    } ${item.highlight ? 'animate-bounce text-rose-500' : ''}`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {item.badge}
                  </span>
                )}

                {item.isNew && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" /> AI
                  </span>
                )}

                {item.alertCount && (
                  <span className="w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] flex items-center justify-center font-bold animate-pulse">
                    {item.alertCount}
                  </span>
                )}

                {item.adminOnly && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Admin
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Demo Role Switcher & System Status Card */}
        <div className="pt-4 mt-4 border-t border-slate-800/80 space-y-3">
          <div className="bg-slate-900/60 rounded-xl p-2.5 border border-slate-800 text-[11px]">
            <p className="font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-rose-400" />
              Demo Role Switcher
            </p>
            <p className="text-slate-400 text-[10px] mb-2 leading-relaxed">
              Instantly toggle between User & Admin views to evaluate all features:
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={loginAsDemoUser}
                className={`py-1 px-2 rounded-lg text-[10px] font-bold transition border ${
                  user?.role === 'user'
                    ? 'bg-rose-600/30 text-rose-200 border-rose-500/40'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                User (Sarah)
              </button>
              <button
                onClick={loginAsDemoAdmin}
                className={`py-1 px-2 rounded-lg text-[10px] font-bold transition border ${
                  isAdmin
                    ? 'bg-purple-600/30 text-purple-200 border-purple-500/40'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                Admin (Ops)
              </button>
            </div>
          </div>

          <div className="px-2 text-[10px] text-slate-500 flex items-center justify-between">
            <span>Server: <strong className="text-emerald-400">Online</strong></span>
            <span>v2.4.0 • 2026</span>
          </div>
        </div>
      </aside>
    </>
  );
};

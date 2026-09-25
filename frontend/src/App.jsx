import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { LocationProvider } from './context/LocationContext';
import { SOSProvider } from './context/SOSContext';

import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { SOSModal } from './components/SOSModal';
import { SOSActiveBanner } from './components/SOSActiveBanner';
import { AuthModal } from './components/AuthModal';

import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { SOSPage } from './pages/SOSPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ContactsPage } from './pages/ContactsPage';
import { IncidentReportPage } from './pages/IncidentReportPage';
import { NearbyResourcesPage } from './pages/NearbyResourcesPage';
import { SafetyTipsPage } from './pages/SafetyTipsPage';
import { ReportsPage } from './pages/ReportsPage';
import { AdminPage } from './pages/AdminPage';
import { ProfilePage } from './pages/ProfilePage';

import {
  LayoutDashboard,
  ShieldAlert,
  Bot,
  BarChart3,
  MapPin,
  Home
} from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState('landing');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage setActiveTab={setActiveTab} />;
      case 'dashboard':
        return <DashboardPage setActiveTab={setActiveTab} />;
      case 'sos':
        return <SOSPage setActiveTab={setActiveTab} />;
      case 'ai-assistant':
        return <AIAssistantPage setActiveTab={setActiveTab} />;
      case 'analytics':
        return <AnalyticsPage setActiveTab={setActiveTab} />;
      case 'contacts':
        return <ContactsPage setActiveTab={setActiveTab} />;
      case 'incidents':
        return <IncidentReportPage setActiveTab={setActiveTab} />;
      case 'resources':
        return <NearbyResourcesPage setActiveTab={setActiveTab} />;
      case 'tips':
        return <SafetyTipsPage setActiveTab={setActiveTab} />;
      case 'reports':
        return <ReportsPage setActiveTab={setActiveTab} />;
      case 'admin':
        return <AdminPage setActiveTab={setActiveTab} />;
      case 'profile':
        return <ProfilePage setActiveTab={setActiveTab} />;
      default:
        return <LandingPage setActiveTab={setActiveTab} />;
    }
  };

  const mobileNavItems = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'sos', label: 'SOS', icon: ShieldAlert, highlight: true },
    { id: 'ai-assistant', label: 'Aegis AI', icon: Bot },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'resources', label: 'Map', icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-['Inter',sans-serif]">
      {/* Active SOS Strobe / Alert Ribbon */}
      <SOSActiveBanner />

      {/* Main Top Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex w-full">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content Area */}
        <main className="flex-1 lg:pl-64 w-full px-4 sm:px-6 lg:px-8 pt-6 pb-20 lg:pb-8 max-w-7xl mx-auto overflow-x-hidden">
          {renderPage()}
        </main>
      </div>

      {/* Mobile Bottom Quick-Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#090d16]/95 border-t border-slate-800 backdrop-blur-md px-2 py-1.5 flex items-center justify-around">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isSelected = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center p-1 rounded-xl transition ${
                isSelected ? 'text-rose-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              } ${item.highlight ? 'relative -top-2' : ''}`}
            >
              <div
                className={`p-1.5 rounded-full ${
                  item.highlight
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/50 p-2.5 animate-pulse'
                    : isSelected
                    ? 'bg-rose-500/20'
                    : ''
                }`}
              >
                <Icon className={`${item.highlight ? 'w-5 h-5' : 'w-4 h-4'}`} />
              </div>
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Global Modals */}
      <SOSModal />
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <SOSProvider>
          <AppContent />
        </SOSProvider>
      </LocationProvider>
    </AuthProvider>
  );
}

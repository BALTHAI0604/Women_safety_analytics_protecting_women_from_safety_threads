import React from 'react';
import {
  Shield,
  ShieldAlert,
  Bot,
  BarChart3,
  MapPin,
  Users,
  FileWarning,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Lock,
  Zap,
  HeartHandshake,
  Activity,
  Compass
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSOS } from '../context/SOSContext';

export const LandingPage = ({ setActiveTab }) => {
  const { isAuthenticated, openAuth } = useAuth();
  const { initiateSOS } = useSOS();

  const features = [
    {
      icon: ShieldAlert,
      title: 'Instant Emergency SOS',
      desc: 'One-tap emergency broadcast transmitting high-precision live GPS coordinates to guardians and regional response units with SMS/WhatsApp dispatch.',
      tab: 'sos',
      color: 'from-red-500 to-rose-600'
    },
    {
      icon: Bot,
      title: 'Aegis AI Safety Assistant',
      desc: '24/7 intelligent conversational advisor trained on personal safety protocols, de-escalation, transit safety, harassment laws, and panic management.',
      tab: 'ai-assistant',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      icon: BarChart3,
      title: 'Crime Analytics & Hotspots',
      desc: 'Predictive crime analytics, danger heatmaps, time-of-day incident patterns, and automated safety index scoring for your city and route.',
      tab: 'analytics',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Users,
      title: 'Guardian Emergency Network',
      desc: 'Organize trusted family, friends, and local emergency contacts with real-time test pinging and prioritized automated dispatch.',
      tab: 'contacts',
      color: 'from-amber-500 to-orange-600'
    },
    {
      icon: FileWarning,
      title: 'Incident Reporting & Evidence',
      desc: 'Submit detailed or anonymous incident reports with photo evidence, automatic GPS tagging, and community safety status tracking.',
      tab: 'incidents',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: MapPin,
      title: 'Nearby Safety Radar & Map',
      desc: 'Interactive map displaying verified 24/7 Police Stations, Women Helpdesks, Pink Booths, Hospitals, and one-tap emergency calling.',
      tab: 'resources',
      color: 'from-emerald-500 to-teal-600'
    }
  ];

  const statistics = [
    { value: '< 2.5s', label: 'Average SOS Dispatch Speed', sub: 'Instant Guardian Notification' },
    { value: '100%', label: 'GPS Precision Tracking', sub: 'Real-time Reverse Geocoding' },
    { value: '24 / 7', label: 'AI Safety Guidance', sub: 'Always-On Personal Defense Advisor' },
    { value: '0-100', label: 'Dynamic Safety Index', sub: 'Predictive Risk Analytics' }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 overflow-hidden">
        {/* Glow backdrop circles */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-rose-600/20 via-purple-600/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="max-w-5xl mx-auto text-center px-4 space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-rose-500/30 text-rose-300 text-xs font-semibold shadow-lg shadow-rose-500/10 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Next-Generation AI-Powered Women Safety Infrastructure</span>
          </div>

          {/* Main Title & Subtitle */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-['Outfit'] tracking-tight text-white leading-[1.1]">
            Women Safety <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-rose-600 bg-clip-text text-transparent">Analytics</span>
          </h1>
          <p className="text-xl sm:text-2xl font-semibold text-rose-200/90 font-['Outfit'] tracking-wide">
            Protecting Women from Safety Threats
          </p>
          <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base leading-relaxed">
            Empowering women through real-time emergency SOS broadcast, conversational Gemini AI safety coaching, predictive crime data analytics, and verified community emergency resources.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            
            {/* Big Emergency SOS Button */}
            <button
              onClick={initiateSOS}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-rose-500 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-sm sm:text-base shadow-2xl shadow-rose-600/50 hover:shadow-rose-600/70 flex items-center gap-2.5 transition transform hover:-translate-y-0.5 active:scale-95 group font-['Outfit'] uppercase tracking-wider"
            >
              <ShieldAlert className="w-5 h-5 animate-pulse" />
              <span>Emergency SOS</span>
            </button>

            {/* Get Started / Open Dashboard */}
            <button
              onClick={() => {
                if (isAuthenticated) {
                  setActiveTab('dashboard');
                } else {
                  openAuth('register');
                }
              }}
              className="px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-sm sm:text-base border border-slate-700 hover:border-slate-600 shadow-xl flex items-center gap-2 transition transform hover:-translate-y-0.5"
            >
              <span>{isAuthenticated ? 'Open Safety Dashboard' : 'Get Started Free'}</span>
              <ArrowRight className="w-4 h-4 text-rose-400" />
            </button>

            {/* AI Assistant Quick Pill */}
            <button
              onClick={() => setActiveTab('ai-assistant')}
              className="px-5 py-3.5 rounded-2xl bg-purple-950/40 hover:bg-purple-900/50 text-purple-200 font-bold text-sm border border-purple-500/30 flex items-center gap-2 transition"
            >
              <Bot className="w-4 h-4 text-purple-400" />
              <span>Ask AI Assistant</span>
            </button>

          </div>

          {/* Fast Dial Helplines Ribbon */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Quick Helplines:</span>
            <a href="tel:112" className="px-2.5 py-1 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 font-bold hover:bg-red-900/60 transition flex items-center gap-1">
              <PhoneCall className="w-3 h-3" /> 112 (National)
            </a>
            <a href="tel:1091" className="px-2.5 py-1 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 font-bold hover:bg-rose-900/60 transition flex items-center gap-1">
              <PhoneCall className="w-3 h-3" /> 1091 (Women Helpline)
            </a>
            <a href="tel:181" className="px-2.5 py-1 rounded-lg bg-pink-950/60 border border-pink-500/40 text-pink-300 font-bold hover:bg-pink-900/60 transition flex items-center gap-1">
              <PhoneCall className="w-3 h-3" /> 181 (Domestic Abuse)
            </a>
          </div>

        </div>
      </section>

      {/* LIVE METRICS COUNTER */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statistics.map((stat, i) => (
            <div key={i} className="glass-card rounded-2xl p-5 border border-slate-800/80 text-center space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-transparent bg-gradient-to-r from-rose-400 to-pink-300 bg-clip-text font-['Outfit']">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm font-bold text-slate-200">{stat.label}</p>
              <p className="text-[11px] text-slate-500">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section className="max-w-6xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-rose-400">Core Defense Suite</p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Outfit']">
            Comprehensive Protection for Every Situation
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            From late-night commutes to suspicious encounters and crisis response, everything you need is unified in one platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={i}
                onClick={() => setActiveTab(feat.tab)}
                className="glass-card rounded-2xl p-6 border border-slate-800/80 hover:border-rose-500/40 cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${feat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-['Outfit'] group-hover:text-rose-300 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-bold text-rose-400 group-hover:text-rose-300">
                  <span>Explore Feature</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3-STEP SAFETY WORKFLOW */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-10 border border-slate-800">
          <div className="text-center space-y-2 mb-8">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
              How Women Safety Analytics Protects You
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Engineered for zero-latency response during critical moments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 font-bold flex items-center justify-center font-['Outfit']">
                01
              </div>
              <h4 className="text-base font-bold text-white font-['Outfit']">1-Tap Emergency Trigger</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Hit the red SOS button anywhere in the app or home screen. Instantly grabs your exact GPS coordinates and triggers the alarm protocol.
              </p>
            </div>

            <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 font-bold flex items-center justify-center font-['Outfit']">
                02
              </div>
              <h4 className="text-base font-bold text-white font-['Outfit']">Guardian Multi-Dispatch</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automated SMS & WhatsApp alerts with live Google Maps link are sent simultaneously to your emergency contacts while nearest police stations are mapped.
              </p>
            </div>

            <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold flex items-center justify-center font-['Outfit']">
                03
              </div>
              <h4 className="text-base font-bold text-white font-['Outfit']">AI Defense & Resource Link</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Aegis AI provides calm step-by-step guidance on self-defense, escaping threats, safe shelter navigation, and legal support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-6xl mx-auto px-4 pt-10 border-t border-slate-800 text-xs text-slate-500 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-rose-500" />
            <span className="font-bold text-white font-['Outfit']">Women Safety Analytics</span>
            <span>• Protecting Women from Safety Threats</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={() => setActiveTab('sos')} className="hover:text-rose-400 transition">Emergency SOS</button>
            <button onClick={() => setActiveTab('analytics')} className="hover:text-rose-400 transition">Crime Data</button>
            <button onClick={() => setActiveTab('tips')} className="hover:text-rose-400 transition">Safety Tips</button>
            <button onClick={() => setActiveTab('resources')} className="hover:text-rose-400 transition">Resources</button>
          </div>
        </div>
        <p className="text-center text-[11px] text-slate-600">
          Women Safety Analytics © 2026. Designed for safety, security, and immediate emergency response.
        </p>
      </footer>

    </div>
  );
};

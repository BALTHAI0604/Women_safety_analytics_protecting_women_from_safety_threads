import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Car,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Eye,
  Zap,
  Bookmark,
  Search,
  Clock,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  X
} from 'lucide-react';
import { tipsApi } from '../utils/api';

const ICONS_MAP = {
  'Travel Safety': Car,
  'Online & Cyber Safety': ShieldCheck,
  'Workplace Safety': Briefcase,
  'College & Campus Safety': GraduationCap,
  'Public Places & Night Safety': Eye,
  'Physical Self-Defense': Zap
};

export const SafetyTipsPage = () => {
  const [tips, setTips] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    const saved = localStorage.getItem('ws_bookmarked_tips');
    return saved ? JSON.parse(saved) : [1, 6];
  });

  const categories = [
    'All',
    'Travel Safety',
    'Online & Cyber Safety',
    'Workplace Safety',
    'College & Campus Safety',
    'Public Places & Night Safety',
    'Physical Self-Defense'
  ];

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const res = await tipsApi.getAll(selectedCategory);
        if (res?.tips) setTips(res.tips);
      } catch (e) {
        console.warn('Tips fetch fallback:', e);
      }
    };
    fetchTips();
  }, [selectedCategory]);

  const toggleBookmark = (id, e) => {
    e.stopPropagation();
    setBookmarkedIds(prev => {
      const next = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
      localStorage.setItem('ws_bookmarked_tips', JSON.stringify(next));
      return next;
    });
  };

  const filteredTips = tips.filter(tip => {
    const matchesSearch = tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tip.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6 pb-16">
      
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-pink-500/10 text-pink-300 border border-pink-500/20">
            Defense Knowledge Base
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] mt-1">
          Safety Guidelines & Tactical Self-Defense
        </h1>
        <p className="text-xs text-slate-400">
          Curated protocols on transit safety, digital security, harassment defense, and high-impact physical evasion techniques.
        </p>
      </div>

      {/* Category Pills & Search */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap border ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-600/30'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guidelines (e.g. Uber, POSH, Stalking, Strike)..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
        </div>
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTips.map((tip) => {
          const Icon = ICONS_MAP[tip.category] || ShieldCheck;
          const isBookmarked = bookmarkedIds.includes(tip.id);

          return (
            <div
              key={tip.id}
              onClick={() => setActiveArticle(tip)}
              className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-rose-500/40 cursor-pointer flex flex-col justify-between group transition"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300">
                    {tip.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {tip.read_time || '4 min'}
                    </span>
                    <button
                      onClick={(e) => toggleBookmark(tip.id, e)}
                      className={`p-1 rounded-lg transition ${
                        isBookmarked ? 'text-rose-400' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600/30 to-pink-500/20 text-rose-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-['Outfit'] group-hover:text-rose-300 transition-colors">
                      {tip.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                      {tip.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-rose-400 group-hover:text-rose-300">
                <span>Read Step-by-Step Guide</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {activeArticle.category} • {activeArticle.read_time}
              </span>

              <h2 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
                {activeArticle.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 italic border-l-2 border-rose-500 pl-3">
                {activeArticle.description}
              </p>

              <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800 space-y-3 text-xs sm:text-sm leading-relaxed text-slate-200 whitespace-pre-line">
                {activeArticle.content}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="py-2.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition"
                >
                  Close Guide
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

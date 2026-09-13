import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  ShieldAlert,
  Volume2,
  VolumeX,
  Copy,
  Check,
  RotateCcw,
  Zap,
  PhoneCall,
  User,
  ExternalLink
} from 'lucide-react';
import { aiApi } from '../utils/api';
import { useSOS } from '../context/SOSContext';

export const AIAssistantPage = () => {
  const { initiateSOS } = useSOS();

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'model',
      text: "### 🛡️ Hello, I am Aegis – Your AI Safety Assistant.\n\nI am here 24/7 to provide actionable guidance for:\n- **Suspicious situations & threats** (being followed, unsafe routes, dark areas)\n- **Safe travel protocols** (ride-shares, public transit, late-night navigation)\n- **Legal safeguards** (harassment reporting, cyberstalking evidence collection)\n- **Physical self-defense & de-escalation tactics**\n- **Panic reduction & grounding breathing**\n\n*If you are in immediate, life-threatening danger right now, tap the red SOS button above or dial **112 / 1091** immediately.* How can I assist you right now?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const promptPills = [
    { label: '🚨 I feel like I am being followed', prompt: 'I think someone is following me right now on the street. What immediate tactical steps should I take?' },
    { label: '🚗 Late-night cab & Uber safety checklist', prompt: 'Give me a step-by-step checklist to ensure my safety before and during a late-night ride-share trip.' },
    { label: '⚡ High-impact self-defense target areas', prompt: 'What are the most effective physical self-defense strikes and target areas if someone grabs me?' },
    { label: '⚖️ How to document workplace harassment', prompt: 'What is the correct legal protocol to document and report workplace harassment under POSH/law?' },
    { label: '🫁 I am having a panic attack, help me calm down', prompt: 'I feel overwhelmed and scared. Guide me through grounding and calming breathing exercises.' }
  ];

  const handleSend = async (customPrompt) => {
    const textToSend = customPrompt || inputValue.trim();
    if (!textToSend || loading) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setInputValue('');
    setLoading(true);

    try {
      const historyPayload = messages.map(m => ({ sender: m.sender, text: m.text }));
      const response = await aiApi.chat(textToSend, historyPayload);

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'model',
        text: response.reply,
        model: response.model,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('AI chat error:', err);
      const fallbackMsg = {
        id: Date.now() + 1,
        sender: 'model',
        text: "### 🚨 Safety Intelligence Protocol\n\n1. **Move to safety:** Walk directly toward the nearest open, well-lit store or public station.\n2. **Alert your circle:** Call a trusted contact on speaker or press the **Emergency SOS button**.\n3. **Call authorities:** Dial **112** (All Emergencies) or **1091** (Women Helpline).",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const cleanText = text.replace(/[#*`_]/g, '');
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = 1.0;
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }
    }
  };

  const clearChat = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setMessages([
      {
        id: 1,
        sender: 'model',
        text: "### 🛡️ Aegis Safety Chat Reset\nHow can I help protect or assist you right now?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-8rem)] pb-4 space-y-3">
      
      {/* AI Header Bar */}
      <div className="glass-panel p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-600/30">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white font-['Outfit']">Aegis AI Safety Assistant</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Gemini 1.5 Safety Engine
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Trained on threat evaluation, crisis de-escalation & self-defense</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={clearChat}
            title="Reset conversation"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={initiateSOS}
            className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-lg shadow-red-600/30"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>SOS Override</span>
          </button>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 glass-panel rounded-2xl p-4 border border-slate-800 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'model' && (
              <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 flex-shrink-0 mt-1">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-2 relative group ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-br-none shadow-lg'
                  : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-bl-none'
              }`}
            >
              {/* Message Content formatted */}
              <div className="whitespace-pre-wrap space-y-1">
                {msg.text.split('\n').map((line, idx) => {
                  if (line.startsWith('### ')) {
                    return <h3 key={idx} className="font-bold text-base text-rose-300 font-['Outfit'] mt-1">{line.replace('### ', '')}</h3>;
                  }
                  if (line.startsWith('- ') || line.match(/^\d+\./)) {
                    return <p key={idx} className="pl-2 font-medium text-slate-200">{line}</p>;
                  }
                  return <p key={idx}>{line}</p>;
                })}
              </div>

              {/* Message Bottom Toolbar */}
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800/60 mt-2">
                <span>{msg.timestamp}</span>
                {msg.sender === 'model' && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSpeak(msg.text)}
                      title="Read aloud"
                      className="hover:text-purple-300 transition flex items-center gap-1"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
                    </button>
                    <button
                      onClick={() => handleCopy(msg.text, msg.id)}
                      title="Copy response"
                      className="hover:text-purple-300 transition flex items-center gap-1"
                    >
                      {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-rose-600/30 border border-rose-500/40 flex items-center justify-center text-rose-200 flex-shrink-0 mt-1">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 justify-start items-center">
            <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-slate-900 p-3 rounded-2xl rounded-bl-none border border-slate-800 text-xs text-purple-300 flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span>Aegis is formulating safety guidance...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Quick Prompt Pills Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none flex-shrink-0">
        {promptPills.map((pill, i) => (
          <button
            key={i}
            onClick={() => handleSend(pill.prompt)}
            disabled={loading}
            className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 hover:border-purple-500/40 transition whitespace-nowrap"
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="glass-panel p-2 rounded-2xl border border-slate-800 flex items-center gap-2 flex-shrink-0"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask anything about personal safety, suspicious threats, travel or defense..."
          className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || loading}
          className="p-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white shadow-lg transition disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};

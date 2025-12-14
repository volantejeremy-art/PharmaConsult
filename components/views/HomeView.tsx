
import React, { useState, useRef } from 'react';
import { useStore } from '../../store/useStore';
import { Icons } from '../ui/Icon';

export const HomeView: React.FC = () => {
  const { setView, setSearchQuery } = useStore();
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchQuery(query);
      setView('RESULTS');
    }
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Votre navigateur ne supporte pas la reconnaissance vocale.");
      return;
    }

    // Stop if already listening
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    
    recognition.lang = 'fr-FR';
    recognition.continuous = false; // Capture one distinct phrase and stop
    recognition.interimResults = false; // Wait for final result
    recognition.maxAlternatives = 1;

    setIsListening(true);

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (transcript && transcript.trim().length > 0) {
        setQuery(transcript); // Visual feedback
        
        // Auto-launch search with delay to allow user to see text (Increased to 2500ms)
        setTimeout(() => {
           setSearchQuery(transcript);
           setView('RESULTS');
        }, 2500);
      }
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech error", event);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
        recognition.start();
    } catch(e) {
        console.error("Start error", e);
        setIsListening(false);
    }
  };

  return (
    <div className="h-screen w-full bg-surface flex flex-col overflow-hidden font-sans selection:bg-primary/20">
      <style>{`
        @keyframes gamma-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer-fast {
          0% { transform: translateX(-150%) skewX(-12deg); }
          100% { transform: translateX(150%) skewX(-12deg); }
        }
        @keyframes text-shine {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
        }
        .gamma-ray {
            background: conic-gradient(from 0deg, transparent 0deg, rgba(139, 92, 246, 0.8) 20deg, transparent 40deg, transparent 120deg, rgba(139, 92, 246, 0.8) 140deg, transparent 160deg, transparent 240deg, rgba(139, 92, 246, 0.8) 260deg, transparent 280deg);
            filter: blur(4px);
        }
        .gamma-ray-secondary {
            background: conic-gradient(from 45deg, transparent 0deg, rgba(45, 212, 191, 0.8) 20deg, transparent 40deg, transparent 120deg, rgba(244, 114, 182, 0.8) 140deg, transparent 160deg, transparent 240deg, rgba(45, 212, 191, 0.8) 260deg, transparent 280deg);
            filter: blur(4px);
            mix-blend-mode: screen;
        }
      `}</style>

      {/* 1. Header Brand - Restored Prominence */}
      <div className="shrink-0 pt-8 pb-4 flex flex-col items-center justify-center gap-2">
         <div className="flex items-center gap-6">
            {/* Logo with Gamma Ray Aura */}
            <div className="relative w-24 h-24 flex items-center justify-center">
                {/* Aura 1: Gamma Rays Primary */}
                <div className="absolute inset-[-20px] rounded-full gamma-ray animate-[gamma-spin_4s_linear_infinite]"></div>
                {/* Aura 2: Gamma Rays Secondary (Counter-spin) */}
                <div className="absolute inset-[-20px] rounded-full gamma-ray-secondary animate-[gamma-spin_5s_linear_infinite_reverse]"></div>
                
                {/* Core Glow */}
                <div className="absolute inset-0 bg-white/50 blur-xl rounded-full animate-pulse"></div>

                {/* Main Icon Box */}
                <div className="relative w-16 h-16 bg-white rounded-2xl border border-white/80 shadow-[0_0_15px_rgba(255,255,255,0.8)] flex items-center justify-center overflow-hidden z-10 backdrop-blur-md">
                    <div className="absolute inset-1 border-[2px] border-secondary/20 rounded-xl"></div>
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-md shadow-inner flex items-center justify-center z-10">
                        <div className="w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)]"></div>
                    </div>
                </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-black text-slate-800 tracking-tighter drop-shadow-sm">
                Pharma<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-300 to-violet-600 bg-[length:200%_auto] animate-[text-shine_3s_linear_infinite] inline-block">Consult</span>
            </h1>
         </div>
      </div>

      {/* 2. Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 w-full max-w-5xl mx-auto gap-8 min-h-0 z-10">
          
          <div className="text-center space-y-3 shrink-0 w-full">
              <h2 className="text-3xl md:text-5xl font-display font-black leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-pink-500 to-teal-500 pb-2">
                  Chercher. Comprendre. Choisir.
              </h2>
              <p className="text-base md:text-xl text-slate-500 font-medium leading-relaxed w-full mx-auto hidden md:block whitespace-nowrap">
                  Trouvez en un clic toutes les informations essentielles autour de votre produit.
              </p>
          </div>

          {/* CONTEXTUAL INPUT BOX */}
          <div className="w-full max-w-xl relative group z-10">
              
              {/* Gradient Border Wrap */}
              <div className="transform transition-all duration-300">
                  <div className="p-0.5 rounded-[2rem] bg-gradient-to-br from-primary via-purple-400 to-secondary shadow-2xl shadow-primary/20">
                      <div className="bg-white rounded-[1.9rem] p-5 md:p-6 relative overflow-hidden">
                          
                          {/* Form */}
                          <form onSubmit={handleSearch} className="relative z-10 flex flex-col gap-4">
                              
                              {/* Header Instructions */}
                              <div className="flex flex-col md:flex-row items-center justify-between gap-3 border-b border-slate-50 pb-3">
                                  <div className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-wider text-xs">
                                      <Icons.Search size={14} />
                                      <span>Saisir votre produit</span>
                                  </div>
                                  {/* IMPACTFUL BADGES */}
                                  <div className="flex flex-wrap gap-2 justify-center">
                                      <span className="px-3 py-1 bg-purple-100 text-purple-700 text-[10px] font-black uppercase tracking-widest rounded-lg border border-purple-200/50 shadow-sm">
                                          Marque
                                      </span>
                                      <span className="px-3 py-1 bg-pink-100 text-pink-700 text-[10px] font-black uppercase tracking-widest rounded-lg border border-pink-200/50 shadow-sm">
                                          Nom
                                      </span>
                                      <span className="px-3 py-1 bg-teal-100 text-teal-700 text-[10px] font-black uppercase tracking-widest rounded-lg border border-teal-200/50 shadow-sm">
                                          Format
                                      </span>
                                  </div>
                              </div>

                              {/* Input Area - Reduced Height */}
                              <div className="relative">
                                  <textarea 
                                    id="search-product"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Ex: Efferalgan 1000mg comprimés..."
                                    className="w-full text-xl md:text-2xl font-display font-bold text-slate-800 placeholder:text-slate-300 bg-transparent border-none outline-none resize-none h-20 leading-snug p-0 mt-1"
                                  />
                                  
                                  {/* Floating Actions inside the card bottom right */}
                                  <div className="absolute bottom-0 right-0 flex items-center gap-3">
                                      {/* Mic Button */}
                                      <button 
                                        type="button"
                                        onClick={handleVoiceSearch}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                                          isListening 
                                            ? 'bg-red-500 text-white animate-pulse ring-4 ring-red-200' 
                                            : 'bg-slate-50 text-slate-400 hover:bg-primary hover:text-white border border-slate-100'
                                        }`}
                                        title="Dicter"
                                      >
                                         <Icons.Mic size={18} />
                                      </button>
                                  </div>
                              </div>

                              {/* Main Action Button - SPECTACULAR EFFECT */}
                              <button 
                                type="submit"
                                disabled={!query.trim()}
                                className="w-full group relative overflow-hidden rounded-xl transition-all duration-500 shadow-[0_4px_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_35px_rgba(139,92,246,0.6)] hover:scale-[1.02] active:scale-[0.98]"
                              >
                                {/* Animated Gradient Background */}
                                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-600 bg-[length:200%_auto] transition-all duration-700 group-hover:bg-right"></div>
                                
                                {/* Light Sweep */}
                                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer-fast_0.8s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent z-10 skew-x-[-20deg]"></div>
                                
                                <div className="relative z-20 flex items-center justify-center gap-3 py-4">
                                    <Icons.Sparkles size={24} className={`text-white transition-transform duration-500 ${query.trim() ? "animate-spin" : "group-hover:rotate-180"}`} />
                                    <span className="text-white text-xl font-black tracking-wide uppercase drop-shadow-md">Lancer l'analyse</span>
                                </div>
                              </button>
                          </form>
                      </div>
                  </div>
              </div>
              
              {/* Help text below - Outside transform container */}
              <p className="text-center text-slate-400 text-[11px] mt-5 font-medium max-w-lg mx-auto leading-relaxed opacity-80">
                  <span className="font-bold text-primary">Astuce :</span> Indiquez "Nuxe Huile Prodigieuse 100ml" plutôt que "Huile Nuxe".
              </p>
          </div>

      </div>

      {/* 3. Features Footer - Compact Horizontal Bar */}
      <div className="shrink-0 w-full bg-slate-50 border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-6 py-6 md:py-8">
              {/* Header inside footer */}
              <div className="flex items-center justify-center gap-4 mb-6 opacity-80">
                  <div className="h-px w-10 bg-slate-300"></div>
                  <p className="text-center text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                      PharmaConsult concrètement c'est :
                  </p>
                  <div className="h-px w-10 bg-slate-300"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Card 1: Analyse - Violet Pastel */}
                  <div className="bg-violet-50/80 p-5 rounded-2xl border border-violet-100 flex flex-col items-start gap-3 hover:shadow-lg hover:shadow-violet-100/50 hover:-translate-y-1 transition-all duration-300 group cursor-default">
                      <div className="flex items-center gap-3 w-full">
                          <div className="w-10 h-10 bg-white text-violet-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm group-hover:rotate-6 transition-transform duration-300">
                              <Icons.BrainCircuit size={20} strokeWidth={2.5} />
                          </div>
                          <h3 className="text-base font-bold text-violet-900 leading-tight">Décryptage Complet</h3>
                      </div>
                      <p className="text-[11px] md:text-xs text-violet-800/70 font-medium leading-relaxed pl-1">
                          Effets réels, contre-indications et conseils d'utilisation.
                      </p>
                  </div>

                  {/* Card 2: Comparatif - Teal Pastel */}
                  <div className="bg-teal-50/80 p-5 rounded-2xl border border-teal-100 flex flex-col items-start gap-3 hover:shadow-lg hover:shadow-teal-100/50 hover:-translate-y-1 transition-all duration-300 group cursor-default">
                      <div className="flex items-center gap-3 w-full">
                          <div className="w-10 h-10 bg-white text-teal-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm group-hover:rotate-6 transition-transform duration-300">
                              <Icons.RefreshCcw size={20} strokeWidth={2.5} />
                          </div>
                          <h3 className="text-base font-bold text-teal-900 leading-tight">Comparatif Intelligent</h3>
                      </div>
                      <p className="text-[11px] md:text-xs text-teal-800/70 font-medium leading-relaxed pl-1">
                          Alternatives pertinentes et synthèse d'aide au choix.
                      </p>
                  </div>

                   {/* Card 3: Conseils - Rose Pastel */}
                   <div className="bg-rose-50/80 p-5 rounded-2xl border border-rose-100 flex flex-col items-start gap-3 hover:shadow-lg hover:shadow-rose-100/50 hover:-translate-y-1 transition-all duration-300 group cursor-default">
                      <div className="flex items-center gap-3 w-full">
                          <div className="w-10 h-10 bg-white text-rose-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm group-hover:rotate-6 transition-transform duration-300">
                              <Icons.Sparkles size={20} strokeWidth={2.5} />
                          </div>
                          <h3 className="text-base font-bold text-rose-900 leading-tight">Conseil Sur-mesure</h3>
                      </div>
                      <p className="text-[11px] md:text-xs text-rose-800/70 font-medium leading-relaxed pl-1">
                          Synergies, avis vérifiés et FAQ interactive.
                      </p>
                  </div>
              </div>
          </div>
      </div>

    </div>
  );
};

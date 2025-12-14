import React, { useState, useRef, useEffect } from 'react';
import { ProductData, ChatMessage } from '../../types';
import { Icons } from '../ui/Icon';
import { askProductAssistant } from '../../services/geminiService';

interface FAQProps {
  data: ProductData;
}

export const FAQView: React.FC<FAQProps> = ({ data }) => {
  // Initial state null to have all questions closed by default
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Chat State
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const cleanText = (text: string) => {
    if (!text) return "";
    return text.replace(/\[cite:.*?\]/g, '').replace(/\[source.*?\]/g, '').trim();
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: chatInput };
    setChatHistory(prev => [...prev, userMsg]);
    setChatInput('');
    setIsChatLoading(true);

    // Call service
    const responseText = await askProductAssistant(userMsg.text, data);
    
    const botMsg: ChatMessage = { role: 'model', text: responseText };
    setChatHistory(prev => [...prev, botMsg]);
    setIsChatLoading(false);
  };

  useEffect(() => {
      // Only scroll if there are messages, preventing scroll-to-bottom on initial load
      if (chatHistory.length > 0) {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
  }, [chatHistory]);

  // Render chat message with formatting (Paragraphs, Bold, Lists)
  const renderFormattedMessage = (text: string, isUser: boolean) => {
    if (isUser) return text; // User messages stay simple

    // Clean artifacts
    const cleaned = cleanText(text);

    return cleaned.split('\n').map((line, i) => {
        // Empty lines for spacing (Airy Text)
        if (!line.trim()) return <div key={i} className="h-3" />;

        // List items
        const isList = line.trim().startsWith('-') || line.trim().startsWith('*');
        const content = isList ? line.trim().substring(1).trim() : line;

        // Bold parsing
        const parts = content.split(/(\*\*.*?\*\*)/g);
        const formattedContent = parts.map((part, pIndex) => {
             if (part.startsWith('**') && part.endsWith('**')) {
                 return <strong key={pIndex} className="font-extrabold text-slate-900">{part.slice(2, -2)}</strong>;
             }
             return <span key={pIndex}>{part}</span>;
        });

        return (
            <div key={i} className={`mb-1 leading-relaxed ${isList ? 'pl-4 flex items-start' : ''}`}>
                {isList && <span className="mr-2 text-primary font-bold mt-1.5">•</span>}
                <span className={isList ? 'flex-1' : ''}>{formattedContent}</span>
            </div>
        );
    });
  };

  // Pastel colors for questions to make them more attractive
  const COLORS = [
    { bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-700', icon: 'bg-purple-100' },
    { bg: 'bg-teal-50', border: 'border-teal-100', text: 'text-teal-700', icon: 'bg-teal-100' },
    { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-700', icon: 'bg-blue-100' },
    { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-700', icon: 'bg-amber-100' },
    { bg: 'bg-rose-50', border: 'border-rose-100', text: 'text-rose-700', icon: 'bg-rose-100' },
    { bg: 'bg-indigo-50', border: 'border-indigo-100', text: 'text-indigo-700', icon: 'bg-indigo-100' },
    { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-700', icon: 'bg-emerald-100' },
    { bg: 'bg-pink-50', border: 'border-pink-100', text: 'text-pink-700', icon: 'bg-pink-100' },
  ];

  return (
    <div className="flex flex-col h-full bg-surface">
        <div className="flex-1 overflow-y-auto kiosk-scroll p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
                
                {/* --- FAQ HEADER --- */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-primary-light p-3 rounded-2xl shadow-sm">
                        <Icons.Info className="text-primary w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-display font-bold text-text-main">Questions Fréquentes</h2>
                </div>

                {/* --- FAQ ACCORDION --- */}
                <div className="space-y-4 mb-16">
                    {data.faq.map((item, index) => {
                        const style = COLORS[index % COLORS.length];
                        const isOpen = openIndex === index;

                        return (
                            <div 
                                key={index} 
                                className={`rounded-[1.5rem] overflow-hidden transition-all duration-300 border ${isOpen ? `${style.bg} ${style.border} shadow-md` : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'}`}
                            >
                                <button 
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="w-full p-6 flex items-start justify-between text-left gap-4"
                                >
                                    <div className="flex gap-4 items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${isOpen ? 'bg-white text-slate-800' : style.icon + ' ' + style.text}`}>
                                            0{index + 1}
                                        </div>
                                        <span className={`font-bold text-lg leading-tight ${isOpen ? 'text-slate-900' : 'text-slate-700'}`}>
                                            {cleanText(item.question)}
                                        </span>
                                    </div>
                                    <div className={`p-2 rounded-full transition-colors shrink-0 ${isOpen ? 'bg-white text-slate-900' : 'text-slate-400'}`}>
                                        {isOpen ? <Icons.ChevronUp size={20} /> : <Icons.ChevronDown size={20} />}
                                    </div>
                                </button>
                                
                                {/* Animated Height for Content */}
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="px-6 pb-6 pl-[4.5rem] text-slate-600 leading-relaxed text-base font-medium">
                                        {cleanText(item.reponse)}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                {/* --- CHATBOT UI --- */}
                <div className="relative mb-8">
                    {/* Decorative Background for Chat */}
                    <div className="absolute -inset-4 bg-gradient-to-b from-slate-100 to-white rounded-[3rem] opacity-50 pointer-events-none"></div>

                    {/* UPDATED: Pastel Background & Thin Border */}
                    <div className="relative z-10 bg-gradient-to-b from-purple-50 to-white rounded-[2.5rem] shadow-float border border-purple-200 overflow-hidden flex flex-col min-h-[500px] ring-4 ring-purple-50/50">
                        
                        {/* Header */}
                        <div className="px-8 py-6 border-b border-purple-100 bg-purple-50/30 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
                                <Icons.Sparkles className="text-white w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 leading-tight">Assistant ScanConsult</h3>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Expert {data.produit.marque}</p>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-slate-50/30">
                            {chatHistory.length === 0 && (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-300">
                                        <Icons.Bot size={32} />
                                    </div>
                                    <p className="text-slate-600 font-medium text-lg mb-2">Bonjour !</p>
                                    <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
                                        Je connais tout sur <strong>{data.produit.nom_complet}</strong>. Posez-moi vos questions spécifiques.
                                    </p>
                                </div>
                            )}
                            
                            {chatHistory.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-5 rounded-3xl text-sm leading-relaxed shadow-sm transition-all ${
                                        msg.role === 'user' 
                                        ? 'bg-primary text-white rounded-br-none shadow-primary/20' 
                                        : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none'
                                    }`}>
                                        {renderFormattedMessage(msg.text, msg.role === 'user')}
                                    </div>
                                </div>
                            ))}
                            
                            {isChatLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-slate-200 px-5 py-4 rounded-3xl rounded-bl-none shadow-sm flex gap-2 items-center">
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef}></div>
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-purple-100">
                            <form onSubmit={handleChatSubmit} className="relative flex items-center gap-2">
                                <input 
                                    type="text" 
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    placeholder="Ex: Est-ce compatible avec ma grossesse ?"
                                    className="w-full pl-6 pr-14 py-4 bg-slate-100/80 hover:bg-slate-100 focus:bg-white border-2 border-transparent focus:border-primary rounded-2xl outline-none transition-all text-slate-700 placeholder:text-slate-400 font-medium text-base shadow-inner"
                                />
                                <button 
                                    type="submit" 
                                    disabled={!chatInput.trim() || isChatLoading}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white w-10 h-10 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center justify-center"
                                >
                                    <Icons.ArrowRight size={20} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        
        {/* --- FIXED FOOTER DISCLAIMER --- */}
        <div className="shrink-0 p-4 bg-slate-50 border-t border-slate-200 text-center">
             <p className="text-slate-400 text-xs font-medium flex items-center justify-center gap-2">
                <Icons.AlertTriangle size={12} className="text-slate-400" />
                Informations générées par IA et vérifiées sur bases de données publiques. En cas de doute médical, consultez un professionnel.
            </p>
        </div>
    </div>
  );
};
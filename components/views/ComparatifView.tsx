import React from 'react';
import { ProductData } from '../../types';
import { Icons } from '../ui/Icon';

interface ComparatifProps {
  data: ProductData;
}

export const ComparatifView: React.FC<ComparatifProps> = ({ data }) => {
  const { comparatif } = data;
  const p1 = comparatif.concurrent_1;
  const main = comparatif.produit_scanne;
  const p2 = comparatif.concurrent_2;

  // Background colors for the three columns
  const COL_1_STYLE = "bg-orange-100"; 
  const COL_2_STYLE = "bg-violet-100"; 
  const COL_3_STYLE = "bg-sky-100";    
  
  // Style for the label column
  const COL_LABEL_STYLE = "bg-slate-50 font-bold text-slate-400 uppercase tracking-wider text-xs pl-6 flex items-center";

  // Helper to clean text from [cite] artifacts
  const cleanText = (text: string) => {
      if (!text) return "";
      return text.replace(/\[cite:.*?\]/g, '').replace(/\[source.*?\]/g, '').trim();
  };

  // Helper to split the synthesis text into sentences for better readability
  const synthesisSentences = comparatif.guide_achat_profils
    ? cleanText(comparatif.guide_achat_profils)
        .split(/(?<=[.!?])\s+/) // Split by punctuation followed by space
        .filter(s => s.trim().length > 0)
    : [];

  // Helper to render bold text from markdown-style **text**
  const renderFormattedText = (text: string) => {
    if (!text) return "";
    const cleaned = cleanText(text);
    const parts = cleaned.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return (
                <span key={index} className="font-extrabold text-[#1E293B] bg-white/50 px-1 rounded shadow-sm inline-block leading-none mx-0.5 border border-slate-200/50">
                    {part.slice(2, -2)}
                </span>
            );
        }
        return part;
    });
  };

  return (
    <div className="h-full p-6 md:p-10 pb-40 overflow-y-auto kiosk-scroll bg-surface">
        <div className="max-w-6xl mx-auto space-y-12">
            
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-display font-bold text-slate-800">Comparaison produits</h2>
            </div>

            {/* --- COMPARISON TABLE --- */}
            <div className="bg-white rounded-[2rem] shadow-soft border border-slate-100 overflow-hidden">
                <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] divide-x divide-slate-100">
                    
                    {/* Header Row */}
                    <div className="p-6 bg-slate-50/50 flex items-center font-bold text-slate-400 uppercase tracking-wider text-xs">
                        Caractéristiques
                    </div>
                    
                    <div className={`p-6 ${COL_1_STYLE} flex flex-col gap-1`}>
                        <span className="text-xs font-bold uppercase text-[#C2410C]">Alternative 1</span>
                        <div className="font-bold text-slate-800 leading-tight">{p1.marque} <br/> {p1.nom}</div>
                    </div>

                    <div className={`p-6 ${COL_2_STYLE} flex flex-col gap-1 relative`}>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#8B5CF6] text-white text-[10px] font-bold px-2 py-0.5 rounded-b-lg uppercase tracking-wide">
                            Votre Scan
                        </div>
                        <div className="font-bold text-[#6D28D9] leading-tight mt-2">{main.marque} <br/> {main.nom}</div>
                    </div>

                    <div className={`p-6 ${COL_3_STYLE} flex flex-col gap-1`}>
                        <span className="text-xs font-bold uppercase text-[#0369A1]">Alternative 2</span>
                        <div className="font-bold text-slate-800 leading-tight">{p2.marque} <br/> {p2.nom}</div>
                    </div>

                    {/* Row: Contenance */}
                    <div className={`${COL_LABEL_STYLE} p-5 border-t border-slate-100`}>Contenance</div>
                    <div className={`p-5 text-slate-800 font-medium border-t border-slate-100 text-center ${COL_1_STYLE}`}>{p1.contenance}</div>
                    <div className={`p-5 text-[#6D28D9] font-medium border-t border-slate-100 text-center ${COL_2_STYLE}`}>{main.contenance}</div>
                    <div className={`p-5 text-slate-800 font-medium border-t border-slate-100 text-center ${COL_3_STYLE}`}>{p2.contenance}</div>

                    {/* Row: Prix */}
                    <div className={`${COL_LABEL_STYLE} p-5 border-t border-slate-100`}>Prix moyen *</div>
                    <div className={`p-5 text-slate-800 font-medium border-t border-slate-100 text-center ${COL_1_STYLE}`}>{p1.prix}</div>
                    <div className={`p-5 text-[#6D28D9] font-medium border-t border-slate-100 text-center ${COL_2_STYLE}`}>{main.prix}</div>
                    <div className={`p-5 text-slate-800 font-medium border-t border-slate-100 text-center ${COL_3_STYLE}`}>{p2.prix}</div>

                    {/* Row: Texture/Finish */}
                    <div className={`${COL_LABEL_STYLE} p-5 border-t border-slate-100`}>Texture / Fini</div>
                    <div className={`p-5 text-slate-800 font-medium border-t border-slate-100 text-center text-sm ${COL_1_STYLE}`}>{p1.texture}</div>
                    <div className={`p-5 text-[#6D28D9] font-medium border-t border-slate-100 text-center text-sm ${COL_2_STYLE}`}>{main.texture}</div>
                    <div className={`p-5 text-slate-800 font-medium border-t border-slate-100 text-center text-sm ${COL_3_STYLE}`}>{p2.texture}</div>

                    {/* Row: Parfum */}
                    <div className={`${COL_LABEL_STYLE} p-5 border-t border-slate-100`}>Parfum</div>
                    <div className={`p-5 text-slate-800 font-medium border-t border-slate-100 text-center text-sm ${COL_1_STYLE}`}>{p1.parfum}</div>
                    <div className={`p-5 text-[#6D28D9] font-medium border-t border-slate-100 text-center text-sm ${COL_2_STYLE}`}>{main.parfum}</div>
                    <div className={`p-5 text-slate-800 font-medium border-t border-slate-100 text-center text-sm ${COL_3_STYLE}`}>{p2.parfum}</div>

                    {/* Row: Usage */}
                    <div className={`${COL_LABEL_STYLE} p-5 border-t border-slate-100`}>Usage recommandé</div>
                    <div className={`p-5 text-slate-800 font-medium border-t border-slate-100 text-center text-sm ${COL_1_STYLE}`}>{p1.usage_recommande}</div>
                    <div className={`p-5 text-[#6D28D9] font-medium border-t border-slate-100 text-center text-sm ${COL_2_STYLE}`}>{main.usage_recommande}</div>
                    <div className={`p-5 text-slate-800 font-medium border-t border-slate-100 text-center text-sm ${COL_3_STYLE}`}>{p2.usage_recommande}</div>
                </div>
                <div className="p-4 bg-slate-50 text-xs text-slate-400 text-center border-t border-slate-100">
                    * Prix moyens constatés, susceptibles de varier selon les revendeurs
                </div>
            </div>

            {/* --- DETAILS (Matched Colors) --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Competitor 1 Guide */}
                <div className={`${COL_1_STYLE} p-8 rounded-3xl border border-orange-200/50 hover:shadow-md transition-shadow`}>
                     <div className="flex flex-col gap-4 mb-4">
                         <div className="flex items-center gap-3">
                             <div className="w-2 h-8 bg-[#FB923C] rounded-full"></div>
                             <h4 className="font-bold text-lg text-slate-900">{p1.marque}</h4>
                         </div>
                     </div>
                     <p className="text-slate-800 leading-relaxed text-sm font-medium">
                         {renderFormattedText(p1.description_detaillee || `Alternative intéressante : ${p1.usage_recommande}.`)}
                     </p>
                </div>

                {/* Main Product Guide */}
                <div className={`${COL_2_STYLE} p-8 rounded-3xl border border-violet-200/50 shadow-md transform md:-translate-y-4`}>
                     <div className="flex flex-col gap-4 mb-4">
                         <div className="flex items-center gap-3">
                             <div className="w-2 h-8 bg-[#8B5CF6] rounded-full"></div>
                             <h4 className="font-bold text-lg text-slate-900">{main.marque} (Scan)</h4>
                         </div>
                     </div>
                     <p className="text-slate-700 leading-relaxed text-sm">
                         {renderFormattedText(main.description_detaillee || `La référence historique, parfaite pour ${main.usage_recommande}. ${main.resume}`)}
                     </p>
                </div>

                {/* Competitor 2 Guide */}
                <div className={`${COL_3_STYLE} p-8 rounded-3xl border border-sky-200/50 hover:shadow-md transition-shadow`}>
                     <div className="flex flex-col gap-4 mb-4">
                         <div className="flex items-center gap-3">
                             <div className="w-2 h-8 bg-[#0EA5E9] rounded-full"></div>
                             <h4 className="font-bold text-lg text-slate-900">{p2.marque}</h4>
                         </div>
                     </div>
                     <p className="text-slate-800 leading-relaxed text-sm font-medium">
                         {renderFormattedText(p2.description_detaillee || `Autre option recommandée : ${p2.usage_recommande}.`)}
                     </p>
                </div>
            </div>

            {/* --- GUIDE D'ACHAT (Unified Single Box) --- */}
            {synthesisSentences.length > 0 && (
                <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-4">
                         <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
                            <Icons.Sparkles size={24} />
                        </div>
                        <h3 className="text-3xl font-display font-bold text-slate-800">
                            Quel profil êtes-vous ?
                        </h3>
                    </div>
                    
                    {/* Unified Single Box for Profile Guide */}
                    <div className="bg-gradient-to-br from-indigo-50 to-white rounded-[2.5rem] p-8 md:p-10 border border-indigo-100 shadow-sm relative overflow-hidden">
                        {/* Decorative background icon */}
                        <div className="absolute -top-10 -right-10 text-indigo-100 opacity-50 pointer-events-none rotate-12">
                            <Icons.Bot size={200} />
                        </div>

                        <div className="space-y-6 relative z-10">
                            {synthesisSentences.map((sentence, index) => (
                                <div key={index} className="flex gap-5 items-start">
                                     <div className="mt-1 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 border border-indigo-200">
                                        <Icons.CheckCircle size={16} strokeWidth={3} />
                                     </div>
                                    <p className="text-xl leading-relaxed text-slate-700 font-medium">
                                        {renderFormattedText(sentence)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </div>
    </div>
  );
};
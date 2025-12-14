
import React from 'react';
import { ProductData } from '../../types';
import { Icons } from '../ui/Icon';

interface DashboardProps {
  data: ProductData;
}

export const DashboardView: React.FC<DashboardProps> = ({ data }) => {

  // Helper to clean text from [cite] artifacts
  const cleanText = (text: string) => {
      if (!text) return "";
      return text.replace(/\[cite:.*?\]/g, '').replace(/\[source.*?\]/g, '').trim();
  };

  // Helper to render bold text from markdown-style **text** inside descriptions
  const renderFormattedText = (text: string) => {
    if (!text) return "";
    const cleaned = cleanText(text);
    const parts = cleaned.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return (
                <span key={index} className="font-extrabold text-slate-900">
                    {part.slice(2, -2)}
                </span>
            );
        }
        return part;
    });
  };

  return (
    <div className="h-full overflow-y-auto kiosk-scroll p-6 md:p-8 pb-40 bg-slate-50">
        <div className="max-w-5xl mx-auto space-y-8">
            
            {/* 1. PRODUCT IDENTITY CARD (Full Width - No Image) */}
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-[2.5rem] shadow-soft border border-slate-100 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Icons.Scan size={120} />
                </div>
                
                <div className="relative z-10">
                    <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-full uppercase tracking-wider shadow-sm">
                            {data.produit.categorie}
                            </span>
                            {data.produit.labels.map((label, i) => (
                                <span key={i} className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
                                    {label}
                                </span>
                            ))}
                    </div>
                    
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-800 leading-tight mb-3">
                        {data.produit.nom_complet}
                    </h2>
                    <div className="text-slate-500 font-medium text-xl mb-8 flex items-center gap-3">
                        <span className="font-bold text-primary">{data.produit.marque}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                        <span>{data.produit.format}</span>
                    </div>

                    <div className="inline-flex items-center gap-6 bg-white px-10 py-5 rounded-3xl shadow-sm border border-slate-100">
                            <div>
                                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Prix officiel constaté</span>
                                <div className="text-3xl font-bold text-slate-800 tracking-tight leading-none">
                                {data.produit.prix_conseille}
                                </div>
                            </div>
                    </div>
                </div>
            </div>

            {/* 2. GRID: KEY SPECS & SUMMARY */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* A. CARACTÉRISTIQUES (Pink Theme) */}
                <div className="lg:col-span-1 bg-[#FFF1F2]/60 rounded-[2.5rem] border border-[#FECDD3] overflow-hidden flex flex-col">
                    <div className="px-8 py-6 border-b border-[#FECDD3]/50 flex items-center gap-3 bg-[#FFF1F2]">
                        <Icons.Sparkles className="text-[#BE123C]" size={24} />
                        <h3 className="text-[#9F1239] font-bold text-lg uppercase tracking-wide">Points Clés</h3>
                    </div>
                    <div className="p-8 flex-1">
                        <ul className="space-y-4">
                            {data.produit.caracteristiques_cles?.map((carac, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <Icons.CheckCircle size={20} className="text-[#FB7185] shrink-0 mt-0.5" />
                                    <span className="text-slate-700 font-medium text-lg leading-snug">{cleanText(carac)}</span>
                                </li>
                            )) || (
                                data.produit.composition_cles.map((carac, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <Icons.CheckCircle size={20} className="text-[#FB7185] shrink-0 mt-0.5" />
                                        <span className="text-slate-700 font-medium text-lg leading-snug">{cleanText(carac)}</span>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>

                {/* B. EXPERT OPINION (Purple Theme) */}
                <div className="lg:col-span-2 bg-[#F3E8FF]/60 rounded-[2.5rem] border border-[#E9D5FF] overflow-hidden flex flex-col">
                    <div className="px-8 py-6 border-b border-[#E9D5FF]/50 flex items-center gap-3 bg-[#F3E8FF]">
                        <Icons.BrainCircuit className="text-[#7E22CE]" size={24} />
                        <h3 className="text-[#6B21A8] font-bold text-lg uppercase tracking-wide">L'avis de l'expert</h3>
                    </div>
                    <div className="p-8 flex-1 flex flex-col justify-center">
                         <div className="flex gap-4">
                            <Icons.Quote className="text-[#A855F7]/20 w-12 h-12 shrink-0 -mt-2" />
                            <p className="text-[#4C1D95] leading-relaxed font-medium text-xl">
                                {cleanText(data.produit.resume)}
                            </p>
                         </div>
                    </div>
                </div>
            </div>

            {/* 3. GRID: TARGET AUDIENCE (Recommended vs Not Recommended) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* RECOMMANDÉ (Green Theme) */}
                <div className="bg-[#ECFDF5]/60 rounded-[2.5rem] border border-[#A7F3D0] overflow-hidden">
                    <div className="bg-[#D1FAE5] px-8 py-5 border-b border-[#A7F3D0] flex items-center justify-between">
                        <h3 className="text-[#047857] font-bold text-lg uppercase tracking-wide flex items-center gap-2">
                             <Icons.ThumbsUp size={20}/> Public Conseillé
                        </h3>
                    </div>
                    <div className="p-8">
                         <ul className="space-y-5">
                            {data.cibles.public_ideal.slice(0, 3).map((item, i) => (
                                <li key={i} className="flex gap-4 items-start">
                                    <div className="w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center text-white shrink-0 mt-1 shadow-sm shadow-[#10B981]/30">
                                        <Icons.CheckCircle size={16} />
                                    </div>
                                    <div>
                                        <span className="font-bold block text-lg text-[#064E3B]">{cleanText(item.profil)}</span>
                                        <span className="block text-[#047857]/80 text-sm mt-0.5 font-medium">{cleanText(item.raison)}</span>
                                    </div>
                                </li>
                            ))}
                         </ul>
                    </div>
                </div>

                {/* DÉCONSEILLÉ (Orange Theme) */}
                <div className="bg-[#FFF7ED]/60 rounded-[2.5rem] border border-[#FED7AA] overflow-hidden">
                    <div className="bg-[#FFEDD5] px-8 py-5 border-b border-[#FED7AA] flex items-center justify-between">
                         <h3 className="text-[#C2410C] font-bold text-lg uppercase tracking-wide flex items-center gap-2">
                             <Icons.ThumbsDown size={20}/> Public Déconseillé
                        </h3>
                    </div>
                    <div className="p-8">
                        <ul className="space-y-5">
                            {data.cibles.public_deconseille.length > 0 ? (
                                data.cibles.public_deconseille.map((item, i) => (
                                    <li key={i} className="flex gap-4 items-start">
                                        <div className="w-8 h-8 rounded-full bg-[#F97316] flex items-center justify-center text-white shrink-0 mt-1 shadow-sm shadow-[#F97316]/30">
                                            <Icons.X size={16} />
                                        </div>
                                        <div>
                                            <span className="font-bold block text-lg text-[#7C2D12]">{cleanText(item.profil)}</span>
                                            <span className="block text-[#9A3412]/80 text-sm mt-0.5 font-medium">{cleanText(item.raison)}</span>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="flex flex-col items-center justify-center h-32 text-center">
                                    <span className="text-[#9A3412]/60 font-medium text-lg">Aucun public spécifiquement déconseillé pour ce produit.</span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            {/* 4. MODE D'EMPLOI (Blue Theme) */}
            <div className="bg-[#F0F9FF]/70 rounded-[2.5rem] border border-[#BAE6FD] overflow-hidden">
                <div className="bg-[#E0F2FE] px-8 py-6 border-b border-[#BAE6FD] flex items-center gap-3">
                     <Icons.BookOpen className="text-[#0284C7]" size={24} />
                     <h3 className="text-[#0369A1] font-bold text-lg uppercase tracking-wide">Conseils d'utilisation</h3>
                </div>
                <div className="p-8">
                    {/* Main Text - Left Aligned */}
                    <div className="mb-12">
                        <div className="text-[#0C4A6E] text-lg leading-loose font-medium tracking-wide max-w-4xl text-left">
                             {cleanText(data.conseils_utilisation.mode_emploi)}
                        </div>
                    </div>

                    {/* Attributes Bar - LEFT ALIGNED TEXTS, TOP ALIGNED BOXES */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        
                        {/* Frequency */}
                        <div className="bg-white/60 rounded-2xl border border-white/50 flex flex-col h-full overflow-hidden group">
                            <div className="px-5 py-4 flex items-center justify-start gap-2 text-[#0EA5E9] bg-white/40 border-b border-white/50 h-14 shrink-0 w-full">
                                <Icons.RefreshCcw size={18} />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Fréquence</span>
                            </div>
                            <div className="flex-1 p-5 flex items-start justify-start">
                                <div className="font-bold text-[#0284C7] leading-tight text-left text-sm md:text-base">
                                    {cleanText(data.conseils_utilisation.frequence)}
                                </div>
                            </div>
                        </div>

                        {/* Moment */}
                        <div className="bg-white/60 rounded-2xl border border-white/50 flex flex-col h-full overflow-hidden group">
                            <div className="px-5 py-4 flex items-center justify-start gap-2 text-[#0EA5E9] bg-white/40 border-b border-white/50 h-14 shrink-0 w-full">
                                <Icons.Sun size={18} /> 
                                <span className="text-[10px] font-bold uppercase tracking-wider">Moment</span>
                            </div>
                            <div className="flex-1 p-5 flex items-start justify-start">
                                <div className="font-bold text-[#0284C7] leading-tight text-left text-sm md:text-base">
                                    {cleanText(data.conseils_utilisation.moment_ideal)}
                                </div>
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="bg-white/60 rounded-2xl border border-white/50 flex flex-col h-full overflow-hidden group">
                            <div className="px-5 py-4 flex items-center justify-start gap-2 text-[#0EA5E9] bg-white/40 border-b border-white/50 h-14 shrink-0 w-full">
                                <Icons.Droplet size={18} />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Quantité</span>
                            </div>
                            <div className="flex-1 p-5 flex items-start justify-start">
                                <div className="font-bold text-[#0284C7] leading-tight text-left text-sm md:text-base">
                                    {cleanText(data.conseils_utilisation.quantite)}
                                </div>
                            </div>
                        </div>

                        {/* Pro Tip */}
                        <div className="bg-[#0EA5E9] rounded-2xl text-white shadow-lg shadow-sky-200 flex flex-col h-full overflow-hidden group">
                             <div className="px-5 py-4 flex items-center justify-start gap-2 text-white/80 bg-[#0284C7]/20 border-b border-white/10 h-14 shrink-0 w-full">
                                <Icons.Lightbulb size={18} />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Le + Expert</span>
                            </div>
                            <div className="flex-1 p-5 flex items-start justify-start">
                                <div className="font-bold text-sm leading-tight text-left text-white/95">
                                    {cleanText(data.conseils_utilisation.astuce_pro)}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* 5. ROUTINE SECTION (Pastel Yellow - Recommandation) */}
            <div className="bg-[#FEFCE8] rounded-[3rem] p-2 md:p-8 border-2 border-[#FEF08A]">
                <div className="text-center mb-10">
                    <span className="px-4 py-1.5 bg-[#FEF9C3] text-[#A16207] rounded-full text-xs font-bold uppercase tracking-widest mb-3 inline-block shadow-sm">
                        Recommandation
                    </span>
                    <h3 className="text-2xl font-display font-bold text-slate-800">Complétez votre routine</h3>
                    {data.synergie_routine.description_generale && (
                        <p className="text-slate-600 mt-4 max-w-3xl mx-auto italic font-medium">
                           {renderFormattedText(data.synergie_routine.description_generale)}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {data.synergie_routine.etapes.sort((a, b) => a.etape - b.etape).map((step, i) => (
                        <div key={i} className={`
                             relative overflow-hidden rounded-[2.5rem] p-8 flex flex-col md:flex-row gap-8
                             transition-all duration-300
                             ${step.is_current_product 
                                ? 'bg-white ring-4 ring-[#EAB308]/20 shadow-xl shadow-[#EAB308]/10 z-10 scale-[1.02]' 
                                : 'bg-white border border-[#FEF9C3]'}
                        `}>
                            {/* Step Indicator */}
                            <div className="flex flex-col items-center gap-2 shrink-0">
                                <div className={`
                                    w-16 h-16 rounded-2xl flex flex-col items-center justify-center
                                    ${step.is_current_product ? 'bg-[#EAB308] text-white shadow-lg shadow-[#EAB308]/30' : 'bg-[#FEF9C3] text-[#A16207]'}
                                `}>
                                    <span className="text-[9px] uppercase font-bold tracking-wider opacity-90 mb-0.5">Étape</span>
                                    <span className="text-2xl font-bold leading-none">{step.etape}</span>
                                </div>
                                {step.is_current_product && (
                                    <div className="bg-[#EAB308] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide shadow-sm flex items-center gap-1 mt-1">
                                        <Icons.Scan size={10} />
                                        Votre Produit
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 w-full flex flex-col gap-4">
                                {/* Header: Product Name */}
                                <div className="border-b border-slate-200/50 pb-3">
                                    <h4 className="font-bold text-xl text-slate-800 leading-tight">{step.nom}</h4>
                                    <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mt-1">{step.marque}</div>
                                </div>

                                {/* Details Grid: Context & Benefit */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    
                                    {/* Role/Narrative - Added Title for explanation */}
                                    <div className="bg-white/80 rounded-xl p-4 border border-[#FEF9C3] flex flex-col gap-2 relative">
                                        <div className="flex items-center gap-2 text-[#CA8A04] mb-1">
                                            <Icons.Bot size={16} />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">Conseil&nbsp;&nbsp;PharmaConsult</span>
                                        </div>
                                        <p className="text-slate-600 font-medium text-sm leading-relaxed italic">
                                            "{step.role_dans_routine 
                                                ? renderFormattedText(step.role_dans_routine)
                                                : "Indispensable pour optimiser l'efficacité globale du soin."}"
                                        </p>
                                    </div>

                                    {/* Benefit */}
                                    <div className="bg-[#FFFBEB] rounded-xl p-4 border border-[#FEF3C7]">
                                         <div className="flex items-center gap-2 mb-2">
                                            <Icons.Sparkles size={14} className="text-[#EAB308]" />
                                            <span className="text-[10px] uppercase font-bold text-[#B45309] tracking-wider">Effets attendus</span>
                                        </div>
                                        <p className="text-[#92400E] font-medium text-sm leading-relaxed">
                                            {renderFormattedText(step.benefice_produit)}
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 6. WARNINGS (Red Box) - Bottom of page */}
            {data.precautions && data.precautions.length > 0 && (
                <div className="bg-[#FEF2F2]/80 rounded-[2rem] border border-[#FECACA] overflow-hidden flex flex-col md:flex-row">
                    <div className="bg-[#FEE2E2] px-8 py-6 flex items-center justify-center md:w-24 shrink-0 border-r border-[#FECACA]">
                         <Icons.AlertOctagon className="text-[#EF4444] w-10 h-10" />
                    </div>
                    <div className="p-6 md:p-8">
                         <h4 className="font-bold text-[#991B1B] text-lg mb-3">Précautions de sécurité</h4>
                         <ul className="flex flex-col gap-3">
                            {data.precautions.map((item, i) => (
                                <li key={i} className="text-[#B91C1C] font-medium flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444] shrink-0"></div>
                                    {cleanText(item)}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

        </div>
    </div>
  );
};

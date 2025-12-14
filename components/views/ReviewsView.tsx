
import React from 'react';
import { ProductData } from '../../types';
import { Icons } from '../ui/Icon';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ReviewsProps {
  data: ProductData;
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white px-5 py-4 rounded-2xl shadow-xl border border-slate-100 z-50 min-w-[140px]">
          <p className="font-bold text-slate-800 mb-1 text-sm uppercase tracking-wider">{data.name}</p>
          <div className="flex items-baseline gap-2">
             <span className="text-2xl font-bold font-display" style={{ color: data.textColor || data.color }}>
                {data.count.toLocaleString()}
             </span>
             <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">votes</span>
          </div>
        </div>
      );
    }
    return null;
};

export const ReviewsView: React.FC<ReviewsProps> = ({ data }) => {
  const { avis_consommateurs } = data;
  
  const totalReviews = avis_consommateurs.nombre_avis;

  const chartData = [
    { 
        name: 'Positif', 
        value: avis_consommateurs.repartition.positifs_pct, 
        count: Math.round(totalReviews * (avis_consommateurs.repartition.positifs_pct / 100)),
        color: '#10B981',
        textColor: '#10B981'
    }, 
    { 
        name: 'Neutre', 
        value: avis_consommateurs.repartition.neutres_pct, 
        count: Math.round(totalReviews * (avis_consommateurs.repartition.neutres_pct / 100)),
        color: '#CBD5E1', // Slate-300 for better slice visibility
        textColor: '#64748B' // Slate-500 for text readability
    },   
    { 
        name: 'Négatif', 
        value: avis_consommateurs.repartition.negatifs_pct, 
        count: Math.round(totalReviews * (avis_consommateurs.repartition.negatifs_pct / 100)),
        color: '#EF4444',
        textColor: '#EF4444'
    }, 
  ];

  // Helper to determine label for citation based on author name
  const getCitationLabel = (author: string) => {
    const lower = author.toLowerCase();
    if (lower.includes('synthèse') || lower.includes('résumé') || lower.includes('analyse')) {
        return "Synthèse des retours";
    }
    return "Avis client vérifié";
  };

  return (
    <div className="h-full overflow-y-auto kiosk-scroll p-6 md:p-10 pb-40 bg-surface">
        <div className="max-w-6xl mx-auto space-y-10">

            {/* HEADER & SOURCES - Highlighting Verified Sources */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-md border-b-4 border-b-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
                
                <div className="flex items-center gap-6 z-10">
                    <div className="bg-primary/10 p-5 rounded-3xl backdrop-blur-sm border border-primary/10">
                        <Icons.Star className="w-10 h-10 text-primary fill-primary" />
                    </div>
                    <div>
                        <div className="flex items-baseline gap-2">
                             <h2 className="text-5xl font-display font-bold text-slate-800 tracking-tight">{avis_consommateurs.note_moyenne}</h2>
                             <span className="text-2xl text-slate-400 font-medium">/5</span>
                        </div>
                        <p className="text-slate-500 font-medium mt-1 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                            Basé sur {avis_consommateurs.nombre_avis.toLocaleString()} avis consommateurs
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-3 z-10">
                     <span className="text-[11px] font-bold uppercase text-slate-400 tracking-widest bg-slate-50 px-3 py-1 rounded-full">Sources vérifiées</span>
                     <div className="flex flex-wrap justify-end gap-2">
                         {avis_consommateurs.sources && avis_consommateurs.sources.length > 0 ? (
                             avis_consommateurs.sources.map((source, i) => (
                                 <span key={i} className="px-4 py-1.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 shadow-sm">
                                     <Icons.CheckCircle size={12} className="text-secondary" /> {source}
                                 </span>
                             ))
                         ) : (
                             <span className="px-3 py-1 bg-surface rounded-lg text-xs italic text-slate-400">Recherche Web Globale</span>
                         )}
                     </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* 1. DONUT CHART (Left - 4 Cols) */}
                <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-8 shadow-soft border border-slate-100 flex flex-col items-center justify-center relative">
                    <h3 className="text-lg font-bold text-slate-800 mb-6 w-full text-center uppercase tracking-wide opacity-80">Satisfaction Globale</h3>
                    <div className="w-full h-64 relative">
                         <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Tooltip 
                                    content={<CustomTooltip />} 
                                    cursor={{ fill: 'transparent' }} 
                                    // FORCE POSITION TOP LEFT OF CONTAINER
                                    position={{ x: 0, y: 0 }}
                                    allowEscapeViewBox={{ x: true, y: true }}
                                />
                                <Pie 
                                    data={chartData} 
                                    innerRadius={80} 
                                    outerRadius={100} 
                                    paddingAngle={5} 
                                    dataKey="value"
                                    stroke="none"
                                >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} style={{ outline: 'none' }} />
                                ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Center Text */}
                         <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-5xl font-display font-bold text-slate-800">{avis_consommateurs.repartition.positifs_pct}%</span>
                            <span className="text-xs font-bold text-secondary uppercase tracking-widest mt-1">Satisfaits</span>
                        </div>
                    </div>
                    
                    {/* Legend */}
                    <div className="flex justify-center gap-6 mt-6 w-full">
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-2xl font-bold text-slate-800">{avis_consommateurs.repartition.positifs_pct}%</span>
                            <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-400">
                                <div className="w-2 h-2 rounded-full bg-[#10B981]"></div> Positif
                            </div>
                        </div>
                        <div className="w-px h-8 bg-slate-100"></div>
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-2xl font-bold text-slate-800">{avis_consommateurs.repartition.neutres_pct}%</span>
                            <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-400">
                                <div className="w-2 h-2 rounded-full bg-[#CBD5E1]"></div> Neutre
                            </div>
                        </div>
                         <div className="w-px h-8 bg-slate-100"></div>
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-2xl font-bold text-slate-800">{avis_consommateurs.repartition.negatifs_pct}%</span>
                            <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-400">
                                <div className="w-2 h-2 rounded-full bg-[#EF4444]"></div> Négatif
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. STATS LISTS (Right - 8 Cols) */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    
                    {/* POSITIVE POINTS */}
                    <div className="bg-[#ECFDF5]/60 rounded-[2.5rem] p-8 border border-[#A7F3D0] flex-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-[#10B981] rounded-xl shadow-lg shadow-emerald-200 text-white">
                                <Icons.ThumbsUp size={20} fill="currentColor"/>
                            </div>
                            <h3 className="font-bold text-[#064E3B] text-lg uppercase tracking-wide">Points Forts Récurrents</h3>
                        </div>
                        
                        <div className="space-y-4">
                            {avis_consommateurs.points_positifs_recurrents.map((pt, i) => (
                                <div key={i} className="flex items-center gap-4 bg-white/80 p-3 rounded-2xl border border-emerald-100/50">
                                    <div className="flex-1">
                                        <span className="text-slate-800 font-bold text-base block mb-1">{pt.topic}</span>
                                        {/* Progress Bar Background */}
                                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            {/* Progress Bar Fill */}
                                            <div style={{ width: `${pt.percentage}%` }} className="h-full bg-[#10B981] rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <span className="text-xl font-bold text-[#10B981]">{pt.percentage}%</span>
                                        <span className="block text-[9px] uppercase font-bold text-slate-400">des avis</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                     {/* NEGATIVE POINTS */}
                     <div className="bg-[#FEF2F2]/60 rounded-[2.5rem] p-8 border border-[#FECACA] flex-1">
                        <div className="flex items-center gap-3 mb-6">
                             <div className="p-2 bg-[#EF4444] rounded-xl shadow-lg shadow-red-200 text-white">
                                <Icons.ThumbsDown size={20} fill="currentColor"/>
                            </div>
                            <h3 className="font-bold text-[#7F1D1D] text-lg uppercase tracking-wide">Points d'amélioration</h3>
                        </div>
                         <div className="space-y-4">
                            {avis_consommateurs.points_negatifs_recurrents.map((pt, i) => (
                                <div key={i} className="flex items-center gap-4 bg-white/80 p-3 rounded-2xl border border-red-100/50">
                                    <div className="flex-1">
                                        <span className="text-slate-800 font-bold text-base block mb-1">{pt.topic}</span>
                                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div style={{ width: `${pt.percentage}%` }} className="h-full bg-[#EF4444] rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <span className="text-xl font-bold text-[#EF4444]">{pt.percentage}%</span>
                                        <span className="block text-[9px] uppercase font-bold text-slate-400">des avis</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. VERBATIMS (Quotes) - Full Width */}
                <div className="col-span-1 lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                     {/* Positive Quote */}
                     <div className="bg-[#F0FDF4] p-8 rounded-[2.5rem] border border-[#BBF7D0] relative group hover:shadow-lg transition-all">
                        <Icons.Quote className="absolute top-8 left-8 text-[#22C55E]/20 w-16 h-16 transform -scale-x-100" />
                        <div className="relative z-10 pl-12 pt-4">
                            <p className="text-xl font-medium text-[#15803D] italic leading-relaxed">
                                "{avis_consommateurs.citation_positive.text}"
                            </p>
                            <div className="mt-6 flex items-center justify-between border-t border-[#22C55E]/20 pt-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-[#15803D] text-white flex items-center justify-center text-xs font-bold">
                                        {avis_consommateurs.citation_positive.author.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-bold text-[#15803D]">{avis_consommateurs.citation_positive.author}</span>
                                </div>
                                <span className="text-xs font-bold uppercase text-[#22C55E] tracking-widest">
                                    {getCitationLabel(avis_consommateurs.citation_positive.author)}
                                </span>
                            </div>
                        </div>
                     </div>

                     {/* Negative Quote */}
                     <div className="bg-[#FEF2F2] p-8 rounded-[2.5rem] border border-[#FECACA] relative group hover:shadow-lg transition-all">
                        <Icons.Quote className="absolute top-8 left-8 text-[#EF4444]/20 w-16 h-16 transform -scale-x-100" />
                        <div className="relative z-10 pl-12 pt-4">
                            <p className="text-xl font-medium text-[#B91C1C] italic leading-relaxed">
                                "{avis_consommateurs.citation_negative.text}"
                            </p>
                            <div className="mt-6 flex items-center justify-between border-t border-[#B91C1C]/10 pt-4">
                                <div className="flex items-center gap-2">
                                     <div className="w-6 h-6 rounded-full bg-[#B91C1C] text-white flex items-center justify-center text-xs font-bold">
                                        {avis_consommateurs.citation_negative.author.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-bold text-[#B91C1C]">{avis_consommateurs.citation_negative.author}</span>
                                </div>
                                <span className="text-xs font-bold uppercase text-[#EF4444] tracking-widest">
                                    {getCitationLabel(avis_consommateurs.citation_negative.author)}
                                </span>
                            </div>
                        </div>
                     </div>
                </div>

            </div>
        </div>
    </div>
  );
};

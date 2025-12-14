
import React, { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';
import { fetchProductData } from '../../services/geminiService';
import { DashboardView } from './DashboardView';
import { ComparatifView } from './ComparatifView';
import { ReviewsView } from './ReviewsView';
import { FAQView } from './FAQView';
import { Icons } from '../ui/Icon';
import { ResultTab } from '../../types';

// Étapes logiques de chargement
const LOADING_STEPS = [
    { id: 1, label: "Identification (Base de données)...", icon: Icons.Scan },
    { id: 2, label: "Analyse des ingrédients...", icon: Icons.Search },
    { id: 3, label: "Comparaison des prix...", icon: Icons.Tag },
    { id: 4, label: "Synthèse des avis...", icon: Icons.Star },
    { id: 5, label: "Finalisation du rapport...", icon: Icons.FileText }
];

export const ResultsLayout: React.FC = () => {
  const { 
    searchQuery, productData, isLoading, error, activeTab,
    setProductData, setLoading, setError, setActiveTab, setView
  } = useStore();

  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    if (!searchQuery) {
        setView('HOME');
        return;
    }

    const loadData = async () => {
        setLoading(true);
        setError(null);
        setActiveStepIndex(0);

        // 1. Visually progress through steps faster (1.2s per step)
        const stepInterval = setInterval(() => {
            setActiveStepIndex(prev => {
                if (prev < LOADING_STEPS.length - 1) return prev + 1;
                return prev;
            });
        }, 1200); 

        try {
            // 2. Fetch Data with a MINIMUM time to ensure animation plays out
            const minLoadingTime = new Promise(resolve => setTimeout(resolve, 4000));
            
            const [data] = await Promise.all([
                fetchProductData(searchQuery),
                minLoadingTime
            ]);
            
            clearInterval(stepInterval);
            
            // 3. Ensure we are visually at the final step
            setActiveStepIndex(LOADING_STEPS.length - 1); 
            
            // 4. Force a pause on "Finalisation du rapport"
            await new Promise(resolve => setTimeout(resolve, 1000)); 
            
            setProductData(data);
            setLoading(false);

        } catch (err) {
            clearInterval(stepInterval);
            setError("Impossible de récupérer les informations. Veuillez réessayer.");
            console.error(err);
            setLoading(false);
        }
    };

    if (!productData || (productData.produit.nom_complet !== searchQuery && !productData.produit.nom_complet.includes("Bioderma"))) { 
       loadData(); 
    }
    
    return () => {};
  }, [searchQuery]);

  if (isLoading) {
      return (
          <div className="h-full flex flex-col items-center justify-center bg-surface p-8 relative overflow-hidden">
              
              {/* Background ambient glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse pointer-events-none"></div>

              <div className="w-full max-w-sm relative z-10 flex flex-col items-center">
                  
                  {/* Central AI Core Animation - Circular */}
                  <div className="relative mb-20 flex items-center justify-center">
                      
                      {/* Outer Ripple 1 */}
                      <div className="absolute w-40 h-40 bg-primary/10 rounded-full animate-ping opacity-75 animation-delay-1000"></div>
                      
                      {/* Outer Ripple 2 */}
                      <div className="absolute w-32 h-32 bg-primary/20 rounded-full animate-pulse"></div>

                      {/* Core */}
                      <div className="w-20 h-20 bg-gradient-to-tr from-primary to-accent rounded-full flex items-center justify-center shadow-lg shadow-primary/40 z-20 relative transform transition-transform hover:scale-105 duration-700">
                          <Icons.BrainCircuit className="w-10 h-10 text-white animate-pulse" strokeWidth={1.5} />
                      </div>
                  </div>

                  {/* Steps Timeline */}
                  <div className="w-full space-y-6 pl-8 border-l-2 border-slate-100 relative">
                      {LOADING_STEPS.map((step, index) => {
                          const isActive = index === activeStepIndex;
                          const isCompleted = index < activeStepIndex;
                          const isPending = index > activeStepIndex;

                          return (
                              <div key={step.id} className={`relative flex items-center gap-4 transition-all duration-500 ${isPending ? 'opacity-30 blur-[0.5px]' : 'opacity-100 transform translate-x-0'}`}>
                                  {/* Timeline Dot */}
                                  <div className={`
                                      absolute -left-[39px] w-5 h-5 rounded-full border-4 border-white shadow-sm transition-colors duration-500
                                      ${isCompleted ? 'bg-secondary' : isActive ? 'bg-primary scale-110 shadow-primary/30 shadow-md' : 'bg-slate-200'}
                                  `}></div>

                                  <div className={`text-slate-400 transition-colors duration-300 ${isActive ? 'text-primary' : ''}`}>
                                      {isCompleted ? <Icons.CheckCircle size={20} className="text-secondary"/> : <step.icon size={20} />}
                                  </div>
                                  <div>
                                      <p className={`font-medium text-lg leading-none transition-all duration-300 ${isActive ? 'text-text-main font-bold scale-105 origin-left' : 'text-slate-500'}`}>
                                          {step.label}
                                      </p>
                                  </div>
                              </div>
                          );
                      })}
                  </div>
                  
                  {/* Final Waiting Message - Only shows on last step */}
                  {activeStepIndex === LOADING_STEPS.length - 1 && (
                      <div className="mt-12 text-center animate-fade-in w-full flex justify-center">
                          <p className="text-slate-500 font-medium text-xs md:text-sm bg-white/50 py-3 px-6 rounded-2xl border border-slate-100 shadow-sm inline-flex items-center gap-2 whitespace-nowrap w-full justify-center">
                              <span>Un peu de patience, la réponse arrivera dans moins de 60 secondes...</span>
                          </p>
                      </div>
                  )}

              </div>
          </div>
      );
  }

  if (error || !productData) {
      return (
          <div className="h-full flex flex-col items-center justify-center bg-surface p-8 text-center">
              <div className="bg-danger-bg p-6 rounded-full mb-6">
                <Icons.AlertTriangle className="w-12 h-12 text-danger-text" />
              </div>
              <h2 className="text-2xl font-bold text-text-main mb-4">{error || "Produit non trouvé"}</h2>
              <button onClick={() => setView('HOME')} className="bg-text-main text-white px-8 py-4 rounded-2xl font-bold shadow-soft hover:scale-105 transition-transform">
                  Retour à l'accueil
              </button>
          </div>
      );
  }

  const renderTabContent = () => {
      switch(activeTab) {
          case 'OVERVIEW': return <DashboardView data={productData} />;
          case 'COMPARE': return <ComparatifView data={productData} />;
          case 'REVIEWS': return <ReviewsView data={productData} />;
          case 'FAQ': return <FAQView data={productData} />;
          default: return <DashboardView data={productData} />;
      }
  };

  return (
    <div className="h-full flex flex-col bg-surface overflow-hidden relative">
        {/* Top Header Bar */}
        <div className="bg-surface-card px-8 py-4 shadow-sm z-20 flex flex-col gap-4 shrink-0">
             
             {/* Header Top: Title & Close */}
             <div className="flex items-center justify-between">
                <div>
                     <h1 className="text-xl font-bold text-text-main leading-tight line-clamp-1">{productData.produit.nom_complet}</h1>
                     <p className="text-sm text-text-muted">{productData.produit.marque} • {productData.produit.format}</p>
                </div>
                <button 
                    onClick={() => setView('HOME')} 
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors text-text-muted"
                >
                    <Icons.X size={28} />
                </button>
             </div>

             {/* Tab Navigation Pill Container */}
             <div className="w-full bg-surface rounded-xl p-1.5 flex items-center shadow-inner">
                {['OVERVIEW', 'COMPARE', 'REVIEWS', 'FAQ'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as ResultTab)}
                        className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${
                            activeTab === tab 
                            ? 'bg-primary text-white shadow-md' 
                            : 'text-text-muted hover:bg-white hover:text-text-main'
                        }`}
                    >
                        {tab === 'OVERVIEW' && 'Aperçu'}
                        {tab === 'COMPARE' && 'Comparaison'}
                        {tab === 'REVIEWS' && 'Avis'}
                        {tab === 'FAQ' && 'FAQ'}
                    </button>
                ))}
             </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden relative z-10 bg-surface">
            {renderTabContent()}
        </div>
    </div>
  );
};

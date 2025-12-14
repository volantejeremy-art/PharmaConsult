import React from 'react';
import { useStore } from './store/useStore';
import { HomeView } from './components/views/HomeView';
import { ScannerView } from './components/views/ScannerView';
import { ResultsLayout } from './components/views/ResultsLayout';

const App: React.FC = () => {
  const { view } = useStore();

  return (
    <div className="h-full w-full bg-bg-page text-text-main font-sans antialiased overflow-hidden selection:bg-primary/30">
      {view === 'HOME' && <HomeView />}
      {view === 'SCANNER' && <ScannerView />}
      {view === 'RESULTS' && <ResultsLayout />}
    </div>
  );
};

export default App;

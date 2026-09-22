import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GpuCatalog } from './components/GpuCatalog';
import { PricingEstimator } from './components/PricingEstimator';
import { Advantages } from './components/Advantages';
import { UseCases } from './components/UseCases';
import { Faq } from './components/Faq';
import { Footer } from './components/Footer';
import { LanguageProvider, Language } from './context/LanguageContext';
import type { GpuNode } from './data/gpuData';

export interface AppProps {
  defaultLang?: Language;
}

function AppContent() {
  const [selectedGpuId, setSelectedGpuId] = useState<string>('rtx-4090');

  const handleSelectGpuForEstimate = (gpu: GpuNode) => {
    setSelectedGpuId(gpu.id);
  };

  return (
    <div className="min-h-screen bg-dark-canvas text-zinc-100 flex flex-col font-sans selection:bg-brand-cyan/20 selection:text-brand-cyan overflow-x-hidden">
      {/* Ambient Radial Spotlight Backdrops */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-brand-cyan/15 via-brand-violet/10 to-transparent blur-3xl opacity-70" />
        <div className="absolute top-[35%] right-[-10%] w-[600px] h-[600px] bg-brand-emerald/5 blur-3xl rounded-full" />
        <div className="absolute top-[70%] left-[-10%] w-[600px] h-[600px] bg-brand-violet/5 blur-3xl rounded-full" />
      </div>

      {/* Sticky Glassmorphic Navigation Header */}
      <Navbar />

      {/* Main Showcase Body */}
      <main className="flex-1 z-10">
        <Hero />
        <GpuCatalog onSelectGpuForEstimate={handleSelectGpuForEstimate} />
        <PricingEstimator selectedGpuId={selectedGpuId} onGpuChange={setSelectedGpuId} />
        <Advantages />
        <UseCases />
        <Faq />
      </main>

      {/* Global Brand Footer */}
      <Footer />
    </div>
  );
}

export function App({ defaultLang }: AppProps) {
  return (
    <LanguageProvider defaultLanguage={defaultLang}>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;

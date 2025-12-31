
import React, { useState, useEffect } from 'react';
import { StudioMode } from './types';
import Sidebar from './components/Sidebar';
import TextStudio from './components/TextStudio';
import ImageStudio from './components/ImageStudio';
import SystemStatus from './components/SystemStatus';
import DataRain from './components/DataRain';
import BootSequence from './components/BootSequence';

const App: React.FC = () => {
  const [isBooted, setIsBooted] = useState(false);
  const [activeMode, setActiveMode] = useState<StudioMode>(StudioMode.SYSTEM);

  const renderContent = () => {
    switch (activeMode) {
      case StudioMode.TEXT: return <TextStudio />;
      case StudioMode.IMAGE: return <ImageStudio />;
      case StudioMode.SYSTEM: return <SystemStatus />;
      default: return <SystemStatus />;
    }
  };

  if (!isBooted) {
    return (
      <>
        <DataRain />
        <BootSequence onComplete={() => setIsBooted(true)} />
      </>
    );
  }

  return (
    <div className="flex h-screen bg-black overflow-hidden relative">
      <DataRain />
      
      {/* Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] opacity-20"></div>

      {/* Main UI */}
      <div className="flex flex-1 relative z-10">
        <Sidebar activeMode={activeMode} onModeChange={setActiveMode} />
        <main className="flex-1 flex flex-col relative overflow-hidden bg-black/40 backdrop-blur-md border-l border-cyan-900/30">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;

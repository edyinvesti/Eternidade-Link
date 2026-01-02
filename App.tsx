import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef(null);

  // Função de Som Simplificada
  const playSound = (freq, vol) => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.frequency.value = freq;
    g.gain.value = vol;
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start();
    g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 1);
    osc.stop(ctx.currentTime + 1);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const drops = new Array(Math.floor(canvas.width / 20)).fill(1);
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '15px monospace';
      drops.forEach((y, i) => {
        ctx.fillStyle = isProcessing ? '#ffd700' : '#003333';
        ctx.fillText(Math.random() > 0.5 ? '0' : '1', i * 20, y * 20);
        if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };
    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, [isProcessing]);

  return (
    <div style={{ backgroundColor: 'black', height: '100vh', color: 'cyan', textAlign: 'center', paddingTop: '100px', fontFamily: 'sans-serif' }}>
      <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 1 }} />
      <div style={{ position: 'relative', zIndex: 10 }}>
        <h1 style={{ fontSize: '3rem', color: 'white' }}>ETERNIDADE LINK</h1>
        <p>Clique no botão para testar o som de 40Hz</p>
        <button 
          onClick={() => { setIsProcessing(true); playSound(40, 0.5); setTimeout(() => setIsProcessing(false), 2000); }}
          style={{ padding: '20px 40px', fontSize: '1.5rem', cursor: 'pointer', border: '2px solid cyan', background: 'black', color: 'cyan' }}
        >
          {isProcessing ? 'PROCESSANDO...' : 'ATIVAR 40Hz'}
        </button>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";

interface FaceScannerAnimationProps {
  className?: string;
}

export function FaceScannerAnimation({ className = "" }: FaceScannerAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(true);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    let progress = 0;
    let scanDirection = 1;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw face outline (futuristic wire-frame style)
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.8;
      
      // Face oval
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, 60, 80, 0, 0, 2 * Math.PI);
      ctx.stroke();
      
      // Eyes
      ctx.beginPath();
      ctx.arc(centerX - 20, centerY - 15, 8, 0, 2 * Math.PI);
      ctx.arc(centerX + 20, centerY - 15, 8, 0, 2 * Math.PI);
      ctx.stroke();
      
      // Nose
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - 5);
      ctx.lineTo(centerX - 5, centerY + 5);
      ctx.lineTo(centerX + 5, centerY + 5);
      ctx.stroke();
      
      // Mouth
      ctx.beginPath();
      ctx.arc(centerX, centerY + 25, 15, 0, Math.PI);
      ctx.stroke();
      
      // 4D scanning grid overlay
      ctx.strokeStyle = '#ff6b35';
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.6;
      
      const gridSize = 10;
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          if (Math.random() > 0.7) {
            ctx.strokeRect(x, y, gridSize, gridSize);
          }
        }
      }
      
      // Scanning line
      ctx.strokeStyle = '#00ff41';
      ctx.lineWidth = 3;
      ctx.globalAlpha = 1;
      
      const scanY = (progress / 100) * canvas.height;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(canvas.width, scanY);
      ctx.stroke();
      
      // Scanning glow effect
      const gradient = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 20);
      gradient.addColorStop(0, 'rgba(0, 255, 65, 0)');
      gradient.addColorStop(0.5, 'rgba(0, 255, 65, 0.8)');
      gradient.addColorStop(1, 'rgba(0, 255, 65, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - 20, canvas.width, 40);
      
      // Biometric data points
      ctx.fillStyle = '#ff6b35';
      ctx.globalAlpha = 0.8;
      
      const dataPoints = [
        { x: centerX - 30, y: centerY - 40 },
        { x: centerX + 30, y: centerY - 40 },
        { x: centerX - 40, y: centerY },
        { x: centerX + 40, y: centerY },
        { x: centerX, y: centerY + 50 },
      ];
      
      dataPoints.forEach((point, index) => {
        if (scanY >= point.y - 10) {
          ctx.beginPath();
          ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
          ctx.fill();
          
          // Data lines
          ctx.strokeStyle = '#ff6b35';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(point.x + 30 + (index * 10), point.y - 20);
          ctx.stroke();
        }
      });
      
      // Update progress
      progress += scanDirection * 2;
      if (progress >= 100) {
        scanDirection = -1;
        progress = 100;
      } else if (progress <= 0) {
        scanDirection = 1;
        progress = 0;
      }
      
      setScanProgress(progress);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className={`relative inline-block ${className}`}>
      <canvas
        ref={canvasRef}
        width={200}
        height={200}
        className="rounded-lg bg-slate-900/20 border border-cyan-500/30"
      />
      
      {/* Status indicators */}
      <div className="absolute -bottom-8 left-0 right-0 text-center">
        <div className="text-xs text-cyan-400 font-mono">
          {isScanning ? `SCANNING... ${Math.round(scanProgress)}%` : 'SCAN COMPLETE'}
        </div>
        <div className="flex justify-center mt-1 space-x-1">
          <div className={`w-2 h-2 rounded-full ${scanProgress > 20 ? 'bg-green-400' : 'bg-gray-600'}`}></div>
          <div className={`w-2 h-2 rounded-full ${scanProgress > 40 ? 'bg-green-400' : 'bg-gray-600'}`}></div>
          <div className={`w-2 h-2 rounded-full ${scanProgress > 60 ? 'bg-green-400' : 'bg-gray-600'}`}></div>
          <div className={`w-2 h-2 rounded-full ${scanProgress > 80 ? 'bg-green-400' : 'bg-gray-600'}`}></div>
        </div>
      </div>
      
      {/* Corner markers */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400"></div>
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-400"></div>
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-400"></div>
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400"></div>
      
      {/* Side text labels */}
      <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-orange-400 font-mono">
        4D BIOMETRIC
      </div>
      <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 rotate-90 text-xs text-orange-400 font-mono">
        AI ANALYSIS
      </div>
    </div>
  );
}
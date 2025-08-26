import { useEffect, useRef, useState } from "react";

interface FaceScannerAnimationProps {
  className?: string;
}

export function FaceScannerAnimation({ className = "" }: FaceScannerAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(-30); // Start from left profile
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
    let rotation = -30; // Start from left profile
    let rotationDirection = 1;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Save context for 3D transformation
      ctx.save();
      
      // Apply 3D perspective transformation
      const rotationRad = (rotation * Math.PI) / 180;
      const scaleX = Math.cos(rotationRad);
      const skewX = Math.sin(rotationRad) * 0.3;
      
      // Transform for 3D effect
      ctx.transform(scaleX, skewX, 0, 1, centerX * (1 - scaleX), -centerY * skewX);
      
      // Draw 3D face profile based on rotation
      ctx.strokeStyle = '#00bfff';
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.9;
      
      // Face outline with 3D depth
      ctx.beginPath();
      if (rotation < -15) {
        // Left profile view
        ctx.ellipse(centerX + 10, centerY, 35, 75, 0, 0, 2 * Math.PI);
      } else if (rotation > 15) {
        // Right profile view  
        ctx.ellipse(centerX - 10, centerY, 35, 75, 0, 0, 2 * Math.PI);
      } else {
        // Front view
        ctx.ellipse(centerX, centerY, 55, 75, 0, 0, 2 * Math.PI);
      }
      ctx.stroke();
      
      // Eyes with 3D perspective
      ctx.strokeStyle = '#00bfff';
      ctx.lineWidth = 1;
      
      if (rotation < -15) {
        // Left profile - only right eye visible
        ctx.beginPath();
        ctx.ellipse(centerX + 5, centerY - 12, 8, 6, 0, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = '#00bfff';
        ctx.beginPath();
        ctx.arc(centerX + 5, centerY - 12, 2, 0, 2 * Math.PI);
        ctx.fill();
      } else if (rotation > 15) {
        // Right profile - only left eye visible
        ctx.beginPath();
        ctx.ellipse(centerX - 5, centerY - 12, 8, 6, 0, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = '#00bfff';
        ctx.beginPath();
        ctx.arc(centerX - 5, centerY - 12, 2, 0, 2 * Math.PI);
        ctx.fill();
      } else {
        // Front view - both eyes
        // Left eye
        ctx.beginPath();
        ctx.ellipse(centerX - 18, centerY - 12, 12, 8, 0, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = '#00bfff';
        ctx.beginPath();
        ctx.arc(centerX - 18, centerY - 12, 3, 0, 2 * Math.PI);
        ctx.fill();
        
        // Right eye
        ctx.strokeStyle = '#00bfff';
        ctx.beginPath();
        ctx.ellipse(centerX + 18, centerY - 12, 12, 8, 0, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = '#00bfff';
        ctx.beginPath();
        ctx.arc(centerX + 18, centerY - 12, 3, 0, 2 * Math.PI);
        ctx.fill();
      }
      
      // Nose with 3D depth
      ctx.strokeStyle = '#00bfff';
      ctx.lineWidth = 1;
      ctx.beginPath();
      if (rotation < -15) {
        // Left profile nose
        ctx.moveTo(centerX + 20, centerY - 8);
        ctx.lineTo(centerX + 25, centerY + 2);
        ctx.lineTo(centerX + 20, centerY + 5);
      } else if (rotation > 15) {
        // Right profile nose
        ctx.moveTo(centerX - 20, centerY - 8);
        ctx.lineTo(centerX - 25, centerY + 2);
        ctx.lineTo(centerX - 20, centerY + 5);
      } else {
        // Front view nose
        ctx.moveTo(centerX, centerY - 8);
        ctx.lineTo(centerX - 3, centerY + 2);
        ctx.moveTo(centerX, centerY - 8);
        ctx.lineTo(centerX + 3, centerY + 2);
      }
      ctx.stroke();
      
      // Mouth with 3D perspective
      ctx.strokeStyle = '#00bfff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      if (rotation < -15) {
        // Left profile mouth
        ctx.moveTo(centerX + 8, centerY + 20);
        ctx.quadraticCurveTo(centerX + 15, centerY + 25, centerX + 22, centerY + 22);
      } else if (rotation > 15) {
        // Right profile mouth
        ctx.moveTo(centerX - 22, centerY + 22);
        ctx.quadraticCurveTo(centerX - 15, centerY + 25, centerX - 8, centerY + 20);
      } else {
        // Front view mouth
        ctx.moveTo(centerX - 12, centerY + 20);
        ctx.quadraticCurveTo(centerX, centerY + 26, centerX + 12, centerY + 20);
      }
      ctx.stroke();
      
      // Restore context
      ctx.restore();
      
      // Subtle facial recognition grid
      ctx.strokeStyle = '#40e0d0';
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.3;
      
      // Vertical and horizontal reference lines
      const gridSpacing = 15;
      for (let i = 0; i < 4; i++) {
        const x = centerX - 45 + (i * 30);
        ctx.beginPath();
        ctx.moveTo(x, centerY - 70);
        ctx.lineTo(x, centerY + 70);
        ctx.stroke();
      }
      
      for (let i = 0; i < 6; i++) {
        const y = centerY - 60 + (i * 24);
        ctx.beginPath();
        ctx.moveTo(centerX - 45, y);
        ctx.lineTo(centerX + 45, y);
        ctx.stroke();
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
      
      // Facial landmark detection points with 3D positioning
      ctx.fillStyle = '#00ff7f';
      ctx.globalAlpha = 0.9;
      
      let landmarkPoints = [];
      
      if (rotation < -15) {
        // Left profile landmarks
        landmarkPoints = [
          { x: centerX + 5, y: centerY - 12, name: 'R_EYE' },
          { x: centerX + 22, y: centerY + 2, name: 'NOSE' },
          { x: centerX + 15, y: centerY + 22, name: 'MOUTH' },
          { x: centerX + 8, y: centerY + 45, name: 'CHIN' },
        ];
      } else if (rotation > 15) {
        // Right profile landmarks
        landmarkPoints = [
          { x: centerX - 5, y: centerY - 12, name: 'L_EYE' },
          { x: centerX - 22, y: centerY + 2, name: 'NOSE' },
          { x: centerX - 15, y: centerY + 22, name: 'MOUTH' },
          { x: centerX - 8, y: centerY + 45, name: 'CHIN' },
        ];
      } else {
        // Front view landmarks
        landmarkPoints = [
          { x: centerX - 18, y: centerY - 12, name: 'L_EYE' },
          { x: centerX + 18, y: centerY - 12, name: 'R_EYE' },
          { x: centerX, y: centerY + 2, name: 'NOSE' },
          { x: centerX - 12, y: centerY + 20, name: 'L_MOUTH' },
          { x: centerX + 12, y: centerY + 20, name: 'R_MOUTH' },
          { x: centerX, y: centerY + 45, name: 'CHIN' },
        ];
      }
      
      landmarkPoints.forEach((point, index) => {
        if (scanY >= point.y - 5) {
          // Draw landmark point
          ctx.beginPath();
          ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
          ctx.fill();
          
          // Draw subtle connection line
          ctx.strokeStyle = '#00ff7f';
          ctx.lineWidth = 0.8;
          ctx.globalAlpha = 0.6;
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(point.x + (index % 2 === 0 ? -25 : 25), point.y - 15);
          ctx.stroke();
          
          // Small text label
          ctx.globalAlpha = 0.8;
          ctx.fillStyle = '#00ff7f';
          ctx.font = '8px monospace';
          ctx.fillText(point.name, point.x + (index % 2 === 0 ? -35 : 15), point.y - 18);
        }
      });
      
      // Update progress with more realistic speed
      progress += scanDirection * 1.5;
      if (progress >= 100) {
        scanDirection = -1;
        progress = 100;
      } else if (progress <= 0) {
        scanDirection = 1;
        progress = 0;
      }
      
      // Update rotation for 3D effect (left to right turn)
      rotation += rotationDirection * 0.8;
      if (rotation >= 30) {
        rotationDirection = -1;
        rotation = 30;
      } else if (rotation <= -30) {
        rotationDirection = 1;
        rotation = -30;
      }
      
      setScanProgress(progress);
      setRotationAngle(rotation);
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
          {isScanning ? `3D SCAN... ${Math.round(scanProgress)}% | ${Math.round(rotationAngle)}°` : 'SCAN COMPLETE'}
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
import { useEffect, useRef, useState } from "react";

interface FaceScannerAnimationProps {
  className?: string;
}

export function FaceScannerAnimation({ className = "" }: FaceScannerAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(-25);
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
    let rotation = -25;
    let rotationDirection = 1;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Advanced 3D face rendering
      const rotationRad = (rotation * Math.PI) / 180;
      const cosAngle = Math.cos(rotationRad);
      const sinAngle = Math.sin(rotationRad);
      
      // Calculate 3D depth and perspective
      const depth = Math.abs(cosAngle);
      const perspective = 0.6 + (depth * 0.4);
      
      ctx.save();
      
      // Advanced facial structure with proper depth
      const drawAdvancedFace = () => {
        // Face contour with realistic proportions
        ctx.strokeStyle = '#00d4ff';
        ctx.lineWidth = 1.8;
        ctx.globalAlpha = 0.95;
        
        // Calculate face dimensions based on rotation
        const faceWidth = 65 * perspective;
        const faceHeight = 85;
        const offsetX = sinAngle * 15;
        
        // Face outline - more anatomically correct
        ctx.beginPath();
        ctx.moveTo(centerX + offsetX - faceWidth * 0.5, centerY - faceHeight * 0.6);
        ctx.quadraticCurveTo(centerX + offsetX - faceWidth * 0.6, centerY - faceHeight * 0.3, centerX + offsetX - faceWidth * 0.5, centerY);
        ctx.quadraticCurveTo(centerX + offsetX - faceWidth * 0.6, centerY + faceHeight * 0.3, centerX + offsetX - faceWidth * 0.3, centerY + faceHeight * 0.5);
        ctx.quadraticCurveTo(centerX + offsetX, centerY + faceHeight * 0.6, centerX + offsetX + faceWidth * 0.3, centerY + faceHeight * 0.5);
        ctx.quadraticCurveTo(centerX + offsetX + faceWidth * 0.6, centerY + faceHeight * 0.3, centerX + offsetX + faceWidth * 0.5, centerY);
        ctx.quadraticCurveTo(centerX + offsetX + faceWidth * 0.6, centerY - faceHeight * 0.3, centerX + offsetX + faceWidth * 0.5, centerY - faceHeight * 0.6);
        ctx.closePath();
        ctx.stroke();
        
        // Forehead and temple details
        ctx.strokeStyle = '#0099cc';
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.7;
        
        // Forehead contours
        ctx.beginPath();
        ctx.moveTo(centerX + offsetX - faceWidth * 0.3, centerY - faceHeight * 0.5);
        ctx.quadraticCurveTo(centerX + offsetX, centerY - faceHeight * 0.6, centerX + offsetX + faceWidth * 0.3, centerY - faceHeight * 0.5);
        ctx.stroke();
        
        // Temple definition
        if (Math.abs(rotation) > 10) {
          ctx.beginPath();
          ctx.moveTo(centerX + offsetX + (rotation > 0 ? -1 : 1) * faceWidth * 0.4, centerY - faceHeight * 0.4);
          ctx.lineTo(centerX + offsetX + (rotation > 0 ? -1 : 1) * faceWidth * 0.5, centerY - faceHeight * 0.2);
          ctx.stroke();
        }
      };
      
      const drawRealisticEyes = () => {
        ctx.strokeStyle = '#00d4ff';
        ctx.fillStyle = '#00d4ff';
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = 0.9;
        
        const eyeY = centerY - 15;
        const eyeWidth = 15 * perspective;
        const eyeHeight = 8;
        
        if (rotation < -15) {
          // Left profile - only right eye visible with perspective
          const eyeX = centerX + offsetX + 8;
          
          // Eye socket
          ctx.beginPath();
          ctx.ellipse(eyeX, eyeY, eyeWidth * 0.9, eyeHeight, 0, 0, 2 * Math.PI);
          ctx.stroke();
          
          // Iris and pupil
          ctx.fillStyle = '#004d66';
          ctx.beginPath();
          ctx.ellipse(eyeX, eyeY, eyeWidth * 0.5, eyeHeight * 0.7, 0, 0, 2 * Math.PI);
          ctx.fill();
          
          ctx.fillStyle = '#000';
          ctx.beginPath();
          ctx.ellipse(eyeX, eyeY, eyeWidth * 0.25, eyeHeight * 0.4, 0, 0, 2 * Math.PI);
          ctx.fill();
          
          // Eyelid detail
          ctx.strokeStyle = '#0099cc';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.ellipse(eyeX, eyeY - 2, eyeWidth * 0.9, eyeHeight * 0.6, 0, 0, Math.PI);
          ctx.stroke();
          
          // Eyebrow with depth
          ctx.strokeStyle = '#00d4ff';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(eyeX - eyeWidth * 0.6, eyeY - 18);
          ctx.quadraticCurveTo(eyeX, eyeY - 22, eyeX + eyeWidth * 0.8, eyeY - 16);
          ctx.stroke();
          
        } else if (rotation > 15) {
          // Right profile - only left eye visible
          const eyeX = centerX + offsetX - 8;
          
          ctx.beginPath();
          ctx.ellipse(eyeX, eyeY, eyeWidth * 0.9, eyeHeight, 0, 0, 2 * Math.PI);
          ctx.stroke();
          
          ctx.fillStyle = '#004d66';
          ctx.beginPath();
          ctx.ellipse(eyeX, eyeY, eyeWidth * 0.5, eyeHeight * 0.7, 0, 0, 2 * Math.PI);
          ctx.fill();
          
          ctx.fillStyle = '#000';
          ctx.beginPath();
          ctx.ellipse(eyeX, eyeY, eyeWidth * 0.25, eyeHeight * 0.4, 0, 0, 2 * Math.PI);
          ctx.fill();
          
          ctx.strokeStyle = '#0099cc';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.ellipse(eyeX, eyeY - 2, eyeWidth * 0.9, eyeHeight * 0.6, 0, 0, Math.PI);
          ctx.stroke();
          
          ctx.strokeStyle = '#00d4ff';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(eyeX - eyeWidth * 0.8, eyeY - 16);
          ctx.quadraticCurveTo(eyeX, eyeY - 22, eyeX + eyeWidth * 0.6, eyeY - 18);
          ctx.stroke();
          
        } else {
          // Front view - both eyes with detailed anatomy
          const leftEyeX = centerX + offsetX - 22;
          const rightEyeX = centerX + offsetX + 22;
          
          // Left eye
          ctx.beginPath();
          ctx.ellipse(leftEyeX, eyeY, eyeWidth, eyeHeight, 0, 0, 2 * Math.PI);
          ctx.stroke();
          
          ctx.fillStyle = '#004d66';
          ctx.beginPath();
          ctx.ellipse(leftEyeX, eyeY, eyeWidth * 0.6, eyeHeight * 0.8, 0, 0, 2 * Math.PI);
          ctx.fill();
          
          ctx.fillStyle = '#000';
          ctx.beginPath();
          ctx.ellipse(leftEyeX, eyeY, eyeWidth * 0.3, eyeHeight * 0.5, 0, 0, 2 * Math.PI);
          ctx.fill();
          
          // Right eye
          ctx.strokeStyle = '#00d4ff';
          ctx.beginPath();
          ctx.ellipse(rightEyeX, eyeY, eyeWidth, eyeHeight, 0, 0, 2 * Math.PI);
          ctx.stroke();
          
          ctx.fillStyle = '#004d66';
          ctx.beginPath();
          ctx.ellipse(rightEyeX, eyeY, eyeWidth * 0.6, eyeHeight * 0.8, 0, 0, 2 * Math.PI);
          ctx.fill();
          
          ctx.fillStyle = '#000';
          ctx.beginPath();
          ctx.ellipse(rightEyeX, eyeY, eyeWidth * 0.3, eyeHeight * 0.5, 0, 0, 2 * Math.PI);
          ctx.fill();
          
          // Eyelids
          ctx.strokeStyle = '#0099cc';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.ellipse(leftEyeX, eyeY - 2, eyeWidth, eyeHeight * 0.6, 0, 0, Math.PI);
          ctx.ellipse(rightEyeX, eyeY - 2, eyeWidth, eyeHeight * 0.6, 0, 0, Math.PI);
          ctx.stroke();
          
          // Eyebrows
          ctx.strokeStyle = '#00d4ff';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(leftEyeX - eyeWidth * 0.8, eyeY - 18);
          ctx.quadraticCurveTo(leftEyeX, eyeY - 22, leftEyeX + eyeWidth * 0.8, eyeY - 16);
          ctx.moveTo(rightEyeX - eyeWidth * 0.8, eyeY - 16);
          ctx.quadraticCurveTo(rightEyeX, eyeY - 22, rightEyeX + eyeWidth * 0.8, eyeY - 18);
          ctx.stroke();
        }
      };
      
      const drawDetailedNose = () => {
        ctx.strokeStyle = '#00d4ff';
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = 0.85;
        
        const noseY = centerY + 2;
        
        if (rotation < -15) {
          // Left profile nose with proper bridge and nostril
          const noseX = centerX + offsetX + 25;
          
          // Nose bridge
          ctx.beginPath();
          ctx.moveTo(noseX - 8, centerY - 20);
          ctx.quadraticCurveTo(noseX - 5, noseY - 5, noseX, noseY + 8);
          ctx.stroke();
          
          // Nose tip and nostril
          ctx.beginPath();
          ctx.moveTo(noseX, noseY + 8);
          ctx.quadraticCurveTo(noseX - 3, noseY + 12, noseX - 8, noseY + 10);
          ctx.stroke();
          
          // Nostril detail
          ctx.fillStyle = '#003d4d';
          ctx.beginPath();
          ctx.ellipse(noseX - 6, noseY + 8, 2, 3, Math.PI * 0.3, 0, 2 * Math.PI);
          ctx.fill();
          
        } else if (rotation > 15) {
          // Right profile nose
          const noseX = centerX + offsetX - 25;
          
          ctx.beginPath();
          ctx.moveTo(noseX + 8, centerY - 20);
          ctx.quadraticCurveTo(noseX + 5, noseY - 5, noseX, noseY + 8);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.moveTo(noseX, noseY + 8);
          ctx.quadraticCurveTo(noseX + 3, noseY + 12, noseX + 8, noseY + 10);
          ctx.stroke();
          
          ctx.fillStyle = '#003d4d';
          ctx.beginPath();
          ctx.ellipse(noseX + 6, noseY + 8, 2, 3, -Math.PI * 0.3, 0, 2 * Math.PI);
          ctx.fill();
          
        } else {
          // Front view nose with detailed structure
          const noseX = centerX + offsetX;
          
          // Nose bridge
          ctx.beginPath();
          ctx.moveTo(noseX, centerY - 20);
          ctx.lineTo(noseX, noseY + 5);
          ctx.stroke();
          
          // Nose sides
          ctx.beginPath();
          ctx.moveTo(noseX - 8, noseY - 2);
          ctx.quadraticCurveTo(noseX - 4, noseY + 8, noseX, noseY + 10);
          ctx.quadraticCurveTo(noseX + 4, noseY + 8, noseX + 8, noseY - 2);
          ctx.stroke();
          
          // Nostrils
          ctx.fillStyle = '#003d4d';
          ctx.beginPath();
          ctx.ellipse(noseX - 4, noseY + 6, 2, 3, 0, 0, 2 * Math.PI);
          ctx.ellipse(noseX + 4, noseY + 6, 2, 3, 0, 0, 2 * Math.PI);
          ctx.fill();
        }
      };
      
      const drawRealisticMouth = () => {
        ctx.strokeStyle = '#00d4ff';
        ctx.lineWidth = 1.4;
        ctx.globalAlpha = 0.9;
        
        const mouthY = centerY + 25;
        
        if (rotation < -15) {
          // Left profile mouth
          const mouthX = centerX + offsetX + 15;
          
          ctx.beginPath();
          ctx.moveTo(mouthX - 5, mouthY);
          ctx.quadraticCurveTo(mouthX + 8, mouthY + 6, mouthX + 18, mouthY + 2);
          ctx.stroke();
          
          // Lip line detail
          ctx.strokeStyle = '#0099cc';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(mouthX - 2, mouthY - 2);
          ctx.quadraticCurveTo(mouthX + 8, mouthY + 3, mouthX + 15, mouthY);
          ctx.stroke();
          
        } else if (rotation > 15) {
          // Right profile mouth
          const mouthX = centerX + offsetX - 15;
          
          ctx.beginPath();
          ctx.moveTo(mouthX - 18, mouthY + 2);
          ctx.quadraticCurveTo(mouthX - 8, mouthY + 6, mouthX + 5, mouthY);
          ctx.stroke();
          
          ctx.strokeStyle = '#0099cc';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(mouthX - 15, mouthY);
          ctx.quadraticCurveTo(mouthX - 8, mouthY + 3, mouthX + 2, mouthY - 2);
          ctx.stroke();
          
        } else {
          // Front view mouth with detailed lips
          const mouthX = centerX + offsetX;
          
          // Upper lip
          ctx.beginPath();
          ctx.moveTo(mouthX - 18, mouthY - 2);
          ctx.quadraticCurveTo(mouthX - 6, mouthY - 4, mouthX, mouthY - 2);
          ctx.quadraticCurveTo(mouthX + 6, mouthY - 4, mouthX + 18, mouthY - 2);
          ctx.stroke();
          
          // Lower lip
          ctx.beginPath();
          ctx.moveTo(mouthX - 18, mouthY - 2);
          ctx.quadraticCurveTo(mouthX, mouthY + 8, mouthX + 18, mouthY - 2);
          ctx.stroke();
          
          // Lip center line
          ctx.strokeStyle = '#0099cc';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(mouthX - 15, mouthY);
          ctx.quadraticCurveTo(mouthX, mouthY + 2, mouthX + 15, mouthY);
          ctx.stroke();
        }
      };
      
      const drawJawlineAndChin = () => {
        ctx.strokeStyle = '#0099cc';
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.7;
        
        const chinY = centerY + 55;
        const jawWidth = 45 * perspective;
        
        // Jawline definition
        ctx.beginPath();
        ctx.moveTo(centerX + offsetX - jawWidth * 0.8, centerY + 30);
        ctx.quadraticCurveTo(centerX + offsetX - jawWidth * 0.6, chinY - 10, centerX + offsetX, chinY);
        ctx.quadraticCurveTo(centerX + offsetX + jawWidth * 0.6, chinY - 10, centerX + offsetX + jawWidth * 0.8, centerY + 30);
        ctx.stroke();
        
        // Chin definition
        if (Math.abs(rotation) < 20) {
          ctx.beginPath();
          ctx.moveTo(centerX + offsetX - 8, chinY - 5);
          ctx.quadraticCurveTo(centerX + offsetX, chinY + 2, centerX + offsetX + 8, chinY - 5);
          ctx.stroke();
        }
      };
      
      // Draw all facial features
      drawAdvancedFace();
      drawRealisticEyes();
      drawDetailedNose();
      drawRealisticMouth();
      drawJawlineAndChin();
      
      // Advanced scanning grid with depth mapping
      ctx.strokeStyle = '#40e0d0';
      ctx.lineWidth = 0.4;
      ctx.globalAlpha = 0.25;
      
      const gridDensity = 12;
      for (let i = 0; i < 8; i++) {
        const x = centerX + offsetX - 60 + (i * 15);
        const depthOffset = Math.sin((x - centerX) * 0.02) * depth * 3;
        
        ctx.beginPath();
        ctx.moveTo(x + depthOffset, centerY - 80);
        ctx.lineTo(x + depthOffset, centerY + 80);
        ctx.stroke();
      }
      
      for (let i = 0; i < 12; i++) {
        const y = centerY - 70 + (i * 12);
        const depthOffset = Math.cos((y - centerY) * 0.03) * Math.abs(sinAngle) * 2;
        
        ctx.beginPath();
        ctx.moveTo(centerX + offsetX - 60 + depthOffset, y);
        ctx.lineTo(centerX + offsetX + 60 + depthOffset, y);
        ctx.stroke();
      }
      
      // Advanced scanning line with depth effect
      ctx.strokeStyle = '#00ff41';
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.9;
      
      const scanY = (progress / 100) * canvas.height;
      const scanDepth = Math.sin((scanY - centerY) * 0.01) * Math.abs(sinAngle) * 4;
      
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(canvas.width, scanY + scanDepth);
      ctx.stroke();
      
      // Scanning glow with 3D effect
      const gradient = ctx.createLinearGradient(0, scanY - 15, 0, scanY + 15);
      gradient.addColorStop(0, 'rgba(0, 255, 65, 0)');
      gradient.addColorStop(0.5, 'rgba(0, 255, 65, 0.6)');
      gradient.addColorStop(1, 'rgba(0, 255, 65, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - 15, canvas.width, 30);
      
      ctx.restore();
      
      // Advanced biometric points with anatomical accuracy
      ctx.fillStyle = '#00ff7f';
      ctx.globalAlpha = 0.95;
      
      const landmarks = getAnatomicalLandmarks(rotation, centerX, centerY, offsetX, perspective);
      
      landmarks.forEach((point, index) => {
        if (scanY >= point.y - 8) {
          // Draw landmark with depth indicator
          const size = 2 + (point.importance || 0) * 0.5;
          ctx.beginPath();
          ctx.arc(point.x, point.y, size, 0, 2 * Math.PI);
          ctx.fill();
          
          // Connection line with opacity based on importance
          ctx.strokeStyle = '#00ff7f';
          ctx.lineWidth = 0.6 + (point.importance || 0) * 0.2;
          ctx.globalAlpha = 0.5 + (point.importance || 0) * 0.3;
          
          const lineLength = 20 + (point.importance || 0) * 8;
          const lineAngle = (index * 45) * (Math.PI / 180);
          
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(
            point.x + Math.cos(lineAngle) * lineLength,
            point.y + Math.sin(lineAngle) * lineLength
          );
          ctx.stroke();
          
          // Label with depth awareness
          ctx.globalAlpha = 0.8;
          ctx.fillStyle = '#00ff7f';
          ctx.font = '7px monospace';
          ctx.fillText(
            point.name,
            point.x + Math.cos(lineAngle) * (lineLength + 5),
            point.y + Math.sin(lineAngle) * (lineLength + 5)
          );
        }
      });
      
      // Update animations
      progress += scanDirection * 1.2;
      if (progress >= 100) {
        scanDirection = -1;
        progress = 100;
      } else if (progress <= 0) {
        scanDirection = 1;
        progress = 0;
      }
      
      rotation += rotationDirection * 0.6;
      if (rotation >= 25) {
        rotationDirection = -1;
        rotation = 25;
      } else if (rotation <= -25) {
        rotationDirection = 1;
        rotation = -25;
      }
      
      setScanProgress(progress);
      setRotationAngle(rotation);
      animationRef.current = requestAnimationFrame(animate);
    };

    const getAnatomicalLandmarks = (rotation: number, centerX: number, centerY: number, offsetX: number, perspective: number) => {
      const landmarks = [];
      
      if (rotation < -15) {
        // Left profile landmarks with anatomical precision
        landmarks.push(
          { x: centerX + offsetX + 8, y: centerY - 15, name: 'R_EYE_CENTER', importance: 3 },
          { x: centerX + offsetX + 15, y: centerY - 18, name: 'R_EYEBROW_ARCH', importance: 2 },
          { x: centerX + offsetX + 25, y: centerY + 2, name: 'NOSE_TIP', importance: 3 },
          { x: centerX + offsetX + 20, y: centerY + 8, name: 'NOSTRIL', importance: 2 },
          { x: centerX + offsetX + 15, y: centerY + 25, name: 'MOUTH_CORNER', importance: 2 },
          { x: centerX + offsetX + 5, y: centerY + 55, name: 'CHIN_POINT', importance: 2 },
          { x: centerX + offsetX + 35, y: centerY + 30, name: 'JAW_ANGLE', importance: 1 }
        );
      } else if (rotation > 15) {
        // Right profile landmarks
        landmarks.push(
          { x: centerX + offsetX - 8, y: centerY - 15, name: 'L_EYE_CENTER', importance: 3 },
          { x: centerX + offsetX - 15, y: centerY - 18, name: 'L_EYEBROW_ARCH', importance: 2 },
          { x: centerX + offsetX - 25, y: centerY + 2, name: 'NOSE_TIP', importance: 3 },
          { x: centerX + offsetX - 20, y: centerY + 8, name: 'NOSTRIL', importance: 2 },
          { x: centerX + offsetX - 15, y: centerY + 25, name: 'MOUTH_CORNER', importance: 2 },
          { x: centerX + offsetX - 5, y: centerY + 55, name: 'CHIN_POINT', importance: 2 },
          { x: centerX + offsetX - 35, y: centerY + 30, name: 'JAW_ANGLE', importance: 1 }
        );
      } else {
        // Front view landmarks with comprehensive mapping
        landmarks.push(
          { x: centerX + offsetX - 22, y: centerY - 15, name: 'L_EYE_CENTER', importance: 3 },
          { x: centerX + offsetX + 22, y: centerY - 15, name: 'R_EYE_CENTER', importance: 3 },
          { x: centerX + offsetX - 25, y: centerY - 18, name: 'L_EYEBROW_ARCH', importance: 2 },
          { x: centerX + offsetX + 25, y: centerY - 18, name: 'R_EYEBROW_ARCH', importance: 2 },
          { x: centerX + offsetX, y: centerY + 2, name: 'NOSE_TIP', importance: 3 },
          { x: centerX + offsetX - 4, y: centerY + 6, name: 'L_NOSTRIL', importance: 2 },
          { x: centerX + offsetX + 4, y: centerY + 6, name: 'R_NOSTRIL', importance: 2 },
          { x: centerX + offsetX - 18, y: centerY + 25, name: 'L_MOUTH_CORNER', importance: 2 },
          { x: centerX + offsetX + 18, y: centerY + 25, name: 'R_MOUTH_CORNER', importance: 2 },
          { x: centerX + offsetX, y: centerY + 27, name: 'MOUTH_CENTER', importance: 2 },
          { x: centerX + offsetX, y: centerY + 55, name: 'CHIN_CENTER', importance: 2 },
          { x: centerX + offsetX - 35, y: centerY + 30, name: 'L_JAW_ANGLE', importance: 1 },
          { x: centerX + offsetX + 35, y: centerY + 30, name: 'R_JAW_ANGLE', importance: 1 }
        );
      }
      
      return landmarks;
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
        width={220}
        height={220}
        className="rounded-lg bg-slate-900/30 border border-cyan-500/40 shadow-lg shadow-cyan-500/20"
      />
      
      {/* Advanced status display */}
      <div className="absolute -bottom-10 left-0 right-0 text-center">
        <div className="text-xs text-cyan-400 font-mono">
          {isScanning ? `BIOMETRIC SCAN ${Math.round(scanProgress)}% | ${Math.round(rotationAngle)}°` : 'ANALYSIS COMPLETE'}
        </div>
        <div className="flex justify-center mt-1 space-x-1">
          <div className={`w-2 h-2 rounded-full ${scanProgress > 15 ? 'bg-green-400' : 'bg-gray-600'}`}></div>
          <div className={`w-2 h-2 rounded-full ${scanProgress > 35 ? 'bg-green-400' : 'bg-gray-600'}`}></div>
          <div className={`w-2 h-2 rounded-full ${scanProgress > 55 ? 'bg-green-400' : 'bg-gray-600'}`}></div>
          <div className={`w-2 h-2 rounded-full ${scanProgress > 75 ? 'bg-green-400' : 'bg-gray-600'}`}></div>
          <div className={`w-2 h-2 rounded-full ${scanProgress > 90 ? 'bg-green-400' : 'bg-gray-600'}`}></div>
        </div>
      </div>
      
      {/* Enhanced corner markers */}
      <div className="absolute top-1 left-1 w-5 h-5 border-l-2 border-t-2 border-cyan-400 opacity-80"></div>
      <div className="absolute top-1 right-1 w-5 h-5 border-r-2 border-t-2 border-cyan-400 opacity-80"></div>
      <div className="absolute bottom-1 left-1 w-5 h-5 border-l-2 border-b-2 border-cyan-400 opacity-80"></div>
      <div className="absolute bottom-1 right-1 w-5 h-5 border-r-2 border-b-2 border-cyan-400 opacity-80"></div>
      
      {/* Side labels with depth indicator */}
      <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-orange-400 font-mono tracking-wider">
        3D BIOMETRIC
      </div>
      <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 rotate-90 text-xs text-orange-400 font-mono tracking-wider">
        DEPTH ANALYSIS
      </div>
    </div>
  );
}
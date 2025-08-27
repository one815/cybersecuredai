import { useEffect, useRef, useState } from "react";
import realisticFaceImg from "@assets/generated_images/Realistic_4D_biometric_face_scan_42621f9d.png";
import frontFaceImg from "@assets/generated_images/Professional_biometric_face_front_view_9c52270e.png";

interface FaceScannerAnimationProps {
  className?: string;
}

export function FaceScannerAnimation({ className = "" }: FaceScannerAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(-30);
  const [isScanning, setIsScanning] = useState(true);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Load the realistic face images
    const faceImage = new Image();
    const frontImage = new Image();
    faceImage.src = realisticFaceImg;
    frontImage.src = frontFaceImg;
    let imageLoaded = false;
    let frontImageLoaded = false;
    
    faceImage.onload = () => {
      imageLoaded = true;
    };
    
    frontImage.onload = () => {
      frontImageLoaded = true;
    };

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    let progress = 0;
    let scanDirection = 1;
    let rotation = -30;
    let rotationDirection = 1;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate 3D transformation variables
      const rotationRad = (rotation * Math.PI) / 180;
      const cosAngle = Math.cos(rotationRad);
      const sinAngle = Math.sin(rotationRad);
      const perspective = 0.7 + (Math.abs(cosAngle) * 0.3);
      const offsetX = sinAngle * 12;
      
      // Save canvas state
      ctx.save();
      
      // Draw ultra-realistic human face with 4D image integration
      const drawRealisticFace = () => {
        if (imageLoaded || frontImageLoaded) {
          // Apply 3D transformation to the realistic face image
          ctx.save();
          
          // Calculate transform matrix for 3D rotation
          const scaleX = perspective;
          const skewX = sinAngle * 0.3;
          const skewY = cosAngle * 0.05;
          
          // Transform for 3D perspective
          ctx.setTransform(scaleX, skewY, skewX, 1, centerX + offsetX - 75, centerY - 75);
          
          // Choose which image to display based on rotation angle
          let currentImage = frontImageLoaded ? frontImage : faceImage;
          if (Math.abs(rotation) > 15 && imageLoaded) {
            currentImage = faceImage;
          }
          
          // Draw the realistic face image with proper scaling
          ctx.globalAlpha = 0.9;
          ctx.drawImage(currentImage, 0, 0, 150, 150);
          
          ctx.restore();
        }
        
        // Overlay biometric grid lines on the face
        ctx.strokeStyle = '#00e6ff';
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.4;
        
        const faceWidth = 60 * perspective;
        const faceHeight = 80;
        
        // Biometric analysis grid overlay
        for (let i = 0; i < 8; i++) {
          const y = centerY - faceHeight * 0.6 + (i * faceHeight * 0.15);
          ctx.beginPath();
          ctx.moveTo(centerX + offsetX - faceWidth * 0.5, y);
          ctx.lineTo(centerX + offsetX + faceWidth * 0.5, y);
          ctx.stroke();
        }
        
        for (let i = 0; i < 6; i++) {
          const x = centerX + offsetX - faceWidth * 0.5 + (i * faceWidth * 0.2);
          ctx.beginPath();
          ctx.moveTo(x, centerY - faceHeight * 0.6);
          ctx.lineTo(x, centerY + faceHeight * 0.5);
          ctx.stroke();
        }
        
        // Enhanced depth perception overlay
        ctx.strokeStyle = '#0099cc';
        ctx.lineWidth = 0.8;
        ctx.globalAlpha = 0.3;
        
        if (rotation > 5) {
          // Right profile depth indicators
          ctx.beginPath();
          ctx.moveTo(centerX + offsetX + faceWidth * 0.3, centerY - faceHeight * 0.4);
          ctx.lineTo(centerX + offsetX + faceWidth * 0.35, centerY - faceHeight * 0.2);
          ctx.moveTo(centerX + offsetX + faceWidth * 0.25, centerY);
          ctx.lineTo(centerX + offsetX + faceWidth * 0.3, centerY + faceHeight * 0.1);
          ctx.stroke();
        } else if (rotation < -5) {
          // Left profile depth indicators
          ctx.beginPath();
          ctx.moveTo(centerX + offsetX - faceWidth * 0.3, centerY - faceHeight * 0.4);
          ctx.lineTo(centerX + offsetX - faceWidth * 0.35, centerY - faceHeight * 0.2);
          ctx.moveTo(centerX + offsetX - faceWidth * 0.25, centerY);
          ctx.lineTo(centerX + offsetX - faceWidth * 0.3, centerY + faceHeight * 0.1);
          ctx.stroke();
        }
      };
      
      const drawDetailedEyes = () => {
        const eyeY = centerY - 12;
        const eyeWidth = 14 * perspective;
        const eyeHeight = 7;
        
        ctx.strokeStyle = '#00e6ff';
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.9;
        
        if (rotation > 15) {
          // Right profile - left eye only
          const eyeX = centerX + offsetX - 15;
          
          // Eye socket
          ctx.beginPath();
          ctx.ellipse(eyeX, eyeY, eyeWidth * 0.8, eyeHeight, 0, 0, 2 * Math.PI);
          ctx.stroke();
          
          // Iris
          ctx.fillStyle = 'rgba(0, 150, 200, 0.7)';
          ctx.beginPath();
          ctx.ellipse(eyeX, eyeY, eyeWidth * 0.5, eyeHeight * 0.8, 0, 0, 2 * Math.PI);
          ctx.fill();
          
          // Pupil
          ctx.fillStyle = '#000';
          ctx.beginPath();
          ctx.ellipse(eyeX, eyeY, eyeWidth * 0.2, eyeHeight * 0.4, 0, 0, 2 * Math.PI);
          ctx.fill();
          
          // Eyelid
          ctx.strokeStyle = '#0080b3';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.ellipse(eyeX, eyeY - 1, eyeWidth * 0.8, eyeHeight * 0.5, 0, 0, Math.PI);
          ctx.stroke();
          
          // Eyebrow
          ctx.strokeStyle = '#00e6ff';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(eyeX - eyeWidth * 0.6, eyeY - 15);
          ctx.quadraticCurveTo(eyeX, eyeY - 18, eyeX + eyeWidth * 0.6, eyeY - 14);
          ctx.stroke();
          
        } else if (rotation < -15) {
          // Left profile - right eye only
          const eyeX = centerX + offsetX + 15;
          
          ctx.beginPath();
          ctx.ellipse(eyeX, eyeY, eyeWidth * 0.8, eyeHeight, 0, 0, 2 * Math.PI);
          ctx.stroke();
          
          ctx.fillStyle = 'rgba(0, 150, 200, 0.7)';
          ctx.beginPath();
          ctx.ellipse(eyeX, eyeY, eyeWidth * 0.5, eyeHeight * 0.8, 0, 0, 2 * Math.PI);
          ctx.fill();
          
          ctx.fillStyle = '#000';
          ctx.beginPath();
          ctx.ellipse(eyeX, eyeY, eyeWidth * 0.2, eyeHeight * 0.4, 0, 0, 2 * Math.PI);
          ctx.fill();
          
          ctx.strokeStyle = '#0080b3';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.ellipse(eyeX, eyeY - 1, eyeWidth * 0.8, eyeHeight * 0.5, 0, 0, Math.PI);
          ctx.stroke();
          
          ctx.strokeStyle = '#00e6ff';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(eyeX - eyeWidth * 0.6, eyeY - 14);
          ctx.quadraticCurveTo(eyeX, eyeY - 18, eyeX + eyeWidth * 0.6, eyeY - 15);
          ctx.stroke();
          
        } else {
          // Front view - both eyes
          const leftEyeX = centerX + offsetX - 20;
          const rightEyeX = centerX + offsetX + 20;
          
          // Left eye
          ctx.beginPath();
          ctx.ellipse(leftEyeX, eyeY, eyeWidth, eyeHeight, 0, 0, 2 * Math.PI);
          ctx.stroke();
          
          ctx.fillStyle = 'rgba(0, 150, 200, 0.7)';
          ctx.beginPath();
          ctx.ellipse(leftEyeX, eyeY, eyeWidth * 0.6, eyeHeight * 0.9, 0, 0, 2 * Math.PI);
          ctx.fill();
          
          ctx.fillStyle = '#000';
          ctx.beginPath();
          ctx.ellipse(leftEyeX, eyeY, eyeWidth * 0.25, eyeHeight * 0.5, 0, 0, 2 * Math.PI);
          ctx.fill();
          
          // Right eye
          ctx.strokeStyle = '#00e6ff';
          ctx.beginPath();
          ctx.ellipse(rightEyeX, eyeY, eyeWidth, eyeHeight, 0, 0, 2 * Math.PI);
          ctx.stroke();
          
          ctx.fillStyle = 'rgba(0, 150, 200, 0.7)';
          ctx.beginPath();
          ctx.ellipse(rightEyeX, eyeY, eyeWidth * 0.6, eyeHeight * 0.9, 0, 0, 2 * Math.PI);
          ctx.fill();
          
          ctx.fillStyle = '#000';
          ctx.beginPath();
          ctx.ellipse(rightEyeX, eyeY, eyeWidth * 0.25, eyeHeight * 0.5, 0, 0, 2 * Math.PI);
          ctx.fill();
          
          // Eyelids
          ctx.strokeStyle = '#0080b3';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.ellipse(leftEyeX, eyeY - 1, eyeWidth, eyeHeight * 0.5, 0, 0, Math.PI);
          ctx.ellipse(rightEyeX, eyeY - 1, eyeWidth, eyeHeight * 0.5, 0, 0, Math.PI);
          ctx.stroke();
          
          // Eyebrows
          ctx.strokeStyle = '#00e6ff';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(leftEyeX - eyeWidth * 0.7, eyeY - 15);
          ctx.quadraticCurveTo(leftEyeX, eyeY - 18, leftEyeX + eyeWidth * 0.7, eyeY - 14);
          ctx.moveTo(rightEyeX - eyeWidth * 0.7, eyeY - 14);
          ctx.quadraticCurveTo(rightEyeX, eyeY - 18, rightEyeX + eyeWidth * 0.7, eyeY - 15);
          ctx.stroke();
        }
      };
      
      const drawRealisticNose = () => {
        ctx.strokeStyle = '#00e6ff';
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.85;
        
        const noseY = centerY + 5;
        
        if (rotation > 15) {
          // Right profile nose
          const noseX = centerX + offsetX - 20;
          
          // Nose bridge
          ctx.beginPath();
          ctx.moveTo(noseX + 5, centerY - 15);
          ctx.quadraticCurveTo(noseX + 2, noseY, noseX, noseY + 10);
          ctx.stroke();
          
          // Nose tip
          ctx.beginPath();
          ctx.arc(noseX, noseY + 10, 2, 0, 2 * Math.PI);
          ctx.stroke();
          
          // Nostril
          ctx.fillStyle = 'rgba(0, 60, 80, 0.8)';
          ctx.beginPath();
          ctx.ellipse(noseX + 3, noseY + 8, 1.5, 2.5, Math.PI * 0.2, 0, 2 * Math.PI);
          ctx.fill();
          
        } else if (rotation < -15) {
          // Left profile nose
          const noseX = centerX + offsetX + 20;
          
          ctx.beginPath();
          ctx.moveTo(noseX - 5, centerY - 15);
          ctx.quadraticCurveTo(noseX - 2, noseY, noseX, noseY + 10);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.arc(noseX, noseY + 10, 2, 0, 2 * Math.PI);
          ctx.stroke();
          
          ctx.fillStyle = 'rgba(0, 60, 80, 0.8)';
          ctx.beginPath();
          ctx.ellipse(noseX - 3, noseY + 8, 1.5, 2.5, -Math.PI * 0.2, 0, 2 * Math.PI);
          ctx.fill();
          
        } else {
          // Front view nose
          const noseX = centerX + offsetX;
          
          // Nose bridge
          ctx.beginPath();
          ctx.moveTo(noseX, centerY - 15);
          ctx.lineTo(noseX, noseY + 8);
          ctx.stroke();
          
          // Nose sides
          ctx.beginPath();
          ctx.moveTo(noseX - 6, noseY);
          ctx.quadraticCurveTo(noseX - 3, noseY + 10, noseX, noseY + 12);
          ctx.quadraticCurveTo(noseX + 3, noseY + 10, noseX + 6, noseY);
          ctx.stroke();
          
          // Nostrils
          ctx.fillStyle = 'rgba(0, 60, 80, 0.8)';
          ctx.beginPath();
          ctx.ellipse(noseX - 3, noseY + 8, 1.5, 2.5, 0, 0, 2 * Math.PI);
          ctx.ellipse(noseX + 3, noseY + 8, 1.5, 2.5, 0, 0, 2 * Math.PI);
          ctx.fill();
        }
      };
      
      const drawDetailedMouth = () => {
        ctx.strokeStyle = '#00e6ff';
        ctx.lineWidth = 1.8;
        ctx.globalAlpha = 0.9;
        
        const mouthY = centerY + 28;
        
        if (rotation > 15) {
          // Right profile mouth
          const mouthX = centerX + offsetX - 12;
          
          ctx.beginPath();
          ctx.moveTo(mouthX - 15, mouthY + 1);
          ctx.quadraticCurveTo(mouthX - 5, mouthY + 8, mouthX + 8, mouthY + 3);
          ctx.stroke();
          
          // Lip definition
          ctx.strokeStyle = '#0099cc';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(mouthX - 12, mouthY);
          ctx.quadraticCurveTo(mouthX - 2, mouthY + 5, mouthX + 5, mouthY + 1);
          ctx.stroke();
          
        } else if (rotation < -15) {
          // Left profile mouth
          const mouthX = centerX + offsetX + 12;
          
          ctx.beginPath();
          ctx.moveTo(mouthX - 8, mouthY + 3);
          ctx.quadraticCurveTo(mouthX + 5, mouthY + 8, mouthX + 15, mouthY + 1);
          ctx.stroke();
          
          ctx.strokeStyle = '#0099cc';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(mouthX - 5, mouthY + 1);
          ctx.quadraticCurveTo(mouthX + 2, mouthY + 5, mouthX + 12, mouthY);
          ctx.stroke();
          
        } else {
          // Front view mouth
          const mouthX = centerX + offsetX;
          
          // Upper lip
          ctx.beginPath();
          ctx.moveTo(mouthX - 16, mouthY);
          ctx.quadraticCurveTo(mouthX - 5, mouthY - 3, mouthX, mouthY - 1);
          ctx.quadraticCurveTo(mouthX + 5, mouthY - 3, mouthX + 16, mouthY);
          ctx.stroke();
          
          // Lower lip
          ctx.beginPath();
          ctx.moveTo(mouthX - 16, mouthY);
          ctx.quadraticCurveTo(mouthX, mouthY + 10, mouthX + 16, mouthY);
          ctx.stroke();
          
          // Lip center
          ctx.strokeStyle = '#0099cc';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(mouthX - 13, mouthY + 2);
          ctx.quadraticCurveTo(mouthX, mouthY + 4, mouthX + 13, mouthY + 2);
          ctx.stroke();
        }
      };
      
      // Draw realistic face with biometric overlay
      drawRealisticFace();
      
      // Only draw detailed features if image isn't loaded (fallback)
      if (!imageLoaded) {
        drawDetailedEyes();
        drawRealisticNose();
        drawDetailedMouth();
      }
      
      // Advanced 3D scanning grid
      ctx.strokeStyle = '#40e0d0';
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.3;
      
      for (let i = 0; i < 10; i++) {
        const x = centerX + offsetX - 50 + (i * 10);
        const depthOffset = Math.sin(x * 0.05) * Math.abs(sinAngle) * 3;
        
        ctx.beginPath();
        ctx.moveTo(x + depthOffset, centerY - 70);
        ctx.lineTo(x + depthOffset, centerY + 70);
        ctx.stroke();
      }
      
      for (let i = 0; i < 14; i++) {
        const y = centerY - 70 + (i * 10);
        const depthOffset = Math.cos(y * 0.03) * offsetX * 0.3;
        
        ctx.beginPath();
        ctx.moveTo(centerX + offsetX - 50 + depthOffset, y);
        ctx.lineTo(centerX + offsetX + 50 + depthOffset, y);
        ctx.stroke();
      }
      
      // Scanning beam with 3D effect
      ctx.strokeStyle = '#00ff41';
      ctx.lineWidth = 2.5;
      ctx.globalAlpha = 0.95;
      
      const scanY = (progress / 100) * canvas.height;
      
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(canvas.width, scanY);
      ctx.stroke();
      
      // Scanning glow
      const gradient = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 20);
      gradient.addColorStop(0, 'rgba(0, 255, 65, 0)');
      gradient.addColorStop(0.5, 'rgba(0, 255, 65, 0.7)');
      gradient.addColorStop(1, 'rgba(0, 255, 65, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - 20, canvas.width, 40);
      
      // Biometric landmarks with anatomical precision
      ctx.fillStyle = '#00ff7f';
      ctx.globalAlpha = 1;
      
      const landmarks = getAnatomicalPoints(rotation, centerX, centerY, offsetX, perspective);
      
      landmarks.forEach((point, index) => {
        if (scanY >= point.y - 10) {
          const size = 2.5 + (point.importance * 0.8);
          
          ctx.beginPath();
          ctx.arc(point.x, point.y, size, 0, 2 * Math.PI);
          ctx.fill();
          
          // Enhanced connection lines
          ctx.strokeStyle = `rgba(0, 255, 127, ${0.6 + point.importance * 0.4})`;
          ctx.lineWidth = 1 + point.importance * 0.5;
          
          const lineLength = 25 + point.importance * 10;
          const angle = (index * 40 + rotation * 2) * (Math.PI / 180);
          
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(
            point.x + Math.cos(angle) * lineLength,
            point.y + Math.sin(angle) * lineLength
          );
          ctx.stroke();
          
          // Enhanced labels
          ctx.globalAlpha = 0.9;
          ctx.fillStyle = '#00ff7f';
          ctx.font = 'bold 8px monospace';
          ctx.fillText(
            point.name,
            point.x + Math.cos(angle) * (lineLength + 8),
            point.y + Math.sin(angle) * (lineLength + 8)
          );
        }
      });
      
      ctx.restore();
      
      // Update animation values
      progress += scanDirection * 1.3;
      if (progress >= 100) {
        scanDirection = -1;
        progress = 100;
      } else if (progress <= 0) {
        scanDirection = 1;
        progress = 0;
      }
      
      rotation += rotationDirection * 0.4;
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

    const getAnatomicalPoints = (rotation: number, centerX: number, centerY: number, offsetX: number, perspective: number) => {
      const points = [];
      
      if (rotation > 15) {
        // Right profile anatomical points
        points.push(
          { x: centerX + offsetX - 15, y: centerY - 12, name: 'L_EYE', importance: 1 },
          { x: centerX + offsetX - 18, y: centerY - 16, name: 'L_BROW', importance: 0.8 },
          { x: centerX + offsetX - 20, y: centerY + 5, name: 'NOSE_TIP', importance: 1 },
          { x: centerX + offsetX - 17, y: centerY + 8, name: 'NOSTRIL', importance: 0.6 },
          { x: centerX + offsetX - 12, y: centerY + 28, name: 'MOUTH', importance: 0.9 },
          { x: centerX + offsetX - 5, y: centerY + 50, name: 'CHIN', importance: 0.7 },
          { x: centerX + offsetX - 30, y: centerY + 20, name: 'JAW', importance: 0.5 }
        );
      } else if (rotation < -15) {
        // Left profile anatomical points
        points.push(
          { x: centerX + offsetX + 15, y: centerY - 12, name: 'R_EYE', importance: 1 },
          { x: centerX + offsetX + 18, y: centerY - 16, name: 'R_BROW', importance: 0.8 },
          { x: centerX + offsetX + 20, y: centerY + 5, name: 'NOSE_TIP', importance: 1 },
          { x: centerX + offsetX + 17, y: centerY + 8, name: 'NOSTRIL', importance: 0.6 },
          { x: centerX + offsetX + 12, y: centerY + 28, name: 'MOUTH', importance: 0.9 },
          { x: centerX + offsetX + 5, y: centerY + 50, name: 'CHIN', importance: 0.7 },
          { x: centerX + offsetX + 30, y: centerY + 20, name: 'JAW', importance: 0.5 }
        );
      } else {
        // Front view comprehensive mapping
        points.push(
          { x: centerX + offsetX - 20, y: centerY - 12, name: 'L_EYE', importance: 1 },
          { x: centerX + offsetX + 20, y: centerY - 12, name: 'R_EYE', importance: 1 },
          { x: centerX + offsetX - 22, y: centerY - 16, name: 'L_BROW', importance: 0.8 },
          { x: centerX + offsetX + 22, y: centerY - 16, name: 'R_BROW', importance: 0.8 },
          { x: centerX + offsetX, y: centerY + 5, name: 'NOSE_TIP', importance: 1 },
          { x: centerX + offsetX - 3, y: centerY + 8, name: 'L_NOSTRIL', importance: 0.6 },
          { x: centerX + offsetX + 3, y: centerY + 8, name: 'R_NOSTRIL', importance: 0.6 },
          { x: centerX + offsetX - 16, y: centerY + 28, name: 'L_MOUTH', importance: 0.9 },
          { x: centerX + offsetX + 16, y: centerY + 28, name: 'R_MOUTH', importance: 0.9 },
          { x: centerX + offsetX, y: centerY + 30, name: 'MOUTH_CTR', importance: 0.8 },
          { x: centerX + offsetX, y: centerY + 50, name: 'CHIN_CTR', importance: 0.7 },
          { x: centerX + offsetX - 30, y: centerY + 20, name: 'L_JAW', importance: 0.5 },
          { x: centerX + offsetX + 30, y: centerY + 20, name: 'R_JAW', importance: 0.5 }
        );
      }
      
      return points;
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
        className="rounded-lg bg-slate-900/40 border border-cyan-400/50 shadow-xl shadow-cyan-400/30"
      />
      
      {/* Enhanced status display */}
      <div className="absolute -bottom-12 left-0 right-0 text-center">
        <div className="text-xs text-cyan-300 font-mono tracking-wide">
          {isScanning ? `BIOMETRIC ANALYSIS ${Math.round(scanProgress)}% | ${Math.round(rotationAngle)}°` : 'SCAN COMPLETE'}
        </div>
        <div className="flex justify-center mt-2 space-x-1">
          {[15, 35, 55, 75, 90].map((threshold, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                scanProgress > threshold ? 'bg-green-400 shadow-sm shadow-green-400' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Corner targeting reticles */}
      <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-cyan-300 opacity-90"></div>
      <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-cyan-300 opacity-90"></div>
      <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-cyan-300 opacity-90"></div>
      <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-cyan-300 opacity-90"></div>
      
      {/* Side identification labels */}
      <div className="absolute -left-24 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-orange-300 font-mono tracking-widest">
        3D BIOMETRIC
      </div>
      <div className="absolute -right-24 top-1/2 transform -translate-y-1/2 rotate-90 text-xs text-orange-300 font-mono tracking-widest">
        DEPTH SCAN
      </div>
    </div>
  );
}
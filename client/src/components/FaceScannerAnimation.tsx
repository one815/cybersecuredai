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
      
      // Calculate 3D transformation variables
      const rotationRad = (rotation * Math.PI) / 180;
      const cosAngle = Math.cos(rotationRad);
      const sinAngle = Math.sin(rotationRad);
      const perspective = 0.8 + (Math.abs(cosAngle) * 0.2);
      const offsetX = sinAngle * 8;
      
      // Save canvas state
      ctx.save();
      
      // Draw advanced wireframe face structure with enhanced 3D mesh
      const drawWireframeFace = () => {
        ctx.strokeStyle = '#00e6ff';
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = 0.85;
        
        const faceWidth = 50 * perspective;
        const faceHeight = 70;
        
        // Create detailed wireframe mesh pattern
        const meshPoints = [];
        
        // Generate facial mesh grid points based on anatomical landmarks
        for (let i = 0; i < 8; i++) {
          for (let j = 0; j < 10; j++) {
            const x = centerX + offsetX - faceWidth * 0.4 + (i / 7) * faceWidth * 0.8;
            const y = centerY - faceHeight * 0.5 + (j / 9) * faceHeight;
            
            // Create facial contour deformation
            let deformationX = 0;
            let deformationY = 0;
            
            // Forehead curve
            if (j < 3) {
              const foreheadFactor = (3 - j) / 3;
              deformationX = Math.sin((i / 7) * Math.PI) * 8 * foreheadFactor * perspective;
              deformationY = -foreheadFactor * 5;
            }
            
            // Cheek area
            if (j >= 3 && j <= 6) {
              const cheekFactor = Math.abs(i - 3.5) / 3.5;
              deformationX = cheekFactor * 12 * perspective;
            }
            
            // Jaw area
            if (j > 6) {
              const jawFactor = (j - 6) / 3;
              const jawCurve = 1 - Math.abs(i - 3.5) / 3.5;
              deformationX = Math.sin((i / 7) * Math.PI) * 6 * jawFactor * perspective;
              deformationY = jawFactor * jawCurve * 8;
            }
            
            meshPoints.push({
              x: x + deformationX,
              y: y + deformationY,
              i,
              j
            });
          }
        }
        
        // Draw horizontal mesh lines
        for (let j = 0; j < 10; j++) {
          ctx.beginPath();
          for (let i = 0; i < 8; i++) {
            const point = meshPoints[j * 8 + i];
            if (i === 0) {
              ctx.moveTo(point.x, point.y);
            } else {
              ctx.lineTo(point.x, point.y);
            }
          }
          ctx.stroke();
        }
        
        // Draw vertical mesh lines
        for (let i = 0; i < 8; i++) {
          ctx.beginPath();
          for (let j = 0; j < 10; j++) {
            const point = meshPoints[j * 8 + i];
            if (j === 0) {
              ctx.moveTo(point.x, point.y);
            } else {
              ctx.lineTo(point.x, point.y);
            }
          }
          ctx.stroke();
        }
        
        // Draw facial feature wireframes
        ctx.strokeStyle = '#40e0d0';
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.9;
        
        // Eye wireframes
        const eyeY = centerY - 12;
        if (rotation > -15 && rotation < 15) {
          // Front view - both eyes
          const leftEyeX = centerX + offsetX - 16;
          const rightEyeX = centerX + offsetX + 16;
          
          // Left eye wireframe
          ctx.beginPath();
          ctx.ellipse(leftEyeX, eyeY, 8 * perspective, 4, 0, 0, 2 * Math.PI);
          ctx.moveTo(leftEyeX - 6 * perspective, eyeY);
          ctx.lineTo(leftEyeX + 6 * perspective, eyeY);
          ctx.moveTo(leftEyeX, eyeY - 3);
          ctx.lineTo(leftEyeX, eyeY + 3);
          ctx.stroke();
          
          // Right eye wireframe
          ctx.beginPath();
          ctx.ellipse(rightEyeX, eyeY, 8 * perspective, 4, 0, 0, 2 * Math.PI);
          ctx.moveTo(rightEyeX - 6 * perspective, eyeY);
          ctx.lineTo(rightEyeX + 6 * perspective, eyeY);
          ctx.moveTo(rightEyeX, eyeY - 3);
          ctx.lineTo(rightEyeX, eyeY + 3);
          ctx.stroke();
        } else {
          // Profile view - single eye
          const eyeX = centerX + offsetX + (rotation > 0 ? -10 : 10);
          ctx.beginPath();
          ctx.ellipse(eyeX, eyeY, 6 * perspective, 4, 0, 0, 2 * Math.PI);
          ctx.moveTo(eyeX - 4 * perspective, eyeY);
          ctx.lineTo(eyeX + 4 * perspective, eyeY);
          ctx.stroke();
        }
        
        // Nose wireframe
        const noseX = centerX + offsetX;
        const noseY = centerY + 2;
        
        ctx.beginPath();
        ctx.moveTo(noseX, centerY - 10);
        ctx.lineTo(noseX - 4 * perspective, noseY + 6);
        ctx.lineTo(noseX + 4 * perspective, noseY + 6);
        ctx.closePath();
        
        // Nostril details
        ctx.moveTo(noseX - 3 * perspective, noseY + 4);
        ctx.arc(noseX - 2 * perspective, noseY + 4, 1, 0, 2 * Math.PI);
        ctx.moveTo(noseX + 3 * perspective, noseY + 4);
        ctx.arc(noseX + 2 * perspective, noseY + 4, 1, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Mouth wireframe
        const mouthY = centerY + 22;
        const mouthWidth = 12 * perspective;
        
        ctx.beginPath();
        ctx.moveTo(noseX - mouthWidth, mouthY - 2);
        ctx.quadraticCurveTo(noseX, mouthY + 2, noseX + mouthWidth, mouthY - 2);
        ctx.moveTo(noseX - mouthWidth, mouthY + 2);
        ctx.quadraticCurveTo(noseX, mouthY - 2, noseX + mouthWidth, mouthY + 2);
        ctx.stroke();
      };

      // Draw geometric face structure - focus on facial geometry and proportions
      const drawGeometricFace = () => {
        // Draw the advanced wireframe face
        drawWireframeFace();
        ctx.strokeStyle = '#00e6ff';
        ctx.lineWidth = 1.8;
        ctx.globalAlpha = 0.9;
        
        const faceWidth = 55 * perspective;
        const faceHeight = 75;
        
        // Main facial structure outline (golden ratio proportions)
        ctx.beginPath();
        
        // Forehead (upper third)
        ctx.moveTo(centerX + offsetX, centerY - faceHeight * 0.6);
        ctx.quadraticCurveTo(
          centerX + offsetX - faceWidth * 0.45, centerY - faceHeight * 0.55,
          centerX + offsetX - faceWidth * 0.4, centerY - faceHeight * 0.35
        );
        
        // Temple to cheekbone (middle third)
        ctx.quadraticCurveTo(
          centerX + offsetX - faceWidth * 0.48, centerY - faceHeight * 0.15,
          centerX + offsetX - faceWidth * 0.45, centerY + faceHeight * 0.05
        );
        
        // Cheek to jawline (lower third)
        ctx.quadraticCurveTo(
          centerX + offsetX - faceWidth * 0.42, centerY + faceHeight * 0.25,
          centerX + offsetX - faceWidth * 0.22, centerY + faceHeight * 0.45
        );
        
        // Jaw to chin
        ctx.quadraticCurveTo(
          centerX + offsetX, centerY + faceHeight * 0.5,
          centerX + offsetX + faceWidth * 0.22, centerY + faceHeight * 0.45
        );
        
        // Right side (mirror)
        ctx.quadraticCurveTo(
          centerX + offsetX + faceWidth * 0.42, centerY + faceHeight * 0.25,
          centerX + offsetX + faceWidth * 0.45, centerY + faceHeight * 0.05
        );
        
        ctx.quadraticCurveTo(
          centerX + offsetX + faceWidth * 0.48, centerY - faceHeight * 0.15,
          centerX + offsetX + faceWidth * 0.4, centerY - faceHeight * 0.35
        );
        
        ctx.quadraticCurveTo(
          centerX + offsetX + faceWidth * 0.45, centerY - faceHeight * 0.55,
          centerX + offsetX, centerY - faceHeight * 0.6
        );
        
        ctx.closePath();
        ctx.stroke();
        
        // Facial structure guidelines (anatomical proportions)
        ctx.strokeStyle = '#0099cc';
        ctx.lineWidth = 0.8;
        ctx.globalAlpha = 0.6;
        
        // Horizontal division lines (rule of thirds)
        const divisions = [
          { y: centerY - faceHeight * 0.35, label: 'BROW_LINE' },
          { y: centerY + faceHeight * 0.05, label: 'NOSE_BASE' },
          { y: centerY + faceHeight * 0.25, label: 'MOUTH_LINE' }
        ];
        
        divisions.forEach(div => {
          ctx.beginPath();
          ctx.moveTo(centerX + offsetX - faceWidth * 0.5, div.y);
          ctx.lineTo(centerX + offsetX + faceWidth * 0.5, div.y);
          ctx.stroke();
        });
        
        // Vertical symmetry line
        ctx.beginPath();
        ctx.moveTo(centerX + offsetX, centerY - faceHeight * 0.6);
        ctx.lineTo(centerX + offsetX, centerY + faceHeight * 0.5);
        ctx.stroke();
      };
      
      const drawStructuralFeatures = () => {
        const eyeY = centerY - 12;
        const eyeWidth = 12 * perspective;
        const eyeHeight = 6;
        
        ctx.strokeStyle = '#00e6ff';
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = 0.85;
        
        if (rotation > 12) {
          // Right profile - geometric eye structure
          const eyeX = centerX + offsetX - 12;
          
          // Eye socket geometry
          ctx.beginPath();
          ctx.ellipse(eyeX, eyeY, eyeWidth * 0.9, eyeHeight, 0, 0, 2 * Math.PI);
          ctx.stroke();
          
          // Structural cross-hairs
          ctx.beginPath();
          ctx.moveTo(eyeX - eyeWidth * 0.6, eyeY);
          ctx.lineTo(eyeX + eyeWidth * 0.6, eyeY);
          ctx.moveTo(eyeX, eyeY - eyeHeight);
          ctx.lineTo(eyeX, eyeY + eyeHeight);
          ctx.stroke();
          
        } else if (rotation < -12) {
          // Left profile - geometric eye structure
          const eyeX = centerX + offsetX + 12;
          
          ctx.beginPath();
          ctx.ellipse(eyeX, eyeY, eyeWidth * 0.9, eyeHeight, 0, 0, 2 * Math.PI);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.moveTo(eyeX - eyeWidth * 0.6, eyeY);
          ctx.lineTo(eyeX + eyeWidth * 0.6, eyeY);
          ctx.moveTo(eyeX, eyeY - eyeHeight);
          ctx.lineTo(eyeX, eyeY + eyeHeight);
          ctx.stroke();
          
        } else {
          // Front view - both geometric eye structures
          const leftEyeX = centerX + offsetX - 18;
          const rightEyeX = centerX + offsetX + 18;
          
          // Left eye geometry
          ctx.beginPath();
          ctx.ellipse(leftEyeX, eyeY, eyeWidth, eyeHeight, 0, 0, 2 * Math.PI);
          ctx.stroke();
          
          // Right eye geometry
          ctx.beginPath();
          ctx.ellipse(rightEyeX, eyeY, eyeWidth, eyeHeight, 0, 0, 2 * Math.PI);
          ctx.stroke();
          
          // Structural cross-hairs for both eyes
          ctx.beginPath();
          ctx.moveTo(leftEyeX - eyeWidth * 0.8, eyeY);
          ctx.lineTo(leftEyeX + eyeWidth * 0.8, eyeY);
          ctx.moveTo(leftEyeX, eyeY - eyeHeight);
          ctx.lineTo(leftEyeX, eyeY + eyeHeight);
          
          ctx.moveTo(rightEyeX - eyeWidth * 0.8, eyeY);
          ctx.lineTo(rightEyeX + eyeWidth * 0.8, eyeY);
          ctx.moveTo(rightEyeX, eyeY - eyeHeight);
          ctx.lineTo(rightEyeX, eyeY + eyeHeight);
          ctx.stroke();
        }
        
        // Nose geometry (structural triangle)
        ctx.strokeStyle = '#00e6ff';
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = 0.8;
        
        const noseY = centerY + 5;
        const noseX = centerX + offsetX;
        
        ctx.beginPath();
        ctx.moveTo(noseX, centerY - 15);
        ctx.lineTo(noseX - 6 * perspective, noseY + 8);
        ctx.lineTo(noseX + 6 * perspective, noseY + 8);
        ctx.closePath();
        ctx.stroke();
        
        // Mouth geometry (structural rectangle)
        const mouthY = centerY + 25;
        const mouthWidth = 14 * perspective;
        
        ctx.beginPath();
        ctx.rect(noseX - mouthWidth, mouthY - 3, mouthWidth * 2, 6);
        ctx.stroke();
        
        // Mouth center line
        ctx.beginPath();
        ctx.moveTo(noseX - mouthWidth, mouthY);
        ctx.lineTo(noseX + mouthWidth, mouthY);
        ctx.stroke();
      };
      
      // Draw structural framework
      drawGeometricFace();
      drawStructuralFeatures();
      
      // Advanced measurement grid
      ctx.strokeStyle = '#40e0d0';
      ctx.lineWidth = 0.4;
      ctx.globalAlpha = 0.25;
      
      // Precise measurement grid
      for (let i = 0; i < 12; i++) {
        const x = centerX + offsetX - 60 + (i * 10);
        const depthOffset = Math.sin(x * 0.08) * Math.abs(sinAngle) * 2;
        
        ctx.beginPath();
        ctx.moveTo(x + depthOffset, centerY - 70);
        ctx.lineTo(x + depthOffset, centerY + 70);
        ctx.stroke();
      }
      
      for (let i = 0; i < 14; i++) {
        const y = centerY - 70 + (i * 10);
        const depthOffset = Math.cos(y * 0.05) * offsetX * 0.2;
        
        ctx.beginPath();
        ctx.moveTo(centerX + offsetX - 60 + depthOffset, y);
        ctx.lineTo(centerX + offsetX + 60 + depthOffset, y);
        ctx.stroke();
      }
      
      // Scanning beam
      ctx.strokeStyle = '#00ff41';
      ctx.lineWidth = 2.2;
      ctx.globalAlpha = 0.9;
      
      const scanY = (progress / 100) * canvas.height;
      
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(canvas.width, scanY);
      ctx.stroke();
      
      // Scanning glow effect
      const gradient = ctx.createLinearGradient(0, scanY - 18, 0, scanY + 18);
      gradient.addColorStop(0, 'rgba(0, 255, 65, 0)');
      gradient.addColorStop(0.5, 'rgba(0, 255, 65, 0.6)');
      gradient.addColorStop(1, 'rgba(0, 255, 65, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - 18, canvas.width, 36);
      
      // Geometric measurement points
      ctx.fillStyle = '#00ff7f';
      ctx.globalAlpha = 1;
      
      const measurementPoints = getGeometricPoints(rotation, centerX, centerY, offsetX, perspective);
      
      measurementPoints.forEach((point, index) => {
        if (scanY >= point.y - 8) {
          const size = 2 + (point.importance * 0.6);
          
          ctx.beginPath();
          ctx.arc(point.x, point.y, size, 0, 2 * Math.PI);
          ctx.fill();
          
          // Measurement lines
          ctx.strokeStyle = `rgba(0, 255, 127, ${0.5 + point.importance * 0.4})`;
          ctx.lineWidth = 0.8 + point.importance * 0.3;
          
          const lineLength = 20 + point.importance * 8;
          const angle = (index * 35 + rotation) * (Math.PI / 180);
          
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(
            point.x + Math.cos(angle) * lineLength,
            point.y + Math.sin(angle) * lineLength
          );
          ctx.stroke();
          
          // Measurement labels
          ctx.globalAlpha = 0.8;
          ctx.fillStyle = '#00ff7f';
          ctx.font = 'bold 7px monospace';
          ctx.fillText(
            point.name,
            point.x + Math.cos(angle) * (lineLength + 6),
            point.y + Math.sin(angle) * (lineLength + 6)
          );
        }
      });
      
      ctx.restore();
      
      // Update animation values (slower movement)
      progress += scanDirection * 1.1;
      if (progress >= 100) {
        scanDirection = -1;
        progress = 100;
      } else if (progress <= 0) {
        scanDirection = 1;
        progress = 0;
      }
      
      rotation += rotationDirection * 0.3; // Much slower rotation
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

    const getGeometricPoints = (rotation: number, centerX: number, centerY: number, offsetX: number, perspective: number) => {
      const points = [];
      
      if (rotation > 12) {
        // Right profile measurement points
        points.push(
          { x: centerX + offsetX - 12, y: centerY - 12, name: 'L_EYE_CTR', importance: 1 },
          { x: centerX + offsetX - 15, y: centerY - 16, name: 'L_BROW_PT', importance: 0.8 },
          { x: centerX + offsetX - 6, y: centerY + 5, name: 'NOSE_TIP', importance: 1 },
          { x: centerX + offsetX - 14, y: centerY + 25, name: 'MOUTH_CTR', importance: 0.9 },
          { x: centerX + offsetX - 8, y: centerY + 45, name: 'CHIN_PT', importance: 0.7 },
          { x: centerX + offsetX - 25, y: centerY + 15, name: 'JAW_ANGLE', importance: 0.6 }
        );
      } else if (rotation < -12) {
        // Left profile measurement points
        points.push(
          { x: centerX + offsetX + 12, y: centerY - 12, name: 'R_EYE_CTR', importance: 1 },
          { x: centerX + offsetX + 15, y: centerY - 16, name: 'R_BROW_PT', importance: 0.8 },
          { x: centerX + offsetX + 6, y: centerY + 5, name: 'NOSE_TIP', importance: 1 },
          { x: centerX + offsetX + 14, y: centerY + 25, name: 'MOUTH_CTR', importance: 0.9 },
          { x: centerX + offsetX + 8, y: centerY + 45, name: 'CHIN_PT', importance: 0.7 },
          { x: centerX + offsetX + 25, y: centerY + 15, name: 'JAW_ANGLE', importance: 0.6 }
        );
      } else {
        // Front view comprehensive measurement
        points.push(
          { x: centerX + offsetX - 18, y: centerY - 12, name: 'L_EYE_CTR', importance: 1 },
          { x: centerX + offsetX + 18, y: centerY - 12, name: 'R_EYE_CTR', importance: 1 },
          { x: centerX + offsetX - 20, y: centerY - 16, name: 'L_BROW_PT', importance: 0.8 },
          { x: centerX + offsetX + 20, y: centerY - 16, name: 'R_BROW_PT', importance: 0.8 },
          { x: centerX + offsetX, y: centerY + 5, name: 'NOSE_TIP', importance: 1 },
          { x: centerX + offsetX - 14, y: centerY + 25, name: 'L_MOUTH', importance: 0.9 },
          { x: centerX + offsetX + 14, y: centerY + 25, name: 'R_MOUTH', importance: 0.9 },
          { x: centerX + offsetX, y: centerY + 25, name: 'MOUTH_CTR', importance: 0.8 },
          { x: centerX + offsetX, y: centerY + 45, name: 'CHIN_CTR', importance: 0.7 },
          { x: centerX + offsetX - 25, y: centerY + 15, name: 'L_JAW', importance: 0.6 },
          { x: centerX + offsetX + 25, y: centerY + 15, name: 'R_JAW', importance: 0.6 }
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
      
      {/* Status display */}
      <div className="absolute -bottom-12 left-0 right-0 text-center">
        <div className="text-xs text-cyan-300 font-mono tracking-wide">
          {isScanning ? `GEOMETRIC SCAN ${Math.round(scanProgress)}% | ${Math.round(rotationAngle)}°` : 'ANALYSIS COMPLETE'}
        </div>
        <div className="flex justify-center mt-2 space-x-1">
          {[20, 40, 60, 80, 95].map((threshold, i) => (
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
      
      {/* Side labels */}
      <div className="absolute -left-24 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-orange-300 font-mono tracking-widest">
        GEOMETRIC
      </div>
      <div className="absolute -right-24 top-1/2 transform -translate-y-1/2 rotate-90 text-xs text-orange-300 font-mono tracking-widest">
        STRUCTURE
      </div>
    </div>
  );
}
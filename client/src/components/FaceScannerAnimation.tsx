import { useEffect, useRef, useState } from "react";
import biometricFaceImage from "@assets/3d image_1756256105586.jpg";

interface FaceScannerAnimationProps {
  className?: string;
}

export function FaceScannerAnimation({ className = "" }: FaceScannerAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(-25);
  const [isScanning, setIsScanning] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const animationRef = useRef<number>();

  useEffect(() => {
    // Load the biometric face image
    const img = new Image();
    img.src = biometricFaceImage;
    img.onload = () => {
      setImageLoaded(true);
      imgRef.current = img;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageLoaded || !imgRef.current) return;

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
      
      // Draw the biometric face image with transparency and 3D transformation
      const drawBiometricFace = () => {
        const img = imgRef.current;
        if (!img) return;
        
        ctx.save();
        
        // Apply 3D rotation transform
        const rotationRad = (rotation * Math.PI) / 180;
        const scaleX = Math.cos(rotationRad) * 0.8 + 0.2;
        const scaleY = 0.8;
        
        // Position and scale for the image
        const imgWidth = 180 * scaleX;
        const imgHeight = 180 * scaleY;
        const imgX = centerX + offsetX - imgWidth / 2;
        const imgY = centerY - imgHeight / 2;
        
        // Apply transparency and blend mode for futuristic effect
        ctx.globalAlpha = 0.85;
        ctx.globalCompositeOperation = 'screen';
        
        // Draw the biometric face image
        ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);
        
        ctx.restore();
      };
      
      // Draw additional wireframe overlay for enhanced biometric effect
      const drawWireframeFace = () => {
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.3;
        
        const headX = centerX + offsetX;
        const headY = centerY - 5;
        
        // Create 3D head vertex points for geometric assembly
        const vertices = [];
        const faces = [];
        
        // Define 3D head geometry vertices
        const baseVertices = [
          // Front face vertices (z = 0)
          [-30, -40, 0], [0, -45, 0], [30, -40, 0],    // Top forehead
          [-35, -20, 0], [-15, -25, 0], [0, -30, 0], [15, -25, 0], [35, -20, 0], // Upper face
          [-38, 0, 0], [-20, -5, 0], [0, -10, 0], [20, -5, 0], [38, 0, 0],       // Mid face
          [-35, 20, 0], [-15, 15, 0], [0, 10, 0], [15, 15, 0], [35, 20, 0],      // Lower face
          [-25, 40, 0], [0, 45, 0], [25, 40, 0],       // Jaw/chin
          
          // Back face vertices (z = -20) - for 3D depth
          [-25, -35, -20], [0, -40, -20], [25, -35, -20],
          [-30, -15, -20], [-12, -20, -20], [0, -25, -20], [12, -20, -20], [30, -15, -20],
          [-32, 5, -20], [-16, 0, -20], [0, -5, -20], [16, 0, -20], [32, 5, -20],
          [-30, 25, -20], [-12, 20, -20], [0, 15, -20], [12, 20, -20], [30, 25, -20],
          [-20, 35, -20], [0, 40, -20], [20, 35, -20]
        ];
        
        // Transform vertices to screen coordinates with 3D perspective
        baseVertices.forEach(([x, y, z]) => {
          const rotatedX = x * Math.cos(rotationRad) - z * Math.sin(rotationRad);
          const rotatedZ = x * Math.sin(rotationRad) + z * Math.cos(rotationRad);
          
          const scale = 200 / (200 + rotatedZ); // Perspective projection
          const screenX = headX + rotatedX * scale * perspective;
          const screenY = headY + y * scale;
          
          vertices.push({ x: screenX, y: screenY, z: rotatedZ });
        });
        
        // Define triangular faces for the 3D head mesh
        const faceIndices = [
          // Front face triangles
          [0, 1, 4], [1, 2, 6], [1, 4, 5], [1, 5, 6],
          [3, 4, 8], [4, 5, 9], [5, 6, 11], [6, 7, 12],
          [8, 9, 13], [9, 10, 14], [10, 11, 16], [11, 12, 17],
          [13, 14, 18], [14, 15, 19], [15, 16, 20], [16, 17, 20],
          
          // Side connections (front to back)
          [0, 21, 1], [1, 22, 2], [3, 24, 4], [4, 25, 5],
          [8, 29, 9], [9, 30, 10], [13, 34, 14], [14, 35, 15],
          
          // Additional geometric structure
          [5, 10, 15], [10, 15, 30], [4, 9, 14], [9, 14, 29]
        ];
        
        // Draw wireframe faces
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 0.8;
        ctx.globalAlpha = 0.25;
        
        faceIndices.forEach(face => {
          const [a, b, c] = face;
          if (vertices[a] && vertices[b] && vertices[c]) {
            ctx.beginPath();
            ctx.moveTo(vertices[a].x, vertices[a].y);
            ctx.lineTo(vertices[b].x, vertices[b].y);
            ctx.lineTo(vertices[c].x, vertices[c].y);
            ctx.closePath();
            ctx.stroke();
          }
        });
        
        // Draw main structural edges
        ctx.strokeStyle = '#40e0d0';
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.4;
        
        // Vertical structural lines
        const verticalConnections = [
          [0, 3, 8, 13, 18], // Left outline
          [1, 5, 10, 15, 19], // Center line
          [2, 7, 12, 17, 20], // Right outline
        ];
        
        verticalConnections.forEach(line => {
          ctx.beginPath();
          line.forEach((vertexIndex, i) => {
            if (vertices[vertexIndex]) {
              if (i === 0) {
                ctx.moveTo(vertices[vertexIndex].x, vertices[vertexIndex].y);
              } else {
                ctx.lineTo(vertices[vertexIndex].x, vertices[vertexIndex].y);
              }
            }
          });
          ctx.stroke();
        });
        
        // Horizontal structural lines
        const horizontalConnections = [
          [0, 1, 2], // Top
          [3, 4, 5, 6, 7], // Upper
          [8, 9, 10, 11, 12], // Middle
          [13, 14, 15, 16, 17], // Lower
          [18, 19, 20] // Bottom
        ];
        
        horizontalConnections.forEach(line => {
          ctx.beginPath();
          line.forEach((vertexIndex, i) => {
            if (vertices[vertexIndex]) {
              if (i === 0) {
                ctx.moveTo(vertices[vertexIndex].x, vertices[vertexIndex].y);
              } else {
                ctx.lineTo(vertices[vertexIndex].x, vertices[vertexIndex].y);
              }
            }
          });
          ctx.stroke();
        });
        
        // Draw facial feature geometry
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.3;
        
        // Eyes - geometric diamond shapes
        if (vertices[4] && vertices[9]) {
          const leftEyeX = vertices[4].x;
          const leftEyeY = vertices[9].y - 8;
          
          ctx.beginPath();
          ctx.moveTo(leftEyeX - 8 * perspective, leftEyeY);
          ctx.lineTo(leftEyeX, leftEyeY - 5);
          ctx.lineTo(leftEyeX + 8 * perspective, leftEyeY);
          ctx.lineTo(leftEyeX, leftEyeY + 5);
          ctx.closePath();
          ctx.stroke();
        }
        
        if (vertices[6] && vertices[11]) {
          const rightEyeX = vertices[6].x;
          const rightEyeY = vertices[11].y - 8;
          
          ctx.beginPath();
          ctx.moveTo(rightEyeX - 8 * perspective, rightEyeY);
          ctx.lineTo(rightEyeX, rightEyeY - 5);
          ctx.lineTo(rightEyeX + 8 * perspective, rightEyeY);
          ctx.lineTo(rightEyeX, rightEyeY + 5);
          ctx.closePath();
          ctx.stroke();
        }
        
        // Nose - triangular pyramid
        if (vertices[10] && vertices[15]) {
          const noseX = vertices[10].x;
          const noseTopY = vertices[10].y;
          const noseBottomY = vertices[15].y - 5;
          
          ctx.beginPath();
          ctx.moveTo(noseX, noseTopY);
          ctx.lineTo(noseX - 6 * perspective, noseBottomY);
          ctx.lineTo(noseX + 6 * perspective, noseBottomY);
          ctx.closePath();
          ctx.stroke();
        }
        
        // Mouth - geometric rectangle
        if (vertices[15]) {
          const mouthX = vertices[15].x;
          const mouthY = vertices[15].y + 8;
          const mouthWidth = 12 * perspective;
          
          ctx.beginPath();
          ctx.rect(mouthX - mouthWidth, mouthY - 3, mouthWidth * 2, 6);
          ctx.stroke();
          
          // Mouth center line
          ctx.beginPath();
          ctx.moveTo(mouthX - mouthWidth, mouthY);
          ctx.lineTo(mouthX + mouthWidth, mouthY);
          ctx.stroke();
        }
        
        // Add vertex points for technical effect
        ctx.fillStyle = '#00ffff';
        ctx.globalAlpha = 0.4;
        
        vertices.forEach((vertex, i) => {
          if (i < 21) { // Only front vertices
            ctx.beginPath();
            ctx.arc(vertex.x, vertex.y, 1.5, 0, 2 * Math.PI);
            ctx.fill();
          }
        });
      };

      // Draw geometric face structure - focus on facial geometry and proportions
      const drawGeometricFace = () => {
        // Draw the advanced wireframe face
        drawWireframeFace();
        ctx.strokeStyle = '#00e6ff';
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.3;
        
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
        ctx.lineWidth = 0.5;
        ctx.globalAlpha = 0.2;
        
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
        ctx.lineWidth = 0.8;
        ctx.globalAlpha = 0.4;
        
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
        ctx.lineWidth = 0.8;
        ctx.globalAlpha = 0.4;
        
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
      
      // Draw the biometric face first
      drawBiometricFace();
      
      // Draw overlay wireframe and analysis elements
      drawGeometricFace();
      drawStructuralFeatures();
      
      // Advanced measurement grid
      ctx.strokeStyle = '#40e0d0';
      ctx.lineWidth = 0.3;
      ctx.globalAlpha = 0.15;
      
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
      
      // Scanning beam - bright green like in reference image
      ctx.strokeStyle = '#00ff41';
      ctx.lineWidth = 3;
      ctx.globalAlpha = 1;
      
      const scanY = (progress / 100) * canvas.height;
      
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(canvas.width, scanY);
      ctx.stroke();
      
      // Scanning glow effect - more intense green
      const gradient = ctx.createLinearGradient(0, scanY - 25, 0, scanY + 25);
      gradient.addColorStop(0, 'rgba(0, 255, 65, 0)');
      gradient.addColorStop(0.3, 'rgba(0, 255, 65, 0.4)');
      gradient.addColorStop(0.5, 'rgba(0, 255, 65, 0.8)');
      gradient.addColorStop(0.7, 'rgba(0, 255, 65, 0.4)');
      gradient.addColorStop(1, 'rgba(0, 255, 65, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - 25, canvas.width, 50);
      
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
  }, [imageLoaded]);

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
      
      {/* Corner targeting reticles - exactly like in reference image */}
      <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-cyan-400 opacity-100"></div>
      <div className="absolute top-3 right-3 w-8 h-8 border-r-2 border-t-2 border-cyan-400 opacity-100"></div>
      <div className="absolute bottom-3 left-3 w-8 h-8 border-l-2 border-b-2 border-cyan-400 opacity-100"></div>
      <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-cyan-400 opacity-100"></div>
      
      {/* Side labels - matching reference image */}
      <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 -rotate-90 text-[10px] text-cyan-400 font-mono tracking-widest opacity-80">
        GEOMETRIC
      </div>
      <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 rotate-90 text-[10px] text-cyan-400 font-mono tracking-widest opacity-80">
        STRUCTURE
      </div>
    </div>
  );
}
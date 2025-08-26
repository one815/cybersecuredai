import { useState, useEffect, useRef } from "react";
import { Shield, Zap, CheckCircle, AlertTriangle } from "lucide-react";

interface ThreatNode {
  id: string;
  x: number;
  y: number;
  status: 'active' | 'scanning' | 'neutralized';
  type: 'malware' | 'intrusion' | 'phishing' | 'ddos';
  timestamp: number;
}

interface ScanLine {
  y: number;
  opacity: number;
  speed: number;
}

interface CyberThreatScannerProps {
  onScanComplete?: () => void;
  duration?: number;
}

export function CyberThreatScanner({ onScanComplete, duration = 8000 }: CyberThreatScannerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [threats, setThreats] = useState<ThreatNode[]>([]);
  const [scanLines, setScanLines] = useState<ScanLine[]>([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [neutralizedCount, setNeutralizedCount] = useState(0);
  const [isScanning, setIsScanning] = useState(true);
  const [currentPhase, setCurrentPhase] = useState<'initializing' | 'scanning' | 'neutralizing' | 'complete'>('initializing');

  // Initialize threats
  useEffect(() => {
    const generateThreats = (): ThreatNode[] => {
      const threatTypes: ThreatNode['type'][] = ['malware', 'intrusion', 'phishing', 'ddos'];
      const newThreats: ThreatNode[] = [];
      
      for (let i = 0; i < 25; i++) {
        newThreats.push({
          id: `threat-${i}`,
          x: Math.random() * 800,
          y: Math.random() * 500,
          status: 'active',
          type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
          timestamp: Date.now()
        });
      }
      
      return newThreats;
    };

    setThreats(generateThreats());
    
    // Initialize scanning lines
    setScanLines([
      { y: 0, opacity: 1, speed: 2 },
      { y: -100, opacity: 0.7, speed: 1.5 },
      { y: -200, opacity: 0.5, speed: 1.8 }
    ]);

    setCurrentPhase('scanning');
  }, []);

  // Animation loop
  useEffect(() => {
    if (!isScanning) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Clear canvas
      ctx.fillStyle = '#000011';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid pattern
      drawGrid(ctx, canvas.width, canvas.height);

      // Update and draw scan lines
      setScanLines(prevLines => {
        return prevLines.map(line => ({
          ...line,
          y: line.y + line.speed,
          opacity: line.y > canvas.height ? 0 : Math.max(0, line.opacity - 0.001)
        })).filter(line => line.y < canvas.height + 50).concat(
          // Add new scan lines periodically
          Math.random() < 0.02 ? [{ y: -50, opacity: 1, speed: 1.5 + Math.random() }] : []
        );
      });

      // Draw scan lines
      scanLines.forEach(line => {
        if (line.opacity > 0) {
          drawScanLine(ctx, canvas.width, line.y, line.opacity);
        }
      });

      // Update threats based on scan progress
      setThreats(prevThreats => {
        return prevThreats.map(threat => {
          const scanLineHit = scanLines.some(line => 
            Math.abs(line.y - threat.y) < 20 && line.opacity > 0.3
          );

          if (scanLineHit && threat.status === 'active') {
            return { ...threat, status: 'scanning' };
          }

          if (threat.status === 'scanning' && Math.random() < 0.1) {
            setNeutralizedCount(prev => prev + 1);
            return { ...threat, status: 'neutralized' };
          }

          return threat;
        });
      });

      // Draw threats
      threats.forEach(threat => {
        drawThreat(ctx, threat);
      });

      // Update progress
      setScanProgress(progress);

      // Check completion
      if (progress >= 1 || threats.every(t => t.status === 'neutralized')) {
        setIsScanning(false);
        setCurrentPhase('complete');
        setTimeout(() => {
          onScanComplete?.();
        }, 1500);
      } else {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isScanning, threats, scanLines, duration, onScanComplete]);

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
    ctx.lineWidth = 1;

    // Vertical lines
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const drawScanLine = (ctx: CanvasRenderingContext2D, width: number, y: number, opacity: number) => {
    // Main scan line
    const gradient = ctx.createLinearGradient(0, y - 20, 0, y + 20);
    gradient.addColorStop(0, `rgba(0, 255, 255, 0)`);
    gradient.addColorStop(0.5, `rgba(0, 255, 255, ${opacity})`);
    gradient.addColorStop(1, `rgba(0, 255, 255, 0)`);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, y - 20, width, 40);

    // Scan effects
    ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();

    // Add some scan particles
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * width;
      ctx.fillStyle = `rgba(0, 255, 255, ${opacity * 0.8})`;
      ctx.fillRect(x, y - 2, 4, 4);
    }
  };

  const drawThreat = (ctx: CanvasRenderingContext2D, threat: ThreatNode) => {
    const { x, y, status, type } = threat;
    
    // Threat colors
    const colors = {
      active: '#ff4444',
      scanning: '#ffaa00',
      neutralized: '#44ff44'
    };

    // Draw threat node
    const radius = status === 'scanning' ? 8 + Math.sin(Date.now() * 0.01) * 2 : 6;
    
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = colors[status];
    ctx.fill();

    // Add glow effect
    if (status !== 'neutralized') {
      ctx.beginPath();
      ctx.arc(x, y, radius + 4, 0, Math.PI * 2);
      ctx.strokeStyle = colors[status];
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.3;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // Draw threat type indicator
    ctx.fillStyle = 'white';
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(type.charAt(0).toUpperCase(), x, y + 3);

    // Neutralization animation
    if (status === 'neutralized') {
      ctx.strokeStyle = '#44ff44';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, radius + 8, 0, Math.PI * 2);
      ctx.stroke();
      
      // Checkmark
      ctx.strokeStyle = '#44ff44';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x - 4, y);
      ctx.lineTo(x - 1, y + 3);
      ctx.lineTo(x + 4, y - 2);
      ctx.stroke();
    }
  };

  const getThreatIcon = (type: ThreatNode['type']) => {
    const icons = {
      malware: '🦠',
      intrusion: '🔴',
      phishing: '🎣',
      ddos: '⚡'
    };
    return icons[type];
  };

  const getPhaseMessage = () => {
    switch (currentPhase) {
      case 'initializing':
        return 'Initializing security protocols...';
      case 'scanning':
        return 'Deep scanning network infrastructure...';
      case 'neutralizing':
        return 'Neutralizing identified threats...';
      case 'complete':
        return 'Security scan completed successfully!';
      default:
        return 'Preparing security scan...';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
      {/* Header */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-4 bg-gray-900/90 rounded-lg px-6 py-4 border border-cyan-500/30">
          <Shield className="w-8 h-8 text-cyan-400 animate-pulse" />
          <div>
            <h1 className="text-2xl font-bold text-white">CyberSecured AI</h1>
            <p className="text-cyan-400 text-sm">Advanced Threat Detection System</p>
          </div>
        </div>
      </div>

      {/* Main Scanning Area */}
      <div className="relative border-2 border-cyan-500/50 rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          className="block"
        />
        
        {/* Scan overlay UI */}
        <div className="absolute top-4 left-4 bg-black/70 rounded p-3">
          <div className="text-cyan-400 text-sm font-mono mb-2">{getPhaseMessage()}</div>
          <div className="flex items-center space-x-4">
            <div className="text-white text-sm">Progress:</div>
            <div className="w-32 bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${scanProgress * 100}%` }}
              />
            </div>
            <div className="text-cyan-400 text-sm font-mono">{Math.round(scanProgress * 100)}%</div>
          </div>
        </div>

        {/* Stats panel */}
        <div className="absolute top-4 right-4 bg-black/70 rounded p-3 min-w-48">
          <div className="text-cyan-400 text-sm font-mono mb-2">THREAT ANALYSIS</div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-300">Active Threats:</span>
              <span className="text-red-400 font-bold">{threats.filter(t => t.status === 'active').length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Scanning:</span>
              <span className="text-yellow-400 font-bold">{threats.filter(t => t.status === 'scanning').length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Neutralized:</span>
              <span className="text-green-400 font-bold">{neutralizedCount}</span>
            </div>
          </div>
        </div>

        {/* Bottom status bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/90 p-4 border-t border-cyan-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
              <span className="text-white text-sm font-mono">
                Quantum AI Engine: {isScanning ? 'ACTIVE' : 'STANDBY'}
              </span>
            </div>
            
            <div className="flex items-center space-x-6">
              {threats.slice(0, 4).map((threat) => (
                <div key={threat.id} className="flex items-center space-x-2">
                  <span className="text-lg">{getThreatIcon(threat.type)}</span>
                  <span className={`w-2 h-2 rounded-full ${
                    threat.status === 'active' ? 'bg-red-500 animate-pulse' :
                    threat.status === 'scanning' ? 'bg-yellow-500 animate-pulse' :
                    'bg-green-500'
                  }`}></span>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              {currentPhase === 'complete' ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-yellow-400 animate-pulse" />
              )}
              <span className="text-cyan-400 text-sm font-mono">
                {currentPhase === 'complete' ? 'SECURE' : 'SCANNING'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Loading completion message */}
      {currentPhase === 'complete' && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-green-900/30 border border-green-500/50 rounded-lg px-6 py-3">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span className="text-green-300 font-semibold">
                All threats neutralized. System secure. Launching platform...
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
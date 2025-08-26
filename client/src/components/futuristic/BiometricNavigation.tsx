import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Hand, Fingerprint, Scan, MousePointer } from "lucide-react";

interface GazePoint {
  x: number;
  y: number;
  timestamp: number;
  intensity: number;
}

interface GestureTrail {
  id: string;
  points: { x: number; y: number; timestamp: number }[];
  type: 'swipe' | 'tap' | 'hold';
}

export function BiometricNavigation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [eyeTrackingActive, setEyeTrackingActive] = useState(false);
  const [gestureActive, setGestureActive] = useState(false);
  const [gazePoints, setGazePoints] = useState<GazePoint[]>([]);
  const [gestureTrails, setGestureTrails] = useState<GestureTrail[]>([]);
  const [currentFocus, setCurrentFocus] = useState<string | null>(null);
  const [biometricAuth, setBiometricAuth] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', zone: { x: 50, y: 100, width: 150, height: 60 } },
    { id: 'threats', label: 'Threat Analysis', icon: '⚠️', zone: { x: 220, y: 100, width: 150, height: 60 } },
    { id: 'compliance', label: 'Compliance', icon: '✅', zone: { x: 390, y: 100, width: 150, height: 60 } },
    { id: 'reports', label: 'Reports', icon: '📋', zone: { x: 50, y: 200, width: 150, height: 60 } },
    { id: 'settings', label: 'Settings', icon: '⚙️', zone: { x: 220, y: 200, width: 150, height: 60 } },
    { id: 'alerts', label: 'Alerts', icon: '🚨', zone: { x: 390, y: 200, width: 150, height: 60 } }
  ];

  // Simulate eye tracking
  useEffect(() => {
    if (!eyeTrackingActive) return;

    const interval = setInterval(() => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      
      const newGazePoint: GazePoint = {
        x,
        y,
        timestamp: Date.now(),
        intensity: Math.random() * 0.8 + 0.2
      };

      setGazePoints(prev => [...prev.slice(-20), newGazePoint]);

      // Check if gaze is focused on any navigation item
      const focusedItem = navigationItems.find(item => 
        x >= item.zone.x && x <= item.zone.x + item.zone.width &&
        y >= item.zone.y && y <= item.zone.y + item.zone.height
      );

      if (focusedItem) {
        setCurrentFocus(focusedItem.id);
      } else {
        setCurrentFocus(null);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [eyeTrackingActive]);

  // Clean up old gaze points
  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now();
      setGazePoints(prev => prev.filter(point => now - point.timestamp < 2000));
      setGestureTrails(prev => prev.filter(trail => {
        const latestPoint = trail.points[trail.points.length - 1];
        return latestPoint && now - latestPoint.timestamp < 3000;
      }));
    }, 100);

    return () => clearInterval(cleanup);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!gestureActive) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create gesture trail
    const trailId = 'mouse-trail';
    setGestureTrails(prev => {
      const existingTrail = prev.find(t => t.id === trailId);
      if (existingTrail) {
        return prev.map(trail => 
          trail.id === trailId 
            ? { ...trail, points: [...trail.points.slice(-15), { x, y, timestamp: Date.now() }] }
            : trail
        );
      } else {
        return [...prev, { 
          id: trailId, 
          points: [{ x, y, timestamp: Date.now() }], 
          type: 'swipe' as const 
        }];
      }
    });
  };

  const simulateBiometricScan = () => {
    setBiometricAuth(true);
    setTimeout(() => setBiometricAuth(false), 3000);
  };

  return (
    <div className="w-full space-y-6">
      {/* Control Panel */}
      <Card className="bg-surface border-cyan-500/30 cyber-glow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-cyan-300">Biometric Navigation System</h2>
          <div className="flex space-x-2">
            <Button
              onClick={() => setEyeTrackingActive(!eyeTrackingActive)}
              className={`${eyeTrackingActive ? 'bg-green-600' : 'bg-gray-600'} hover:bg-green-700`}
            >
              <Eye className="w-4 h-4 mr-2" />
              Eye Tracking
            </Button>
            <Button
              onClick={() => setGestureActive(!gestureActive)}
              className={`${gestureActive ? 'bg-blue-600' : 'bg-gray-600'} hover:bg-blue-700`}
            >
              <Hand className="w-4 h-4 mr-2" />
              Gestures
            </Button>
            <Button
              onClick={simulateBiometricScan}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Fingerprint className="w-4 h-4 mr-2" />
              Biometric Scan
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${eyeTrackingActive ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}></div>
            <span className="text-gray-300">Eye Tracking</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${gestureActive ? 'bg-blue-400 animate-pulse' : 'bg-gray-500'}`}></div>
            <span className="text-gray-300">Gesture Control</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${biometricAuth ? 'bg-purple-400 animate-pulse' : 'bg-gray-500'}`}></div>
            <span className="text-gray-300">Biometric Auth</span>
          </div>
        </div>
      </Card>

      {/* Interactive Navigation Area */}
      <Card className="bg-surface border-cyan-500/30 cyber-glow">
        <div
          ref={containerRef}
          className="relative h-80 bg-black rounded-lg overflow-hidden cursor-none"
          onMouseMove={handleMouseMove}
        >
          {/* Grid Background */}
          <div className="absolute inset-0">
            <div className="w-full h-full" style={{
              backgroundImage: `
                linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px'
            }}></div>
          </div>

          {/* Navigation Items */}
          {navigationItems.map(item => (
            <div
              key={item.id}
              className={`absolute rounded-lg border-2 p-4 transition-all duration-300 ${
                currentFocus === item.id
                  ? 'border-cyan-400 bg-cyan-400/20 shadow-lg shadow-cyan-400/50 scale-105'
                  : 'border-gray-600 bg-surface-light/50'
              }`}
              style={{
                left: item.zone.x,
                top: item.zone.y,
                width: item.zone.width,
                height: item.zone.height
              }}
            >
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="font-semibold text-white text-sm">{item.label}</div>
                  {currentFocus === item.id && (
                    <Badge className="mt-1 bg-cyan-600 text-xs animate-pulse">
                      Eye Focused
                    </Badge>
                  )}
                </div>
              </div>
              
              {currentFocus === item.id && (
                <div className="absolute -inset-2 border border-cyan-400 rounded-lg animate-pulse pointer-events-none"></div>
              )}
            </div>
          ))}

          {/* Eye Gaze Visualization */}
          {eyeTrackingActive && gazePoints.map((point, index) => (
            <div
              key={index}
              className="absolute pointer-events-none"
              style={{
                left: point.x - 10,
                top: point.y - 10,
                opacity: point.intensity * (1 - (Date.now() - point.timestamp) / 2000)
              }}
            >
              <div className="w-5 h-5 bg-red-400 rounded-full animate-ping"></div>
              <div className="w-5 h-5 bg-red-500 rounded-full absolute top-0 left-0"></div>
            </div>
          ))}

          {/* Gesture Trails */}
          {gestureTrails.map(trail => (
            <svg key={trail.id} className="absolute inset-0 pointer-events-none" width="100%" height="100%">
              {trail.points.length > 1 && (
                <path
                  d={`M ${trail.points.map(p => `${p.x},${p.y}`).join(' L ')}`}
                  stroke="rgba(59, 130, 246, 0.6)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
              {trail.points.map((point, index) => (
                <circle
                  key={index}
                  cx={point.x}
                  cy={point.y}
                  r="2"
                  fill="rgba(59, 130, 246, 0.8)"
                  opacity={1 - (Date.now() - point.timestamp) / 3000}
                />
              ))}
            </svg>
          ))}

          {/* Biometric Scan Overlay */}
          {biometricAuth && (
            <div className="absolute inset-0 bg-purple-900/50 flex items-center justify-center">
              <div className="text-center">
                <Scan className="w-16 h-16 text-purple-400 mx-auto mb-4 animate-spin" />
                <div className="text-white font-semibold">Biometric Authentication</div>
                <div className="text-purple-300 text-sm mt-1">Scanning... Please wait</div>
                <div className="mt-4 w-48 bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="absolute bottom-4 left-4 text-xs text-cyan-400/70">
            {eyeTrackingActive && "👁️ Eye tracking active - Look at items to focus"}
            {gestureActive && !eyeTrackingActive && "✋ Gesture control active - Move mouse to create trails"}
            {!eyeTrackingActive && !gestureActive && "Activate eye tracking or gestures to interact"}
          </div>

          {/* Current Focus Display */}
          {currentFocus && (
            <div className="absolute top-4 right-4 bg-cyan-600/90 rounded-lg p-2">
              <div className="text-white text-sm font-semibold">
                Focused: {navigationItems.find(item => item.id === currentFocus)?.label}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-surface-light/30 p-4 text-center">
          <div className="text-2xl font-bold text-cyan-400">{gazePoints.length}</div>
          <div className="text-sm text-gray-400">Gaze Points</div>
        </Card>
        <Card className="bg-surface-light/30 p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{gestureTrails.length}</div>
          <div className="text-sm text-gray-400">Active Gestures</div>
        </Card>
        <Card className="bg-surface-light/30 p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">
            {currentFocus ? '1' : '0'}
          </div>
          <div className="text-sm text-gray-400">Focused Items</div>
        </Card>
      </div>
    </div>
  );
}
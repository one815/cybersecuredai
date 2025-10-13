/**
 * Holographic 3D Renderer Component
 * 
 * Custom Three.js React wrapper for revolutionary CypherHUM 3D holographic threat visualization
 * - Advanced WebGL rendering with holographic effects
 * - Real-time threat particle systems and animations
 * - Interactive 3D controls and navigation
 * - AI-enhanced visual effects and contextual overlays
 */

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreatVisualization3D {
  threatId: string;
  position: [number, number, number];
  scale: [number, number, number];
  rotation: [number, number, number];
  materialProperties: {
    color: string;
    opacity: number;
    emissive: string;
    wireframe: boolean;
    holographicShader: boolean;
  };
  animationData: {
    movement: any;
    pulsing: any;
    particles: any;
  };
  interactionBehavior: {
    hoverData: any;
    clickActions: any;
  };
  severity3DMapping: {
    sizeMultiplier: number;
    colorIntensity: number;
    animationSpeed: number;
  };
}

interface Holographic3DRendererProps {
  className?: string;
  threats: ThreatVisualization3D[];
  onThreatClick?: (threat: ThreatVisualization3D) => void;
  onThreatHover?: (threat: ThreatVisualization3D | null) => void;
  cameraPosition?: [number, number, number];
  enableHolographicEffects?: boolean;
  enableParticles?: boolean;
  renderQuality?: 'low' | 'medium' | 'high' | 'ultra';
  realTimeUpdates?: boolean;
}

export const Holographic3DRenderer: React.FC<Holographic3DRendererProps> = ({
  className = '',
  threats = [],
  onThreatClick,
  onThreatHover,
  cameraPosition = [0, 10, 20],
  enableHolographicEffects = true,
  enableParticles = true,
  renderQuality = 'high',
  realTimeUpdates = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const threatObjectsRef = useRef<Map<string, THREE.Group>>(new Map());
  const animationIdRef = useRef<number | null>(null);
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());
  
  const [isInitialized, setIsInitialized] = useState(false);
  const [hoveredThreat, setHoveredThreat] = useState<ThreatVisualization3D | null>(null);
  const [performanceStats, setPerformanceStats] = useState({
    fps: 0,
    renderTime: 0,
    triangleCount: 0
  });

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: renderQuality !== 'low',
      alpha: true,
      powerPreference: renderQuality === 'ultra' ? 'high-performance' : 'default'
    });

    // Configure renderer for holographic effects
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = renderQuality !== 'low';
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 1.2;

    // Set holographic background
    scene.background = new THREE.Color(0x000011);
    scene.fog = new THREE.Fog(0x000011, 50, 100);

    // Initialize camera
    camera.position.set(...cameraPosition);
    camera.lookAt(0, 0, 0);

    // Add holographic lighting system
    setupHolographicLighting(scene);

    // Add grid and reference objects
    setupSceneEnvironment(scene);

    // Store references
    rendererRef.current = renderer;
    sceneRef.current = scene;
    cameraRef.current = camera;

    setIsInitialized(true);

    // Handle window resize
    const handleResize = () => {
      if (!canvas || !camera || !renderer) return;
      
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      renderer.dispose();
    };
  }, [renderQuality]);

  // Update camera position
  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(...cameraPosition);
    }
  }, [cameraPosition]);

  // Update threats visualization
  useEffect(() => {
    if (!isInitialized || !sceneRef.current) return;

    const scene = sceneRef.current;
    const currentThreatObjects = threatObjectsRef.current;

    // Remove old threat objects
    currentThreatObjects.forEach((threatGroup, threatId) => {
      if (!threats.find(t => t.threatId === threatId)) {
        scene.remove(threatGroup);
        disposeThreatObject(threatGroup);
        currentThreatObjects.delete(threatId);
      }
    });

    // Add or update threat objects
    threats.forEach((threat) => {
      let threatGroup = currentThreatObjects.get(threat.threatId);
      
      if (!threatGroup) {
        threatGroup = createThreatVisualization(threat);
        scene.add(threatGroup);
        currentThreatObjects.set(threat.threatId, threatGroup);
      } else {
        updateThreatVisualization(threatGroup, threat);
      }
    });

  }, [threats, isInitialized, enableHolographicEffects, enableParticles]);

  // Animation loop
  useEffect(() => {
    if (!isInitialized) return;

    let lastTime = 0;
    let frameCount = 0;

    const animate = (currentTime: number) => {
      if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;

      const deltaTime = clockRef.current.getDelta();
      const elapsedTime = clockRef.current.getElapsedTime();

      // Update threat animations
      updateThreatAnimations(elapsedTime, deltaTime);

      // Update camera controls (basic orbit)
      updateCameraControls();

      // Render scene
      const renderStart = performance.now();
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      const renderTime = performance.now() - renderStart;

      // Update performance stats
      frameCount++;
      if (currentTime - lastTime >= 1000) {
        setPerformanceStats(prev => ({
          fps: Math.round(frameCount * 1000 / (currentTime - lastTime)),
          renderTime: Math.round(renderTime * 100) / 100,
          triangleCount: rendererRef.current?.info.render.triangles || 0
        }));
        frameCount = 0;
        lastTime = currentTime;
      }

      if (realTimeUpdates) {
        animationIdRef.current = requestAnimationFrame(animate);
      }
    };

    animationIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [isInitialized, realTimeUpdates]);

  // Mouse interaction handlers
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Raycast for hover detection
      if (cameraRef.current && sceneRef.current) {
        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
        const intersects = raycasterRef.current.intersectObjects(
          Array.from(threatObjectsRef.current.values()), 
          true
        );

        if (intersects.length > 0) {
          const intersectedThreat = findThreatByObject(intersects[0].object);
          if (intersectedThreat && intersectedThreat !== hoveredThreat) {
            setHoveredThreat(intersectedThreat);
            onThreatHover?.(intersectedThreat);
          }
        } else if (hoveredThreat) {
          setHoveredThreat(null);
          onThreatHover?.(null);
        }
      }
    };

    const handleClick = (event: MouseEvent) => {
      if (hoveredThreat && onThreatClick) {
        onThreatClick(hoveredThreat);
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
    };
  }, [hoveredThreat, onThreatClick, onThreatHover]);

  // Helper functions
  const setupHolographicLighting = (scene: THREE.Scene) => {
    // Ambient light for base illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    // Main directional light
    const directionalLight = new THREE.DirectionalLight(0x00ffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Holographic accent lights
    const accentLight1 = new THREE.PointLight(0xff00ff, 0.5, 50);
    accentLight1.position.set(-10, 5, -10);
    scene.add(accentLight1);

    const accentLight2 = new THREE.PointLight(0x00ff00, 0.5, 50);
    accentLight2.position.set(10, 5, 10);
    scene.add(accentLight2);
  };

  const setupSceneEnvironment = (scene: THREE.Scene) => {
    // Holographic grid
    const gridHelper = new THREE.GridHelper(100, 100, 0x00ffff, 0x004444);
    gridHelper.position.y = -5;
    scene.add(gridHelper);

    // Axes helper for reference
    const axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);
  };

  const createThreatVisualization = (threat: ThreatVisualization3D): THREE.Group => {
    const threatGroup = new THREE.Group();
    threatGroup.position.set(...threat.position);
    threatGroup.scale.set(...threat.scale);
    threatGroup.rotation.set(...threat.rotation);

    // Main threat geometry
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      color: threat.materialProperties.color,
      opacity: threat.materialProperties.opacity,
      transparent: true,
      emissive: threat.materialProperties.emissive,
      wireframe: threat.materialProperties.wireframe
    });

    const threatMesh = new THREE.Mesh(geometry, material);
    threatMesh.castShadow = true;
    threatMesh.receiveShadow = true;
    threatGroup.add(threatMesh);

    // Holographic shader effect
    if (threat.materialProperties.holographicShader && enableHolographicEffects) {
      const holographicMaterial = new THREE.MeshBasicMaterial({
        color: threat.materialProperties.emissive,
        opacity: 0.2,
        transparent: true,
        side: THREE.BackSide
      });
      const holographicMesh = new THREE.Mesh(geometry.clone(), holographicMaterial);
      holographicMesh.scale.set(1.1, 1.1, 1.1);
      threatGroup.add(holographicMesh);
    }

    // Particle system for high-severity threats
    if (enableParticles && threat.animationData.particles?.enabled) {
      const particleSystem = createParticleSystem(threat);
      threatGroup.add(particleSystem);
    }

    // Store threat data for interaction
    (threatGroup as any).threatData = threat;

    return threatGroup;
  };

  const createParticleSystem = (threat: ThreatVisualization3D): THREE.Points => {
    const particleCount = threat.animationData.particles?.count || 100;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Random positions in a sphere around the threat
      const radius = Math.random() * 3 + 1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Particle colors based on threat properties
      const color = new THREE.Color(threat.animationData.particles?.color || threat.materialProperties.color);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    return new THREE.Points(geometry, material);
  };

  const updateThreatVisualization = (threatGroup: THREE.Group, threat: ThreatVisualization3D) => {
    threatGroup.position.set(...threat.position);
    threatGroup.scale.set(...threat.scale);
    threatGroup.rotation.set(...threat.rotation);

    // Update materials if needed
    const mesh = threatGroup.children.find(child => child instanceof THREE.Mesh) as THREE.Mesh;
    if (mesh && mesh.material instanceof THREE.MeshPhongMaterial) {
      mesh.material.color.setStyle(threat.materialProperties.color);
      mesh.material.emissive.setStyle(threat.materialProperties.emissive);
      mesh.material.opacity = threat.materialProperties.opacity;
    }
  };

  const updateThreatAnimations = (elapsedTime: number, deltaTime: number) => {
    threatObjectsRef.current.forEach((threatGroup, threatId) => {
      const threat = (threatGroup as any).threatData as ThreatVisualization3D;
      if (!threat) return;

      // Pulsing animation
      if (threat.animationData.pulsing?.enabled) {
        const pulseFactor = Math.sin(elapsedTime * threat.animationData.pulsing.frequency) * 
                          threat.animationData.pulsing.intensity + 1;
        threatGroup.scale.setScalar(pulseFactor * threat.severity3DMapping.sizeMultiplier);
      }

      // Orbital movement
      if (threat.animationData.movement?.type === 'orbital') {
        const radius = threat.animationData.movement.radius || 2;
        const speed = threat.animationData.movement.speed * threat.severity3DMapping.animationSpeed;
        threatGroup.position.x = threat.position[0] + Math.cos(elapsedTime * speed) * radius;
        threatGroup.position.z = threat.position[2] + Math.sin(elapsedTime * speed) * radius;
      }

      // Particle animation
      const particles = threatGroup.children.find(child => child instanceof THREE.Points) as THREE.Points;
      if (particles) {
        particles.rotation.y = elapsedTime * 0.5;
        particles.rotation.x = elapsedTime * 0.2;
      }
    });
  };

  const updateCameraControls = () => {
    // Basic camera controls - can be expanded
    if (cameraRef.current) {
      // Auto-rotate camera slowly around the scene
      const radius = 20;
      const angle = Date.now() * 0.0001;
      cameraRef.current.position.x = Math.cos(angle) * radius;
      cameraRef.current.position.z = Math.sin(angle) * radius;
      cameraRef.current.lookAt(0, 0, 0);
    }
  };

  const findThreatByObject = (object: THREE.Object3D): ThreatVisualization3D | null => {
    let currentObject = object;
    while (currentObject) {
      if ((currentObject as any).threatData) {
        return (currentObject as any).threatData;
      }
      currentObject = currentObject.parent as THREE.Object3D;
    }
    return null;
  };

  const disposeThreatObject = (threatGroup: THREE.Group) => {
    threatGroup.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach(material => material.dispose());
        } else {
          child.material.dispose();
        }
      }
    });
  };

  return (
    <div className={`relative w-full h-full ${className}`} data-testid="holographic-3d-renderer">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full cursor-crosshair"
        style={{ background: 'radial-gradient(ellipse at center, #001122 0%, #000000 100%)' }}
        data-testid="3d-canvas"
      />
      
      {/* Performance overlay */}
      <div className="absolute top-4 right-4 bg-black/70 text-cyan-400 p-2 rounded text-xs font-mono">
        <div data-testid="fps-counter">FPS: {performanceStats.fps}</div>
        <div data-testid="render-time">Render: {performanceStats.renderTime}ms</div>
        <div data-testid="triangle-count">Triangles: {performanceStats.triangleCount.toLocaleString()}</div>
      </div>

      {/* Threat hover info */}
      {hoveredThreat && (
        <div className="absolute top-4 left-4 bg-black/80 text-cyan-400 p-4 rounded border border-cyan-400/30 max-w-sm">
          <h3 className="text-lg font-bold mb-2" data-testid="threat-hover-title">
            Threat: {hoveredThreat.threatId}
          </h3>
          <div className="text-sm space-y-1">
            <div data-testid="threat-hover-position">
              Position: [{hoveredThreat.position.map(p => p.toFixed(1)).join(', ')}]
            </div>
            <div data-testid="threat-hover-scale">
              Scale: [{hoveredThreat.scale.map(s => s.toFixed(1)).join(', ')}]
            </div>
          </div>
        </div>
      )}

      {/* 3D Controls hint */}
      <div className="absolute bottom-4 left-4 text-cyan-400/60 text-xs">
        <div>🖱️ Move mouse to interact</div>
        <div>🔄 Auto-rotating camera</div>
        <div>✨ Holographic effects: {enableHolographicEffects ? 'ON' : 'OFF'}</div>
      </div>
    </div>
  );
};

export default Holographic3DRenderer;
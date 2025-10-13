import { useEffect, useRef } from 'react';

export function OceanBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) {
      console.warn('WebGL not supported, falling back to gradient');
      return;
    }
    
    // TypeScript type guard for gl
    const glContext = gl as WebGL2RenderingContext | WebGLRenderingContext;

    // Vertex shader - Creates 3D wave geometry
    const vertexShaderSource = `
      attribute vec4 a_position;
      uniform mat4 u_matrix;
      uniform float u_time;
      uniform float u_waveHeight;
      uniform float u_waveFreq;
      varying vec3 v_position;
      varying vec3 v_normal;
      varying float v_height;
      
      float calculateHeight(vec3 pos) {
        float height = 0.0;
        
        // Primary wave - gentle ocean swell
        height += sin(pos.x * u_waveFreq * 0.5 + u_time * 0.3) * cos(pos.z * u_waveFreq * 0.4 + u_time * 0.25) * u_waveHeight;
        
        // Secondary waves - medium frequency
        height += sin(pos.x * u_waveFreq * 1.2 + u_time * 0.5) * cos(pos.z * u_waveFreq * 1.0 + u_time * 0.4) * u_waveHeight * 0.4;
        height += sin(pos.x * u_waveFreq * 2.1 + u_time * 0.8) * cos(pos.z * u_waveFreq * 1.8 + u_time * 0.7) * u_waveHeight * 0.2;
        
        // Detail ripples - high frequency
        height += sin(pos.x * u_waveFreq * 5.0 + u_time * 1.5) * cos(pos.z * u_waveFreq * 4.5 + u_time * 1.3) * u_waveHeight * 0.08;
        
        return height;
      }
      
      vec3 calculateNormal(vec3 pos) {
        float delta = 0.01;
        vec3 dx = vec3(delta, 0.0, 0.0);
        vec3 dz = vec3(0.0, 0.0, delta);
        
        float h1 = calculateHeight(pos + dx);
        float h2 = calculateHeight(pos - dx);
        float h3 = calculateHeight(pos + dz);
        float h4 = calculateHeight(pos - dz);
        
        vec3 normal = normalize(vec3((h2 - h1) / (2.0 * delta), 1.0, (h4 - h3) / (2.0 * delta)));
        return normal;
      }
      
      void main() {
        vec3 position = a_position.xyz;
        position.y = calculateHeight(position);
        v_height = position.y;
        v_position = position;
        v_normal = calculateNormal(position);
        gl_Position = u_matrix * vec4(position, 1.0);
      }
    `;

    // Fragment shader - Photorealistic water shading
    const fragmentShaderSource = `
      precision mediump float;
      
      uniform vec3 u_lightDirection;
      uniform vec3 u_viewPosition;
      uniform float u_time;
      uniform vec3 u_deepColor;
      uniform vec3 u_shallowColor;
      uniform float u_opacity;
      
      varying vec3 v_position;
      varying vec3 v_normal;
      varying float v_height;
      
      void main() {
        vec3 normal = normalize(v_normal);
        vec3 viewDir = normalize(u_viewPosition - v_position);
        vec3 lightDir = normalize(u_lightDirection);
        
        // Fresnel effect
        float fresnel = 0.02 + 0.5 * pow(1.0 - max(0.0, dot(normal, viewDir)), 3.0);
        
        // Diffuse lighting
        float diffuse = max(0.0, dot(normal, lightDir)) * 0.7 + 0.3;
        
        // Specular highlights
        vec3 halfVector = normalize(lightDir + viewDir);
        float specular = pow(max(0.0, dot(normal, halfVector)), 60.0) * 0.8;
        
        // Water color based on depth
        float depth = clamp(v_height * 3.0 + 0.5, 0.0, 1.0);
        vec3 waterColor = mix(u_deepColor, u_shallowColor, depth);
        
        // Subsurface scattering
        float scatter = pow(max(0.0, dot(viewDir, -lightDir)), 2.0) * 0.3;
        waterColor += vec3(0.0, 0.05, 0.1) * scatter;
        
        // Combine lighting
        vec3 color = waterColor * diffuse;
        color += vec3(0.9, 0.95, 1.0) * specular;
        
        // Add fresnel reflection of sky
        vec3 skyColor = vec3(0.1, 0.15, 0.25);
        color = mix(color, skyColor, fresnel * 0.5);
        
        // Subtle foam on wave crests
        float foam = smoothstep(0.3, 0.5, v_height / 0.4) * 0.3;
        color = mix(color, vec3(0.4, 0.5, 0.6), foam);
        
        gl_FragColor = vec4(color, u_opacity);
      }
    `;

    // Shader compilation
    function createShader(type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      
      return shader;
    }

    // Program creation
    function createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
      const program = gl.createProgram();
      if (!program) return null;
      
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program linking error:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
      }
      
      return program;
    }

    // Create ocean mesh
    function createOceanMesh(size: number, resolution: number) {
      const vertices: number[] = [];
      const indices: number[] = [];
      
      const step = size / resolution;
      const halfSize = size / 2;
      
      // Generate vertices
      for (let z = 0; z <= resolution; z++) {
        for (let x = 0; x <= resolution; x++) {
          vertices.push(
            x * step - halfSize,
            0,
            z * step - halfSize
          );
        }
      }
      
      // Generate indices
      for (let z = 0; z < resolution; z++) {
        for (let x = 0; x < resolution; x++) {
          const topLeft = z * (resolution + 1) + x;
          const topRight = topLeft + 1;
          const bottomLeft = topLeft + resolution + 1;
          const bottomRight = bottomLeft + 1;
          
          indices.push(topLeft, bottomLeft, topRight);
          indices.push(topRight, bottomLeft, bottomRight);
        }
      }
      
      return { 
        vertices: new Float32Array(vertices), 
        indices: new Uint16Array(indices) 
      };
    }

    // Matrix operations
    function perspective(fieldOfView: number, aspect: number, near: number, far: number) {
      const f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfView);
      const rangeInv = 1.0 / (near - far);
      
      return new Float32Array([
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (near + far) * rangeInv, -1,
        0, 0, near * far * rangeInv * 2, 0
      ]);
    }

    function lookAt(cameraPos: number[], target: number[], up: number[]) {
      const normalize = (v: number[]) => {
        const length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
        return [v[0] / length, v[1] / length, v[2] / length];
      };
      
      const subtract = (a: number[], b: number[]) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
      
      const cross = (a: number[], b: number[]) => [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0]
      ];
      
      const zAxis = normalize(subtract(cameraPos, target));
      const xAxis = normalize(cross(up, zAxis));
      const yAxis = normalize(cross(zAxis, xAxis));
      
      return new Float32Array([
        xAxis[0], xAxis[1], xAxis[2], 0,
        yAxis[0], yAxis[1], yAxis[2], 0,
        zAxis[0], zAxis[1], zAxis[2], 0,
        cameraPos[0], cameraPos[1], cameraPos[2], 1
      ]);
    }

    function multiply(a: Float32Array, b: Float32Array) {
      const result = new Float32Array(16);
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          result[i * 4 + j] = 0;
          for (let k = 0; k < 4; k++) {
            result[i * 4 + j] += a[i * 4 + k] * b[k * 4 + j];
          }
        }
      }
      return result;
    }

    // Initialize WebGL
    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    if (!vertexShader || !fragmentShader) return;
    
    const program = createProgram(vertexShader, fragmentShader);
    if (!program) return;

    // Get locations
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const matrixLocation = gl.getUniformLocation(program, 'u_matrix');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const waveHeightLocation = gl.getUniformLocation(program, 'u_waveHeight');
    const waveFreqLocation = gl.getUniformLocation(program, 'u_waveFreq');
    const lightDirectionLocation = gl.getUniformLocation(program, 'u_lightDirection');
    const viewPositionLocation = gl.getUniformLocation(program, 'u_viewPosition');
    const deepColorLocation = gl.getUniformLocation(program, 'u_deepColor');
    const shallowColorLocation = gl.getUniformLocation(program, 'u_shallowColor');
    const opacityLocation = gl.getUniformLocation(program, 'u_opacity');

    // Create ocean mesh
    const ocean = createOceanMesh(25, 80);
    
    // Create buffers
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, ocean.vertices, gl.STATIC_DRAW);
    
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, ocean.indices, gl.STATIC_DRAW);

    // Render function
    function render() {
      // Resize canvas
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
      
      // Clear
      gl.clearColor(0.05, 0.08, 0.12, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      
      // Enable depth testing and blending
      gl.enable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      
      // Use program
      gl.useProgram(program);
      
      // Bind position buffer
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
      
      // Camera setup - subtle movement
      const cameraPos = [
        Math.sin(timeRef.current * 0.05) * 8,
        10,
        Math.cos(timeRef.current * 0.05) * 8 + 5
      ];
      
      const projectionMatrix = perspective(Math.PI / 4, width / height, 0.1, 100);
      const viewMatrix = lookAt(cameraPos, [0, 0, 0], [0, 1, 0]);
      const matrix = multiply(projectionMatrix, viewMatrix);
      
      // Set uniforms
      gl.uniformMatrix4fv(matrixLocation, false, matrix);
      gl.uniform1f(timeLocation, timeRef.current);
      gl.uniform1f(waveHeightLocation, 0.4); // Gentle waves
      gl.uniform1f(waveFreqLocation, 0.3);
      gl.uniform3f(lightDirectionLocation, 0.3, 0.6, 0.4);
      gl.uniform3f(viewPositionLocation, cameraPos[0], cameraPos[1], cameraPos[2]);
      gl.uniform3f(deepColorLocation, 0.02, 0.08, 0.15); // Dark blue
      gl.uniform3f(shallowColorLocation, 0.05, 0.15, 0.25); // Lighter blue
      gl.uniform1f(opacityLocation, 0.85); // Slightly transparent
      
      // Draw
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
      gl.drawElements(gl.TRIANGLES, ocean.indices.length, gl.UNSIGNED_SHORT, 0);
      
      timeRef.current += 0.015;
      animationRef.current = requestAnimationFrame(render);
    }

    // Start rendering
    render();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      gl.deleteBuffer(positionBuffer);
      gl.deleteBuffer(indexBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.4 }}
      />
      {/* Fallback gradient for non-WebGL browsers */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900" />
    </div>
  );
}
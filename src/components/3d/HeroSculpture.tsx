import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import { useTheme } from '../../theme/ThemeContext';

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 380px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;

  canvas {
    width: 100% !important;
    height: 100% !important;
    outline: none;
    border-radius: 24px;
  }
`;

const FallbackOrb = styled.div`
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: radial-gradient(circle, ${({ theme }) => theme.accent} 0%, transparent 70%);
  filter: blur(40px);
  opacity: 0.5;
  animation: pulse 4s ease-in-out infinite alternate;

  @keyframes pulse {
    0% { transform: scale(0.9); opacity: 0.3; }
    100% { transform: scale(1.1); opacity: 0.6; }
  }
`;

export const HeroSculpture: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme, accent } = useTheme();
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const width = container.clientWidth || 450;
    const height = container.clientHeight || 450;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6.5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Color conversion
    const accentColor = new THREE.Color(theme.accent);
    const secondaryColor = new THREE.Color(theme.accentSecondary);

    // Outer Geometric Wireframe (Icosahedron)
    const outerGeo = new THREE.IcosahedronGeometry(2.1, 1);
    const outerMat = new THREE.MeshStandardMaterial({
      color: accentColor,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.75
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    scene.add(outerMesh);

    // Inner Glowing Core (Torus Knot)
    const innerGeo = new THREE.TorusKnotGeometry(0.9, 0.25, 90, 16);
    const innerMat = new THREE.MeshStandardMaterial({
      color: secondaryColor,
      roughness: 0.3,
      metalness: 0.9,
      emissive: accentColor,
      emissiveIntensity: 0.35
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // Particle Cloud / Orbiting Starfield
    const particlesCount = 200;
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      const r = 2.8 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i] = r * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = r * Math.cos(phi);
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: accentColor,
      size: 0.045,
      transparent: true,
      opacity: 0.8
    });
    const particleCloud = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleCloud);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(accentColor, 3, 20);
    pointLight1.position.set(4, 4, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(secondaryColor, 2, 20);
    pointLight2.position.set(-4, -4, 2);
    scene.add(pointLight2);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 2;
      targetY = y * 2;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });

    // Responsive Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Soft Mouse Parallax Easing
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Rotations
      outerMesh.rotation.x = elapsedTime * 0.15 + mouseY * 0.4;
      outerMesh.rotation.y = elapsedTime * 0.2 + mouseX * 0.4;

      innerMesh.rotation.x = -elapsedTime * 0.25 - mouseY * 0.3;
      innerMesh.rotation.y = elapsedTime * 0.3 - mouseX * 0.3;

      particleCloud.rotation.y = elapsedTime * 0.05;
      particleCloud.rotation.x = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      if (container && renderer.domElement) {
        container.innerHTML = '';
      }
    };
  }, [theme, accent]);

  if (!hasWebGL) {
    return (
      <CanvasContainer>
        <FallbackOrb />
      </CanvasContainer>
    );
  }

  return <CanvasContainer ref={containerRef} />;
};

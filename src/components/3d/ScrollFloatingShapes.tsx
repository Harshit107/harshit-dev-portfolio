import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import { useTheme } from '../../theme/ThemeContext';

const CanvasWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;

  canvas {
    width: 100% !important;
    height: 100% !important;
    display: block;
  }
`;

export const ScrollFloatingShapes: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme, accent } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) return;
    } catch {
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 20;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const accentColor = new THREE.Color(theme.accent);
    const secondaryColor = new THREE.Color(theme.accentSecondary);

    interface FloatingMesh {
      mesh: THREE.Mesh;
      baseX: number;
      baseY: number;
      baseZ: number;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
      scrollFactor: number;
    }

    const floatingMeshes: FloatingMesh[] = [];

    // Materials
    const wireMat1 = new THREE.MeshStandardMaterial({
      color: accentColor,
      wireframe: true,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.28
    });

    const wireMat2 = new THREE.MeshStandardMaterial({
      color: secondaryColor,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.24
    });

    const glowMat = new THREE.MeshStandardMaterial({
      color: accentColor,
      emissive: accentColor,
      emissiveIntensity: 0.25,
      roughness: 0.3,
      metalness: 0.7,
      transparent: true,
      opacity: 0.2
    });

    // 1. Dodecahedron (top-right near Hero / About)
    const geo1 = new THREE.DodecahedronGeometry(2, 0);
    const mesh1 = new THREE.Mesh(geo1, wireMat1);
    mesh1.position.set(11, 4, -4);
    scene.add(mesh1);
    floatingMeshes.push({
      mesh: mesh1,
      baseX: 11,
      baseY: 4,
      baseZ: -4,
      rotSpeedX: 0.002,
      rotSpeedY: 0.003,
      rotSpeedZ: 0.001,
      scrollFactor: 0.0012
    });

    // 2. Torus Knot (mid-left near Experience)
    const geo2 = new THREE.TorusKnotGeometry(1.4, 0.35, 60, 10);
    const mesh2 = new THREE.Mesh(geo2, wireMat2);
    mesh2.position.set(-11, 0, -3);
    scene.add(mesh2);
    floatingMeshes.push({
      mesh: mesh2,
      baseX: -11,
      baseY: 0,
      baseZ: -3,
      rotSpeedX: 0.0025,
      rotSpeedY: 0.002,
      rotSpeedZ: 0.0015,
      scrollFactor: 0.0016
    });

    // 3. Octahedron Diamond (right near Projects)
    const geo3 = new THREE.OctahedronGeometry(2.2, 0);
    const mesh3 = new THREE.Mesh(geo3, glowMat);
    mesh3.position.set(11, -4, -5);
    scene.add(mesh3);
    floatingMeshes.push({
      mesh: mesh3,
      baseX: 11,
      baseY: -4,
      baseZ: -5,
      rotSpeedX: 0.0018,
      rotSpeedY: 0.003,
      rotSpeedZ: 0.0015,
      scrollFactor: 0.0014
    });

    // 4. Icosahedron (left near Skills & Education)
    const geo4 = new THREE.IcosahedronGeometry(1.8, 1);
    const mesh4 = new THREE.Mesh(geo4, wireMat1);
    mesh4.position.set(-10, -8, -4);
    scene.add(mesh4);
    floatingMeshes.push({
      mesh: mesh4,
      baseX: -10,
      baseY: -8,
      baseZ: -4,
      rotSpeedX: 0.002,
      rotSpeedY: 0.002,
      rotSpeedZ: 0.0025,
      scrollFactor: 0.0015
    });

    // 5. Torus Ring (bottom-right near Contact)
    const geo5 = new THREE.TorusGeometry(2.4, 0.3, 16, 44);
    const mesh5 = new THREE.Mesh(geo5, wireMat2);
    mesh5.position.set(10, -12, -4);
    scene.add(mesh5);
    floatingMeshes.push({
      mesh: mesh5,
      baseX: 10,
      baseY: -12,
      baseZ: -4,
      rotSpeedX: 0.0025,
      rotSpeedY: 0.002,
      rotSpeedZ: 0.0015,
      scrollFactor: 0.0016
    });

    // Ambient floating starfield / dust particles
    const particleCount = 140;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 45;
      particlePositions[i + 1] = (Math.random() - 0.5) * 60;
      particlePositions[i + 2] = (Math.random() - 0.5) * 30 - 5;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: accentColor,
      size: 0.04,
      transparent: true,
      opacity: 0.5
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Dynamic Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(accentColor, 2, 35);
    light1.position.set(8, 8, 8);
    scene.add(light1);

    const light2 = new THREE.PointLight(secondaryColor, 1.6, 35);
    light2.position.set(-8, -8, 8);
    scene.add(light2);

    // Parallax mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5);
      targetMouseY = (e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Smooth Scroll tracking
    let currentScrollY = window.scrollY;

    // Resize
    const handleResize = () => {
      if (!container) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth scroll tracking matching native page scroll
      currentScrollY += (window.scrollY - currentScrollY) * 0.15;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Subtle camera parallax
      camera.position.x = mouseX * 0.6;
      camera.position.y = -mouseY * 0.6;
      camera.lookAt(0, 0, 0);

      // Gentle drift: shapes move subtly with page scroll without accelerating visual speed
      floatingMeshes.forEach((item) => {
        item.mesh.rotation.x += item.rotSpeedX;
        item.mesh.rotation.y += item.rotSpeedY;
        item.mesh.rotation.z += item.rotSpeedZ;

        // Vertical scroll parallax translation with calibrated gentle factor
        item.mesh.position.y = item.baseY + currentScrollY * item.scrollFactor;
        item.mesh.position.x = item.baseX + Math.sin(currentScrollY * 0.001 + item.baseY) * 0.2;
      });

      // Ambient particle drift
      particleSystem.rotation.y += 0.0004;
      particleSystem.rotation.x += 0.0002;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geo1.dispose();
      geo2.dispose();
      geo3.dispose();
      geo4.dispose();
      geo5.dispose();
      wireMat1.dispose();
      wireMat2.dispose();
      glowMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      if (container && renderer.domElement) {
        container.innerHTML = '';
      }
    };
  }, [theme, accent]);

  return <CanvasWrapper ref={containerRef} aria-hidden="true" />;
};

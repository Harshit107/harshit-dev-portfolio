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
    camera.position.z = 18;

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

    // Create 3D geometric shapes distributed along vertical space
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
      opacity: 0.35
    });

    const wireMat2 = new THREE.MeshStandardMaterial({
      color: secondaryColor,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.3
    });

    const glowMat = new THREE.MeshStandardMaterial({
      color: accentColor,
      emissive: accentColor,
      emissiveIntensity: 0.4,
      roughness: 0.3,
      metalness: 0.7,
      transparent: true,
      opacity: 0.25
    });

    // 1. Dodecahedron (top-right near Hero / About)
    const geo1 = new THREE.DodecahedronGeometry(2.2, 0);
    const mesh1 = new THREE.Mesh(geo1, wireMat1);
    mesh1.position.set(11, 4, -4);
    scene.add(mesh1);
    floatingMeshes.push({
      mesh: mesh1,
      baseX: 11,
      baseY: 4,
      baseZ: -4,
      rotSpeedX: 0.005,
      rotSpeedY: 0.008,
      rotSpeedZ: 0.003,
      scrollFactor: 0.008
    });

    // 2. Torus Knot (mid-left near Experience)
    const geo2 = new THREE.TorusKnotGeometry(1.6, 0.4, 64, 12);
    const mesh2 = new THREE.Mesh(geo2, wireMat2);
    mesh2.position.set(-12, -2, -2);
    scene.add(mesh2);
    floatingMeshes.push({
      mesh: mesh2,
      baseX: -12,
      baseY: -2,
      baseZ: -2,
      rotSpeedX: 0.007,
      rotSpeedY: 0.004,
      rotSpeedZ: 0.006,
      scrollFactor: 0.012
    });

    // 3. Octahedron Diamond (right near Projects)
    const geo3 = new THREE.OctahedronGeometry(2.5, 0);
    const mesh3 = new THREE.Mesh(geo3, glowMat);
    mesh3.position.set(12, -8, -6);
    scene.add(mesh3);
    floatingMeshes.push({
      mesh: mesh3,
      baseX: 12,
      baseY: -8,
      baseZ: -6,
      rotSpeedX: 0.004,
      rotSpeedY: 0.009,
      rotSpeedZ: 0.005,
      scrollFactor: 0.01
    });

    // 4. Icosahedron (left near Skills & Education)
    const geo4 = new THREE.IcosahedronGeometry(2, 1);
    const mesh4 = new THREE.Mesh(geo4, wireMat1);
    mesh4.position.set(-11, -14, -4);
    scene.add(mesh4);
    floatingMeshes.push({
      mesh: mesh4,
      baseX: -11,
      baseY: -14,
      baseZ: -4,
      rotSpeedX: 0.006,
      rotSpeedY: 0.005,
      rotSpeedZ: 0.008,
      scrollFactor: 0.009
    });

    // 5. Torus Ring (bottom-right near Contact)
    const geo5 = new THREE.TorusGeometry(2.8, 0.35, 16, 50);
    const mesh5 = new THREE.Mesh(geo5, wireMat2);
    mesh5.position.set(10, -20, -3);
    scene.add(mesh5);
    floatingMeshes.push({
      mesh: mesh5,
      baseX: 10,
      baseY: -20,
      baseZ: -3,
      rotSpeedX: 0.008,
      rotSpeedY: 0.006,
      rotSpeedZ: 0.004,
      scrollFactor: 0.011
    });

    // Ambient floating starfield / dust particles
    const particleCount = 180;
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
      size: 0.05,
      transparent: true,
      opacity: 0.6
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Dynamic Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(accentColor, 2.5, 35);
    light1.position.set(8, 8, 8);
    scene.add(light1);

    const light2 = new THREE.PointLight(secondaryColor, 2, 35);
    light2.position.set(-8, -8, 8);
    scene.add(light2);

    // Parallax mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 1.5;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 1.5;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Scroll tracking
    let currentScrollY = window.scrollY;
    let targetScrollY = window.scrollY;

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

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

      // Smooth scroll lerp
      currentScrollY += (targetScrollY - currentScrollY) * 0.08;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Camera parallax
      camera.position.x = mouseX * 2;
      camera.position.y = -mouseY * 2;
      camera.lookAt(0, 0, 0);

      // Animate floating shapes with scroll translation and multi-axis tumbling
      floatingMeshes.forEach((item) => {
        item.mesh.rotation.x += item.rotSpeedX;
        item.mesh.rotation.y += item.rotSpeedY;
        item.mesh.rotation.z += item.rotSpeedZ;

        // Vertical scroll parallax translation
        item.mesh.position.y = item.baseY + currentScrollY * item.scrollFactor;
        item.mesh.position.x = item.baseX + Math.sin(currentScrollY * 0.002 + item.baseY) * 0.5;
      });

      // Slowly rotate particle dust
      particleSystem.rotation.y += 0.0008;
      particleSystem.rotation.x += 0.0004;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
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

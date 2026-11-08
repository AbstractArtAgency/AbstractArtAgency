"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 55;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    // make the canvas visually subtle and non-interactive so foreground text remains the focus
    renderer.domElement.style.pointerEvents = "none";
    renderer.domElement.style.opacity = "0.6"; // reduce visibility
    renderer.domElement.style.filter = "blur(2px) saturate(0.95)"; // light blur + slight desaturation
    mount.appendChild(renderer.domElement);

    const particleCount = 2500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const palette = [
      new THREE.Color("#DD1E1B"), // Czerwień AbstractArt
      new THREE.Color("#F16001"), // Pomarańcz Żaru
      new THREE.Color("#0E0907"), // Atrament
      new THREE.Color("#8A170F"), // wino
    ];

    // create a circular sprite texture so points render round instead of square
    const spriteCanvas = document.createElement("canvas");
    spriteCanvas.width = 64;
    spriteCanvas.height = 64;
    const spriteCtx = spriteCanvas.getContext("2d")!;
    spriteCtx.clearRect(0, 0, 64, 64);
    // draw a filled circle
    spriteCtx.fillStyle = "#ffffff";
    spriteCtx.beginPath();
    spriteCtx.arc(32, 32, 30, 0, Math.PI * 2);
    spriteCtx.closePath();
    spriteCtx.fill();
    const spriteTexture = new THREE.CanvasTexture(spriteCanvas);

    for (let i = 0; i < particleCount; i += 1) {
      const radius = 25 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      const color = palette[Math.floor(Math.random() * palette.length)];

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      // slightly smaller, subtler points for a lighter background
      size: 0.6,
      map: spriteTexture,
      vertexColors: true,
      transparent: true,
      alphaTest: 0.01,
      opacity: 0.35, // make particles much less prominent
      blending: THREE.NormalBlending, // light page background
      sizeAttenuation: true,
      depthWrite: false,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMouseMove = (event: MouseEvent) => {
      mouse.tx = (event.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    let frameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      points.rotation.y = mouse.x * 0.4 + time * 0.05;
      points.rotation.x = -mouse.y * 0.25;

      const scale = 1 + Math.sin(time * 0.5) * 0.06;
      points.scale.set(scale, scale, scale);

      const positionAttribute = geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i += 1) {
        const index = i * 3;
        positionAttribute.array[index] =
          originalPositions[index] + Math.sin(time + i * 0.01) * 1.5;
        positionAttribute.array[index + 1] =
          originalPositions[index + 1] + Math.cos(time + i * 0.012) * 1.5;
        positionAttribute.array[index + 2] =
          originalPositions[index + 2] + Math.sin(time * 0.7 + i * 0.008) * 1.5;
      }
      positionAttribute.needsUpdate = true;

      renderer.render(scene, camera);
    };

    const timeoutId = window.setTimeout(animate, 300);
    const onResize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(timeoutId);
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.domElement.remove();
      geometry.dispose();
      // dispose the sprite texture created for round particles
      try {
        spriteTexture && spriteTexture.dispose();
      } catch (e) {
        // ignore if already disposed
      }
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
}

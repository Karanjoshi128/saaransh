'use client';

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Html } from "@react-three/drei";

function RotatingPdf() {
  const mesh = useRef<any>("");
  useFrame(() => {
    if (mesh.current) mesh.current.rotation.y += 0.01;
  });
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={mesh} castShadow>
        <boxGeometry args={[2.2, 3, 0.2]} />
        <meshStandardMaterial color="#be185d" roughness={0.3} metalness={0.2} />
      </mesh>
      <Html position={[0, 0, 0.15]} center>
        <div className="bg-white/90 rounded px-2 py-1 text-xs font-bold text-primary shadow">
          PDF
        </div>
      </Html>
    </Float>
  );
}

export default function HeroThreeScene() {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 40 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <RotatingPdf />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.5} />
    </Canvas>
  );
}
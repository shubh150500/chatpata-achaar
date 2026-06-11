"use client";

import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, AdaptiveDpr } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";
import PickleJar from "./PickleJar";
import SpiceParticles from "./SpiceParticles";
import SplashBurst from "./SplashBurst";

/**
 * Cinematic intro driven by GSAP:
 *  1. camera starts far + low, slowly zooms in
 *  2. jar rotates into screen
 *  3. splash (pickle chunks + oil droplets) bursts out and settles
 * After the intro, gentle pointer parallax takes over.
 */
function Rig({
  splash,
  introDone,
}: {
  splash: React.MutableRefObject<number>;
  introDone: React.MutableRefObject<boolean>;
}) {
  const cam = useRef({ z: 9, y: 1.6 });

  useEffect(() => {
    const tl = gsap.timeline();
    // camera zoom-in
    tl.to(cam.current, {
      z: 5,
      y: 0.4,
      duration: 2.6,
      ease: "power3.out",
    });
    // splash burst + settle (0 → 1 over the same window)
    tl.to(
      splash,
      { current: 1, duration: 2.8, ease: "power2.out" },
      0.4
    );
    tl.call(() => {
      introDone.current = true;
    });
    return () => {
      tl.kill();
    };
  }, [splash, introDone]);

  useFrame((state) => {
    const c = state.camera;
    if (!introDone.current) {
      c.position.set(0, cam.current.y, cam.current.z);
    } else {
      // pointer parallax
      const x = state.pointer.x * 0.6;
      const y = 0.4 + state.pointer.y * 0.3;
      c.position.x += (x - c.position.x) * 0.03;
      c.position.y += (y - c.position.y) * 0.03;
      c.position.z += (5 - c.position.z) * 0.03;
    }
    c.lookAt(0, 0, 0);
  });

  return null;
}

export default function HeroCanvas() {
  const splash = useRef(0);
  const introDone = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  return (
    <Canvas
      shadows={!isMobile}
      dpr={[1, isMobile ? 1.5 : 2]}
      camera={{ position: [0, 1.6, 9], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="!absolute inset-0"
    >
      <AdaptiveDpr pixelated />
      <Rig splash={splash} introDone={introDone} />

      {/* Ambient luxury lighting (no network-dependent HDRI environment) */}
      <ambientLight intensity={0.45} />
      <hemisphereLight args={["#ffd9a0", "#3a0d0d", 0.8]} />
      <spotLight
        position={[5, 8, 5]}
        angle={0.4}
        penumbra={1}
        intensity={120}
        color="#ffb347"
        castShadow={!isMobile}
      />
      <pointLight position={[-5, 2, -3]} intensity={40} color="#b71c1c" />
      <pointLight position={[3, -2, 4]} intensity={25} color="#f9a825" />

      <Suspense fallback={null}>
        <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.4}>
          <PickleJar />
          <SplashBurst progress={splash} />
        </Float>

        <SpiceParticles count={isMobile ? 120 : 240} />

        {!isMobile && (
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.5}
            scale={8}
            blur={2.6}
            far={4}
            color="#000000"
          />
        )}
      </Suspense>
    </Canvas>
  );
}

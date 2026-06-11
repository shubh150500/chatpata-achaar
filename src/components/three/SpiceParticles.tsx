"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Floating mustard seeds + spice motes drifting in ambient light. */
export default function SpiceParticles({ count = 220 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const { positions, speeds, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#f9a825"),
      new THREE.Color("#ff6f00"),
      new THREE.Color("#b71c1c"),
      new THREE.Color("#fff8e1"),
    ];
    for (let i = 0; i < count; i++) {
      // deterministic-ish spread using trig so no Math.random reliance issues
      const r = 4 + (i % 7);
      const a = (i / count) * Math.PI * 2 * 5;
      positions[i * 3] = Math.cos(a) * r * (0.3 + (i % 5) / 5);
      positions[i * 3 + 1] = ((i % 40) / 40) * 10 - 5;
      positions[i * 3 + 2] = Math.sin(a) * r * (0.3 + (i % 5) / 5);
      speeds[i] = 0.1 + (i % 10) / 25;
      const c = palette[i % palette.length];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, speeds, colors };
  }, [count]);

  useFrame((state, delta) => {
    if (!points.current) return;
    const arr = points.current.geometry.attributes.position
      .array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * delta * 0.6;
      arr[i * 3] +=
        Math.sin(state.clock.elapsedTime * 0.5 + i) * delta * 0.05;
      if (arr[i * 3 + 1] > 5.5) arr[i * 3 + 1] = -5.5;
    }
    points.current.geometry.attributes.position.needsUpdate = true;
    points.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

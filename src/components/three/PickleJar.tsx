"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A premium pickle jar built from primitives (no external GLB needed).
 * Glass body + mustard-oil contents + floating pickle chunks + metal lid + label area.
 */
export default function PickleJar({
  spin = true,
}: {
  spin?: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const chunks = useRef<THREE.Group>(null);

  // Pre-compute pickle chunk transforms inside the jar
  const pieces = useMemo(() => {
    const arr: { pos: [number, number, number]; rot: [number, number, number]; scale: number }[] =
      [];
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2;
      const r = 0.28 + (i % 3) * 0.12;
      arr.push({
        pos: [
          Math.cos(a) * r,
          -0.55 + (i % 5) * 0.18,
          Math.sin(a) * r,
        ],
        rot: [a, a * 1.3, a * 0.7],
        scale: 0.13 + (i % 4) * 0.03,
      });
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (spin && group.current) {
      group.current.rotation.y += delta * 0.35;
    }
    if (chunks.current) {
      chunks.current.rotation.y -= delta * 0.15;
      chunks.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.8) * 0.03;
    }
  });

  return (
    <group ref={group} position={[0, -0.2, 0]}>
      {/* ---- Glass jar body ---- */}
      <mesh castShadow position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.95, 0.95, 2.0, 64, 1, true]} />
        <meshPhysicalMaterial
          transmission={0.92}
          thickness={0.6}
          roughness={0.05}
          ior={1.45}
          clearcoat={1}
          clearcoatRoughness={0.05}
          color="#eafff2"
          transparent
          opacity={0.55}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* jar bottom */}
      <mesh position={[0, -0.9, 0]}>
        <cylinderGeometry args={[0.95, 0.9, 0.15, 64]} />
        <meshPhysicalMaterial
          transmission={0.85}
          thickness={0.5}
          roughness={0.1}
          color="#dff7e8"
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* ---- Mustard-oil contents ---- */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.88, 0.85, 1.25, 48]} />
        <meshPhysicalMaterial
          color="#cf7a12"
          roughness={0.25}
          metalness={0.1}
          transmission={0.35}
          thickness={1.2}
          transparent
          opacity={0.92}
          emissive="#7a3d00"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* floating pickle chunks inside */}
      <group ref={chunks}>
        {pieces.map((p, i) => (
          <mesh key={i} position={p.pos} rotation={p.rot}>
            <boxGeometry args={[p.scale, p.scale * 0.7, p.scale]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? "#d84315" : i % 3 === 1 ? "#f9a825" : "#bf360c"}
              roughness={0.6}
            />
          </mesh>
        ))}
      </group>

      {/* ---- Label area (placeholder for logo) ---- */}
      <mesh position={[0, 0.05, 0.92]} rotation={[0, 0, 0]}>
        <planeGeometry args={[1.2, 0.95]} />
        <meshStandardMaterial color="#fff8e1" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.05, 0.93]}>
        <planeGeometry args={[1.05, 0.8]} />
        <meshStandardMaterial color="#b71c1c" roughness={0.5} />
      </mesh>

      {/* ---- Metal lid ---- */}
      <mesh position={[0, 1.18, 0]} castShadow>
        <cylinderGeometry args={[1.0, 1.0, 0.32, 64]} />
        <meshStandardMaterial
          color="#3b2f2f"
          metalness={0.9}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0, 1.35, 0]}>
        <cylinderGeometry args={[0.97, 1.0, 0.06, 64]} />
        <meshStandardMaterial color="#f9a825" metalness={0.8} roughness={0.25} />
      </mesh>

      {/* neck ring */}
      <mesh position={[0, 1.0, 0]}>
        <torusGeometry args={[0.95, 0.05, 16, 64]} />
        <meshStandardMaterial color="#e8f8ee" metalness={0.2} roughness={0.1} />
      </mesh>
    </group>
  );
}

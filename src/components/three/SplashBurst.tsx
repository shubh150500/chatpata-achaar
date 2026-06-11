"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Cinematic splash: pickle chunks + golden oil droplets burst outward from the
 * jar on load, hang in the air, then gently settle back. Driven by a shared
 * `progress` ref (0 → 1) so it stays in sync with the intro timeline.
 */
export default function SplashBurst({
  progress,
}: {
  progress: React.MutableRefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);

  const bits = useMemo(() => {
    const arr: {
      dir: THREE.Vector3;
      dist: number;
      spin: THREE.Vector3;
      scale: number;
      kind: "chunk" | "oil";
      color: string;
    }[] = [];
    const chunkColors = ["#d84315", "#f9a825", "#bf360c", "#e65100"];
    for (let i = 0; i < 26; i++) {
      const a = (i / 26) * Math.PI * 2;
      const elev = (((i * 37) % 100) / 100) * 1.4 - 0.2;
      const dir = new THREE.Vector3(
        Math.cos(a),
        elev + 0.6,
        Math.sin(a)
      ).normalize();
      const oil = i % 2 === 0;
      arr.push({
        dir,
        dist: 1.6 + ((i * 13) % 100) / 60,
        spin: new THREE.Vector3(
          ((i % 5) - 2) * 0.04,
          ((i % 7) - 3) * 0.04,
          ((i % 3) - 1) * 0.04
        ),
        scale: oil ? 0.05 + ((i % 4) * 0.015) : 0.1 + ((i % 5) * 0.03),
        kind: oil ? "oil" : "chunk",
        color: oil ? "#f9a825" : chunkColors[i % chunkColors.length],
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    const p = progress.current; // 0..1
    // ease: burst out fast, settle slowly (parabolic hang)
    const burst = Math.sin(Math.min(p, 1) * Math.PI); // 0→1→0
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      const b = bits[i];
      if (!b) return;
      const d = b.dist * burst;
      child.position.set(
        b.dir.x * d,
        b.dir.y * d + Math.sin(t + i) * 0.05 * burst - 0.1,
        b.dir.z * d
      );
      child.rotation.x += b.spin.x;
      child.rotation.y += b.spin.y;
      child.rotation.z += b.spin.z;
      const s = b.scale * (0.4 + burst);
      child.scale.setScalar(s);
      const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
      if (mat) mat.opacity = burst;
    });
  });

  return (
    <group ref={group}>
      {bits.map((b, i) => (
        <mesh key={i}>
          {b.kind === "oil" ? (
            <sphereGeometry args={[1, 12, 12]} />
          ) : (
            <boxGeometry args={[1, 0.7, 1]} />
          )}
          <meshStandardMaterial
            color={b.color}
            roughness={b.kind === "oil" ? 0.1 : 0.6}
            metalness={b.kind === "oil" ? 0.3 : 0}
            transparent
            opacity={0}
            emissive={b.kind === "oil" ? "#7a3d00" : "#000000"}
            emissiveIntensity={b.kind === "oil" ? 0.2 : 0}
          />
        </mesh>
      ))}
    </group>
  );
}

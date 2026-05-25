"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Center,
  Environment,
  PerspectiveCamera,
  useGLTF,
} from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

const GLB_URL = "/3d/haus-und-hang-hero.glb";

useGLTF.preload(GLB_URL);

// Längste Mesh-Kante = TARGET_SIZE Welt-Einheiten.
// Native GLB-Größe ist ~1000 Einheiten — ohne Skalierung sitzt die Kamera drin.
const TARGET_SIZE = 6;

function HeroMesh() {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF(GLB_URL);

  const dressed = useMemo(() => {
    const cloned = scene.clone(true);

    // Blender-Default-Cube entfernen — bleibt der eigentliche Berg.
    const cubes: THREE.Object3D[] = [];
    cloned.traverse((n) => {
      if (n.name === "Cube") cubes.push(n);
    });
    for (const c of cubes) c.parent?.remove(c);

    // Material komplett überschreiben.
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#1E2A23"),
      metalness: 0.1,
      roughness: 0.75,
      flatShading: true,
    });
    cloned.traverse((n) => {
      const m = n as THREE.Mesh;
      if (m.isMesh) {
        m.material = mat;
        m.castShadow = false;
        m.receiveShadow = false;
      }
    });

    // Auto-scale auf TARGET_SIZE basierend auf realer Bbox.
    cloned.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    cloned.scale.setScalar(TARGET_SIZE / maxDim);

    return cloned;
  }, [scene]);

  // 90 s / Umdrehung am äußeren Y-Rotator.
  const RAD_PER_S = (2 * Math.PI) / 90;
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += RAD_PER_S * delta;
  });

  return (
    <group ref={ref}>
      {/* Center re-zentriert auf Origin; position schiebt nach unten,
          damit die Spitze in der oberen Bildhälfte sitzt. */}
      <Center position={[0, -1, 0]}>
        <primitive object={dressed} />
      </Center>
    </group>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.75]}
      style={{ width: "100%", height: "100%" }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 9]} fov={50} />
      <color attach="background" args={["#0F1612"]} />

      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={0.8}
          color="#B87333"
        />
        <Environment preset="dawn" environmentIntensity={0.4} />
        <HeroMesh />
      </Suspense>
    </Canvas>
  );
}

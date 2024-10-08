"use client";

import * as THREE from "three";
import React, { useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";

// サイズを指定
const width = 960;
const height = 540;

const Box = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[400, 400, 400]} />
      <meshNormalMaterial />
    </mesh>
  );
};

export default function Page() {
  return (
    <Canvas
      camera={{
        fov: 90,
        aspect: 960 / 540,
        near: 0.1,
        far: 10000,
        position: [0, 0, 1000],
        // rotation: [-Math.PI / 12, 0, 0],
      }}
      style={{ width: width, height: height, backgroundColor: "#000" }}
    >
      <Box />
    </Canvas>
  );
}

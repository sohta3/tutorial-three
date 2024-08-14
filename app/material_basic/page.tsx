"use client";

import * as THREE from "three";
import React, { useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

// サイズを指定
const width = 960;
const height = 540;

const Earth = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const colorMap = useLoader(TextureLoader, "./earthmap1k.jpg");

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[300, 30, 30]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
};

const Sphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[300, 30, 30]} />
      <meshStandardMaterial color={0xff0000} />
      {/* <meshNormalMaterial /> */}
    </mesh>
  );
};

export default function Page() {
  return (
    <Canvas
      camera={{
        fov: 45,
        aspect: 960 / 540,
        near: 1,
        far: 10000,
        position: [0, 0, 1000],
      }}
      style={{
        width: width,
        height: height,
        backgroundColor: "#000",
      }}
    >
      <Earth />
      {/* <Sphere /> */}

      <directionalLight color={0xffffff} position={[1, 1, 1]} />
      {/* <ambientLight intensity={0.5} color={0xffffff} /> */}
    </Canvas>
  );
}

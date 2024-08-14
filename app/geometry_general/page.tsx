"use client";

import * as THREE from "three";
import React, { useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

// サイズを指定
const width = 960;
const height = 540;

// ジオメトリを作成
const geometryList = [
  <sphereGeometry args={[50]} />,
  <boxGeometry args={[100, 100, 100]} />,
  <planeGeometry args={[100, 100]} />,
  <tetrahedronGeometry args={[100, 0]} />,
  <coneGeometry args={[100, 100, 32]} />,
  <cylinderGeometry args={[50, 50, 100, 32]} />,
  <torusGeometry args={[50, 30, 16, 100]} />,
];

const Mesh = () => {
  return <meshStandardMaterial color={0xff0000} side={THREE.DoubleSide} />;
};

const Geometory = ({ index }: { index: number }) => {
  return (
    <mesh
      position={[
        400 * Math.sin((index / geometryList.length) * Math.PI * 2),
        0,
        400 * Math.cos((index / geometryList.length) * Math.PI * 2),
      ]}
    >
      {geometryList[index]}
      <Mesh />
    </mesh>
  );
};

const Group = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      {geometryList.map((_, index) => (
        <Geometory key={index} index={index} />
      ))}
      <directionalLight color={0xffffff} position={[1, 1, 1]} />
      <ambientLight intensity={0.5} color={0x999999} />
    </group>
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
        position: [0, 500, 1000],
      }}
      style={{
        width: width,
        height: height,
        backgroundColor: "#000",
      }}
    >
      <Group />
    </Canvas>
  );
}

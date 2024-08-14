"use client";

import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

// サイズを指定
const width = 960;
const height = 540;

const Box = () => {
  return (
    <mesh>
      <boxGeometry args={[300, 300, 300]} />
      <meshNormalMaterial />
    </mesh>
  );
};

export default function Page() {
  return (
    <Canvas
      style={{
        width: width,
        height: height,
        backgroundColor: "#000",
      }}
    >
      <directionalLight color={0xffffff} position={[1, 1, 1]} />
      <OrbitControls />
      <PerspectiveCamera
        makeDefault
        fov={45}
        aspect={width / height}
        position={[0, 0, 1000]}
      />
      <Box />
    </Canvas>
  );
}

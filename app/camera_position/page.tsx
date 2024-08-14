"use client";

import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { PerspectiveCamera } from "@react-three/drei";

// サイズを指定
const width = 960;
const height = 540;

const Earth = () => {
  const colorMap = useLoader(TextureLoader, "./earthmap1k.jpg");
  colorMap.colorSpace = THREE.SRGBColorSpace;

  return (
    <mesh>
      <sphereGeometry args={[300, 30, 30]} />
      <meshStandardMaterial map={colorMap} side={THREE.DoubleSide} />
    </mesh>
  );
};

const StarField = () => {
  // 頂点情報を作成
  const vertices: THREE.TypedArray = React.useMemo(() => {
    const array = new Float32Array(1000 * 3);

    for (let i = 0; i < array.length; i++) {
      const value = 3000 * (Math.random() - 0.5);
      array[i] = value;
    }
    return array;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={vertices.length / 3}
          array={vertices}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={10} color={0xffffff} />
    </points>
  );
};

const MovingCamera = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  let rot = 0; // 角度
  let mouseX = 0; // マウス座標

  // マウス座標はマウスが動いた時のみ取得できる
  useEffect(() => {
    const handler = function (event: MouseEvent) {
      mouseX = event.pageX;
    };

    document.addEventListener("mousemove", handler);

    return () => {
      document.removeEventListener("mousemove", handler);
    };
  }, []);

  useFrame(() => {
    if (!cameraRef.current) {
      return;
    }

    // カメラが円周上を自動的に移動する
    // 毎フレーム角度を0.5度ずつ足していく
    rot += 0.5;

    // マウスの横の移動に対してカメラが移動する
    // マウスのX座標がステージの幅の何%の位置にあるか調べてそれを360度で乗算する
    // const targetRot = (mouseX / window.innerWidth) * 360;

    // イージングの公式を用いて滑らかにする
    // 値 += (目標値 - 現在の値) * 減速値
    // rot += (targetRot - rot) * 0.02;

    // ラジアンに変換する
    const radian = (rot * Math.PI) / 180;
    // 角度に応じてカメラの位置を設定
    cameraRef.current.position.x = 1000 * Math.sin(radian);
    cameraRef.current.position.y = 0;
    cameraRef.current.position.z = 1000 * Math.cos(radian);
    // 原点方向を見つめる
    cameraRef.current.lookAt(new THREE.Vector3(0, 0, 0));
  });

  return (
    <>
      <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 0, 1000]} />
    </>
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
      <MovingCamera />
      <Earth />
      <StarField />
    </Canvas>
  );
}


import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { Canvas, useLoader } from "@react-three/fiber";
import * as THREE from "three";
export default function Icons(props) {
  const { nodes, materials } = useGLTF('/models/Icons.gltf')
  const iconMap = useLoader(THREE.TextureLoader, '/textures/Icons.png')
  return (
    <group {...props} dispose={null}>
      <mesh
      scale={0.008}
        castShadow
        receiveShadow
        geometry={nodes.Icons.geometry}
         
      >
        <meshBasicMaterial map={iconMap} transparent={true}/>
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/Icons.gltf')
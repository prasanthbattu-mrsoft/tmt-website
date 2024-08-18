
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Tower(props) {
  const { nodes, materials } = useGLTF('/models/Tower.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tower.geometry}
        
        scale={0.25}
      ><meshStandardMaterial color={"white"}/></mesh>
    </group>
  )
}

useGLTF.preload('/models/Tower.gltf')

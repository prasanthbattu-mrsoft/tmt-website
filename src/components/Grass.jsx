import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Grass(props) {
  const { nodes, materials } = useGLTF('/models/Grass.gltf')
  return (
    <group {...props} dispose={null} scale={0.25}>
    <group position={[0, 1, 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Grass-Mat5'].geometry}
        material={materials['Mat.5']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Grass-Mat'].geometry}
        material={materials.Mat}
      />
    </group>
  </group>
  )
}

useGLTF.preload('/models/Grass.gltf')

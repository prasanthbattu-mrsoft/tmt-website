
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { DoubleSide } from 'three'

export default function Base(props) {
  const { nodes, materials } = useGLTF('/models/Base.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Base.geometry} 
        scale={0.25}
        
       ><meshStandardMaterial side={DoubleSide}/></mesh>
    </group>
  )
}

useGLTF.preload('/models/Base.gltf')

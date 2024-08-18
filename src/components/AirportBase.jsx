
import React, { useEffect, useRef } from 'react'
import { SpriteAnimator, useGLTF } from '@react-three/drei'
import { DoubleSide } from 'three'
 
export default function AirportBase(props) {
  const { nodes, materials } = useGLTF('/models/AirportBase.gltf')
  const mesh =useRef()
  
  useEffect(()=>{
    console.log(mesh.current.position)
  },[])
  return (
    <group {...props} dispose={null}>

      
        
      <mesh
      ref={mesh}
        castShadow
        receiveShadow
        geometry={nodes.AirportBase.geometry}
        position={[0,0.05,0]}
        scale={0.25}
      ><meshBasicMaterial color={"#7292a0"} side={DoubleSide}/>
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/AirportBase.gltf')
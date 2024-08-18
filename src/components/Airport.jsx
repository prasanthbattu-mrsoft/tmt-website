import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import { DoubleSide } from 'three';
 
export default function Airport({props,cameraState}) {
  const { nodes, materials } = useGLTF('/models/Airport.gltf')

  const mesh = useRef(); 
    
  const revealAirport = () => {
      gsap.to(mesh.current.position, {
          y:9,        
          duration: 2,
          ease: "power1.inOut",
      });
       
  };

  const hideAirport = () => {
    gsap.to(mesh.current.position, {
        y:0,        
        duration: 2,
        ease: "power1.inOut",
    });
     
};

  useEffect(() => {
    if (cameraState === 2) {
       revealAirport()
    }  
     else{
        hideAirport()
    }

}, [cameraState])
  return (

    <group {...props} dispose={null} scale={0.25} position={[0,0.1,0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Airport-Mat7'].geometry}
        material={materials['Mat.7']}
      />
      <mesh
   
        castShadow
        receiveShadow
        geometry={nodes['Airport-Mat6'].geometry}
        material={materials['Mat.6']}
      />
      <mesh
      
        castShadow
        receiveShadow
        geometry={nodes['Airport-Mat'].geometry}
        material={materials.Mat}
      />
      <mesh
         ref={mesh}
        castShadow
        receiveShadow
        geometry={nodes['Airport-Mat3'].geometry}
        material={materials['Mat.3']}
      />
    </group>
  )
}

useGLTF.preload('/models/Airport.gltf')

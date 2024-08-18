import React, { useEffect, useMemo, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import gsap from "gsap";


const fragmentShader = `
varying vec2 vUvs; 
uniform float u_time;
uniform float opacity;
 
 
 
void main() {
  vec3 blue = vec3(1,0, 0);   
  float speed = 8.0;
  float sinWave = step(0.5,abs(sin(-vUvs.x * 400.0 + (u_time * speed)) - 1.)) ;
  vec3 color = vec3(sinWave) * blue;
  
  gl_FragColor = vec4(color, sinWave* opacity);
}

`;

const vertexShader = `
varying vec2 vUvs; 
void main() {
    vec4 localPosition = vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * localPosition;
    vUvs = uv;
}
`

export default function Lines({props,cameraState}) {
    const { nodes, materials } = useGLTF('/models/Lines.gltf')
    const mesh = useRef();
 
    
    const revealAirport = () => {
        
        gsap.to(mesh.current.material.uniforms.opacity, {
            value:0.35,        
            duration: 2,
            ease: "power1.inOut",
        });
         
    };
  
    const hideAirport = () => {
      gsap.to(mesh.current.material.uniforms.opacity, {
        value:0.0,       
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
    const uniforms = useMemo(
        () => ({
            u_time: {
                value: 0.0,
            },
            opacity:{
                value: 0.0,
            }

        }), []
    );
    useFrame((state) => {
        const { clock } = state;
        mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
    });
    return (
        <group {...props} dispose={null}>
            <mesh
                
                ref={mesh}
                scale={0.25}
                castShadow
                receiveShadow
                geometry={nodes.Lines.geometry}

            >
                <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} transparent={true} depthTest={false} depthWrite={false} />
            </mesh>
        </group>
    )
}

useGLTF.preload('/models/Lines.gltf')
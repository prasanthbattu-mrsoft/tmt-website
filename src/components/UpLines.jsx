
import React, { useEffect, useMemo, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';

const fragmentShader = `
varying vec2 vUvs; 
uniform float u_time;
uniform float opacity;
 
 
 
void main() {
  vec3 blue = vec3(0.224, 0.376, 1);   
  float speed = 8.0;
  float sinWave = step(0.5,abs(sin(-vUvs.x * 50.0 + (u_time * speed)) - 1.)) ;
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
}`
export default function UpLines(props) {
    const { nodes, materials } = useGLTF('/models/UpLines.gltf')
    const mesh = useRef();




    const uniforms = useMemo(
        () => ({
            u_time: {
                value: 0.0,
            },
            opacity: {
                value: 0.2,
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
                castShadow
                receiveShadow
                geometry={nodes.UpLines.geometry}
                material={nodes.UpLines.material}
                scale={0.25}
            >  <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} transparent={true}  /></mesh>
        </group>
    )
}

useGLTF.preload('/models/UpLines.gltf')

import React, { useRef, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { DoubleSide } from 'three'
import { useFrame } from '@react-three/fiber';
const fragmentShader = `
// uniform vec2 resolution;
// uniform int numRows;
float speed=3.0;
uniform float u_time;
int numRows = 350; 
varying vec2 vUvs;

// Function to generate a hash value based on a float input
float random(float x) {
    return fract(sin(x) * 43758.5453123);
}

// Function to generate a random color based on an integer seed
vec3 randomColor(int seed) {
    float sinWave = abs(sin(vUvs.x * 10.0 + ((u_time * 0.4)  *   (float(seed)*0.01 * random(float(seed) )) )) - 1.) ;
    float r = random(float(seed) * 12.9898);
    float g = random(float(seed) * 78.233);
    float b = random(float(seed) * 45.164);
    return vec3(sinWave);
}

void main() {
  // vec3 colorB =  vec3(1.0,1.0,1.0);
  // vec3 colorA = vec3(1, 0.788, 0.125);
vec3 colorB =  vec3(1.0,1.0,1.0);
  vec3 colorA = vec3(0.38, 0.51, 1);
  
    // Calculate the normalized coordinates of the fragment
    vec2 uv = vUvs;

    // Determine which row the fragment belongs to
    int row = int(floor(uv.y * float(numRows)));

    // Generate a random color based on the row index
    vec3 color = smoothstep(0.5,0.6,randomColor(row));
    
    vec3 opacity = color;
    vec3 opacityMask = vec3(abs(abs(vUvs.x - 0.5) - 0.5) * 2.0) ;
    

    color = mix(colorA,colorB,color);

    // Output the color
    gl_FragColor = vec4(color,(abs(opacity-1.0) +0.1) * opacityMask);
     
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
export default function Circulation(props) {
  const { nodes, materials } = useGLTF('/models/Circulation.gltf')
  const mesh = useRef();
  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },

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
        scale={0.2}
        castShadow
        receiveShadow
        geometry={nodes.Circulation.geometry}
        material={nodes.Circulation.material}
      ><shaderMaterial side={DoubleSide} fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} transparent={true} /></mesh>
      {/* <mesh position={[0.0,2.0,0.0]}>
        <planeGeometry/>
        <shaderMaterial side={DoubleSide} fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} transparent={true}/>
      </mesh> */}
    </group>

  )
}

useGLTF.preload('/models/Circulation.gltf')
import React, { useMemo, useRef } from 'react'
import { SpriteAnimator, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';

const fragmentShader = `
varying vec2 vUvs; 
uniform float u_time;
 
 
 
void main() {
  vec3 colorB =  vec3(1.0,1.0,1.0);
  //option 1 original
//   vec3 colorA = vec3(0,0,1);


  //option 2 yellow
  vec3 colorA = vec3(0.224, 0.376, 1);



  vec3 blue = vec3(0.784, 0.314, 1);   
  float speed = 4.0;
  float sinWave =   sin(vUvs.x * 10.0 + (u_time * speed) );
  vec3 color = mix(colorA,colorB,sinWave);
  
  gl_FragColor = vec4(color, 0.2);
}

`;
// const fragmentShader = `
// varying vec2 vUvs; 
// uniform float u_time;



// void main() {
//   vec3 blue = vec3(0.784, 0.314, 1);   
//   float speed = 4.0;
//   float sinWave = step(0.5,abs(sin(vUvs.x * 50.0 + (u_time * speed)) - 1.)) ;
//   vec3 color = vec3(sinWave) * blue;

//   gl_FragColor = vec4(color, sinWave * 0.4 );
// }

// `;
const vertexShader = `
varying vec2 vUvs; 
void main() {
    vec4 localPosition = vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * localPosition;
    vUvs = uv;
}
`
export default function Collaboration(props) {
    const { nodes, materials } = useGLTF('/models/Collaboration.gltf')
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
        <group {...props} dispose={null} scale={0.25}>

            <SpriteAnimator
                position={[-2.6,  7.2, 0.2]}

                scale={1.5}
                startFrame={0}
                scaleFactor={0.01}
                autoPlay={true}
                loop={true}
                numberOfFrames={1}
                textureImageURL={'/textures/Icons-02.png'}
            />
            <SpriteAnimator
                position={[12.5, 7.2, -6.5]}

                scale={1.5}
                startFrame={0}
                scaleFactor={0.01}
                autoPlay={true}
                loop={true}
                numberOfFrames={1}
                textureImageURL={'/textures/Icons-03.png'}
            />
            <SpriteAnimator
                position={[-10.8, 7.2, 13.2]}

                scale={1.5}
                startFrame={0}
                scaleFactor={0.01}
                autoPlay={true}
                loop={true}
                numberOfFrames={1}
                textureImageURL={'/textures/Icons-01.png'}
            />

            <SpriteAnimator
                position={[-15.2,  7.2, -14.5]}

                scale={1.5}
                startFrame={0}
                scaleFactor={0.01}
                autoPlay={true}
                loop={true}
                numberOfFrames={1}
                textureImageURL={'/textures/Icons-04.png'}
            />

            <mesh
                ref={mesh}
                castShadow
                receiveShadow
                geometry={nodes.Collaboration.geometry}
                position={[0, 8, 0]}
                material={nodes.Collaboration.material}
            > <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} transparent={true} opacity={0.2} />
            </mesh>
        </group>
    )
}

useGLTF.preload('/models/Collaboration.gltf')

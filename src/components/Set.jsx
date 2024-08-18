import Platforms from "@/components/Platforms";
import Buildings from "@/components/Buildings";
import Test from "@/components/Test";
import Icons from "@/components/Icons";
import Lines from "@/components/Lines";
import Heatmap from "@/components/Heatmap";
import Circulation from "@/components/Circulation";
import Grass from "@/components/Grass";
import Roads from "@/components/Roads";
import Test2 from "@/components/Test2";
import Map from "@/components/Map";
import Collaboration from "@/components/Collaboration";
import Heatmap2 from "@/components/Heatmap2";
import Data from "@/components/Data";
import Base from "@/components/Base";
import Traffic from "@/components/Traffic";
import AirportPlan from "@/components/AirportPlan";
import Airport from "@/components/Airport";
import Planes from "@/components/Planes";
import AnimatedPlane from "@/components/AnimatedPlane";
import AirportBase from "@/components/AirportBase";
import Tower from "@/components/Tower";
import Furniture from "@/components/Furniture"
import UpLines from "@/components/UpLines"
import React, { useEffect, useMemo, useRef, useState } from 'react'

import { useFrame } from "@react-three/fiber";
import {
    MeshPortalMaterial,
    OrbitControls,
    OrthographicCamera,
    PerspectiveCamera,
    SpriteAnimator,
} from "@react-three/drei";
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import useWindowSize from "@/hooks/useWindowSize";
export default function Set({ cameraState, isMobile, isWide }) {
    const size = useWindowSize();
    const cameraRef = useRef(null);
    const mesh = useRef();

    const navigateAirport = () => {
        console.log(size.width)
        gsap.to(mesh.current.position, {
            x: isMobile ? 2 : 5,
            z: isMobile ? 4 : isWide?40:18, // 45 degrees in radians
            duration: 2,
            ease: "power1.inOut",
        });
        gsap.to(mesh.current.scale, {
            x: isMobile ? 1.3 : 1.5,
            y: isMobile ? 1.3 : 1.5,
            z: isMobile ? 1.3 : 1.55, // 45 degrees in radians
            duration: 2,
            ease: "power1.inOut",
        });
    };

    const navigateRetail = () => {
        gsap.to(mesh.current.position, {
            x: -10,
            z: -2, // 45 degrees in radians
            duration: 2,
            ease: "power1.inOut",
        });
        gsap.to(mesh.current.scale, {
            x: 2,
            y: 2,
            z: 2, // 45 degrees in radians
            duration: 2,
            ease: "power1.inOut",
        });
    };

    const navigateHome = () => {
        gsap.to(mesh.current.position, {
            x: 0,
            z: 0, // 45 degrees in radians
            duration: 2,
            ease: "power1.inOut",
        });
        gsap.to(mesh.current.scale, {
            x: 1,
            y: 1,
            z: 1, // 45 degrees in radians
            duration: 2,
            ease: "power1.inOut",
        });
    };


    useEffect(() => {
        if (cameraState === 1) {
            navigateHome()

        } else if(cameraState === 2) {
            navigateAirport()

        } 

    }, [cameraState])




    const items = [
        { id: "item1", name: "Item 1" },
        { id: "item2", name: "Item 2" },
        { id: "item3", name: "Item 3" },
    ];

    const [globalScale, setGlobalScale] = useState(1.4)

    useEffect(() => {

        if (!isMobile && !isWide) {
            setGlobalScale(1.4)

        } else if(!isMobile && isWide) {


            setGlobalScale(3)
        }else {
            setGlobalScale(0.8)
        }

    }, [isMobile,isWide])


    useGSAP(() => {
        gsap.to(mesh.current.rotation, {

            y: Math.PI / 18, // 45 degrees in radians
            duration: 10,
            repeat: -1, // Infinite repeat
            yoyo: true, // Reverse the animation
            ease: "power1.inOut",
        });

    }, { scope: mesh });

    const spriteSize = 0.6
    return <>
        <OrbitControls enableZoom={false} enablePan={false} enableOrbit={true} enableRotate={false} maxPolarAngle={0} minPolarAngle={Math.PI / 3} />


        <OrthographicCamera
            ref={cameraRef}
            name="Camera"
            makeDefault={true}
            enable
            zoom={50}
            far={100000}
            near={-100000}
            up={[0, 1, 0]}
            position={[10, 8, 7]}
            rotation={[-0.78, 1.1, 0.72]}
            scale={1}
        />

        <mesh ref={mesh}   >

            <group scale={globalScale} position={isMobile?[0,0,3]:[0,0,0]}>

                <Grass />
                <Traffic />
                <Data />
                <AirportPlan />
                <Tower />
                <Planes />
                <AnimatedPlane />
                <Lines cameraState={cameraState} />
                <Base />
                <Airport cameraState={cameraState} />
                <Buildings />
                <Heatmap2 />
                <Collaboration />
                <AirportBase />
                <Furniture />
                <UpLines />

            </group>

 
        </mesh>

    </>
}

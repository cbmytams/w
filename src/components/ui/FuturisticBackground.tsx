"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Star Field - Working implementation with space colors
 */
function StarField({ count = 2500 }) {
    const mesh = useRef<THREE.Points>(null!);

    const particles = useMemo(() => {
        const positions = [];
        const colors = [];

        // Space color palette: blues, purples, whites, occasional warm
        const palette = [
            new THREE.Color("#ffffff"), // White stars (most common)
            new THREE.Color("#ffffff"),
            new THREE.Color("#ffffff"),
            new THREE.Color("#a5b4fc"), // Soft blue
            new THREE.Color("#c4b5fd"), // Soft purple
            new THREE.Color("#fbbf24"), // Warm yellow (rare)
            new THREE.Color("#f472b6"), // Pink nebula tint
        ];

        for (let i = 0; i < count; i++) {
            // Spread stars in a sphere around camera
            const radius = 200 + Math.random() * 800;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);
            positions.push(x, y, z);

            // Color
            const color = palette[Math.floor(Math.random() * palette.length)];
            colors.push(color.r, color.g, color.b);
        }

        return {
            positions: new Float32Array(positions),
            colors: new Float32Array(colors),
        };
    }, [count]);

    useFrame((state, delta) => {
        // Very slow rotation for immersion
        mesh.current.rotation.y += delta * 0.01;
        mesh.current.rotation.x += delta * 0.005;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.positions.length / 3}
                    args={[particles.positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particles.colors.length / 3}
                    args={[particles.colors, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={2}
                vertexColors
                transparent
                opacity={0.9}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

/**
 * Nebula - Soft colored glow in space
 */
function Nebula({ position, color, scale = 100 }: { position: [number, number, number]; color: string; scale?: number }) {
    const ref = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        ref.current.scale.setScalar(scale + Math.sin(state.clock.elapsedTime * 0.2) * 10);
    });

    return (
        <mesh ref={ref} position={position}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial color={color} transparent opacity={0.05} />
        </mesh>
    );
}

export default function FuturisticBackground() {
    return (
        <div className="fixed inset-0 z-0 bg-[#050510]">
            <Canvas
                camera={{ position: [0, 0, 1], fov: 75 }}
                gl={{ antialias: true, alpha: false }}
                dpr={[1, 1.5]}
            >
                <color attach="background" args={["#050510"]} />

                {/* Stars */}
                <StarField count={2500} />

                {/* Distant Nebulae for color */}
                <Nebula position={[-300, 100, -500]} color="#f97316" scale={150} />
                <Nebula position={[400, -150, -600]} color="#ec4899" scale={120} />
                <Nebula position={[0, 200, -700]} color="#8b5cf6" scale={180} />
            </Canvas>

            {/* Subtle vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050510_100%)] pointer-events-none" />
        </div>
    );
}

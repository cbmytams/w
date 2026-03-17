"use client";

import { useEffect, useId, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { type ISourceOptions } from "@tsparticles/engine";
import { particleConfigs } from "@/config/particles";
import { availablePresets, loadAllPresets } from "@/config/particles/presets";

// Build the full options pool: custom configs + all presets
function buildOptionsPool(): ISourceOptions[] {
    const customOptions = particleConfigs.map((c) => ({
        ...c,
        sound: { enable: false },
    }));

    const presetOptions: ISourceOptions[] = availablePresets.map((p) => ({
        preset: p.name,
        background: {
            color: { value: "#050510" },
        },
        fullScreen: {
            enable: false,
        },
        sound: {
            enable: false,
        },
    }));

    return [...customOptions, ...presetOptions];
}

export default function RefinedParticlesBackground() {
    const [init, setInit] = useState(false);

    // Generate a unique ID per mount so the Particles component creates a
    // fresh DOM container each time, avoiding stale-reference conflicts
    // when the previous container was destroyed during unmount.
    const instanceId = useId();
    const [containerId] = useState(() => `tsparticles-${instanceId.replace(/:/g, "")}-${Math.random().toString(36).slice(2, 7)}`);

    // Stable random selection computed once during initial state per mount
    const [options] = useState<ISourceOptions>(() => {
        const pool = buildOptionsPool();
        return pool[Math.floor(Math.random() * pool.length)];
    });

    // Initialize engine with all presets, THEN mark as ready
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
            await loadAllPresets(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    if (!init) {
        return null; // ou un loader transparent
    }

    return (
        <Particles
            id={containerId}
            options={options}
            className="absolute inset-0 z-0 pointer-events-none"
        />
    );
}

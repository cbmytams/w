"use client";

import { useEffect, useId, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { type Engine, type ISourceOptions } from "@tsparticles/engine";
import { particleConfigs } from "@/config/particles";
import { availablePresets } from "@/config/particles/presets";

// ─── Module-level singleton guard ───────────────────────────────────
// The tsParticles engine is a global singleton. We must initialize it
// exactly once across all component mounts/unmounts during client-side
// navigation. Storing this flag at module level (outside the component)
// ensures it persists when the component unmounts and remounts.
let engineReady = false;
let engineInitPromise: Promise<void> | null = null;

type ParticleSelection =
    | {
        kind: "custom";
        options: ISourceOptions;
      }
    | {
        kind: "preset";
        options: ISourceOptions;
        loader: (engine: Engine) => Promise<void>;
      };

let cachedSelection: ParticleSelection | null = null;

function ensureEngineInitialized(selection: ParticleSelection): Promise<void> {
    if (engineReady) return Promise.resolve();

    if (!engineInitPromise) {
        engineInitPromise = initParticlesEngine(async (engine) => {
            await loadSlim(engine);
            if (selection.kind === "preset") {
                await selection.loader(engine);
            }
        }).then(() => {
            engineReady = true;
        });
    }

    return engineInitPromise;
}

// ─── Options pool (built once, cached at module level) ──────────────
let cachedPool: ParticleSelection[] | null = null;

function getOptionsPool(): ParticleSelection[] {
    if (cachedPool) return cachedPool;

    const customOptions: ParticleSelection[] = particleConfigs.map((config) => ({
        kind: "custom",
        options: {
            ...config,
            sound: { enable: false },
        },
    }));

    const presetOptions: ParticleSelection[] = availablePresets.map((preset) => ({
        kind: "preset",
        loader: preset.loader,
        options: {
            preset: preset.name,
            background: {
                color: { value: "#050510" },
            },
            fullScreen: {
                enable: false,
            },
            sound: {
                enable: false,
            },
        },
    }));

    cachedPool = [...customOptions, ...presetOptions];
    return cachedPool;
}

function getRandomSelectionStable(): ParticleSelection {
    if (cachedSelection) {
        return cachedSelection;
    }

    const pool = getOptionsPool();
    cachedSelection = pool[Math.floor(Math.random() * pool.length)];
    return cachedSelection;
}

export default function RefinedParticlesBackground() {
    const [selection] = useState(getRandomSelectionStable);
    const [ready, setReady] = useState(engineReady);

    // Generate a unique ID per mount so the Particles component creates a
    // fresh DOM container each time, avoiding stale-reference conflicts
    // when the previous container was destroyed during unmount.
    const instanceId = useId();
    const [containerId] = useState(() => `tsparticles-${instanceId.replace(/:/g, "")}-${Math.random().toString(36).slice(2, 7)}`);

    // Stable options reference — pick a random config once per mount
    // and hold it in a ref so React never sees a "new" object.
    const [options] = useState(() => selection.options);

    useEffect(() => {
        if (engineReady) {
            return;
        }

        let cancelled = false;
        ensureEngineInitialized(selection).then(() => {
            if (!cancelled) setReady(true);
        });

        return () => {
            cancelled = true;
        };
    }, [selection]);

    if (!ready) {
        return null;
    }

    return (
        <Particles
            id={containerId}
            options={options}
            className="absolute inset-0 z-0 pointer-events-none"
        />
    );
}

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
      color: { value: "#0b111a" },
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

// Module-level: selected once when the chunk first loads and reused across
// all mounts within the same browser session. This prevents a double-animation
// glitch during page transitions where the component can briefly unmount and
// remount (e.g. AnimatePresence sync mode + rAF timing), which would otherwise
// pick a different random animation on the second mount.
let _sessionOptions: ISourceOptions | null = null;
function getSessionOptions(): ISourceOptions {
  if (!_sessionOptions) {
    const pool = buildOptionsPool();
    _sessionOptions = pool[Math.floor(Math.random() * pool.length)];
  }
  return _sessionOptions;
}

export default function RefinedParticlesBackground() {
  const [init, setInit] = useState(false);

  // Generate a unique ID per mount so the Particles component creates a
  // fresh DOM container each time, avoiding stale-reference conflicts
  // when the previous container was destroyed during unmount.
  const instanceId = useId();
  const [containerId] = useState(
    () =>
      `tsparticles-${instanceId.replace(/:/g, "")}-${Math.random().toString(36).slice(2, 7)}`
  );

  // Use the session-stable options: same animation throughout the browser session,
  // changes only on hard page refresh (module re-evaluation).
  const [options] = useState<ISourceOptions>(getSessionOptions);

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

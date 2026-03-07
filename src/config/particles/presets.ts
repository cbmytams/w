import type { Engine } from "@tsparticles/engine";

import { loadHyperspacePreset } from "@tsparticles/preset-hyperspace";
import { loadStarsPreset } from "@tsparticles/preset-stars";


export const availablePresets = [
    { name: "hyperspace", loader: loadHyperspacePreset },
    { name: "stars", loader: loadStarsPreset },
];

export async function loadAllPresets(engine: Engine) {
    await Promise.all(availablePresets.map(p => p.loader(engine)));
}

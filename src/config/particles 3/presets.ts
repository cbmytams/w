import type { Engine } from "@tsparticles/engine";

import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import { loadFirePreset } from "@tsparticles/preset-fire";
import { loadFireflyPreset } from "@tsparticles/preset-firefly";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";

import { loadHyperspacePreset } from "@tsparticles/preset-hyperspace";
import { loadLinksPreset } from "@tsparticles/preset-links";
import { loadSeaAnemonePreset } from "@tsparticles/preset-sea-anemone";
import { loadSnowPreset } from "@tsparticles/preset-snow";
import { loadSquaresPreset } from "@tsparticles/preset-squares";
import { loadStarsPreset } from "@tsparticles/preset-stars";


export const availablePresets = [

    { name: "confetti", loader: loadConfettiPreset },
    { name: "fire", loader: loadFirePreset },
    { name: "firefly", loader: loadFireflyPreset },
    { name: "fireworks", loader: loadFireworksPreset },

    { name: "hyperspace", loader: loadHyperspacePreset },
    { name: "links", loader: loadLinksPreset },
    { name: "seaAnemone", loader: loadSeaAnemonePreset },
    { name: "snow", loader: loadSnowPreset },
    { name: "squares", loader: loadSquaresPreset },
    { name: "stars", loader: loadStarsPreset },

];

export async function loadAllPresets(engine: Engine) {
    await Promise.all(availablePresets.map(p => p.loader(engine)));
}


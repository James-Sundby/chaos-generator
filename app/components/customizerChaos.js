"use client";

import CustomizerCore from "./customizerCore";
import { chaosPatterns } from "@/lib/armourPatterns";
import { colourList } from "@/lib/colours";
import { useChaosStore } from "@/app/stores/chaosStore";

// grouped options for Chaos
const groupedColors = {
    Base: colourList.filter((c) => c.type === "Base"),
    Layer: colourList.filter((c) => c.type === "Layer"),
    Contrast: colourList.filter((c) => c.type === "Contrast"),
    Metallic: colourList.filter((c) => c.type === "Metallic"),
};
const nonMetallics = {
    Base: groupedColors.Base,
    Layer: groupedColors.Layer,
    Contrast: groupedColors.Contrast,
};

export default function CustomizerChaos() {
    const band = useChaosStore((s) => s.chaosBand);
    const setBand = useChaosStore((s) => s.setChaosBand);

    return (
        <CustomizerCore
            variant="Chaos"
            band={band}
            setBand={setBand}
            patterns={chaosPatterns}
            paletteOptionsForIndex={(i) => (i === 3 ? nonMetallics : groupedColors)}
            randomPoolForIndex={(i) =>
                i === 3
                    ? colourList.filter((c) => c.type !== "Metallic")
                    : colourList
            }
            backBase="/chaos"
            hideSecondaryWhenBasic
        />
    );
}

"use client";

import CustomizerCore from "../customizerCore";
import { sistersPatterns } from "@/lib/data/armourPatterns";
import { colourList } from "@/lib/data/colours";
import { useSistersStore } from "@/app/stores/sistersStore";

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

const nonMetallicPool = colourList.filter((c) => c.type !== "Metallic");

export default function CustomizerSisters() {
    const band = useSistersStore((s) => s.order);
    const setBand = useSistersStore((s) => s.setOrder);

    return (
        <CustomizerCore
            generatorKey="sisters"
            band={band}
            setBand={setBand}
            patterns={sistersPatterns}
            paletteOptionsForIndex={(i) =>
                i === 1 || i === 3 ? nonMetallics : groupedColors
            }
            randomPoolForIndex={(i) =>
                i === 1 || i === 3 ? nonMetallicPool : colourList
            }
        />
    );
}
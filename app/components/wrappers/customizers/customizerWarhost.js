"use client";

import CustomizerCore from "../../customizerCore";
import { eldarPatterns } from "@/lib/armourPatterns";
import { colourList } from "@/lib/colours";
import { useWarhostStore } from "@/app/stores/warhostStore";

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

const nonMetalColourList = colourList.filter((c) => c.type !== "Metallic");

export default function CustomizerWarhost() {
    const band = useWarhostStore((s) => s.warhost);
    const setBand = useWarhostStore((s) => s.setWarhost);

    return (
        <CustomizerCore
            generatorKey="eldar"
            band={band}
            setBand={setBand}
            patterns={eldarPatterns}
            paletteOptionsForIndex={(i) => (i === 2 ? nonMetallics : groupedColors)}
            randomPoolForIndex={(i) => (i === 2 ? nonMetalColourList : colourList)}
        />
    );
}

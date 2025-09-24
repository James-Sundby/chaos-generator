"use client";

import { patterns } from "@/lib/armourPatterns";
import { colourList } from "@/lib/colours";
import { useWarbandStore } from "@/app/stores/warbandStore";
import CustomizerCore from "./customizerCore";

// grouped options for Chapter
const groupedColors = {
    Base: colourList.filter((c) => c.type === "Base"),
    Layer: colourList.filter((c) => c.type === "Layer"),
    Metallic: colourList.filter((c) => c.type === "Metallic"),
};

export default function CustomizerChapter() {
    const band = useWarbandStore((s) => s.warband);
    const setBand = useWarbandStore((s) => s.setWarband);

    return (
        <CustomizerCore
            variant="Chapter"
            band={band}
            setBand={setBand}
            patterns={patterns}
            paletteOptionsForIndex={() => groupedColors} // 0..2 all use full grouped set
            randomPoolForIndex={() => colourList}        // random from all paints
            backBase="/chapter"
            hasSecondModel={true}
        />
    );
}

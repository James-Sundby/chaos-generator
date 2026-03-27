"use client";

import CustomizerBase from "@/app/components/customizers/customizerBase";
import { customizerRegistry } from "@/lib/customizers/customizerRegistry";
import { useFactionStore } from "@/app/stores/factionStore";
import { modelConfig } from "@/lib/factions/sisters/model";
import { meta } from "@/lib/factions/sisters/meta";

export default function SistersCustomizerView() {
    const config = customizerRegistry.sisters;
    const band = useFactionStore((state) => state.entities.sisters);
    const setEntity = useFactionStore((state) => state.setEntity);

    return (
        <CustomizerBase
            generatorKey="sisters"
            band={band}
            setBand={(data) => setEntity("sisters", data)}
            patterns={config.patterns}
            paletteOptionsForIndex={config.paletteOptionsForIndex}
            randomPoolForIndex={config.randomPoolForIndex}
            hideSecondaryWhenBasic={config.hideSecondaryWhenBasic}
            modelConfig={modelConfig}
            noun={meta.noun}
            basePath={meta.basePath}
            thirdColourLabel="Trim colour"
            fourthColourLabel="Accent colour"
            showFourthColour
        />
    );
}
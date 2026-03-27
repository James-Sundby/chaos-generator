"use client";

import CustomizerBase from "@/app/components/customizers/customizerBase";
import { customizerRegistry } from "@/lib/customizers/customizerRegistry";
import { useFactionStore } from "@/app/stores/factionStore";
import { modelConfig } from "@/lib/factions/chaos/model";
import { meta } from "@/lib/factions/chaos/meta";

export default function ChaosCustomizerView() {
    const config = customizerRegistry.chaos;
    const band = useFactionStore((state) => state.entities.chaos);
    const setEntity = useFactionStore((state) => state.setEntity);

    return (
        <CustomizerBase
            generatorKey="chaos"
            band={band}
            setBand={(data) => setEntity("chaos", data)}
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
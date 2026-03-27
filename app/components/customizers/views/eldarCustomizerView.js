"use client";

import CustomizerBase from "@/app/components/customizers/customizerBase";
import { customizerRegistry } from "@/lib/customizers/customizerRegistry";
import { useFactionStore } from "@/app/stores/factionStore";
import { modelConfig } from "@/lib/factions/eldar/model";
import { meta } from "@/lib/factions/eldar/meta";

export default function EldarCustomizerView() {
    const config = customizerRegistry.eldar;
    const band = useFactionStore((state) => state.entities.eldar);
    const setEntity = useFactionStore((state) => state.setEntity);

    return (
        <CustomizerBase
            generatorKey="eldar"
            band={band}
            setBand={(data) => setEntity("eldar", data)}
            patterns={config.patterns}
            paletteOptionsForIndex={config.paletteOptionsForIndex}
            randomPoolForIndex={config.randomPoolForIndex}
            hideSecondaryWhenBasic={config.hideSecondaryWhenBasic}
            modelConfig={modelConfig}
            noun={meta.noun}
            basePath={meta.basePath}
            thirdColourLabel="Accent colour"
            showFourthColour={false}
        />
    );
}
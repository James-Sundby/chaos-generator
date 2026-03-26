"use client";

import CustomizerBase from "@/app/components/customizers/customizerBase";
import { customizerRegistry } from "@/lib/customizers/customizerRegistry";
import { useFactionStore } from "@/app/stores/factionStore";
import { modelConfig } from "@/lib/factions/chapter/model";
import { meta } from "@/lib/factions/chapter/meta";

export default function ChapterCustomizerView() {
    const config = customizerRegistry.chapter;
    const band = useFactionStore((state) => state.entities.chapter);
    const setEntity = useFactionStore((state) => state.setEntity);

    return (
        <CustomizerBase
            generatorKey="chapter"
            band={band}
            setBand={(data) => setEntity("chapter", data)}
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
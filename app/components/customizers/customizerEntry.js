"use client";

import CustomizerCore from "@/app/components/customizers/customizerCore";
import { customizerRegistry } from "@/lib/customizers/customizerRegistry";
import { useFactionStore } from "@/app/stores/factionStore";

const entityKeyMap = {
    chapter: "chapter",
    chaos: "chaos",
    sisters: "sisters",
    eldar: "eldar",
};

export default function CustomizerEntry({ generatorKey = "chapter" }) {
    const config = customizerRegistry[generatorKey] ?? customizerRegistry.chapter;
    const entityKey = entityKeyMap[generatorKey] ?? "chapter";

    const band = useFactionStore((state) => state.entities[entityKey]);
    const setEntity = useFactionStore((state) => state.setEntity);

    const setBand = (data) => setEntity(entityKey, data);

    return (
        <CustomizerCore
            generatorKey={generatorKey}
            band={band}
            setBand={setBand}
            patterns={config.patterns}
            paletteOptionsForIndex={config.paletteOptionsForIndex}
            randomPoolForIndex={config.randomPoolForIndex}
            hideSecondaryWhenBasic={config.hideSecondaryWhenBasic}
        />
    );
}
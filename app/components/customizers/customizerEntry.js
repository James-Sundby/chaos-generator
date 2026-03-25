"use client";

import CustomizerCore from "@/app/components/customizers/customizerCore";
import { customizerRegistry } from "@/lib/customizers/customizerRegistry";

import { useWarbandStore } from "@/app/stores/warbandStore";
import { useChaosStore } from "@/app/stores/chaosStore";
import { useSistersStore } from "@/app/stores/sistersStore";
import { useWarhostStore } from "@/app/stores/warhostStore";

function useCustomizerState(generatorKey) {
    switch (generatorKey) {
        case "chapter": {
            const band = useWarbandStore((s) => s.warband);
            const setBand = useWarbandStore((s) => s.setWarband);
            return { band, setBand };
        }

        case "chaos": {
            const band = useChaosStore((s) => s.chaosBand);
            const setBand = useChaosStore((s) => s.setChaosBand);
            return { band, setBand };
        }

        case "sisters": {
            const band = useSistersStore((s) => s.order);
            const setBand = useSistersStore((s) => s.setOrder);
            return { band, setBand };
        }

        case "eldar": {
            const band = useWarhostStore((s) => s.warhost);
            const setBand = useWarhostStore((s) => s.setWarhost);
            return { band, setBand };
        }

        default: {
            const band = useWarbandStore((s) => s.warband);
            const setBand = useWarbandStore((s) => s.setWarband);
            return { band, setBand };
        }
    }
}

export default function CustomizerEntry({ generatorKey = "chapter" }) {
    const config = customizerRegistry[generatorKey] ?? customizerRegistry.chapter;
    const { band, setBand } = useCustomizerState(generatorKey);

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
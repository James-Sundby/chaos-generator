"use client";

import { useEffect } from "react";
import { useChaosStore } from "@/app/stores/chaosStore";
import GeneratorView from "@/app/components/generatorView";


export default function WarbandView({ initialBand }) {
    const setChaosBand = useChaosStore(s => s.setChaosBand);
    const chaosBand = useChaosStore(s => s.chaosBand);

    useEffect(() => { setChaosBand(initialBand); }, [initialBand, setChaosBand]);
    const band = chaosBand.slug ? chaosBand : initialBand;

    return (
        <GeneratorView
            generatorKey="chaos"
            band={band}
        />
    )
}

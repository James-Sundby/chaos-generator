"use client";

import { useEffect } from "react";

import { useChaosStore } from "@/app/stores/chaosStore";

import TradingCard from "@/app/components/trading-card";
import GenerateNewButton from "@/app/components/generateNewButton";
import ShareButton from "@/app/components/shareButton";
import CustomizerButton from "@/app/components/customizerButton";

export default function WarbandView({ initialBand }) {
    const setChaosBand = useChaosStore(s => s.setChaosBand);
    const chaosBand = useChaosStore(s => s.chaosBand);

    useEffect(() => { setChaosBand(initialBand); }, [initialBand, setChaosBand]);
    const band = chaosBand.slug ? chaosBand : initialBand;

    return (
        <main className="flex flex-1 flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 p-4">
            <TradingCard variant="Chaos" band={band} />
            <div className="flex flex-col w-full max-w-96 gap-4">
                <div className="flex flex-row sm:flex-col w-full items-center justify-center gap-4">
                    <div className="w-full">
                        <GenerateNewButton variant="Chaos" label="New" />
                    </div>
                    <div className="w-full">
                        <CustomizerButton variant="Chaos" />
                    </div>
                </div>
                <ShareButton variant="Chaos" slug={band.slug} title={band.warbandName} />
            </div>
        </main>
    );
}

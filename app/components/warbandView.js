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
        <section className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <TradingCard variant="Chaos" band={band} />
            <div className="flex w-full max-w-96 flex-col gap-4">
                <GenerateNewButton variant="Chaos" label="New" />
                <div className="flex w-full flex-row items-center justify-center gap-4 sm:flex-col">
                    <div className="w-full">
                        <CustomizerButton variant="Chaos" />
                    </div>
                    <div className="w-full">
                        <ShareButton variant="Chaos" slug={band.slug} title={band.warbandName} />
                    </div>
                </div>
            </div>
        </section>
    )
}

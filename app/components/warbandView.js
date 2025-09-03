"use client";

import { useEffect } from "react";

import { useChaosStore } from "@/app/stores/chaosStore";

import TradingCard from "@/app/components/trading-card";
import GenerateNewButton from "@/app/components/generateNewButton";
import ShareButton from "@/app/components/shareButton";
import CustomizerButton from "@/app/components/customizerButton";
import SaveCard from "./saveCard";

export default function WarbandView({ initialBand }) {
    const setChaosBand = useChaosStore(s => s.setChaosBand);
    const chaosBand = useChaosStore(s => s.chaosBand);

    useEffect(() => { setChaosBand(initialBand); }, [initialBand, setChaosBand]);
    const band = chaosBand.slug ? chaosBand : initialBand;
    const cardId = `marine-${band.slug}`;

    return (
        <main className="flex flex-1 flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 p-4">
            <TradingCard variant="Chaos" band={band} id={cardId} />
            <div className="flex w-full max-w-96 flex-col gap-4">
                <div className="flex w-full flex-row items-center justify-center gap-4 sm:flex-col">
                    <div className="w-full">
                        <GenerateNewButton variant="Chaos" label="New" />
                    </div>
                    <div className="w-full">
                        <CustomizerButton variant="Chaos" />
                    </div>
                </div>
                <ShareButton variant="Chaos" slug={band.slug} title={band.warbandName} />
                <SaveCard
                    variant="Chaos"
                    targetId={cardId}
                    filename={band.slug || band.warbandName || "trading-card"}
                // fonts={[ { family: "Anton SC", src: "/fonts/AntonSC.ttf", weight: "400" } ]} // customize if needed
                />
            </div>
        </main>
    )
}

"use client";

import { useEffect } from "react";

import { useWarhostStore } from "@/app/stores/warhostStore";

import TradingCard from "@/app/components/trading-card";
import GenerateNewButton from "@/app/components/generateNewButton";
import ShareButton from "@/app/components/shareButton";
import CustomizerButton from "@/app/components/customizerButton";

export default function WarhostView({ initialBand }) {
    const setWarhost = useWarhostStore(s => s.setWarhost);
    const warhost = useWarhostStore(s => s.warhost);

    useEffect(() => { setWarhost(initialBand); }, [initialBand, setWarhost]);
    const band = warhost.slug ? warhost : initialBand;

    return (
        <section className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <TradingCard variant="Eldar" band={band} />
            <div className="flex w-full max-w-96 flex-col gap-4">
                <GenerateNewButton variant="Eldar" label="New" />
                <div className="flex w-full flex-row items-center justify-center gap-4 sm:flex-col">
                    <div className="w-full">
                        <CustomizerButton variant="Eldar" />
                    </div>
                    <div className="w-full">
                        <ShareButton variant="Eldar" slug={band.slug} title={band.warbandName} />
                    </div>
                </div>
            </div>
        </section>
    )
}

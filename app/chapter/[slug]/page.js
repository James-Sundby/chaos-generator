"use client";

import TradingCard from "@/app/components/trading-card.js";
import { useWarbandStore } from "@/app/stores/warbandStore.js";

export default function WarbandPage() {
    const warband = useWarbandStore((state) => state.warband);
    { console.log("warband store", warband) }

    return (
        <>
            <div className="flex flex-1 flex-col gap-4 items-center mt-4">
                <TradingCard
                    warbandName={warband.warbandName}
                    namedColors={warband.colors}
                    slug={warband.slug}
                    patternName={warband.pattern}
                    metal={warband.metal}
                />
                <div className="btn btn-primary">Options</div>
            </div>
        </>
    );
}

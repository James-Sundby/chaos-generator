"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import TradingCard from "@/app/components/trading-card.js";
import { useWarbandStore } from "@/app/stores/warbandStore.js";

export default function WarbandPage({ params }) {
    const { slug } = params;
    const router = useRouter();
    const warband = useWarbandStore((state) => state.warband);

    useEffect(() => {
        if (warband.slug && warband.slug !== slug) {
            router.replace(`/chapter/${warband.slug}`);
        }
    }, [router, slug, warband.slug]);

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
            </div>
        </>
    );
}

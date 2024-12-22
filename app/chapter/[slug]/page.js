"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import TradingCard from "@/app/components/trading-card.js";
import { useWarbandStore } from "@/app/stores/warbandStore.js";

export default function WarbandPage({ params }) {
    const { slug } = params;
    const router = useRouter();
    const warband = useWarbandStore((state) => state.warband);
    const setWarband = useWarbandStore((state) => state.setWarband);

    useEffect(() => {
        async function fetchWarbandData() {
            if (warband.slug !== slug) {
                try {
                    const response = await fetch(`/api/chapter-generator?slug=${slug}`);
                    if (response.ok) {
                        const fetchedWarband = await response.json();
                        setWarband(fetchedWarband);
                        router.replace(`/chapter/${fetchedWarband.slug}`);
                    } else {
                        console.error("Invalid slug or error fetching warband data");
                    }
                } catch (error) {
                    console.error("Error fetching warband data:", error);
                }
            }
        }
        fetchWarbandData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <main className="flex flex-1 flex-col gap-4 items-center mt-4">
            <TradingCard
                warbandName={warband.warbandName}
                namedColors={warband.colors}
                slug={warband.slug}
                patternName={warband.pattern}
                metal={warband.metal}
            />
        </main>
    );
}

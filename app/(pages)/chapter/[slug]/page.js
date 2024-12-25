"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import TradingCard from "@/app/components/trading-card.js";
import { useWarbandStore } from "@/app/stores/warbandStore.js";
import CustomizerButton from "@/app/components/customizerButton";

export default function WarbandPage() {
    const params = useParams();
    const router = useRouter();
    const warband = useWarbandStore((state) => state.warband);
    const setWarband = useWarbandStore((state) => state.setWarband);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchWarbandData() {
            setIsLoading(true);
            setError(null);
            if (warband.slug !== params.slug) {
                try {
                    const response = await fetch(`/api/chapter-generator?slug=${params.slug}`);
                    if (response.ok) {
                        const fetchedWarband = await response.json();
                        setWarband(fetchedWarband);
                        if (params.slug !== fetchedWarband.slug) {
                            router.replace(`/chapter/${fetchedWarband.slug}`);
                        }
                    } else {
                        setError("Failed to fetch warband data. Please try again.");
                    }
                } catch (error) {
                    setError("An unexpected error occurred. Please try again.");
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        }
        fetchWarbandData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <main className="flex flex-1 flex-col gap-4 items-center justify-center mt-4">
            <TradingCard
                warbandName={warband.warbandName}
                namedColors={warband.colors}
                slug={warband.slug}
                patternName={warband.pattern}
                metal={warband.metal}
                isLoading={isLoading}
                error={error}
            />
            <div className="w-full max-w-80">
                <CustomizerButton />
            </div>
        </main>
    );
}

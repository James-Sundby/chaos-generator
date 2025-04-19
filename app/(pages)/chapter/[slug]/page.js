"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import TradingCard from "@/app/components/trading-card.js";
import { useWarbandStore } from "@/app/stores/warbandStore.js";
import CustomizerButton from "@/app/components/customizerButton";
import WarbandButton from "@/app/components/warbandButton";

export default function WarbandPage() {
    const params = useParams();
    const router = useRouter();
    const warband = useWarbandStore((state) => state.warband);
    const setWarband = useWarbandStore((state) => state.setWarband);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loadingTime, setLoadingTime] = useState(0);

    const shouldRenderCard = warband.slug === params.slug && !isLoading && !error;

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
                        setError("Failed to fetch chapter data. Please try again.");
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

    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setLoadingTime((prev) => prev + 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setLoadingTime(0);
        }
    }, [isLoading]);

    if (loadingTime >= 5 || error) {
        return (
            <div className="flex flex-1 flex-col justify-center items-center gap-4 text-center p-4">
                <p className="text-error font-bold">{error || "Error loading data. Please try again later."}</p>
                <button className="btn btn-primary rounded-lg" onClick={() => router.push("/")}>
                    Go Back to Home
                </button>
            </div>
        );
    }

    if (isLoading || !shouldRenderCard) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <span className="loading loading-dots loading-xl"></span>
            </div>
        );
    }

    return (
        <main className="flex flex-1 flex-col sm:flex-row gap-4 sm:gap-8 items-center sm:justify-center p-4">
            <div className="opacity-0 animate-fade-in">
                <TradingCard
                    warbandName={warband.warbandName}
                    namedColors={warband.colors}
                    slug={warband.slug}
                    patternName={warband.pattern}
                    metal={warband.metal}
                />
            </div>

            <div className="flex flex-row sm:flex-col w-full max-w-96 items-center justify-center gap-4">
                <div className="w-full max-w-96">
                    <WarbandButton message="New" />
                </div>
                <div className="w-full max-w-96">
                    <CustomizerButton />
                </div>
            </div>
        </main>
    );
}

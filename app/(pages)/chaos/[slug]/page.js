"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import { useChaosStore } from "@/app/stores/chaosStore";
import ChaosMarine from "@/app/components/chaosSpaceMarine";
import ChaosButton from "@/app/components/chaosButton";

export default function Page() {
    const params = useParams();
    const router = useRouter();
    const chaosBand = useChaosStore((state) => state.chaosBand);
    const setChaosBand = useChaosStore((state) => state.setChaosBand);

    const { warbandName, colors = [], slug, pattern } = chaosBand;

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loadingTime, setLoadingTime] = useState(0);

    const shouldRenderCard = chaosBand.slug === params.slug && !isLoading && !error;

    useEffect(() => {
        async function fetchChaosBandData() {
            setIsLoading(true);
            setError(null);
            if (chaosBand.slug !== params.slug) {
                try {
                    const response = await fetch(`/api/warband-generator?slug=${params.slug}`);
                    if (response.ok) {
                        const fetchedChaosBand = await response.json();
                        setChaosBand(fetchedChaosBand);
                        if (params.slug !== fetchedChaosBand.slug) {
                            router.replace(`/chaos/${fetchedChaosBand.slug}`);
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
        fetchChaosBandData();
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
        <main className="flex flex-1 flex-col gap-4 sm:gap-8 p-4 items-center sm:justify-center">
            {shouldRenderCard && (
                <div
                    id="trading-card"
                    className="card bg-yellow-600 text-neutral w-full max-w-96 rounded-lg opacity-0 animate-fade-in"
                >
                    <div className="card-body p-2 m-2 bg-white rounded-lg">
                        <h1 className="card-title justify-center text-center">{warbandName}</h1>
                        <div className="h-[45svh] sm:h-auto">
                            <ChaosMarine
                                primary={colors[0]?.hex}
                                secondary={colors[1]?.hex}
                                edge={colors[2]?.hex}
                                accent={colors[3]?.hex}
                                pattern={pattern}
                            />
                        </div>
                        <div className="flex flex-1 join join-horizontal rounded-lg">
                            {(pattern === "Basic" ? [0, 2, 3] : colors.map((_, i) => i)).map((index) => {
                                const color = colors[index];
                                return (
                                    color && (
                                        <div
                                            key={index}
                                            className="w-full h-8 join-item border border-neutral"
                                            style={{ backgroundColor: color.hex }}
                                            title={color.name}
                                        />
                                    )
                                );
                            })}
                        </div>

                        <p className="text-sm font-bold">
                            {pattern === "Basic"
                                ? [colors[0]?.name, colors[2]?.name, colors[3]?.name].filter(Boolean).join(", ")
                                : [colors[0]?.name, colors[1]?.name, colors[2]?.name, colors[3]?.name].filter(Boolean).join(", ")}
                        </p>

                        <p className="font-bold text-xs text-wrap">
                            ID: <span className="font-normal">{slug}</span>
                        </p>
                    </div>
                </div>
            )}

            <div className="flex flex-col w-full max-w-96 items-center justify-center">
                <div className="w-full">
                    <ChaosButton message="Roll" />
                </div>
            </div>
        </main>
    );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { debug } from "@/lib/debug";
import Link from "next/link";

import { useChaosStore } from "@/app/stores/chaosStore";
import ChaosMarine from "@/app/components/chaosSpaceMarine";
import ChaosButton from "@/app/components/chaosButton";

export default function WarbandView() {
    const params = useParams();
    const router = useRouter();
    const chaosBand = useChaosStore((state) => state.chaosBand);
    const setChaosBand = useChaosStore((state) => state.setChaosBand);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loadingTime, setLoadingTime] = useState(0);

    const shouldRenderCard = chaosBand.slug === params.slug && !isLoading && !error;

    useEffect(() => {
        async function fetchChaosBandData() {
            if (chaosBand.slug === params.slug) {
                debug("Slugs match stored: ", chaosBand.slug, " vs params: ", params.slug);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                debug("Slug mismatch stored: ", chaosBand.slug, " vs params: ", params.slug);
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
            <div className="flex flex-1 items-center justify-center">
                <span className="loading loading-dots loading-xl"></span>
            </div>
        );
    }

    return (
        <main className="flex flex-1 flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 p-4">
            {shouldRenderCard && (
                <div
                    id="trading-card"
                    className="card bg-yellow-600 text-neutral w-full max-w-96 rounded-lg opacity-0 animate-fade-in"
                >
                    <div className="card-body p-2 m-2 bg-white rounded-lg">
                        <h1 className="card-title justify-center text-center">{chaosBand.warbandName}</h1>
                        <div className="h-[45svh]">
                            <ChaosMarine
                                primary={chaosBand.colors[0]?.hex}
                                secondary={chaosBand.colors[1]?.hex}
                                edge={chaosBand.colors[2]?.hex}
                                accent={chaosBand.colors[3]?.hex}
                                pattern={chaosBand.pattern}
                            />
                        </div>
                        <div className="flex flex-1 join join-horizontal rounded-lg">
                            {(chaosBand.pattern === "Basic" ? [0, 2, 3] : chaosBand.colors.map((_, i) => i)).map((index) => {
                                const color = chaosBand.colors[index];
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
                            {chaosBand.pattern === "Basic"
                                ? [chaosBand.colors[0]?.name, chaosBand.colors[2]?.name, chaosBand.colors[3]?.name].filter(Boolean).join(", ")
                                : [chaosBand.colors[0]?.name, chaosBand.colors[1]?.name, chaosBand.colors[2]?.name, chaosBand.colors[3]?.name].filter(Boolean).join(", ")}
                        </p>

                        <p className="font-bold text-xs text-wrap">
                            ID: <span className="font-normal">{chaosBand.slug}</span>
                        </p>
                    </div>
                </div>
            )}

            <div className="flex flex-row sm:flex-col w-full max-w-96 items-center justify-center gap-4">
                <div className="w-full max-w-96">
                    <ChaosButton message="Roll" />
                </div>
                <div className="w-full max-w-96">
                    <Link
                        className="btn btn-error rounded-lg items-center justify-center w-full h-auto px-6 py-2"
                        href={"/chaos-painter"}
                        aria-label="Customize your chapter"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                            className="h-6 w-6 fill-error-content"
                            aria-hidden="true"
                        >
                            <path d="M162.4 6c-1.5-3.6-5-6-8.9-6l-19 0c-3.9 0-7.5 2.4-8.9 6L104.9 57.7c-3.2 8-14.6 8-17.8 0L66.4 6c-1.5-3.6-5-6-8.9-6L48 0C21.5 0 0 21.5 0 48L0 224l0 22.4L0 256l9.6 0 364.8 0 9.6 0 0-9.6 0-22.4 0-176c0-26.5-21.5-48-48-48L230.5 0c-3.9 0-7.5 2.4-8.9 6L200.9 57.7c-3.2 8-14.6 8-17.8 0L162.4 6zM0 288l0 32c0 35.3 28.7 64 64 64l64 0 0 64c0 35.3 28.7 64 64 64s64-28.7 64-64l0-64 64 0c35.3 0 64-28.7 64-64l0-32L0 288zM192 432a16 16 0 1 1 0 32 16 16 0 1 1 0-32z" />
                        </svg>
                        <p className="">Customize</p>
                    </Link>
                </div>
            </div>
        </main>
    );
}

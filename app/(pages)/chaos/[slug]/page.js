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

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const { warbandName, colors = [], slug } = chaosBand;

    return (
        <main className="flex flex-1 flex-col gap-4 sm:gap-8 items-center justify-center px-4">
            <div id="trading-card" className="card bg-yellow-600 text-neutral w-full max-w-96 rounded-lg">
                <div className="card-body p-2 m-2 bg-white rounded-lg">
                    <h1 className="card-title justify-center text-center">{warbandName}</h1>
                    <div className="h-[45svh] sm:h-auto">
                        <ChaosMarine
                            body={colors[0]?.hex}
                            edge={colors[1]?.hex}
                            accent={colors[2]?.hex}
                        />
                    </div>
                    <div className="flex flex-1 join join-horizontal rounded-lg">
                        {(colors || []).map((color, index) => (
                            <div
                                key={index}
                                className="w-full h-8 join-item border border-neutral"
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                            ></div>
                        ))}
                    </div>

                    <p className="text-sm">
                        <span className="font-bold">
                            {colors[0]?.name}, {colors[1]?.name}, {colors[2]?.name}
                        </span>
                    </p>

                    <div className="justify-end text-xs">
                        <p className="font-bold">ID: <span className="font-normal">{slug}</span></p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full max-w-96 items-center justify-center">
                <div className="w-full">
                    <ChaosButton message="Roll" />
                </div>
            </div>
        </main>
    );
}

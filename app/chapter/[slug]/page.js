"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import TradingCard from "@/app/components/trading-card.js";
import { useWarbandStore } from "@/app/stores/warbandStore.js";

export default function WarbandPage() {
    const params = useParams();
    const router = useRouter();
    const warband = useWarbandStore((state) => state.warband);
    const setWarband = useWarbandStore((state) => state.setWarband);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchWarbandData() {
            // console.log("Dynamic page slug: ", params.slug);
            // console.log("Stored warband slug: ", warband.slug);
            if (warband.slug !== params.slug) {
                // console.log("Slug discrepancy:  ", params.slug, warband.slug);
                setIsLoading(true);
                setError(null);

                try {
                    const response = await fetch(`/api/chapter-generator?slug=${params.slug}`);
                    if (response.ok) {
                        const fetchedWarband = await response.json();
                        setWarband(fetchedWarband);
                        router.replace(`/chapter/${fetchedWarband.slug}`);
                    } else {
                        // console.error("Invalid slug or error fetching warband data");
                        setError("Failed to fetch warband data. Please try again.");
                    }
                } catch (error) {
                    // console.error("Error fetching warband data:", error);
                    setError("An unexpected error occurred. Please try again.");
                } finally {
                    setIsLoading(false); // Stop loading
                }
            } else {
                setIsLoading(false); // Stop loading if warband data matches the slug
                // console.log("Slugs match", params.slug, warband.slug);
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
                isLoading={isLoading}
                error={error}
            />
        </main>
    );
}

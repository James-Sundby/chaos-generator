"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { debug } from "@/lib/debug";

import TradingCard from "@/app/components/trading-card.js";
import { useWarbandStore } from "@/app/stores/warbandStore.js";
import CustomizerButton from "@/app/components/customizerButton";
import WarbandButton from "@/app/components/warbandButton";
import GeneratorButton from "./generatorButton";

export default function ChapterView() {
    const params = useParams();
    const router = useRouter();
    const warband = useWarbandStore((state) => state.warband);
    const setWarband = useWarbandStore((state) => state.setWarband);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loadingTime, setLoadingTime] = useState(0);

    const shouldRenderCard = warband.slug === params.slug && !isLoading && !error;

    function handleShare(slug) {
        const url = `${window.location.origin}/chapter/${slug}`;

        if (navigator.share) {
            navigator.share({
                title: "Check out this Chapter!",
                text: `Here's a chapter I generated: ${slug}`,
                url,
            }).catch((error) => console.log("Share failed:", error));
        } else {
            navigator.clipboard.writeText(url)
                .then(() => alert("Link copied to clipboard!"))
                .catch(() => alert("Failed to copy link."));
        }
    }


    useEffect(() => {
        async function fetchWarbandData() {
            if (warband.slug === params.slug) {
                debug("Slugs match stored: ", warband.slug, " vs params: ", params.slug);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                debug("Slug mismatch stored: ", warband.slug, " vs params: ", params.slug);
                const response = await fetch(`/api/chapter-generator?slug=${params.slug}`);
                if (response.ok) {
                    const fetchedWarband = await response.json();
                    setWarband(fetchedWarband);
                    if (params.slug !== fetchedWarband.slug) {
                        router.replace(`/chapter/${fetchedWarband.slug}`);
                    }
                } else {
                    debug(response);
                    setError("Failed to fetch chapter data. Please try again.");
                }
            } catch (error) {
                setError("An unexpected error occurred. Please try again.");
            } finally {
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
            <div className="flex flex-1 items-center justify-center">
                <span className="loading loading-dots loading-xl"></span>
            </div>
        );
    }

    return (
        <main className="flex flex-1 flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 p-4">

            <TradingCard
                warbandName={warband.warbandName}
                namedColors={warband.colors}
                slug={warband.slug}
                patternName={warband.pattern}
            />

            <div className="flex flex-col w-full max-w-96 gap-4">
                <div className="flex flex-row sm:flex-col w-full max-w-96 items-center justify-center gap-4">
                    <div className="w-full max-w-96">
                        <GeneratorButton
                            message="New"
                            endpoint="/api/chapter-generator"
                            onSetData={setWarband}
                            urlPrefix="chapter"
                            buttonClass="btn-primary"
                            iconClass="fill-primary-content"
                        />
                    </div>
                    <div className="w-full max-w-96">
                        <CustomizerButton />
                    </div>

                </div>
                <div className="flex flex-col w-full max-w-96 items-center justify-center gap-4">
                    {/* <p className="text-xs font-bold justify-start">
                        ID: <span className="font-normal">{warband.slug}</span>
                    </p> */}
                    <div className="w-full max-w-96">
                        <button
                            className="btn btn-primary rounded-lg w-full"
                            onClick={() => handleShare(warband.slug)}
                            aria-label="Share this chapter"
                            title="Share this chapter"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                                className="h-6 w-6 fill-primary-content"
                                aria-hidden="true">
                                <path d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z" />
                            </svg>
                            Share
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

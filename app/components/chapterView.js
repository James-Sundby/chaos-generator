"use client";

import { useEffect } from "react";

import TradingCard from "@/app/components/trading-card.js";
import { useWarbandStore } from "@/app/stores/warbandStore.js";

import CustomizerButton from "@/app/components/customizerButton";
import GenerateNewButton from "@/app/components/generateNewButton";

export default function ChapterView({ initialChapter }) {
    const setWarband = useWarbandStore(s => s.setWarband);
    const warband = useWarbandStore(s => s.warband);

    useEffect(() => { setWarband(initialChapter); }, [initialChapter, setWarband]);
    const band = warband.slug ? warband : initialChapter;

    const handleShare = () => {
        const url = `${window.location.origin}/chapter/${band.slug}`;
        if (navigator.share) navigator.share({ title: "Check out this Chapter!", text: band.slug, url }).catch(() => { });
        else navigator.clipboard.writeText(url).catch(() => { });
    };

    return (
        <main className="flex flex-1 flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 p-4">

            <TradingCard
                warbandName={band.warbandName}
                namedColors={band.colors}
                slug={band.slug}
                patternName={band.pattern}
                mode={band.mode}

            />

            <div className="flex flex-col w-full max-w-96 gap-4">
                <div className="flex flex-row sm:flex-col w-full max-w-96 items-center justify-center gap-4">
                    <div className="w-full max-w-96">
                        <GenerateNewButton variant="Chapter" label="New" />
                    </div>
                    <div className="w-full max-w-96">
                        <CustomizerButton />
                    </div>

                </div>
                <div className="flex flex-col w-full max-w-96 items-center justify-center gap-4">
                    <div className="w-full max-w-96">
                        <button
                            className="btn btn-primary rounded-lg w-full"
                            onClick={handleShare}
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

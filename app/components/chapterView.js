"use client";

import { useEffect } from "react";

import { useWarbandStore } from "@/app/stores/warbandStore.js";

import TradingCard from "@/app/components/trading-card.js";
import CustomizerButton from "@/app/components/customizerButton";
import GenerateNewButton from "@/app/components/generateNewButton";
import ShareButton from "@/app/components/shareButton";

export default function ChapterView({ initialChapter }) {
    const setWarband = useWarbandStore(s => s.setWarband);
    const warband = useWarbandStore(s => s.warband);

    useEffect(() => { setWarband(initialChapter); }, [initialChapter, setWarband]);
    const band = warband.slug ? warband : initialChapter;

    return (
        <main className="flex flex-1 flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 p-4">
            <TradingCard variant="Chapter" band={band} />
            <div className="flex flex-col w-full max-w-96 gap-4">
                <div className="flex flex-row sm:flex-col w-full items-center justify-center gap-4">
                    <div className="w-full">
                        <GenerateNewButton variant="Chapter" label="New" />
                    </div>
                    <div className="w-full">
                        <CustomizerButton variant="Chapter" />
                    </div>
                </div>
                <ShareButton variant="Chapter" slug={band.slug} title={band.warbandName} />
            </div>
        </main>
    );
}

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
        <main className="flex flex-1 flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 p-4">
            <TradingCard variant="Chapter" band={band} />
            <div className="flex w-full max-w-96 flex-col gap-4">
                <div className="flex w-full flex-row items-center justify-center gap-4 sm:flex-col">
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

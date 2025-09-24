"use client";

import { useEffect, useState } from "react";
import { useWarbandStore } from "@/app/stores/warbandStore.js";

import TradingCard from "@/app/components/trading-card.js";
import CustomizerButton from "@/app/components/customizerButton";
import GenerateNewButton from "@/app/components/generateNewButton";
import ShareButton from "@/app/components/shareButton";

export default function ChapterView({ initialChapter }) {
    const setWarband = useWarbandStore((s) => s.setWarband);
    const warband = useWarbandStore((s) => s.warband);

    useEffect(() => { setWarband(initialChapter); }, [initialChapter, setWarband]);
    const band = warband.slug ? warband : initialChapter;

    const [model, setModel] = useState("marine"); // "marine" | "terminator"

    return (
        <main className="flex flex-1 flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 p-4">
            <div className="w-full max-w-96">
                <fieldset className="mb-2">
                    <div className="grid grid-cols-2 w-full">
                        <input
                            type="radio"
                            name="model"
                            className="btn btn-sm w-full rounded-l-md"
                            aria-label="Marine"
                            checked={model === "marine"}
                            onChange={() => setModel("marine")}
                        />
                        <input
                            type="radio"
                            name="model"
                            className="btn btn-sm w-full rounded-r-md"
                            aria-label="Terminator"
                            checked={model === "terminator"}
                            onChange={() => setModel("terminator")}
                        />
                    </div>
                </fieldset>
                <TradingCard variant="Chapter" band={band} model={model} />
            </div>

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

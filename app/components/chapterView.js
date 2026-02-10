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
        <section className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <div className="w-full max-w-96">
                <fieldset className="mb-2">
                    <div className="join w-full">
                        <input
                            type="radio"
                            name="model"
                            className="join-item btn btn-sm flex-1"
                            aria-label="Marine"
                            checked={model === "marine"}
                            onChange={() => setModel("marine")}
                        />
                        <input
                            type="radio"
                            name="model"
                            className="join-item btn btn-sm flex-1"
                            aria-label="Terminator"
                            checked={model === "terminator"}
                            onChange={() => setModel("terminator")}
                        />
                    </div>
                </fieldset>
                <TradingCard variant="Chapter" band={band} model={model} />
            </div>

            <div className="flex w-full max-w-96 flex-col gap-4">
                <GenerateNewButton variant="Chapter" label="New" />
                <div className="flex w-full flex-row items-center justify-center gap-4 sm:flex-col">
                    <div className="w-full">
                        <CustomizerButton variant="Chapter" />
                    </div>
                    <div className="w-full">
                        <ShareButton variant="Chapter" slug={band.slug} title={band.warbandName} />
                    </div>
                </div>

            </div>
        </section>
    );
}

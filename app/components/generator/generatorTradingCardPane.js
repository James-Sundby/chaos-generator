"use client";

import TradingCard from "@/app/components/tradingCard";
import GeneratorModelSwitcher from "@/app/components/generator/generatorModelSwitcher";
import { useGeneratorModel } from "@/app/components/generator/generatorModelProvider";

export default function GeneratorTradingCardPane({
    generatorKey,
    band,
    displayName,
}) {
    const { modelKey, modelOptions } = useGeneratorModel();

    return (
        <div className="flex w-full max-w-105 shrink-0 flex-col">
            <h1 className="mb-3 text-center text-2xl font-black uppercase leading-none tracking-tight md:hidden">
                {displayName}
            </h1>

            {modelOptions.length > 1 && (
                <GeneratorModelSwitcher className="join mb-3 flex w-full md:hidden" />
            )}

            <div className="relative">
                <TradingCard
                    generatorKey={generatorKey}
                    modelKey={modelKey}
                    band={band}
                />
            </div>
        </div>
    );
}
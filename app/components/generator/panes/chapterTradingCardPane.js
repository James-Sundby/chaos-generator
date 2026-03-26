"use client";

import TradingCardBase from "@/app/components/tradingCardBase";
import GeneratorModelSwitcher from "@/app/components/generator/generatorModelSwitcher";
import { useGeneratorModel } from "@/app/components/generator/generatorModelProvider";
import { modelConfig } from "@/lib/factions/chapter/model";

export default function ChapterTradingCardPane({
    band,
    displayName,
}) {
    const { modelKey, modelOptions } = useGeneratorModel();
    const { colors = [], slug, pattern } = band ?? {};

    const resolvedModel =
        modelConfig.models[modelKey] ?? Object.values(modelConfig.models)[0];

    const Model = resolvedModel.component;
    const modelProps = resolvedModel.getModelProps({ colors, pattern, band });
    const swatchIndices = modelConfig.getSwatchIndices({ colors, pattern, band });

    return (
        <div className="flex w-full max-w-105 shrink-0 flex-col">
            <h1 className="mb-3 text-center text-2xl font-black uppercase leading-none tracking-tight md:hidden">
                {displayName}
            </h1>

            {modelOptions.length > 1 && (
                <GeneratorModelSwitcher className="join mb-3 flex w-full md:hidden" />
            )}

            <div className="relative">
                <TradingCardBase
                    Model={Model}
                    modelProps={modelProps}
                    swatchIndices={swatchIndices}
                    colors={colors}
                    slug={slug}
                />
            </div>
        </div>
    );
}
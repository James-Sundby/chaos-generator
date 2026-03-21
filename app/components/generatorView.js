"use client";

import { useState } from "react";
import { generatorRegistry } from "@/app/components/generatorRegistry";

import TradingCard from "@/app/components/trading-card";
import CustomizerButton from "@/app/components/customizerButton";
import GenerateNewButton from "@/app/components/generateNewButton";
import ShareButton from "@/app/components/shareButton";

export default function GeneratorView({
    generatorKey,
    band,
    defaultModelKey,
}) {
    const generator = generatorRegistry[generatorKey] ?? generatorRegistry.chapter;
    const copy = generator.copy ?? {};

    const [modelKey, setModelKey] = useState(
        defaultModelKey ?? Object.keys(generator.models)[0]
    );

    const modelOptions = Object.entries(generator.models);

    const displayName = band?.name ?? band?.warbandName ?? `Unknown ${generator.variant}`;
    const prettyMode =
        band?.mode === "splitcomplementary"
            ? "Split Complementary"
            : band?.mode;

    return (
        <section className="mx-auto my-auto flex w-full max-w-7xl flex-col items-center justify-center gap-6 md:flex-row lg:gap-16">
            <div className="relative w-full max-w-105 shrink-0">
                {modelOptions.length > 1 && (
                    <div className="join mb-3 flex w-full md:hidden">
                        {modelOptions.map(([key, model]) => (
                            <input
                                key={key}
                                type="radio"
                                name={`${generatorKey}-model-mobile`}
                                className="join-item btn flex-1 rounded-none border-base-300 text-xs font-bold uppercase tracking-[0.18em]"
                                aria-label={model.label}
                                checked={modelKey === key}
                                onChange={() => setModelKey(key)}
                            />
                        ))}
                    </div>
                )}

                <TradingCard
                    generatorKey={generatorKey}
                    modelKey={modelKey}
                    band={band}
                />
            </div>

            <div className="flex w-full max-w-105 flex-col-reverse gap-4 md:flex-col">
                <div className="hidden badge badge-primary rounded-none border-0 px-3 py-3 text-[10px] font-bold uppercase tracking-[0.2em] md:inline-flex">
                    {copy.completionBadge ?? "Generation Complete"}
                </div>

                <div className="hidden md:block">
                    <h2 className="text-3xl font-black uppercase leading-none tracking-tight sm:text-4xl lg:text-5xl">
                        {displayName}
                    </h2>

                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-base-content/70 md:text-base">
                        {copy.heroDescription ??
                            "Technical readouts indicate a viable faction colour identity suitable for further refinement, customization, or archive export."}
                    </p>
                </div>

                {modelOptions.length > 1 && (
                    <div className="hidden  py-4 md:block">
                        <div className="mb-4 flex items-center justify-between gap-4">
                            <span className="text-sm font-bold uppercase tracking-[0.18em]">
                                {copy.modelSectionLabel ?? "Model Designation"}
                            </span>

                        </div>

                        <div className="join flex w-full">
                            {modelOptions.map(([key, model]) => (
                                <input
                                    key={key}
                                    type="radio"
                                    name={`${generatorKey}-model-desktop`}
                                    className="join-item btn flex-1 rounded-none border-base-300 text-xs font-bold uppercase tracking-[0.18em]"
                                    aria-label={model.label}
                                    checked={modelKey === key}
                                    onChange={() => setModelKey(key)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <div className="hidden border-b border-base-300 pb-6 md:block">
                    <div className="flex flex-wrap gap-x-8 gap-y-4">
                        <div>
                            <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-base-content/55">
                                Classification
                            </span>
                            <span className="text-sm font-bold uppercase">
                                {copy.classification ?? generator.variant}
                            </span>
                        </div>

                        {prettyMode && (
                            <div>
                                <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-base-content/55">
                                    Palette Mode
                                </span>
                                <span className="text-sm font-bold uppercase">
                                    {prettyMode}
                                </span>
                            </div>
                        )}

                        {band?.source && (
                            <div>
                                <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-base-content/55">
                                    {copy.sourceLabel ?? "Source"}
                                </span>
                                <span className="text-sm font-bold uppercase">
                                    {band.source}
                                </span>
                            </div>
                        )}

                        <div>
                            <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-base-content/55">
                                Archive Status
                            </span>
                            <span className="inline-block bg-primary px-2 py-1 text-xs font-bold uppercase tracking-[0.15em] text-primary-content">
                                {copy.statusLabel ?? "Active"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                    <div className="sm:col-span-2">
                        <GenerateNewButton
                            generatorKey={generatorKey}
                            label={copy.generateLabel ?? `Generate New ${generator.variant}`}
                        />
                    </div>

                    <div className="w-full">
                        <CustomizerButton generatorKey={generatorKey} />
                    </div>

                    <div className="w-full">
                        <ShareButton
                            generatorKey={generatorKey}
                            slug={band.slug}
                            title={displayName}
                        />
                    </div>
                </div>


            </div>
        </section>
    );
}
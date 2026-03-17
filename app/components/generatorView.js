"use client";

import { useState } from "react";
import { generatorRegistry } from "@/app/components/generatorRegistry";

import TradingCard from "@/app/components/trading-card.js";
import CustomizerButton from "@/app/components/customizerButton";
import GenerateNewButton from "@/app/components/generateNewButton";
import ShareButton from "@/app/components/shareButton";

export default function GeneratorView({
    generatorKey,
    band,
    defaultModelKey,
}) {
    const generator = generatorRegistry[generatorKey];
    const [modelKey, setModelKey] = useState(
        defaultModelKey ?? Object.keys(generator.models)[0]
    );

    const modelOptions = Object.entries(generator.models);

    return (
        <section className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <div className="w-full max-w-96">
                {modelOptions.length > 1 && (
                    <fieldset className="mb-2">
                        <div className="join w-full">
                            {modelOptions.map(([key, model]) => (
                                <input
                                    key={key}
                                    type="radio"
                                    name={`${generatorKey}-model`}
                                    className="join-item btn btn-sm flex-1"
                                    aria-label={model.label}
                                    checked={modelKey === key}
                                    onChange={() => setModelKey(key)}
                                />
                            ))}
                        </div>
                    </fieldset>
                )}

                <TradingCard
                    generatorKey={generatorKey}
                    modelKey={modelKey}
                    band={band}
                />
            </div>

            <div className="flex w-full max-w-96 flex-col gap-4">
                <GenerateNewButton generatorKey={generatorKey} label="New" />
                <div className="flex w-full flex-row items-center justify-center gap-4 sm:flex-col">
                    <div className="w-full">
                        <CustomizerButton generatorKey={generatorKey} />
                    </div>
                    <div className="w-full">
                        <ShareButton
                            generatorKey={generatorKey}
                            slug={band.slug}
                            title={band.name ?? band.warbandName}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
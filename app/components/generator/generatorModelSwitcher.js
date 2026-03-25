"use client";

import { useGeneratorModel } from "@/app/components/generator/generatorModelProvider";

export default function GeneratorModelSwitcher({ className = "" }) {
    const { modelOptions, modelKey, setModelKey } = useGeneratorModel();

    if (modelOptions.length <= 1) return null;

    return (
        <div className={className}>
            {modelOptions.map(({ key, label }) => {
                const isActive = modelKey === key;

                return (
                    <button
                        key={key}
                        type="button"
                        className={`join-item btn flex-1 rounded-none border-base-300 text-xs font-bold uppercase tracking-[0.18em] ${isActive ? "btn-primary" : "btn-outline"
                            }`}
                        aria-pressed={isActive}
                        aria-label={label}
                        onClick={() => setModelKey(key)}
                    >
                        {label}
                    </button>
                );
            })}
        </div>
    );
}
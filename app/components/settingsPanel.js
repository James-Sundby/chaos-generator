"use client";

import { useId } from "react";
import { useSettingsStore } from "@/app/stores/settingsStore";

const OPTIONS = [
    {
        value: "default",
        label: "Default",
        description: "Uses the Citadel range of Base, Layer, and Metallic paints.",
    },
    {
        value: "contrast",
        label: "Contrast",
        description:
            "Limits paint selection to Citadel Contrast paints only. Some split-panel armour patterns are unavailable.",
    },
    {
        value: "sm2",
        label: "Space Marine 2",
        description: "Limits paint selection to the colours available in Space Marine 2.",
    },
];

export default function SettingsPanel({ compact = false, onChangeComplete }) {
    const groupName = useId();
    const colourMode = useSettingsStore((s) => s.colourMode);
    const setColourMode = useSettingsStore((s) => s.setColourMode);

    return (
        <fieldset className={compact ? "fieldset w-full" : "flex flex-col gap-3"}>
            <div className={compact ? "flex flex-col gap-2" : "flex flex-col gap-3"}>
                {OPTIONS.map((option) => {
                    const selected = colourMode === option.value;

                    return (
                        <label
                            key={option.value}
                            className={[
                                "group relative flex cursor-pointer flex-col gap-3 overflow-hidden border transition",
                                compact ? "rounded-box p-3" : "rounded-none p-4 sm:p-5",
                                selected
                                    ? "border-primary bg-primary/5"
                                    : "border-base-300 bg-base-100 hover:border-base-content/30 hover:bg-base-200/40",
                            ].join(" ")}
                        >
                            <input
                                type="radio"
                                name={groupName}
                                className="sr-only"
                                checked={selected}
                                onChange={() => {
                                    setColourMode(option.value);
                                    onChangeComplete?.(option.value);
                                }}
                            />

                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                    <div
                                        className={[
                                            "font-black uppercase leading-none tracking-tight",
                                            compact ? "text-sm" : "text-lg sm:text-xl",
                                        ].join(" ")}
                                    >
                                        {option.label}
                                    </div>

                                    <p
                                        className={[
                                            "mt-1 leading-relaxed text-base-content/75",
                                            compact ? "text-xs" : "text-sm",
                                        ].join(" ")}
                                    >
                                        {option.description}
                                    </p>
                                </div>

                                <div
                                    className={[
                                        "mt-0.5 flex size-5 shrink-0 items-center justify-center border",
                                        selected
                                            ? "border-primary bg-primary text-primary-content"
                                            : "border-base-content/30 bg-base-100",
                                    ].join(" ")}
                                    aria-hidden="true"
                                >
                                    {selected ? (
                                        <svg viewBox="0 0 512 512" className="size-3 fill-current">
                                            <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416z" />
                                        </svg>
                                    ) : null}
                                </div>
                            </div>
                        </label>
                    );
                })}
            </div>
        </fieldset>
    );
}
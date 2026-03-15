"use client";

import PendingActionButton from "./pendingActionButton";
import { createWarbandAndGo } from "@/app/(actions)/createWarband";
import { createChapterAndGo } from "@/app/(actions)/createChapter";
import { createWarhostAndGo } from "@/app/(actions)/createWarhost";

import { useSettingsStore } from "@/app/stores/settingsStore";

const GENERATE_VARIANTS = {
    Chapter: {
        action: createChapterAndGo,
        defaultLabel: "Generate a New Chapter",
    },
    Chaos: {
        action: createWarbandAndGo,
        defaultLabel: "Generate a New Chaos Warband",
    },
    Eldar: {
        action: createWarhostAndGo,
        defaultLabel: "Generate a New Warhost",
    },
};

export default function GenerateNewButton({
    variant = "Chapter",
    label,
}) {
    const config = GENERATE_VARIANTS[variant] ?? GENERATE_VARIANTS.Chapter;
    const { action, defaultLabel } = config;

    const settings = useSettingsStore();

    return (
        <form action={action} className="w-full">
            <input
                type="hidden"
                name="settings"
                value={JSON.stringify({
                    colourMode: settings.colourMode,
                })}
            />
            <PendingActionButton variant={variant}>
                {label ?? defaultLabel}
            </PendingActionButton>
        </form>
    );
}

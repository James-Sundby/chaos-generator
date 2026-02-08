"use client";

import PendingActionButton from "./pendingActionButton";
import { createWarbandAndGo } from "@/app/(actions)/createWarband";
import { createChapterAndGo } from "@/app/(actions)/createChapter";

import { useSettingsStore } from "@/app/stores/settingsStore";

export default function GenerateNewButton({
    variant = "Chapter", // "Chaos" or "Chapter"
    label, // optional override
}) {
    const action =
        variant === "Chaos" ? createWarbandAndGo : createChapterAndGo;

    const defaultLabel =
        variant === "Chaos" ? "Generate a New Chaos Warband" : "Generate a New Chapter";

    const settings = useSettingsStore();

    return (
        <form action={action} className="w-full">
            <input
                type="hidden"
                name="settings"
                value={JSON.stringify({
                    colourMode: settings.colourMode,
                }
                )}
            />
            <PendingActionButton variant={variant}>
                {label ?? defaultLabel}
            </PendingActionButton>
        </form>
    );
}

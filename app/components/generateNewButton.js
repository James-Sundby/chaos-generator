"use client";

import PendingActionButton from "./pendingActionButton";
import { useSettingsStore } from "@/app/stores/settingsStore";
import { generatorRegistry } from "@/lib/generators/index";

export default function GenerateNewButton({
    generatorKey = "chapter",
    label,
}) {
    const config = generatorRegistry[generatorKey] ?? generatorRegistry.chapter;
    const colourMode = useSettingsStore((s) => s.colourMode);

    return (
        <form action={config.createAction} className="w-full">
            <input
                type="hidden"
                name="settings"
                value={JSON.stringify({
                    colourMode: colourMode,
                })}
            />
            <PendingActionButton>
                {label ?? `Generate a New ${config.noun[0].toUpperCase()}${config.noun.slice(1)}`}
            </PendingActionButton>
        </form>
    );
}
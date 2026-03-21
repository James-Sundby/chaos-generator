"use client";

import PendingActionButton from "./pendingActionButton";
import { useSettingsStore } from "@/app/stores/settingsStore";
import { generatorRegistry } from "./generatorRegistry";

export default function GenerateNewButton({
    generatorKey = "chapter",
    label,
}) {
    const config = generatorRegistry[generatorKey] ?? generatorRegistry.chapter;
    const settings = useSettingsStore();

    return (
        <form action={config.createAction} className="w-full">
            <input
                type="hidden"
                name="settings"
                value={JSON.stringify({
                    colourMode: settings.colourMode,
                })}
            />
            <PendingActionButton>
                {label ?? `Generate a New ${config.noun[0].toUpperCase()}${config.noun.slice(1)}`}
            </PendingActionButton>
        </form>
    );
}
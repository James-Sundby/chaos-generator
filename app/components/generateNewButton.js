"use client";

import PendingActionButton from "./pendingActionButton";
import { useSettingsStore } from "@/app/stores/settingsStore";

export default function GenerateNewButton({
    action,
    noun = "scheme",
    label,
}) {
    const colourMode = useSettingsStore((s) => s.colourMode);

    return (
        <form action={action} className="w-full">
            <input
                type="hidden"
                name="settings"
                value={JSON.stringify({
                    colourMode,
                })}
            />

            <PendingActionButton>
                {label ??
                    `Generate a New ${noun[0].toUpperCase()}${noun.slice(1)}`}
            </PendingActionButton>
        </form>
    );
}
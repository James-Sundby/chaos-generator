'use server';

import { createWarhost } from "@/utils/warhost";
import { redirect } from 'next/navigation';

function parseSettings(raw) {
    const defaults = { colourMode: "default" };
    if (!raw) return defaults;

    try {
        const s = JSON.parse(String(raw));
        const cm = s?.colourMode;
        if (cm === "default" || cm === "sm2" || cm === "contrast") {
            return { colourMode: cm };
        }
    } catch { }
    return defaults;
}

export async function createWarhostAndGo(formData) {
    const settings = parseSettings(formData.get("settings"));
    const warhost = createWarhost(settings);
    redirect(`/warhost/${warhost.slug}`);
}
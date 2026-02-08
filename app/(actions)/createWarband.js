'use server';

import { createWarband } from '@/utils/warband';
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

export async function createWarbandAndGo(formData) {
    const settings = parseSettings(formData.get("settings"));
    const band = createWarband(settings);
    redirect(`/chaos/${band.slug}`);
}
'use server';

import { redirect } from "next/navigation";

import { schemeSearchObjectSchema } from "@/app/schema/schemeSearch";
import { getFactionConfig } from "@/utils/factionConfig";
import { generateSlug, parseSlug } from "@/utils/parseSlugs";

import { createChapter } from "@/utils/(faction wrappers)/chapter";
import { createWarband } from "@/utils/(faction wrappers)/warband";
import { createWarhost } from "@/utils/(faction wrappers)/warhost";

function getRouteBaseFromFaction(faction) {
    switch (faction) {
        case "chapter":
            return "/chapter";
        case "chaos":
            return "/chaos";
        case "eldar":
            return "/warhost";
        default:
            throw new Error("bad-slug");
    }
}

function parseSettings(raw) {
    const defaults = { colourMode: "default" };
    if (!raw) return defaults;

    try {
        const parsed = JSON.parse(String(raw));
        const colourMode = parsed?.colourMode;
        if (colourMode === "default" || colourMode === "sm2" || colourMode === "contrast") {
            return { colourMode };
        }
    } catch { }

    return defaults;
}

export async function schemeSearchServer(payload) {
    const parsed = schemeSearchObjectSchema.safeParse(payload);

    if (!parsed.success) {
        return {
            error:
                parsed.error.issues?.[0]?.message ||
                "That id could not be used. Double-check and try again.",
        };
    }

    let canonical;
    let routeBase;

    try {
        const config = getFactionConfig();
        const canonicalParsed = parseSlug(parsed.data.q, config);

        canonical = generateSlug(
            canonicalParsed.faction,
            canonicalParsed.name,
            canonicalParsed.colours,
            canonicalParsed.pattern,
            canonicalParsed.mode || undefined
        );

        routeBase = getRouteBaseFromFaction(canonicalParsed.faction);
    } catch (e) {
        return {
            error: e?.message || "That id could not be used. Double-check and try again.",
        };
    }

    redirect(`${routeBase}/${canonical}`);
}

export async function createChapterAndGo(formData) {
    const settings = parseSettings(formData.get("settings"));
    const entity = createChapter(settings);
    redirect(`/chapter/${entity.slug}`);
}

export async function createWarbandAndGo(formData) {
    const settings = parseSettings(formData.get("settings"));
    const entity = createWarband(settings);
    redirect(`/chaos/${entity.slug}`);
}

export async function createWarhostAndGo(formData) {
    const settings = parseSettings(formData.get("settings"));
    const entity = createWarhost(settings);
    redirect(`/warhost/${entity.slug}`);
}
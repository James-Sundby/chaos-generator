"use server";

import { redirect } from "next/navigation";

import { schemeSearchObjectSchema } from "@/app/schema/schemeSearch";
import { getFactionConfig } from "@/utils/factionConfig";
import { generateSlug, parseSlug } from "@/utils/parseSlugs";
import { createEntityData } from "@/utils/factionEntity";

function parseSettings(raw) {
    const defaults = { colourMode: "default" };
    if (!raw) return defaults;

    try {
        const parsed = JSON.parse(String(raw));
        const colourMode = parsed?.colourMode;

        if (
            colourMode === "default" ||
            colourMode === "sm2" ||
            colourMode === "contrast"
        ) {
            return { colourMode };
        }
    } catch { }

    return defaults;
}

function getFactionEntry(faction) {
    const entry = getFactionConfig()[faction];
    if (!entry) {
        throw new Error("bad-faction");
    }
    return entry;
}

async function createFactionAndGo(faction, formData) {
    const settings = parseSettings(formData.get("settings"));
    const entity = createEntityData(faction, settings);
    const { basePath } = getFactionEntry(faction);

    redirect(`${basePath}/${entity.slug}`);
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

    let canonicalParsed;
    let canonical;
    let basePath;

    try {
        const config = getFactionConfig();
        canonicalParsed = parseSlug(parsed.data.q, config);

        canonical = generateSlug(
            canonicalParsed.faction,
            canonicalParsed.name,
            canonicalParsed.colours,
            canonicalParsed.pattern,
            canonicalParsed.mode || undefined
        );

        ({ basePath } = getFactionEntry(canonicalParsed.faction));
    } catch (e) {
        return {
            error:
                e?.message ||
                "That id could not be used. Double-check and try again.",
        };
    }

    redirect(`${basePath}/${canonical}`);
}

export async function createChapterAndGo(formData) {
    return createFactionAndGo("chapter", formData);
}

export async function createWarbandAndGo(formData) {
    return createFactionAndGo("chaos", formData);
}

export async function createWarhostAndGo(formData) {
    return createFactionAndGo("eldar", formData);
}

export async function createSistersAndGo(formData) {
    return createFactionAndGo("sisters", formData);
}
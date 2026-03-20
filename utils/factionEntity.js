import "server-only";

import { getFactionConfig } from "@/utils/factionConfig";
import { generateSlug, parseSlug } from "@/utils/parseSlugs";

const slugRegex = /^[a-zA-Z0-9-]+$/;

export function createFactionEntity(faction, settings) {
    const configMap = getFactionConfig();
    const config = configMap[faction];

    if (!config) {
        throw new Error("bad-faction");
    }

    const name = config.generateName();
    const { colours, mode } = config.generateScheme(settings);
    const pattern = config.generatePattern(settings);
    const slug = generateSlug(faction, name, colours, pattern, mode);

    return {
        faction,
        name,
        colors: colours,
        pattern,
        slug,
        mode,
    };
}

export function parseFactionEntityFromSlugOrThrow(slug) {
    if (!slug || !slugRegex.test(slug)) {
        throw new Error("bad-slug");
    }

    const configMap = getFactionConfig();
    const parsed = parseSlug(slug, configMap);

    const canonical = generateSlug(
        parsed.faction,
        parsed.name,
        parsed.colours,
        parsed.pattern,
        parsed.mode
    );

    return {
        entity: {
            faction: parsed.faction,
            name: parsed.name,
            colors: parsed.colours,
            pattern: parsed.pattern,
            slug: canonical,
            mode: parsed.mode,
        },
        canonical,
    };
}
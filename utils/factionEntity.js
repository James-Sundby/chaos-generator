import "server-only";

import { getFactionConfig } from "@/utils/factionConfig";
import { generateSlug, parseSlug } from "@/utils/parseSlugs";

const slugRegex = /^[a-zA-Z0-9-]+$/;

function toEntityData(entity) {
    return {
        name: entity.name,
        colors: entity.colors,
        pattern: entity.pattern,
        slug: entity.slug,
        mode: entity.mode,
    };
}

export function createEntity(faction, settings) {
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

export function createEntityData(faction, settings) {
    return toEntityData(createEntity(faction, settings));
}

export function parseSlugEntity(slug) {
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

export function parseEntity(faction, slug) {
    const { entity, canonical } = parseSlugEntity(slug);

    if (entity.faction !== faction) {
        throw new Error("wrong-faction");
    }

    return {
        entity: toEntityData(entity),
        canonical,
    };
}
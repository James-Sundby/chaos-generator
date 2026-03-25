import "server-only";
import { createFactionEntity, parseFactionEntityFromSlugOrThrow } from "@/utils/factionEntity";

export function createWarhost(settings) {
    const entity = createFactionEntity("eldar", settings);

    return {
        name: entity.name,
        colors: entity.colors,
        pattern: entity.pattern,
        slug: entity.slug,
        mode: entity.mode,
    };
}

export function parseWarhostFromSlugOrThrow(slug) {
    const { entity, canonical } = parseFactionEntityFromSlugOrThrow(slug);

    if (entity.faction !== "eldar") {
        throw new Error("Slug does not correspond to an Eldar warhost");
    }

    return {
        eldar: {
            name: entity.name,
            colors: entity.colors,
            pattern: entity.pattern,
            slug: entity.slug,
            mode: entity.mode,
        },
        canonical,
    };
}
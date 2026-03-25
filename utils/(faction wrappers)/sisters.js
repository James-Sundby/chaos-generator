import "server-only";
import { createFactionEntity, parseFactionEntityFromSlugOrThrow } from "@/utils/factionEntity";

export function createSisters(settings) {
    const entity = createFactionEntity("sisters", settings);

    return {
        name: entity.name,
        colors: entity.colors,
        pattern: entity.pattern,
        slug: entity.slug,
        mode: entity.mode,
    };
}

export function parseFromSlugOrThrow(slug) {
    const { entity, canonical } = parseFactionEntityFromSlugOrThrow(slug);

    if (entity.faction !== "sisters") {
        throw new Error("Slug does not correspond to an Order");
    }

    return {
        sisters: {
            name: entity.name,
            colors: entity.colors,
            pattern: entity.pattern,
            slug: entity.slug,
            mode: entity.mode,
        },
        canonical,
    };
}
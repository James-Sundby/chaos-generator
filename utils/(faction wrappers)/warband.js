import "server-only";
import { createFactionEntity, parseFactionEntityFromSlugOrThrow } from "@/utils/factionEntity";

export function createWarband(settings) {
    const entity = createFactionEntity("chaos", settings);

    return {
        warbandName: entity.name,
        colors: entity.colors,
        pattern: entity.pattern,
        slug: entity.slug,
        mode: entity.mode,
    };
}

export function parseFromSlugOrThrow(slug) {
    const { entity, canonical } = parseFactionEntityFromSlugOrThrow(slug);

    if (entity.faction !== "chaos") {
        throw new Error("Slug does not correspond to a Chaos warband");
    }

    return {
        band: {
            warbandName: entity.name,
            colors: entity.colors,
            pattern: entity.pattern,
            slug: entity.slug,
            mode: entity.mode,
        },
        canonical,
    };
}
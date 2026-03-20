import "server-only";
import { createFactionEntity, parseFactionEntityFromSlugOrThrow } from "@/utils/factionEntity";

export function createChapter(settings) {
    const entity = createFactionEntity("chapter", settings);

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

    if (entity.faction !== "chapter") {
        throw new Error("Slug does not correspond to a Chapter");
    }

    return {
        chapter: {
            warbandName: entity.name,
            colors: entity.colors,
            pattern: entity.pattern,
            slug: entity.slug,
            mode: entity.mode,
        },
        canonical,
    };
}
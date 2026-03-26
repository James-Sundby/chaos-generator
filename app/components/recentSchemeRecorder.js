"use client";

import { useEffect } from "react";
import { useRecentSchemesStore } from "@/app/stores/recentSchemesStore";

export default function RecentSchemeRecorder({
    generatorKey,
    band,
    variant = "Scheme",
    classification = "",
    group = "",
    basePath = "",
}) {
    const addScheme = useRecentSchemesStore((s) => s.addScheme);

    useEffect(() => {
        if (!band?.slug) return;
        if (band?.isSample) return;

        const displayName =
            band?.name ?? band?.warbandName ?? `Unknown ${variant}`;

        addScheme({
            slug: band.slug,
            name: displayName,
            generatorKey,
            description: classification,
            group,
            href: `${basePath}/${band.slug}`,
            colors: (band.colors ?? [])
                .map((color) => color?.hex)
                .filter(Boolean)
                .slice(0, 4),
            createdAt: Date.now(),
        });
    }, [addScheme, band, generatorKey, variant, classification, group, basePath]);

    return null;
}
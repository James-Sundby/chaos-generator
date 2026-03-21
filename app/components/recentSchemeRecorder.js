"use client";

import { useEffect } from "react";
import { useRecentSchemesStore } from "@/app/stores/recentSchemesStore";
import { generatorRegistry } from "@/app/components/generatorRegistry";

export default function RecentSchemeRecorder({ generatorKey, band }) {
    const addScheme = useRecentSchemesStore((s) => s.addScheme);

    useEffect(() => {
        if (!band?.slug) return;
        if (band?.isSample) return;

        const generator = generatorRegistry[generatorKey] ?? generatorRegistry.chapter;
        const displayName =
            band?.name ?? band?.warbandName ?? `Unknown ${generator.variant}`;

        addScheme({
            slug: band.slug,
            name: displayName,
            generatorKey,
            description: generator.copy?.classification ?? "",
            group: generator.group,
            href: `${generator.basePath}/${band.slug}`,
            colors: (band.colors ?? [])
                .map((color) => color?.hex)
                .filter(Boolean)
                .slice(0, 4),
            createdAt: Date.now(),
        });
    }, [addScheme, band, generatorKey]);

    return null;
}
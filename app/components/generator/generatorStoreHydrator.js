"use client";

import { useEffect } from "react";
import { useFactionStore } from "@/app/stores/factionStore";

const validKeys = new Set(["chapter", "chaos", "sisters", "eldar"]);

export default function GeneratorStoreHydrator({ generatorKey, entity }) {
    const setEntity = useFactionStore((state) => state.setEntity);

    useEffect(() => {
        if (!entity) return;
        if (!validKeys.has(generatorKey)) return;

        setEntity(generatorKey, entity);
    }, [generatorKey, entity, setEntity]);

    return null;
}
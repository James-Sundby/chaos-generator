"use client";

import { useEffect } from "react";
import { useWarbandStore } from "@/app/stores/warbandStore";
import { useChaosStore } from "@/app/stores/chaosStore";
import { useWarhostStore } from "@/app/stores/warhostStore";
import { useSistersStore } from "@/app/stores/sistersStore";

export default function GeneratorStoreHydrator({ generatorKey, entity }) {
    const setWarband = useWarbandStore((s) => s.setWarband);
    const setChaosBand = useChaosStore((s) => s.setChaosBand);
    const setWarhost = useWarhostStore((s) => s.setWarhost);
    const setOrder = useSistersStore((s) => s.setOrder);

    useEffect(() => {
        if (!entity) return;

        switch (generatorKey) {
            case "chapter":
                setWarband(entity);
                break;
            case "chaos":
                setChaosBand(entity);
                break;
            case "eldar":
                setWarhost(entity);
                break;
            case "sisters":
                setOrder(entity);
                break;
            default:
                break;
        }
    }, [generatorKey, entity, setWarband, setChaosBand, setWarhost, setOrder]);

    return null;
}
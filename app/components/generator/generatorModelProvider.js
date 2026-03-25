"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { generatorRegistry } from "@/lib/generators";

const GeneratorModelContext = createContext(null);

export default function GeneratorModelProvider({
    generatorKey = "chapter",
    defaultModelKey,
    children,
}) {
    const generator = generatorRegistry[generatorKey] ?? generatorRegistry.chapter;

    const modelOptions = useMemo(
        () =>
            Object.entries(generator.models ?? {}).map(([key, model]) => ({
                key,
                label: model.label,
            })),
        [generatorKey]
    );

    const [modelKey, setModelKey] = useState(
        defaultModelKey ?? modelOptions[0]?.key
    );

    const value = useMemo(
        () => ({
            modelKey,
            setModelKey,
            modelOptions,
        }),
        [modelKey, modelOptions]
    );

    return (
        <GeneratorModelContext.Provider value={value}>
            {children}
        </GeneratorModelContext.Provider>
    );
}

export function useGeneratorModel() {
    const context = useContext(GeneratorModelContext);

    if (!context) {
        throw new Error(
            "useGeneratorModel must be used within GeneratorModelProvider"
        );
    }

    return context;
}
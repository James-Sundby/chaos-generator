"use client";

import { createContext, useContext, useMemo, useState } from "react";

const GeneratorModelContext = createContext(null);

export default function GeneratorModelProvider({
    modelOptions = [],
    defaultModelKey,
    children,
}) {
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
        throw new Error("useGeneratorModel must be used within GeneratorModelProvider");
    }

    return context;
}
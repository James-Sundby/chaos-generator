function getSwatchStyle(color) {
    if (!color) {
        return { backgroundColor: "transparent" };
    }

    if (color.type === "Metallic" && color.metallic) {
        return {
            background: `radial-gradient(
                circle at 32% 28%,
                ${color.metallic.highlight} 0%,
                ${color.metallic.mid} 32%,
                ${color.metallic.shadow} 78%,
                ${color.metallic.shadow} 100%
            )`,
        };
    }

    return {
        backgroundColor: color.hex,
    };
}

export default function TradingCardBase({
    Model,
    modelProps,
    swatchIndices,
    colors = [],
    slug,
}) {
    const paletteNames = swatchIndices
        .map((i) => colors[i]?.name)
        .filter(Boolean);

    return (
        <div
            id="trading-card"
            className="relative flex w-full flex-col overflow-hidden rounded-none border-12 border-primary bg-white text-neutral-content shadow-xl"
        >
            <div className="relative flex h-[50svh] items-center justify-center p-2">
                <Model {...modelProps} />
            </div>

            <div className="flex flex-col gap-4 bg-base-200/80 p-5">
                <div className="flex flex-col gap-2">
                    <div className="flex h-8 gap-1" aria-label="Color palette">
                        {swatchIndices.map((i) => (
                            <div
                                key={i}
                                className="tooltip flex-1 rounded-none border border-black/5"
                                data-tip={colors[i]?.name}
                                style={getSwatchStyle(colors[i])}
                                aria-label={colors[i]?.name}
                                title={colors[i]?.name}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {paletteNames.length > 0 && (
                        <p className="text-[14px] font-bold uppercase tracking-[0.08em] text-base-content">
                            {paletteNames.join(", ")}
                        </p>
                    )}

                    <p className="max-w-full break-all border-t border-base-content/55 pt-4 font-mono text-sm text-base-content/55">
                        ID: {slug}
                    </p>
                </div>
            </div>
        </div>
    );
}
import { generatorRegistry } from "./generatorRegistry";

export default function TradingCard({
    generatorKey = "chapter",
    modelKey,
    band,
}) {
    const { name, warbandName, colors = [], slug, pattern, mode } = band ?? {};
    const displayName = name ?? warbandName ?? "Unknown";

    const generator = generatorRegistry[generatorKey] ?? generatorRegistry.chapter;
    const copy = generator.copy ?? {};

    const modelConfig =
        generator.models[modelKey] ?? Object.values(generator.models)[0];

    const Model = modelConfig.component;
    const modelProps = modelConfig.getModelProps({ colors, pattern, band });
    const swatchIndices = generator.getSwatchIndices({ colors, pattern, band });

    const paletteNames = swatchIndices
        .map((i) => colors[i]?.name)
        .filter(Boolean);

    const prettyMode =
        mode === "splitcomplementary" ? "Split Complementary" : mode;

    return (
        <div
            id="trading-card"
            className="relative flex w-full flex-col overflow-hidden border-12 border-primary bg-white text-neutral-content shadow-xl"
        >
            <div className="bg-primary px-4 py-3 text-center text-primary-content">
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">
                    {copy.cardTopLabel ?? "ARCHIVE ENTRY"}
                </span>
                <h1 className="mt-1 text-2xl font-black uppercase leading-none tracking-tight sm:text-3xl">
                    {displayName}
                </h1>
            </div>

            <div className="relative flex h-[40svh] items-center justify-center p-2">
                <Model {...modelProps} />
            </div>

            <div className="space-y-4 bg-base-200/80 p-5">
                <div className="space-y-2">
                    <span className="block text-[9px] uppercase tracking-[0.2em] text-base-content/55">
                        {copy.paletteLabel ?? "Colour Palette"}
                    </span>

                    <div className="flex h-8 gap-1" aria-label="Color palette">
                        {swatchIndices.map((i) => (
                            <div
                                key={i}
                                className="tooltip flex-1 border border-black/5"
                                data-tip={colors[i]?.name}
                                style={{ backgroundColor: colors[i]?.hex }}
                                aria-label={colors[i]?.name}
                                title={colors[i]?.name}
                            />
                        ))}
                    </div>
                </div>

                <div className="border-t border-base-300 pt-4">
                    {paletteNames.length > 0 && (
                        <p className="text-[11px] font-bold uppercase tracking-[0.08em]">
                            {paletteNames.join(", ")}
                        </p>
                    )}

                    <div className="mt-3 flex items-end justify-between gap-4">
                        <div>
                            {prettyMode && (
                                <p className="text-[11px] uppercase tracking-[0.12em] text-base-content/70">
                                    Palette: {prettyMode}
                                </p>
                            )}

                            <p className="mt-1 max-w-full break-all font-mono text-sm text-base-content/55">
                                {copy.idLabel ?? "ID"}: {slug}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
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
            <div className="bg-primary pb-4 text-center text-primary-content">
                <h1 className="text-2xl font-black uppercase leading-none tracking-tight sm:text-3xl">
                    {displayName}
                </h1>
            </div>
            <div className="relative flex h-[40svh] items-center justify-center p-2">
                <Model {...modelProps} />
            </div>
            <div className="space-y-4 bg-base-200/80 p-5">
                <div className="space-y-2">
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
                <div className="flex flex-col justify-between gap-4">
                    {paletteNames.length > 0 && (
                        <p className="text-[14px] text-base-content font-bold uppercase tracking-[0.08em]">
                            {paletteNames.join(", ")}
                        </p>
                    )}
                    {prettyMode && (
                        <p className="text-[11px] uppercase tracking-[0.12em] text-base-content/70">
                            Palette: {prettyMode}
                        </p>
                    )}
                    <p className="pt-1 border-t border-base-content/55 max-w-full break-all font-mono text-sm text-base-content/55">
                        ID: {slug}
                    </p>
                </div>
            </div>
        </div>
    );
}
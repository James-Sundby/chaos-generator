import { generatorRegistry } from "@/lib/generators/index";

export default function TradingCard({
    generatorKey = "chapter",
    modelKey,
    band,
}) {
    const { name, warbandName, colors = [], slug, pattern, mode } = band ?? {};
    const displayName = name ?? warbandName ?? "Unknown";

    const generator = generatorRegistry[generatorKey] ?? generatorRegistry.chapter;
    const modelConfig =
        generator.models[modelKey] ?? Object.values(generator.models)[0];

    const Model = modelConfig.component;
    const modelProps = modelConfig.getModelProps({ colors, pattern, band });
    const swatchIndices = generator.getSwatchIndices({ colors, pattern, band });

    const paletteNames = swatchIndices
        .map((i) => colors[i]?.name)
        .filter(Boolean);

    return (
        <div
            id="trading-card"
            className="relative flex w-full flex-col overflow-hidden rounded-none border-12 border-primary bg-white text-neutral-content shadow-xl"
        >
            <div className="bg-primary px-4 py-4 text-center text-primary-content">
                <h1 className="text-2xl font-black uppercase leading-none tracking-tight sm:text-3xl">
                    {displayName}
                </h1>
            </div>

            <div className="relative flex h-[40svh] items-center justify-center p-2">
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
                                style={{ backgroundColor: colors[i]?.hex }}
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
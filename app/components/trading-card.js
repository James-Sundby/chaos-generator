import { generatorRegistry } from "./generatorRegistry";

export default function TradingCard({
    generatorKey = "chapter",
    modelKey,
    band,
}) {
    const { name, warbandName, colors = [], slug, pattern, mode } = band ?? {};
    const displayName = name ?? warbandName;

    const generator = generatorRegistry[generatorKey] ?? generatorRegistry.chapter;
    const modelConfig =
        generator.models[modelKey] ?? Object.values(generator.models)[0];

    const Model = modelConfig.component;
    const modelProps = modelConfig.getModelProps({ colors, pattern, band });
    const swatchIndices = generator.getSwatchIndices({ colors, pattern, band });

    const paletteNames = swatchIndices
        .map((i) => colors[i]?.name)
        .filter(Boolean)
        .join(", ");

    const prettyMode = mode === "Splitcomplementary" ? "Split Complementary" : mode;

    return (
        <div id="trading-card" className="card w-full max-w-96 bg-white text-neutral border-8 border-yellow-600">
            <div className="card-body p-2 m-0">
                <h1 className="card-title justify-center text-center uppercase font-black border-b pb-2 border-base-300">
                    {displayName}
                </h1>

                <div className="h-[40svh]">
                    <Model {...modelProps} />
                </div>

                <div className="join join-horizontal" aria-label="Color palette">
                    {swatchIndices.map((i) => (
                        <div
                            key={i}
                            className="join-item h-8 w-full border border-neutral tooltip"
                            data-tip={colors[i]?.name}
                            style={{ backgroundColor: colors[i]?.hex }}
                            aria-label={colors[i]?.name}
                            title={colors[i]?.name}
                        />
                    ))}
                </div>

                {paletteNames && <p className="text-sm font-bold">{paletteNames}</p>}

                {prettyMode && (
                    <p className="text-xs">
                        Palette: <span className="font-normal">{prettyMode}</span>
                    </p>
                )}

                <div className="card-actions border-t border-base-300 pt-2 text-xs opacity-75 font-mono text-left inline-block max-w-full break-all">
                    ID: {slug}
                </div>
            </div>
        </div>
    );
}
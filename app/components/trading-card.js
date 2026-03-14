import { modelRegistry } from "./modelRegistry";

export default function TradingCard({
    variant = "Chapter", // "Chaos" or "Chapter"
    model = "marine",
    band, //warbandName, namedColors[], slug, patternName, mode
}) {
    const { warbandName, colors = [], slug, pattern, mode } = band ?? {};

    const config = modelRegistry[variant] ?? modelRegistry.Chapter;
    const Model = config.getComponent({ model, band });
    const modelProps = config.getModelProps({ colors, pattern, model, band });
    const swatchIndices = config.getSwatchIndices({ colors, pattern, model, band });

    const paletteNames = swatchIndices
        .map((i) => colors[i]?.name)
        .filter(Boolean)
        .join(", ");

    const prettyMode = mode === "Splitcomplementary" ? "Split Complementary" : mode;

    return (
        <div id="trading-card" className="card w-full max-w-96 bg-white text-neutral border-8 border-yellow-600">
            <div className="card-body p-2 m-0">
                <h1 className="card-title justify-center text-center uppercase font-black border-b pb-2 border-base-300">{warbandName}</h1>

                <div className="h-[40svh]">
                    <Model {...modelProps} />
                </div>

                {/* Swatches */}
                <div
                    className="join join-horizontal"
                    aria-label="Color palette"
                >
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

                {/* Names */}
                {paletteNames && (
                    <p className="text-sm font-bold">{paletteNames}</p>
                )}

                {/* Palette mode */}
                {prettyMode && (
                    <p className="text-xs">
                        Palette: <span className="font-normal">{prettyMode}</span>
                    </p>
                )}

                {/* ID footer */}
                <div className="card-actions border-t border-base-300 pt-2 text-xs opacity-75 font-mono text-left inline-block max-w-full break-all">
                    ID: {slug}
                </div>
            </div>
        </div>
    );
}
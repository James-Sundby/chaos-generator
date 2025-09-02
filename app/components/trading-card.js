import SpaceMarine from "./spaceMarine";
import ChaosMarine from "./chaosSpaceMarine";

export default function TradingCard({
    variant = "Chapter", // "Chaos" or "Chapter"
    band, //warbandName, namedColors[], slug, patternName, mode
}) {

    const isChaos = variant === "Chaos";
    const { warbandName, colors = [], slug, pattern, mode } = band ?? {};

    const Marine = isChaos ? ChaosMarine : SpaceMarine;

    const marineProps = isChaos
        ? {
            primary: colors[0]?.hex,
            secondary: colors[1]?.hex,
            edge: colors[2]?.hex,
            accent: colors[3]?.hex,
            pattern,
        }
        : {
            primary: colors[0]?.hex,
            secondary: colors[1]?.hex,
            trim: colors[2]?.hex,
            pattern,
        };

    let swatchIndices = [];
    if (isChaos) {
        if (pattern === "Basic") {
            swatchIndices = [0, 2, 3].filter((i) => colors[i]);
        } else {
            swatchIndices = colors.map((_, i) => i).filter((i) => colors[i]);
        }
    } else {
        const areColorsDifferent = colors[0]?.hex !== colors[1]?.hex;
        swatchIndices = areColorsDifferent ? [0, 1, 2] : [0, 2];
    }

    const paletteNames = swatchIndices
        .map((i) => colors[i]?.name)
        .filter(Boolean)
        .join(", ");

    const prettyMode =
        mode === "Splitcomplementary" ? "Split Complementary" : mode;

    return (
        <div id="trading-card" className="card bg-yellow-600 text-neutral w-full max-w-96 rounded-lg">
            <div className="card-body p-2 m-2 bg-white rounded-lg">
                <h1 className="card-title justify-center text-center anton">
                    {warbandName}
                </h1>

                <div className="h-[45svh]">
                    <Marine {...marineProps} />
                </div>

                {/* Swatches */}
                <div
                    className="flex flex-1 join join-horizontal rounded-lg"
                    aria-label="Color palette"
                >
                    {swatchIndices.map((i) => (
                        <div
                            key={i}
                            className="w-full h-8 join-item border border-neutral tooltip"
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
                        Palette: <span className="font-medium">{prettyMode}</span>
                    </p>
                )}

                {/* ID footer */}
                <div className="mt-2 border-t border-neutral pt-2 text-right text-xs opacity-75">
                    ID: <span className="font-mono font-normal">{slug}</span>
                </div>
            </div>
        </div>
    );
}
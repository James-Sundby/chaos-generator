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

    const prettyMode = mode === "Splitcomplementary" ? "Split Complementary" : mode;

    return (
        <div id="trading-card" className="card w-full max-w-96 bg-white text-neutral border-8 border-yellow-600">
            <div className="card-body p-2 m-0 rounded-lg">
                <h1 className="card-title justify-center text-center uppercase font-black">{warbandName}</h1>

                <div className="h-[45svh]">
                    <Marine {...marineProps} />
                </div>

                {/* Swatches */}
                <div
                    className="join join-horizontal"
                    aria-label="Color palette"
                >
                    {swatchIndices.map((i) => (
                        <div
                            key={i}
                            className="join-item h-8 w-full border border-base-300 tooltip"
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
                <div className="mt-2 border-t border-base-300 pt-2 text-right text-xs opacity-75">
                    ID: <span className="font-mono">{slug}</span>
                </div>
            </div>
        </div>
    );
}
import SpaceMarine from "./spaceMarine";

export default function TradingCard({ warbandName, namedColors, slug, patternName, mode }) {
    const areColorsDifferent =
        namedColors[0]?.hex !== namedColors[1]?.hex;

    return (
        <div id="trading-card" className="card bg-yellow-600 text-neutral w-full max-w-96 rounded-lg">
            <div className="card-body p-2 m-2 bg-white rounded-lg">
                <h1 className="card-title justify-center text-center anton">{warbandName}</h1>
                <div className="h-[45svh]">
                    <SpaceMarine
                        primary={namedColors[0]?.hex}
                        secondary={namedColors[1]?.hex}
                        trim={namedColors[2]?.hex}
                        pattern={patternName}
                    />
                </div>
                <div
                    className="flex flex-1 join join-horizontal rounded-lg"
                    aria-label="Color palette"
                >
                    <div
                        className="w-full h-8 join-item border border-neutral tooltip"
                        data-tip={namedColors[0]?.name}
                        style={{ backgroundColor: namedColors[0]?.hex }}
                        aria-label={namedColors[0]?.name}
                        title={namedColors[0]?.name}
                    />
                    {areColorsDifferent && (
                        <div
                            className="w-full h-8 join-item border border-neutral tooltip"
                            data-tip={namedColors[1]?.name}
                            style={{ backgroundColor: namedColors[1]?.hex }}
                            aria-label={namedColors[1]?.name}
                            title={namedColors[1]?.name}
                        />
                    )}
                    <div
                        className="w-full h-8 join-item border border-neutral tooltip"
                        data-tip={namedColors[2]?.name}
                        style={{ backgroundColor: namedColors[2]?.hex }}
                        aria-label={namedColors[2]?.name}
                        title={namedColors[2]?.name}
                    />
                </div>
                <p className="text-sm font-bold">
                    {areColorsDifferent
                        ? `${namedColors[0]?.name}, ${namedColors[1]?.name}, ${namedColors[2]?.name}`
                        : `${namedColors[0]?.name}, ${namedColors[2]?.name}`}
                </p>

                {mode && (
                    <p className="text-xs">
                        Mode: <span className="font-medium">
                            {mode === "Splitcomplementary" ? "Split Complementary" : mode}
                        </span>
                    </p>
                )}

                <div className="mt-2 border-t border-neutral pt-2 text-right text-xs opacity-75">
                    ID: <span className="font-mono font-normal">{slug}</span>
                </div>
            </div>
        </div>
    );
}
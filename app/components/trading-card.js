import SpaceMarine from "./spaceMarine";

export default function TradingCard({ warbandName, namedColors, slug, patternName }) {
    const areColorsDifferent =
        namedColors[0]?.hex !== namedColors[1]?.hex;

    return (
        <div id="trading-card" className="card bg-yellow-600 text-neutral w-full max-w-96 rounded-lg opacity-0 animate-fade-in">
            <div className="card-body p-2 m-2 bg-white rounded-lg">
                <h1 className="card-title justify-center text-center">{warbandName}</h1>
                <div className="h-[45svh] sm:h-auto">
                    <SpaceMarine
                        primary={namedColors[0]?.hex}
                        secondary={namedColors[1]?.hex}
                        trim={namedColors[2]?.hex}
                        pattern={patternName}
                    />
                </div>
                <div className="flex flex-1 join join-horizontal rounded-lg">
                    <div
                        className="w-full h-8 join-item border border-neutral"
                        style={{ backgroundColor: namedColors[0]?.hex }}
                        title={namedColors[0]?.name}
                    ></div>
                    {areColorsDifferent && (
                        <div
                            className="w-full h-8 join-item border border-neutral"
                            style={{ backgroundColor: namedColors[1]?.hex }}
                            title={namedColors[1]?.name}
                        ></div>
                    )}
                    <div
                        className="w-full h-8 join-item border border-neutral"
                        style={{ backgroundColor: namedColors[2]?.hex }}
                        title={namedColors[2]?.name}
                    ></div>
                </div>

                <p className="text-sm font-bold">
                    {areColorsDifferent
                        ? `${namedColors[0]?.name}, ${namedColors[1]?.name}, ${namedColors[2]?.name}`
                        : `${namedColors[0]?.name}, ${namedColors[2]?.name}`
                    }
                </p>

                <p className="justify-end text-xs font-bold">
                    ID: <span className="font-normal">{slug}</span>
                </p>

            </div>
        </div>
    );
}

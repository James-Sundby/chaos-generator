import SpaceMarine from "./spaceMarine";

export default function TradingCard({ warbandName, namedColors, slug, patternName, metal }) {
    return (
        <div id="trading-card" className="card bg-yellow-600 text-neutral w-full max-w-96 rounded-lg opacity-0 animate-fade-in">
            <div className="card-body p-2 m-2 bg-white rounded-lg">
                <h1 className="card-title justify-center text-center">{warbandName}</h1>
                <div className="h-[45svh] sm:h-auto">
                    <SpaceMarine
                        primary={namedColors[0]?.hex}
                        secondary={namedColors[1]?.hex}
                        trim={metal.hex2}
                        pattern={patternName}
                    />
                </div>
                <div className="flex flex-1 join join-horizontal rounded-lg">
                    {namedColors.map((color, index) => (
                        <div
                            key={index}
                            className="w-full h-8 join-item border border-neutral"
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                        ></div>
                    ))}
                    <div
                        key={metal.name}
                        className="w-full h-8 join-item border border-neutral"
                        style={{
                            background: `radial-gradient(circle, ${metal.hex1}, ${metal.hex2}, ${metal.hex3})`,
                        }}
                        title={metal.name}
                    ></div>
                </div>

                <p className="text-sm font-bold">
                    {namedColors[0]?.name}, {namedColors[1]?.name}, {metal.name}
                </p>

                <p className="justify-end text-xs font-bold">
                    ID: <span className="font-normal">{slug}</span>
                </p>

            </div>
        </div>
    );
}

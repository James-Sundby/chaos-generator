import Image from "next/image";

export default function TradingCard({ warbandName, patternSrc, namedColors, slug, patternName }) {
    return (
        <div id="trading-card" className="card bg-yellow-600 text-primary-content w-full max-w-96 h-fit">
            <div className="card-body p-2 m-2 bg-white rounded-lg">
                <h2 className="card-title">{warbandName}</h2>
                <div className="flex flex-row gap-2">
                    <Image
                        src={patternSrc}
                        width={300}
                        height={450}
                        alt={`Pattern for ${warbandName}`}
                        className="rounded-lg"
                    />

                    <div className="flex-1 join join-vertical">
                        {namedColors.map((color, index) => (
                            <div
                                key={index}
                                className="max-w-11 w-full min-w-6 h-full join-item border border-primary-content"
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                            >
                            </div>
                        ))}
                    </div>
                </div>
                <p className="text-sm">Pattern: <span className="font-bold">{patternName}</span></p>
                <p className="text-sm">Colors: <span className="font-bold">{namedColors[0].name}, {namedColors[1].name}, {namedColors[2].name}</span></p>

                <div className=" justify-end text-xs">
                    <p>{slug}</p>
                </div>
            </div>
        </div>
    );
}
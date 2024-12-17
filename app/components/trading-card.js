import Image from "next/image";

export default function TradingCard({ warbandName, pattern, colors, slug }) {
    return (
        <div id="trading-card" className="card bg-yellow-600 text-primary-content w-full max-w-96 h-auto">
            <div className="card-body p-2 m-2 bg-white rounded-lg">
                <h2 className="card-title">{warbandName}</h2>
                <Image
                    src={pattern}
                    width={400}
                    height={600}
                    alt="TODO: Needs a dynamic alt description"
                    className="rounded-lg"
                />
                <div className="flex-1 join join-horizontal">
                    {colors.map((color, index) => (
                        <div
                            key={index}
                            className="w-full h-24 join-item"
                            style={{ backgroundColor: color }}
                            alt={color}
                        >
                        </div>
                    ))}
                </div>
                <div className="card-actions justify-end text-xs">
                    <p>{slug}</p>
                </div>
            </div>
        </div>
    );
}
import ArmsTest from "./model/arms2";

export default function TradingCard({ warbandName, patternSrc, namedColors, slug, patternName }) {
    console.log(namedColors);
    console.log(namedColors[0].hex);

    return (
        <div id="trading-card" className="card bg-yellow-600 text-primary-content w-full max-w-96 h-fit">

            <div className="card-body p-2 m-2 bg-white rounded-lg">
                <h2 className="card-title">{warbandName}</h2>
                <div className="flex flex-row gap-2">
                    <div >
                        <ArmsTest color1={namedColors[0].hex} color2={namedColors[1].hex} />
                    </div>

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
                {/* <p className="text-sm">Pattern: <span className="font-bold">{patternName}</span></p> */}
                <p className="text-sm">Colors: <span className="font-bold">{namedColors[0].name}, {namedColors[1].name}</span></p>

                <div className=" justify-end text-xs">
                    <p>{slug}</p>
                </div>
            </div>
        </div>
    );
}

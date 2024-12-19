import Arms from "./model/arms";
import Shoulders from "./model/shoulders";
import Legs from "./model/legs";
import Centered from "./model/centered";
import Half from "./model/half";
import Quarter from "./model/quarter";
import Crusader from "./model/crusader";
import Talons from "./model/talons";
import Disciple from "./model/disciple";

export default function TradingCard({ warbandName, patternSrc, namedColors, slug, patternName }) {

    function ImageDisplay(patternName) {
        if (patternName === "Arms") {
            return <Arms color1={namedColors[0].hex} color2={namedColors[1].hex} />;
        } else if (patternName === "Shoulders") {
            return <Shoulders color1={namedColors[0].hex} color2={namedColors[1].hex} />;
        } else if (patternName === "Legs") {
            return <Legs color1={namedColors[0].hex} color2={namedColors[1].hex} />;
        } else if (patternName === "Centered") {
            return <Centered color1={namedColors[0].hex} color2={namedColors[1].hex} />;
        } else if (patternName === "Half") {
            return <Half color1={namedColors[0].hex} color2={namedColors[1].hex} />;
        } else if (patternName === "Quarter") {
            return <Quarter color1={namedColors[0].hex} color2={namedColors[1].hex} />;
        } else if (patternName === "Crusader") {
            return <Crusader color1={namedColors[0].hex} color2={namedColors[1].hex} />;
        } else if (patternName === "Disciple") {
            return <Disciple color1={namedColors[0].hex} color2={namedColors[1].hex} />;
        } else if (patternName === "Talons") {
            return <Talons color1={namedColors[0].hex} color2={namedColors[1].hex} />;
        } else {
            return null;
        }
    }

    return (
        <div id="trading-card" className="card bg-yellow-600 text-primary-content w-full max-w-80 h-fit">
            <div className="card-body p-2 m-2 bg-white rounded-lg">
                <h2 className="card-title justify-center">{warbandName}</h2>
                <div className="h-96">
                    {ImageDisplay(patternName)}
                </div>
                <div className="flex flex-1 join join-horizontal">
                    {namedColors.map((color, index) => (
                        <div
                            key={index}
                            className="w-full h-6 join-item border border-primary-content"
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                        >
                        </div>
                    ))}
                </div>
                <p className="text-sm">Colors: <span className="font-bold">{namedColors[0].name}, {namedColors[1].name}</span></p>
                <div className=" justify-end text-xs">
                    <p>{slug}</p>
                </div>
            </div>
        </div>
    );
}

import Arms from "./models/arms";
import Shoulders from "./models/shoulders";
import Legs from "./models/legs";
import Centered from "./models/centered";
import Half from "./models/half";
import Quarter from "./models/quarter";
import Crusader from "./models/crusader";
import Talons from "./models/talons";
import Disciple from "./models/disciple";
import Accipiters from "./models/accipiters";
import Blazoned from "./models/blazoned";
import Eradicant from "./models/eradicant";
import Scythes from "./models/scythes";

export default function TradingCard({ warbandName, patternSrc, namedColors, slug, patternName }) {

    function ImageDisplay(patternName) {
        const components = {
            Arms: Arms,
            Shoulders: Shoulders,
            Legs: Legs,
            Centered: Centered,
            Half: Half,
            Quarter: Quarter,
            Crusader: Crusader,
            Disciple: Disciple,
            Talons: Talons,
            Accipiters: Accipiters,
            Blazoned: Blazoned,
            Eradicant: Eradicant,
            Scythes: Scythes,
        };

        const Component = components[patternName];
        return Component ? <Component color1={namedColors[0].hex} color2={namedColors[1].hex} /> : null;
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

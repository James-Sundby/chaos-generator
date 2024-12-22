import { useState, useEffect } from "react";

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
import { useRouter } from "next/navigation";

export default function TradingCard({ warbandName, namedColors, slug, patternName, metal }) {
    const isLoading = !warbandName || !namedColors || !slug || !patternName || !metal;
    const [loadingTime, setLoadingTime] = useState(0);
    const router = useRouter();

    // Increment loading time while isLoading is true
    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setLoadingTime((prevTime) => prevTime + 1);
            }, 1000);

            return () => clearInterval(interval); // Cleanup on component unmount or when loading stops
        } else {
            setLoadingTime(0); // Reset loading time when loading stops
        }
    }, [isLoading]);

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
        return Component ? (
            <Component
                color1={namedColors[0].hex}
                color2={namedColors[1].hex}
                metals={[metal.hex1, metal.hex2, metal.hex3]}
            />
        ) : null;
    }

    if (isLoading) {
        return (
            <>
                {loadingTime >= 5 ?
                    (
                        <div className="flex flex-1 flex-col justify-center items-center gap-4">
                            <p>Error loading data</p>
                            <button className="btn btn-primary rounded-lg" onClick={() => router.push("/")}>
                                Go Back to Home
                            </button>
                        </div >

                    ) : (
                        <div className="flex flex-1">
                            <span className="loading loading-spinner loading-lg"></span >
                        </div >
                    )
                }
            </>
        );
    }


    return (
        <div id="trading-card" className="card bg-yellow-600 text-neutral w-full max-w-80 h-fit rounded-lg">
            <div className="card-body p-2 m-2 bg-white rounded-lg">
                <h2 className="card-title justify-center">{warbandName}</h2>
                <div className="h-96">{ImageDisplay(patternName)}</div>
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
                <p className="text-sm">
                    <span className="font-bold">
                        {namedColors[0].name}, {namedColors[1].name}, {metal.name}
                    </span>
                </p>
                <div className="justify-end text-xs">
                    <p>{slug}</p>
                </div>
            </div>
        </div>
    );
}

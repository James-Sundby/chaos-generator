import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { modelComponents } from "./componentsMap";

export default function TradingCard({ warbandName, namedColors, slug, patternName, metal, isLoading, error }) {
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
        const Component = modelComponents[patternName];
        return Component ? (
            <Component
                color1={namedColors[0]?.hex}
                color2={namedColors[1]?.hex}
                metals={[metal.hex1, metal.hex2, metal.hex3]}
            />
        ) : null;
    }

    if (loadingTime >= 5) {
        return (
            <div className="flex flex-1 flex-col justify-center items-center gap-4">
                <p className="text-error font-bold">Error loading data. Please try again later.</p>
                <button className="btn btn-primary rounded-lg" onClick={() => router.push("/")}>
                    Go Back to Home
                </button>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-1 flex-col justify-center items-center gap-4">
                <p className="text-error font-bold">{error}</p>
                <button className="btn btn-primary rounded-lg" onClick={() => router.push("/")}>
                    Go Back to Home
                </button>
            </div>
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
                        {namedColors[0]?.name}, {namedColors[1]?.name}, {metal.name}
                    </span>
                </p>

                <div className="justify-end text-xs">
                    <p className="font-bold">ID: <span className="font-normal">{slug}</span></p>

                </div>
            </div>
        </div>
    );
}

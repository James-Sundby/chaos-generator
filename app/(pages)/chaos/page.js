import AdjustedChaosMarine from "@/app/components/adjustedChaosMarine";

export default function Page() {
    const warbandName = "Black Legion"
    const namedColors = [
        { name: "Abaddon Black", hex: "#000000" },
        { name: "Mephiston Red", hex: "#88241C" },
    ];
    const metal = {
        name: "Retributor Armour",
        hex1: "#ffffff",
        hex2: "#ebb854",
        hex3: "#89571d"
    };
    const slug = "black-legion-test";

    return (
        <main className="flex flex-1 flex-col gap-4 sm:gap-16 items-center justify-center px-4">
            <h1 className="text-4xl font-bold">Coming Soon!</h1>
            <div id="trading-card" className="card bg-yellow-600 text-neutral w-full max-w-80 h-fit rounded-lg">
                <div className="card-body p-2 m-2 bg-white rounded-lg">
                    <h2 className="card-title justify-center text-center">{warbandName}</h2>
                    <div className="h-96">{AdjustedChaosMarine()}</div>
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
        </main>
    );
}

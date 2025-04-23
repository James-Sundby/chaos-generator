import { useMemo } from "react";

import { colorList } from "@/lib/colors2";
import { patterns } from "@/lib/armourPatterns";

import SpaceMarine from "./spaceMarine";

function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateRandomColors() {
    const shuffled = [...colorList].sort(() => 0.5 - Math.random());
    const baseColors = shuffled.slice(0, 2);
    const metal = shuffled.find(
        color =>
            color.type === "Metallic" &&
            !baseColors.some(c => c.hex.toLowerCase() === color.hex.toLowerCase())
    );

    return [
        ...baseColors,
        metal ?? { name: "Retributor Armour", hex: "#ebb854", type: "Metallic", brand: "Citadel" }
    ];
}

function generateRandomPattern() {
    return randomElement(patterns);
}

export default function Background() {
    const items = useMemo(
        () =>
            Array.from({ length: 12 }, () => ({
                pattern: generateRandomPattern(),
                colors: generateRandomColors(),
            })),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    return (
        <div className="absolute inset-0 z-[-1]" aria-hidden="true">
            <div className="flex flex-wrap justify-around overflow-hidden h-full">
                {items.map((item, index) => (
                    <div key={index} className="w-28 h-28 sm:h-auto sm:w-auto opacity-40 aspect-square" >
                        <SpaceMarine
                            primary={item.colors[0]?.hex}
                            secondary={item.colors[1]?.hex}
                            trim={item.colors[2]?.hex}
                            pattern={item.pattern}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

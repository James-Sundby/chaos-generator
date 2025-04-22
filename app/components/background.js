import { useMemo } from "react";

import { colorList } from "@/lib/colors";
import { patterns } from "@/lib/armourPatterns";
import { metals } from "@/lib/metals";

import SpaceMarine from "./spaceMarine";

export default function Background() {

    function randomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function generateRandomColors() {
        return colorList.sort(() => 0.5 - Math.random()).slice(0, 2);
    }

    function generateRandomPattern() {
        return randomElement(patterns);
    }

    function generateRandomMetal() {
        return randomElement(metals);
    }

    const items = useMemo(
        () =>
            Array.from({ length: 12 }, () => ({
                pattern: generateRandomPattern(),
                colors: generateRandomColors(),
                metal: generateRandomMetal(),
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
                            trim={item.metal.hex2}
                            pattern={item.pattern}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

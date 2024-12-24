import { useMemo } from "react";

import { colorList } from "@/lib/colors";
import { patterns } from "@/lib/armourPatterns";
import { metals } from "@/lib/metals";

import { modelComponents } from "./componentsMap";

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

    function ImageDisplay({ patternName, colors, metal }) {
        const Component = modelComponents[patternName];
        return Component ? <Component color1={colors[0].hex} color2={colors[1].hex} metals={[metal.hex1, metal.hex2, metal.hex3]} /> : null;
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
                        <ImageDisplay patternName={item.pattern} colors={item.colors} metal={item.metal} />
                    </div>
                ))}
            </div>
        </div>
    );
}

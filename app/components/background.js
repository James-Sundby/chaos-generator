import React from "react";
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

import { colorList } from "@/lib/colors";
import { patterns } from "@/lib/armourPatterns";
import { metals } from "@/lib/metals";



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
        return Component ? <Component color1={colors[0].hex} color2={colors[1].hex} metals={[metal.hex1, metal.hex2, metal.hex3]} /> : null;
    }

    const items = Array.from({ length: 12 }, () => ({
        pattern: generateRandomPattern(),
        colors: generateRandomColors(),
        metal: generateRandomMetal(),
    }));

    return (
        <div className="absolute inset-0 z-[-1]">
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

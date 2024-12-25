"use client";

import { useState, useEffect } from "react";
import { colorList } from "@/lib/colors";
import { metals } from "@/lib/metals";
import { patterns } from "@/lib/armourPatterns";
import { modelComponents } from "@/app/components/componentsMap";
import { useWarbandStore } from "@/app/stores/warbandStore";



export default function Painter() {
    const warband = useWarbandStore((state) => state.warband);
    console.log("Warband data, ", warband);
    const [selectedColor1, setSelectedColor1] = useState(colorList[0]);
    const [selectedColor2, setSelectedColor2] = useState(colorList[0]);
    const [selectedMetal, setSelectedMetal] = useState(metals[0]);
    const [selectedPattern, setSelectedPattern] = useState(patterns[0]);
    const [warbandName, setWarbandName] = useState("");

    const handleColorChange1 = (event) => {
        const color = colorList.find((c) => c.hex === event.target.value);
        setSelectedColor1(color);
    };

    const handleColorChange2 = (event) => {
        const color = colorList.find((c) => c.hex === event.target.value);
        setSelectedColor2(color);
    };

    const handleMetalChange = (event) => {
        const selectedCode = event.target.value;
        const metal = metals.find((m) => m.code === selectedCode);
        setSelectedMetal(metal);
    };

    const handlePatternChange = (event) => {
        setSelectedPattern(event.target.value);
    };

    const handleNameChange = (event) => {
        setWarbandName(event.target.value);
    };

    const ImageDisplay = () => {
        const Component = modelComponents[selectedPattern];
        return Component ? (
            <Component
                color1={selectedColor1.hex}
                color2={selectedColor2.hex}
                metals={[selectedMetal.hex1, selectedMetal.hex2, selectedMetal.hex3]}
            />
        ) : null;
    };

    useEffect(() => {
        if (warband.message !== '') {
            setSelectedColor1(warband.colors?.[0] || colorList[0]);
            setSelectedColor2(warband.colors?.[1] || colorList[0]);
            setSelectedMetal(warband.metal || metals[0]);
            setSelectedPattern(warband.pattern || patterns[0]);
            setWarbandName(warband.warbandName || '');
        }
    }, [warband]);

    return (
        <main className="flex flex-1 flex-col sm:flex-row justify-center items-center gap-4 sm:gap-16">
            <div className="card bg-yellow-600 text-neutral w-full max-w-80 h-fit rounded-lg">
                <div className="card-body p-2 m-2 bg-white rounded-lg">
                    <h2 className="card-title justify-center">{warbandName}</h2>

                    <div className="h-96">{ImageDisplay()}</div>
                    <div className="flex flex-1 join join-horizontal rounded-lg">
                        <div
                            className="w-full h-8 join-item border border-neutral"
                            style={{ backgroundColor: selectedColor1.hex }}
                            title={selectedColor1.name}
                        ></div>

                        {selectedColor1.hex != selectedColor2.hex &&
                            <div
                                className="w-full h-8 join-item border border-neutral"
                                style={{ backgroundColor: selectedColor2.hex }}
                                title={selectedColor2.name}
                            ></div>
                        }

                        <div
                            key={selectedMetal.name}
                            className="w-full h-8 join-item border border-neutral"
                            style={{
                                background: `radial-gradient(circle, ${selectedMetal.hex1}, ${selectedMetal.hex2}, ${selectedMetal.hex3})`,
                            }}
                            title={selectedMetal.name}
                        ></div>
                    </div>

                    {selectedColor1.hex != selectedColor2.hex ? (
                        <>
                            <p className="text-sm">
                                <span className="font-bold">
                                    {selectedColor1.name}, {selectedColor2.name}, {selectedMetal.name}
                                </span>
                            </p>
                        </>
                    ) : (
                        <> <p className="text-sm">
                            <span className="font-bold">
                                {selectedColor1.name}, {selectedMetal.name}
                            </span>
                        </p>
                        </>
                    )}
                </div>
            </div>
            <div className="card card-compact card-outline w-full max-w-80">
                <div className="card-body ">
                    {/* Primary Color */}
                    <div className="card-title">Options</div>

                    <label className="form-control w-full max-w-xs">
                        <div className="label label-text">Name:</div>
                        <input
                            type="text"
                            value={warbandName}
                            onChange={handleNameChange}
                            className="input input-bordered rounded-lg"
                        />

                    </label>

                    <label className="form-control w-full max-w-xs">
                        <div className="label label-text">Primary color:</div>
                        <select
                            value={selectedColor1.hex}
                            onChange={handleColorChange1}
                            className="select select-bordered rounded-lg"
                        >
                            {colorList.map((color) => (
                                <option key={color.name} value={color.hex}>
                                    {color.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    {/* Secondary Color */}
                    <label className="form-control w-full max-w-xs">
                        <div className="label label-text">Secondary color:</div>
                        <select
                            value={selectedColor2.hex}
                            onChange={handleColorChange2}
                            className="select select-bordered rounded-lg"
                        >
                            {colorList.map((color) => (
                                <option key={color.name} value={color.hex}>
                                    {color.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    {/* Metal */}
                    <label className="form-control w-full max-w-xs">
                        <div className="label label-text">Metal:</div>
                        <select
                            value={selectedMetal.code}
                            onChange={handleMetalChange}
                            className="select select-bordered rounded-lg"
                        >
                            {metals.map((metal) => (
                                <option key={metal.code} value={metal.code}>
                                    {metal.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    {/* Pattern */}
                    <label className="form-control w-full max-w-xs">
                        <div className="label label-text">Pattern:</div>
                        <select
                            value={selectedPattern}
                            onChange={handlePatternChange}
                            className="select select-bordered rounded-lg"
                        >
                            {patterns.map((pattern, index) => (
                                <option key={index} value={pattern}>
                                    {pattern}
                                </option>
                            ))}
                        </select>
                    </label>

                </div>
            </div>

        </main>
    );
}

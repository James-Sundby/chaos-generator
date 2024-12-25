"use client";

import { useState, useEffect } from "react";
import { colorList } from "@/lib/colors";
import { metals } from "@/lib/metals";
import { patterns } from "@/lib/armourPatterns";
import { modelComponents } from "@/app/components/componentsMap";
import { useWarbandStore } from "@/app/stores/warbandStore";

const Dropdown = ({ label, options, value, onChange }) => (
    <label className="form-control w-full max-w-xs">
        <div className="label label-text">{label}:</div>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="select select-bordered rounded-lg"
            aria-label={`Select ${label}`}
        >
            {options.map((option, index) => (
                <option key={index} value={option.value || option.hex || option.code}>
                    {option.name}
                </option>
            ))}
        </select>
    </label>
);

const ImageDisplay = ({ pattern, colors, metal }) => {
    const Component = modelComponents[pattern];
    return Component ? (
        <Component
            color1={colors[0].hex}
            color2={colors[1].hex}
            metals={[metal.hex1, metal.hex2, metal.hex3]}
        />
    ) : null;
};

export default function Painter() {
    const warband = useWarbandStore((state) => state.warband);

    const [selectedWarband, setSelectedWarband] = useState({
        name: "",
        colors: [colorList[0], colorList[0]],
        metal: metals[0],
        pattern: patterns[0],
    });

    useEffect(() => {
        if (warband.warbandName !== "") {
            setSelectedWarband({
                name: warband.warbandName,
                colors: warband.colors || [colorList[0], colorList[0]],
                metal: warband.metal || metals[0],
                pattern: warband.pattern || patterns[0],
            });
        }
    }, [warband]);

    const handleColorChange = (index, value) => {
        const color = colorList.find((c) => c.hex === value);
        setSelectedWarband((prev) => {
            const newColors = [...prev.colors];
            newColors[index] = color;
            return { ...prev, colors: newColors };
        });
    };

    const handleMetalChange = (value) => {
        const metal = metals.find((m) => m.code === value);
        setSelectedWarband((prev) => ({ ...prev, metal }));
    };

    const handlePatternChange = (value) => {
        setSelectedWarband((prev) => ({ ...prev, pattern: value }));
    };

    const handleNameChange = (value) => {
        setSelectedWarband((prev) => ({ ...prev, name: value }));
    };

    const areColorsDifferent =
        selectedWarband.colors[0].hex !== selectedWarband.colors[1].hex;

    return (
        <main className="flex flex-1 flex-col sm:flex-row justify-center items-center gap-4 sm:gap-16">
            <div className="card bg-yellow-600 text-neutral w-full max-w-80 h-fit rounded-lg">
                <div className="card-body p-2 m-2 bg-white rounded-lg">
                    <h2 className="card-title justify-center">{selectedWarband.name}</h2>
                    <div className="h-96">
                        <ImageDisplay
                            pattern={selectedWarband.pattern}
                            colors={selectedWarband.colors}
                            metal={selectedWarband.metal}
                        />
                    </div>
                    <div className="flex flex-1 join join-horizontal rounded-lg">
                        <div
                            className="w-full h-8 join-item border border-neutral"
                            style={{ backgroundColor: selectedWarband.colors[0].hex }}
                            title={selectedWarband.colors[0].name}
                        ></div>
                        {areColorsDifferent && (
                            <div
                                className="w-full h-8 join-item border border-neutral"
                                style={{ backgroundColor: selectedWarband.colors[1].hex }}
                                title={selectedWarband.colors[1].name}
                            ></div>
                        )}
                        <div
                            className="w-full h-8 join-item border border-neutral"
                            style={{
                                background: `radial-gradient(circle, ${selectedWarband.metal.hex1}, ${selectedWarband.metal.hex2}, ${selectedWarband.metal.hex3})`,
                            }}
                            title={selectedWarband.metal.name}
                        ></div>
                    </div>
                    <p className="text-sm">
                        <span className="font-bold">
                            {areColorsDifferent
                                ? `${selectedWarband.colors[0].name}, ${selectedWarband.colors[1].name}, ${selectedWarband.metal.name}`
                                : `${selectedWarband.colors[0].name}, ${selectedWarband.metal.name}`}
                        </span>
                    </p>
                </div>
            </div>
            <div className="card card-compact card-outline w-full max-w-80">
                <div className="card-body">
                    <div className="card-title">Options</div>

                    <label className="form-control w-full max-w-xs">
                        <div className="label label-text">Name:</div>
                        <input
                            type="text"
                            value={selectedWarband.name}
                            onChange={(e) => handleNameChange(e.target.value)}
                            className="input input-bordered rounded-lg"
                            maxLength={50}
                        />
                    </label>

                    <Dropdown
                        label="Primary color"
                        options={colorList}
                        value={selectedWarband.colors[0].hex}
                        onChange={(value) => handleColorChange(0, value)}
                    />

                    <Dropdown
                        label="Secondary color"
                        options={colorList}
                        value={selectedWarband.colors[1].hex}
                        onChange={(value) => handleColorChange(1, value)}
                    />

                    <Dropdown
                        label="Metal"
                        options={metals}
                        value={selectedWarband.metal.code}
                        onChange={handleMetalChange}
                    />

                    <Dropdown
                        label="Pattern"
                        options={patterns.map((p) => ({ name: p, value: p }))}
                        value={selectedWarband.pattern}
                        onChange={handlePatternChange}
                    />
                </div>
            </div>
        </main>
    );
}

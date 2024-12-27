"use client";

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
            color1={colors[0]?.hex}
            color2={colors[1]?.hex}
            metals={[metal.hex1, metal.hex2, metal.hex3]}
        />
    ) : null;
};

const generateSlug = ({ warbandName, colors, pattern, metal }) => {
    const nameSlug = warbandName
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "-")
        .trim();
    const colorSlug = colors.map(color => color.hex.replace("#", "")).join("-");
    const patternSlug = pattern.toLowerCase();
    const metalSlug = metal.code.toLowerCase();

    return `${nameSlug}-${colorSlug}-${patternSlug}-${metalSlug}`;
}

export default function Painter() {
    const warband = useWarbandStore((state) => state.warband);
    const setWarband = useWarbandStore((state) => state.setWarband);

    const updateWarband = (updatedProperties) => {
        const updatedWarband = { ...warband, ...updatedProperties };
        const newSlug = generateSlug(updatedWarband);
        setWarband({ ...updatedProperties, slug: newSlug });
    };

    const handleColorChange = (index, value) => {
        const color = colorList.find((c) => c.hex === value);
        const newColors = [...warband.colors];
        newColors[index] = color;
        updateWarband({ colors: newColors });
    };

    const handleMetalChange = (value) => {
        const metal = metals.find((m) => m.code === value);
        updateWarband({ metal: metal });
    };

    const handlePatternChange = (value) => {
        updateWarband({ pattern: value });
    };

    const handleNameChange = (value) => {
        updateWarband({ warbandName: value });
    };

    const areColorsDifferent =
        warband.colors[0]?.hex !== warband.colors[1]?.hex;

    return (
        <main className="flex flex-1 flex-col sm:flex-row justify-center items-center gap-4 sm:gap-16 px-4">
            <div className="card bg-yellow-600 text-neutral w-full max-w-80 h-fit rounded-lg">
                <div className="card-body p-2 m-2 bg-white rounded-lg">
                    <h2 className="card-title justify-center">{warband.warbandName}</h2>
                    <div className="h-96">
                        <ImageDisplay
                            pattern={warband.pattern}
                            colors={warband.colors}
                            metal={warband.metal}
                        />
                    </div>
                    <div className="flex flex-1 join join-horizontal rounded-lg">
                        <div
                            className="w-full h-8 join-item border border-neutral"
                            style={{ backgroundColor: warband.colors[0]?.hex }}
                            title={warband.colors[0]?.name}
                        ></div>
                        {areColorsDifferent && (
                            <div
                                className="w-full h-8 join-item border border-neutral"
                                style={{ backgroundColor: warband.colors[1]?.hex }}
                                title={warband.colors[1]?.name}
                            ></div>
                        )}
                        <div
                            className="w-full h-8 join-item border border-neutral"
                            style={{
                                background: `radial-gradient(circle, ${warband.metal.hex1}, ${warband.metal.hex2}, ${warband.metal.hex3})`,
                            }}
                            title={warband.metal.name}
                        ></div>
                    </div>
                    <p className="text-sm">
                        <span className="font-bold">
                            {areColorsDifferent
                                ? `${warband.colors[0]?.name}, ${warband.colors[1]?.name}, ${warband.metal.name}`
                                : `${warband.colors[0]?.name}, ${warband.metal.name}`}
                        </span>
                    </p>

                    <div className="justify-end text-xs">

                        <p className="font-bold">ID: <span className="font-normal">{warband.slug}</span></p>
                    </div>
                </div>
            </div>
            <div className="card w-full max-w-80">
                <div className="card-body p-0">
                    <div className="card-title">Options</div>

                    <label className="form-control w-full max-w-xs">
                        <div className="label label-text">Name:</div>
                        <input
                            type="text"
                            value={warband.warbandName}
                            onChange={(e) => handleNameChange(e.target.value)}
                            className="input input-bordered rounded-lg"
                            maxLength={50}
                        />
                    </label>

                    <Dropdown
                        label="Primary color"
                        options={colorList}
                        value={warband.colors[0]?.hex}
                        onChange={(value) => handleColorChange(0, value)}
                    />

                    <Dropdown
                        label="Secondary color"
                        options={colorList}
                        value={warband.colors[1]?.hex}
                        onChange={(value) => handleColorChange(1, value)}
                    />

                    <Dropdown
                        label="Metal"
                        options={metals}
                        value={warband.metal.code}
                        onChange={handleMetalChange}
                    />

                    <Dropdown
                        label="Pattern"
                        options={patterns.map((p) => ({ name: p, value: p }))}
                        value={warband.pattern}
                        onChange={handlePatternChange}
                    />
                </div>
            </div>
        </main>
    );
}
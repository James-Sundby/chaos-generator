"use client";

import { colorList } from "@/lib/colors2";
import { patterns } from "@/lib/armourPatterns";
import { useWarbandStore } from "@/app/stores/warbandStore";
import { useRouter } from "next/navigation";

import SpaceMarine from "@/app/components/spaceMarine";

const Dropdown = ({ label, options, value, onChange }) => {
    const isGrouped = Array.isArray(options) === false;

    return (
        <label className="form-control w-full">
            <div className="label label-text">{label}:</div>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="select select-bordered rounded-lg w-full"
                aria-label={`Select ${label}`}
            >
                {isGrouped
                    ? Object.entries(options).map(([group, items]) => (
                        <optgroup key={group} label={group} >
                            {items.map((option, index) => (
                                <option key={index} value={option.hex} >
                                    {option.name}
                                </option>
                            ))}
                        </optgroup>
                    ))
                    : options.map((option, index) => (
                        <option key={index} value={option.value || option.hex || option.code}>
                            {option.name}
                        </option>
                    ))}
            </select>
        </label>
    );
};

const generateSlug = ({ warbandName, colors, pattern }) => {
    const nameSlug = warbandName
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "-")
        .trim();
    const colorSlug = colors.map(color => color.hex.replace("#", "")).join("-");
    const patternSlug = pattern.toLowerCase();

    return `${nameSlug}-${colorSlug}-${patternSlug}`;
}

const groupedColors = {
    Base: colorList.filter((c) => c.type === "Base"),
    Layer: colorList.filter((c) => c.type === "Layer"),
    Metallic: colorList.filter((c) => c.type === "Metallic"),
};

const metallics = {
    Metallic: colorList.filter((c) => c.type === "Metallic"),
};

export default function Painter() {
    const warband = useWarbandStore((state) => state.warband);
    const setWarband = useWarbandStore((state) => state.setWarband);
    const router = useRouter();

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

    const handlePatternChange = (value) => {
        updateWarband({ pattern: value });
    };

    const handleNameChange = (value) => {
        updateWarband({ warbandName: value });
    };

    const areColorsDifferent =
        warband.colors[0]?.hex !== warband.colors[1]?.hex;

    return (
        <main className="flex flex-1 flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 p-4">
            <div className="card bg-yellow-600 text-neutral w-full max-w-96 h-fit rounded-lg">
                <div className="card-body p-2 m-2 bg-white rounded-lg">
                    <h1 className="card-title justify-center">{warband.warbandName}</h1>
                    <div className="h-[45svh]">
                        <SpaceMarine
                            primary={warband.colors[0]?.hex}
                            secondary={warband.colors[1]?.hex}
                            trim={warband.colors[2]?.hex}
                            pattern={warband.pattern}
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
                            style={{ backgroundColor: warband.colors[2]?.hex }}
                            title={warband.colors[2]?.name}
                        ></div>
                    </div>
                    <p className="text-sm">
                        <span className="font-bold">
                            {areColorsDifferent
                                ? `${warband.colors[0]?.name}, ${warband.colors[1]?.name}, ${warband.colors[2]?.name}`
                                : `${warband.colors[0]?.name}, ${warband.colors[2]?.name}`}
                        </span>
                    </p>

                    <div className="justify-end text-xs">
                        <p className="font-bold">ID: <span className="font-normal">{warband.slug}</span></p>
                    </div>
                </div>
            </div>
            <div className="card w-full max-w-96">
                <div className="card-body p-0">
                    <div className="card-title">Options</div>

                    <label className="form-control w-full">
                        <div className="label label-text">Name:</div>
                        <input
                            type="text"
                            value={warband.warbandName}
                            onChange={(e) => handleNameChange(e.target.value)}
                            className="input input-bordered rounded-lg w-full"
                            maxLength={50}
                        />
                    </label>

                    <Dropdown
                        label="Primary colour"
                        options={groupedColors}
                        value={warband.colors[0]?.hex}
                        onChange={(value) => handleColorChange(0, value)}
                    />

                    <Dropdown
                        label="Secondary colour"
                        options={groupedColors}
                        value={warband.colors[1]?.hex}
                        onChange={(value) => handleColorChange(1, value)}
                    />

                    <Dropdown
                        label="Trim colour"
                        options={metallics}
                        value={warband.colors[2]?.hex}
                        onChange={(value) => handleColorChange(2, value)}
                    />

                    <Dropdown
                        label="Pattern"
                        options={patterns.map((p) => ({ name: p, value: p }))}
                        value={warband.pattern}
                        onChange={handlePatternChange}
                    />


                </div>
                <button className="btn btn-primary rounded-lg mt-4" onClick={() => router.push(`/chapter/${warband.slug}`)}>
                    Back to Randomizer
                </button>
            </div>


        </main>
    );
}
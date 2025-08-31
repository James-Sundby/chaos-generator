"use client";

import { colourList } from "@/lib/colours";
import { patterns } from "@/lib/armourPatterns";
import { useWarbandStore } from "@/app/stores/warbandStore";
import { useRouter } from "next/navigation";

import { generateSlug } from "@/utils/parseSlugs";

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

const groupedColors = {
    Base: colourList.filter((c) => c.type === "Base"),
    Layer: colourList.filter((c) => c.type === "Layer"),
    Metallic: colourList.filter((c) => c.type === "Metallic"),
};

export default function Painter() {
    const warband = useWarbandStore((state) => state.warband);
    const setWarband = useWarbandStore((state) => state.setWarband);
    const router = useRouter();

    const updateWarband = (updatedProperties) => {
        const updatedWarband = { ...warband, ...updatedProperties };
        const newSlug = generateSlug(updatedWarband.warbandName, updatedWarband.colors, updatedWarband.pattern);
        setWarband({ ...updatedProperties, slug: newSlug });
    };

    const handleColorChange = (index, value) => {
        const color = colourList.find((c) => c.hex === value);
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

    const generateNewColor = (index) => {
        const currentHex = warband.colors[index]?.hex;

        const filtered = colourList.filter((c) => c.hex !== currentHex);
        const randomColor = filtered[Math.floor(Math.random() * filtered.length)];

        const newColors = [...warband.colors];
        newColors[index] = randomColor;
        updateWarband({ colors: newColors });
    };

    const generateNewPattern = () => {
        const current = warband.pattern;
        const patternPool = patterns.filter((p) => p !== current);
        const newPattern = patternPool[Math.floor(Math.random() * patternPool.length)];

        updateWarband({ pattern: newPattern });
    };

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

                    <div className="flex">
                        <Dropdown
                            label="Primary colour"
                            options={groupedColors}
                            value={warband.colors[0]?.hex}
                            onChange={(value) => handleColorChange(0, value)}
                        />

                        <button
                            type="button"
                            className="btn btn-primary rounded-lg ml-2 self-end"
                            title="Randomly generate a new primary colour"
                            aria-label="Randomly generate a new primary colour"
                            onClick={() => generateNewColor(0)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 512"
                                className="h-6 w-6 fill-primary-content"
                                aria-hidden="true"

                            >
                                <path d="M274.9 34.3c-28.1-28.1-73.7-28.1-101.8 0L34.3 173.1c-28.1 28.1-28.1 73.7 0 101.8L173.1 413.7c28.1 28.1 73.7 28.1 101.8 0L413.7 274.9c28.1-28.1 28.1-73.7 0-101.8L274.9 34.3zM200 224a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM96 200a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM224 376a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM352 200a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM224 120a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm96 328c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-192c0-35.3-28.7-64-64-64l-114.3 0c11.6 36 3.1 77-25.4 105.5L320 413.8l0 34.2zM480 328a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex">
                        <Dropdown
                            label="Secondary colour"
                            options={groupedColors}
                            value={warband.colors[1]?.hex}
                            onChange={(value) => handleColorChange(1, value)}
                        />
                        <button
                            type="button"
                            className="btn btn-primary rounded-lg ml-2 self-end"
                            title="Randomly generate a new secondary colour"
                            aria-label="Randomly generate a new secondary colour"
                            onClick={() => generateNewColor(1)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 512"
                                className="h-6 w-6 fill-primary-content"
                                aria-hidden="true"

                            >
                                <path d="M274.9 34.3c-28.1-28.1-73.7-28.1-101.8 0L34.3 173.1c-28.1 28.1-28.1 73.7 0 101.8L173.1 413.7c28.1 28.1 73.7 28.1 101.8 0L413.7 274.9c28.1-28.1 28.1-73.7 0-101.8L274.9 34.3zM200 224a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM96 200a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM224 376a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM352 200a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM224 120a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm96 328c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-192c0-35.3-28.7-64-64-64l-114.3 0c11.6 36 3.1 77-25.4 105.5L320 413.8l0 34.2zM480 328a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex">
                        <Dropdown
                            label="Accent colour"
                            options={groupedColors}
                            value={warband.colors[2]?.hex}
                            onChange={(value) => handleColorChange(2, value)}
                        />
                        <button
                            type="button"
                            className="btn btn-primary rounded-lg ml-2 self-end"
                            title="Randomly generate a new trim colour"
                            aria-label="Randomly generate a new trim colour"
                            onClick={() => generateNewColor(2)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 512"
                                className="h-6 w-6 fill-primary-content"
                                aria-hidden="true"

                            >
                                <path d="M274.9 34.3c-28.1-28.1-73.7-28.1-101.8 0L34.3 173.1c-28.1 28.1-28.1 73.7 0 101.8L173.1 413.7c28.1 28.1 73.7 28.1 101.8 0L413.7 274.9c28.1-28.1 28.1-73.7 0-101.8L274.9 34.3zM200 224a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM96 200a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM224 376a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM352 200a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM224 120a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm96 328c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-192c0-35.3-28.7-64-64-64l-114.3 0c11.6 36 3.1 77-25.4 105.5L320 413.8l0 34.2zM480 328a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex">
                        <Dropdown
                            label="Pattern"
                            options={patterns.map((p) => ({ name: p, value: p }))}
                            value={warband.pattern}
                            onChange={handlePatternChange}
                        />
                        <button
                            type="button"
                            className="btn btn-primary rounded-lg ml-2 self-end"
                            title="Randomly generate a new trim colour"
                            aria-label="Randomly generate a new trim colour"
                            onClick={() => generateNewPattern()}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 512"
                                className="h-6 w-6 fill-primary-content"
                                aria-hidden="true"

                            >
                                <path d="M274.9 34.3c-28.1-28.1-73.7-28.1-101.8 0L34.3 173.1c-28.1 28.1-28.1 73.7 0 101.8L173.1 413.7c28.1 28.1 73.7 28.1 101.8 0L413.7 274.9c28.1-28.1 28.1-73.7 0-101.8L274.9 34.3zM200 224a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM96 200a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM224 376a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM352 200a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM224 120a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm96 328c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-192c0-35.3-28.7-64-64-64l-114.3 0c11.6 36 3.1 77-25.4 105.5L320 413.8l0 34.2zM480 328a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
                            </svg>
                        </button>
                    </div>

                </div>
                <button className="btn btn-primary rounded-lg mt-4" onClick={() => router.push(`/chapter/${warband.slug}`)}>
                    Back to Randomizer
                </button>
            </div>


        </main>
    );
}
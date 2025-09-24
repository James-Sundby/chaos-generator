"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import TradingCard from "@/app/components/trading-card";
import { colourList } from "@/lib/colours";
import { generateSlug } from "@/utils/parseSlugs";
import ColorListbox from "./colourSelect";

function ControlRow({ id, label, children, hint }) {
    const labelId = `${id}-label`;
    const hintId = hint ? `${id}-hint` : undefined;

    return (
        <div className="form-control w-full">
            <label id={labelId} htmlFor={id} className="label">
                <span className="label-text">{label}</span>
            </label>

            <div className="join w-full">
                {typeof children === "function"
                    ? children({ labelId, hintId })
                    : children
                }
            </div>

            {hint && (
                <div className="label">
                    <span id={hintId} className="label-text-alt">{hint}</span>
                </div>
            )}
        </div>
    );
}

function SelectControl({ id, options, value, onChange, ariaLabel }) {
    const isGrouped = Array.isArray(options) === false;
    return (
        <select
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="select select-bordered join-item w-full"
            aria-label={ariaLabel}
        >
            {isGrouped
                ? Object.entries(options).map(([group, items]) => (
                    <optgroup key={group} label={group}>
                        {items.map((opt, i) => (
                            <option key={i} value={opt.value || opt.hex || opt.code}>
                                {opt.name}
                            </option>
                        ))}
                    </optgroup>
                ))
                : options.map((opt, i) => (
                    <option key={i} value={opt.value || opt.hex || opt.code}>
                        {opt.name}
                    </option>
                ))}
        </select>
    );
}

/**
 * CustomizerCore
 * Props:
 * - variant: "Chapter" | "Chaos"
 * - band: { warbandName, colors[], pattern, slug, mode }
 * - setBand: (band) => void
 * - patterns: string[]
 * - paletteOptionsForIndex: (i:number)=> (grouped options or flat array)
 * - randomPoolForIndex: (i:number)=> colourList[]   (controls accent non-metallic for Chaos, etc.)
 * - backBase: string ("/chapter" or "/chaos")
 * - hideSecondaryWhenBasic?: boolean (Chaos behavior)
 */
export default function CustomizerCore({
    variant = "Chapter",
    band,
    setBand,
    patterns,
    paletteOptionsForIndex,
    randomPoolForIndex,
    backBase,
    hideSecondaryWhenBasic = false,
    hasSecondModel = false,
}) {
    const router = useRouter();
    const [model, setModel] = useState("marine");

    const updateBand = (updated) => {
        const next = { ...band, ...updated };
        const newSlug = generateSlug(
            next.warbandName,
            next.colors,
            next.pattern,
            "Custom"
        );
        setBand({ ...next, slug: newSlug, mode: "Custom" });
    };

    const handleNameChange = (val) => updateBand({ warbandName: val });
    const handlePatternChange = (val) => updateBand({ pattern: val });

    const handleColorChange = (index, hex) => {
        const color = colourList.find((c) => c.hex === hex);
        const newColors = [...band.colors];
        newColors[index] = color;
        updateBand({ colors: newColors });
    };

    const generateNewColor = (index) => {
        const pool = randomPoolForIndex(index);
        const currentHex = band.colors[index]?.hex;
        const filtered = pool.filter((c) => c.hex !== currentHex);
        const randomColor = filtered[Math.floor(Math.random() * filtered.length)];
        const newColors = [...band.colors];
        newColors[index] = randomColor;
        updateBand({ colors: newColors });
    };

    const generateNewPattern = () => {
        const pool = patterns.filter((p) => p !== band.pattern);
        const next = pool[Math.floor(Math.random() * pool.length)];
        updateBand({ pattern: next });
    };

    const backHref = `${backBase}/${band.slug}`;
    const showSecondary = hideSecondaryWhenBasic ? band.pattern !== "Basic" : true;
    const colourClass = variant === "Chapter" ? "btn-primary" : "btn-accent";

    const ActionBtn = ({ title, action }) => (
        <button
            type="button"
            className={`btn ${colourClass} join-item btn-square`}
            title={title}
            aria-label={title}
            onClick={action}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                className="size-5 fill-current"
                aria-hidden="true"

            >
                <path d="M274.9 34.3c-28.1-28.1-73.7-28.1-101.8 0L34.3 173.1c-28.1 28.1-28.1 73.7 0 101.8L173.1 413.7c28.1 28.1 73.7 28.1 101.8 0L413.7 274.9c28.1-28.1 28.1-73.7 0-101.8L274.9 34.3zM200 224a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM96 200a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM224 376a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM352 200a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM224 120a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm96 328c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-192c0-35.3-28.7-64-64-64l-114.3 0c11.6 36 3.1 77-25.4 105.5L320 413.8l0 34.2zM480 328a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
            </svg>
        </button>
    );
    return (
        <main className="flex flex-1 flex-col items-center justify-center gap-4 p-4 sm:flex-row sm:gap-8">

            <div className="w-full max-w-96">
                {hasSecondModel &&
                    <fieldset className="mb-2">
                        <legend className="sr-only">Model</legend>
                        <div className="grid grid-cols-2 w-full">
                            <input
                                type="radio"
                                name="model"
                                className="btn btn-sm w-full rounded-l-md"
                                aria-label="Marine"
                                checked={model === "marine"}
                                onChange={() => setModel("marine")}
                            />
                            <input
                                type="radio"
                                name="model"
                                className="btn btn-sm w-full rounded-r-md"
                                aria-label="Terminator"
                                checked={model === "terminator"}
                                onChange={() => setModel("terminator")}
                            />
                        </div>
                    </fieldset>
                }
                <TradingCard variant={variant} band={band} model={model} />
            </div>

            <div className="card w-full max-w-96 bg-base-200 text-base-content">
                <div className="card-body ">
                    <div className="card-title">Options</div>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Name</span>
                        </div>

                        <input
                            type="text"
                            value={band.warbandName}
                            onChange={(e) => handleNameChange(e.target.value)}
                            className="input input-bordered w-full"
                            maxLength={50}
                        />
                    </label>
                    <ControlRow id="primary-colour" label="Primary colour" >
                        {({ labelId, hintId }) => (
                            <>
                                <ColorListbox
                                    id="primary-colour"
                                    options={paletteOptionsForIndex(0)}
                                    value={band.colors[0]?.hex}
                                    onChange={(val) => handleColorChange(0, val)}
                                    labelledById={labelId}
                                    describedById={hintId}
                                    ariaLabel="Primary colour"
                                />
                                <ActionBtn title="Random primary colour" action={() => generateNewColor(0)} />
                            </>
                        )}
                    </ControlRow>
                    {showSecondary && (
                        <ControlRow id="secondary-colour" label="Secondary colour">
                            {({ labelId, hintId }) => (
                                <>
                                    <ColorListbox
                                        id="secondary-colour"
                                        options={paletteOptionsForIndex(1)}
                                        value={band.colors[1]?.hex}
                                        onChange={(val) => handleColorChange(1, val)}
                                        labelledById={labelId}
                                        describedById={hintId}           // will be undefined unless you add a hint
                                        ariaLabel="Secondary colour"     // optional fallback
                                    />
                                    <ActionBtn
                                        title="Random secondary colour"
                                        action={() => generateNewColor(1)}
                                    />
                                </>
                            )}
                        </ControlRow>
                    )}

                    <ControlRow
                        id="trim-colour"
                        label={variant === "Chaos" ? "Trim colour" : "Accent colour"}
                    >
                        {({ labelId, hintId }) => (
                            <>
                                <ColorListbox
                                    id="trim-colour"
                                    options={paletteOptionsForIndex(2)}
                                    value={band.colors[2]?.hex}
                                    onChange={(val) => handleColorChange(2, val)}
                                    labelledById={labelId}
                                    describedById={hintId}
                                    ariaLabel={variant === "Chaos" ? "Trim colour" : "Accent colour"}
                                />
                                <ActionBtn
                                    title="Random trim colour"
                                    action={() => generateNewColor(2)}
                                />
                            </>
                        )}
                    </ControlRow>

                    {variant === "Chaos" && (
                        <ControlRow id="accent-colour" label="Accent colour">
                            {({ labelId, hintId }) => (
                                <>
                                    <ColorListbox
                                        id="accent-colour"
                                        options={paletteOptionsForIndex(3)}
                                        value={band.colors[3]?.hex}
                                        onChange={(val) => handleColorChange(3, val)}
                                        labelledById={labelId}
                                        describedById={hintId}
                                        ariaLabel="Accent colour"
                                    />
                                    <ActionBtn
                                        title="Random accent colour"
                                        action={() => generateNewColor(3)}
                                    />
                                </>
                            )}
                        </ControlRow>
                    )}
                    <ControlRow id="pattern" label="Pattern">
                        <SelectControl
                            id="pattern"
                            options={patterns.map((p) => ({ name: p, value: p }))}
                            value={band.pattern}
                            onChange={handlePatternChange}
                            ariaLabel="Pattern"
                        />
                        <ActionBtn title="Random pattern" action={generateNewPattern} />
                    </ControlRow>
                    <button
                        className={`btn ${colourClass} btn-block rounded-sm mt-2`}
                        onClick={() => router.push(backHref)}
                        type="button"
                    >
                        Back to Randomizer
                    </button>
                </div>
            </div>
        </main>
    );
}
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import TradingCard from "@/app/components/tradingCard";
import { colourList } from "@/lib/data/colours";
import { generateSlug } from "@/utils/parseSlugs";
import { generatorRegistry } from "@/lib/generators/index";
import ColorListbox from "./colourSelect";

function ControlRow({ id, label, children, hint }) {
    const labelId = `${id}-label`;
    const hintId = hint ? `${id}-hint` : undefined;

    return (
        <div className="flex w-full flex-col gap-2">
            <label
                id={labelId}
                htmlFor={id}
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-base-content/65"
            >
                {label}
            </label>

            <div className="join w-full">
                {typeof children === "function"
                    ? children({ labelId, hintId })
                    : children}
            </div>

            {hint ? (
                <span id={hintId} className="text-xs text-base-content/55">
                    {hint}
                </span>
            ) : null}
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
            className="select select-bordered join-item w-full rounded-none  bg-base-100"
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

export default function CustomizerCore({
    generatorKey,
    band,
    setBand,
    patterns,
    paletteOptionsForIndex,
    randomPoolForIndex,
    hideSecondaryWhenBasic = false,
}) {
    const router = useRouter();
    const generator = generatorRegistry[generatorKey] ?? generatorRegistry.chapter;

    const [modelKey, setModelKey] = useState(
        Object.keys(generator.models)[0]
    );

    const modelOptions = Object.entries(generator.models);
    const patternKey = String(band.pattern ?? "").toLowerCase();

    const updateBand = (updated) => {
        const next = { ...band, ...updated };
        const newSlug = generateSlug(
            generatorKey,
            next.warbandName,
            next.colors,
            next.pattern,
            "custom"
        );

        setBand({
            ...next,
            slug: newSlug,
            mode: "custom",
        });
    };

    const handleNameChange = (val) => updateBand({ warbandName: val });
    const handlePatternChange = (val) => updateBand({ pattern: val });

    const handleColorChange = (index, hex) => {
        const color = colourList.find((c) => c.hex === hex);
        if (!color) return;

        const newColors = [...band.colors];
        newColors[index] = color;
        updateBand({ colors: newColors });
    };

    const generateNewColor = (index) => {
        const pool = randomPoolForIndex(index);
        const currentHex = band.colors[index]?.hex;
        const filtered = pool.filter((c) => c.hex !== currentHex);
        const randomColor = filtered[Math.floor(Math.random() * filtered.length)];

        if (!randomColor) return;

        const newColors = [...band.colors];
        newColors[index] = randomColor;
        updateBand({ colors: newColors });
    };

    const generateNewPattern = () => {
        const pool = patterns.filter((p) => p !== band.pattern);
        const next = pool[Math.floor(Math.random() * pool.length)];
        if (!next) return;
        updateBand({ pattern: next });
    };

    const backHref = `${generator.basePath}/${band.slug}`;
    const showSecondary = hideSecondaryWhenBasic
        ? patternKey !== "basic"
        : true;

    const ActionBtn = ({ title, action }) => (
        <button
            type="button"
            className="btn btn-primary join-item btn-square rounded-none"
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
        <section className="mx-auto my-auto flex w-full max-w-7xl flex-col items-center justify-center gap-6 md:flex-row md:items-stretch lg:gap-16">
            <div className="relative w-full max-w-105 shrink-0">
                {modelOptions.length > 1 && (
                    <div className="join mb-3 flex w-full md:hidden">
                        {modelOptions.map(([key, model]) => (
                            <input
                                key={key}
                                type="radio"
                                name={`${generatorKey}-model-mobile`}
                                className="join-item btn flex-1 rounded-none border-base-300 text-xs font-bold uppercase tracking-[0.18em]"
                                aria-label={model.label}
                                checked={modelKey === key}
                                onChange={() => setModelKey(key)}
                            />
                        ))}
                    </div>
                )}

                <TradingCard
                    generatorKey={generatorKey}
                    modelKey={modelKey}
                    band={band}
                />
            </div>

            <div className="flex w-full max-w-105 flex-col gap-4 md:flex-1">
                <div className="flex flex-col gap-2">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
                        Manual Refit
                    </p>
                    <h1 className="text-3xl font-black uppercase leading-none tracking-tight sm:text-4xl lg:text-5xl">
                        Customizer
                    </h1>
                </div>

                {modelOptions.length > 1 && (
                    <div className="hidden md:block">
                        <div className="join flex w-full">
                            {modelOptions.map(([key, model]) => (
                                <input
                                    key={key}
                                    type="radio"
                                    name={`${generatorKey}-model-desktop`}
                                    className="join-item btn flex-1 rounded-none border-base-300 text-xs font-bold uppercase tracking-[0.18em]"
                                    aria-label={model.label}
                                    checked={modelKey === key}
                                    onChange={() => setModelKey(key)}
                                />
                            ))}
                        </div>
                    </div>
                )}
                <div className="flex flex-col gap-4 ">
                    <div>
                        <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-base-content/65">
                            {generator.noun} Name
                        </label>
                        <input
                            type="text"
                            value={band.warbandName}
                            onChange={(e) => handleNameChange(e.target.value)}
                            className="input input-bordered w-full rounded-none border-base-300 bg-base-100"
                            maxLength={50}
                        />
                    </div>

                    <ControlRow id="primary-colour" label="Primary colour">
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
                                <ActionBtn
                                    title="Random primary colour"
                                    action={() => generateNewColor(0)}
                                />
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
                                        describedById={hintId}
                                        ariaLabel="Secondary colour"
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
                        label={generatorKey === "chaos" || generatorKey === "sisters" ? "Trim colour" : "Accent colour"}
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
                                    ariaLabel={generatorKey === "chaos" || "sisters" ? "Trim colour" : "Accent colour"}
                                />
                                <ActionBtn
                                    title="Random trim colour"
                                    action={() => generateNewColor(2)}
                                />
                            </>
                        )}
                    </ControlRow>


                    {generatorKey === "chaos" || generatorKey === "sisters" && (
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
                        <>
                            <SelectControl
                                id="pattern"
                                options={patterns.map((p) => ({ name: p, value: p }))}
                                value={band.pattern}
                                onChange={handlePatternChange}
                                ariaLabel="Pattern"
                            />
                            <ActionBtn title="Random pattern" action={generateNewPattern} />
                        </>
                    </ControlRow>


                </div>




                <button
                    className="btn btn-primary rounded-none"
                    onClick={() => router.push(backHref)}
                    type="button"
                >
                    Back to Archive Entry
                </button>

            </div>
        </section>
    );
}
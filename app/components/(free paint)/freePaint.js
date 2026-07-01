"use client";

import { useMemo, useState } from "react";
import { colourList } from "@/lib/data/colours";

import PaintBySections from "@/app/components/(free paint)/paintBySections";
import ImportWarband from "@/app/components/(free paint)/importWarband";
import ColorListbox from "../colourSelect";

import { usePainterStore } from "@/app/stores/painterStore";

const groupedColors = {
    Base: colourList.filter((c) => c.type === "Base"),
    Layer: colourList.filter((c) => c.type === "Layer"),
    Contrast: colourList.filter((c) => c.type === "Contrast"),
    Metallic: colourList.filter((c) => c.type === "Metallic"),
};

function getSwatchStyle(color) {
    if (!color) {
        return { backgroundColor: "transparent" };
    }

    if (color.type === "Metallic" && color.metallic) {
        return {
            background: `radial-gradient(
                circle at 32% 28%,
                ${color.metallic.highlight} 0%,
                ${color.metallic.mid} 32%,
                ${color.metallic.shadow} 78%,
                ${color.metallic.shadow} 100%
            )`,
        };
    }

    return {
        backgroundColor: color.hex || "transparent",
    };
}

function formatPanelName(sectionId) {
    return String(sectionId ?? "").replaceAll("-", " ");
}

function ControlBlock({ label, children, hint }) {
    return (
        <div className="flex w-full flex-col gap-2">
            <div className="text-sm font-bold uppercase text-base-content/75">
                {label}
            </div>

            {hint ? (
                <p className="text-xs text-base-content/75">
                    {hint}
                </p>
            ) : null}

            {children}
        </div>
    );
}

function PaintSwatch({ paint, title }) {
    return (
        <span
            className="block h-full flex-1 rounded-none border border-black/5"
            style={getSwatchStyle(paint)}
            title={title ?? paint?.name}
            aria-label={title ?? paint?.name}
        />
    );
}

export default function FreePaint() {
    const { sections, setColor, resetColors } = usePainterStore();
    const [selectedSections, setSelectedSections] = useState([]);
    const [selectedColor, setSelectedColor] = useState("");

    const selectedPaint = colourList.find((c) => c.hex === selectedColor) ?? null;

    const usedPaints = useMemo(() => {
        const paintsByHex = new Map();

        Object.values(sections).forEach((hex) => {
            if (!hex) return;

            const paint = colourList.find(
                (color) => color.hex.toLowerCase() === hex.toLowerCase()
            );

            if (paint) {
                paintsByHex.set(paint.hex, paint);
            } else {
                paintsByHex.set(hex, {
                    name: hex,
                    hex,
                    type: "Custom",
                });
            }
        });

        return [...paintsByHex.values()];
    }, [sections]);

    const selectedPanelText =
        selectedSections.length === 0
            ? "No panels selected"
            : selectedSections.length === 1
                ? formatPanelName(selectedSections[0])
                : `${selectedSections.length} panels selected`;

    const handleSectionClick = (sectionId) => {
        setSelectedSections((prev) =>
            prev.includes(sectionId)
                ? prev.filter((id) => id !== sectionId)
                : [...prev, sectionId]
        );

        setSelectedColor("");
    };

    const handleColorChange = (value) => {
        const color = colourList.find((c) => c.hex === value);

        if (!selectedSections.length || !color) return;

        setColor(selectedSections, color.hex);
        setSelectedColor(value);
    };

    const clearSelection = () => {
        setSelectedSections([]);
        setSelectedColor("");
    };

    const resetModel = () => {
        clearSelection();
        resetColors();
    };

    return (
        <section className="mx-auto my-auto flex w-full max-w-7xl flex-col items-center justify-center gap-6 px-4 py-6 md:flex-row md:items-stretch lg:gap-16">
            <div className="relative w-full max-w-105 shrink-0">
                <div
                    id="free-paint-card"
                    className="relative flex w-full flex-col overflow-hidden rounded-none border-12 border-primary bg-white text-neutral-content shadow-xl"
                >
                    <div className="relative flex h-[58svh] min-h-105 items-center justify-center p-2 sm:h-[62svh] md:h-[50svh]">
                        <PaintBySections
                            sectionColors={sections}
                            selectedSections={selectedSections}
                            handleSectionClick={handleSectionClick}
                        />
                    </div>

                    <div className="flex flex-col gap-4 bg-base-200/80 p-5">
                        <div className="flex h-8 gap-1" aria-label="Current paint palette">
                            {usedPaints.length > 0 ? (
                                usedPaints.slice(0, 8).map((paint) => (
                                    <PaintSwatch
                                        key={paint.hex}
                                        paint={paint}
                                    />
                                ))
                            ) : (
                                <PaintSwatch
                                    paint={{ name: "White Scar", hex: "#ffffff", type: "Base" }}
                                    title="Blank model"
                                />
                            )}
                        </div>

                        <div className="flex flex-col gap-4">
                            <p className="text-[14px] font-bold uppercase tracking-[0.08em] text-base-content">
                                {usedPaints.length > 0
                                    ? usedPaints.map((paint) => paint.name).join(", ")
                                    : "Blank Model"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex w-full max-w-105 flex-col gap-4 md:gap-8 md:flex-1">
                <div className="flex flex-col gap-2">

                    <h1 className="text-3xl font-black uppercase leading-none tracking-tight sm:text-4xl lg:text-5xl">
                        Free Paint
                    </h1>

                    <p className="max-w-xl text-sm leading-relaxed text-base-content/75 md:text-base">
                        Select armour panels directly on the model, apply a Citadel paint, or import
                        an existing Loyalist chapter code as a starting point.
                    </p>
                </div>

                <div className="flex flex-col gap-4 md:gap-8">
                    <ControlBlock
                        label="Import Chapter"
                        hint="Paste a full Loyalist chapter code to map its colours onto the model."
                    >
                        <ImportWarband />
                    </ControlBlock>

                    <ControlBlock
                        label="Armour Panels"
                        hint="Tap one or more panels on the model. Selected panels are highlighted on the artwork."
                    >
                        <div className="flex items-center justify-between gap-3 rounded-none border border-base-300 bg-base-100 px-4 py-3">
                            <div className="min-w-0">
                                <p className="truncate text-sm font-bold uppercase tracking-[0.08em]">
                                    {selectedPanelText}
                                </p>

                                {selectedSections.length > 1 ? (
                                    <p className="mt-1 truncate text-xs text-base-content/60">
                                        {selectedSections.map(formatPanelName).join(", ")}
                                    </p>
                                ) : null}
                            </div>
                        </div>

                        <button
                            className="btn btn-primary rounded-none"
                            onClick={clearSelection}
                            disabled={!selectedSections.length}
                            aria-label="Clear selected armour panels"
                            type="button"
                        >
                            Clear Selection
                        </button>
                    </ControlBlock>

                    <ControlBlock
                        label="Paint"
                        hint="The chosen paint applies to every selected armour panel."
                    >
                        <div className="join w-full">
                            <ColorListbox
                                id="freepaint-colour"
                                options={groupedColors}
                                value={selectedColor}
                                onChange={handleColorChange}
                                ariaLabel="Paint colour"
                                disabled={!selectedSections.length}
                                useNativeMobile
                                placeholder={
                                    selectedSections.length
                                        ? "Choose a paint…"
                                        : "Select panels first"
                                }
                            />
                        </div>
                    </ControlBlock>

                    <ControlBlock label="Paint List">
                        <div className="flex flex-wrap gap-2">
                            {usedPaints.length > 0 ? (
                                usedPaints.map((paint) => (
                                    <span
                                        key={paint.hex}
                                        className="badge rounded-none gap-2"
                                    >
                                        <span
                                            aria-hidden
                                            className="size-3"
                                            style={getSwatchStyle(paint)}
                                        />
                                        <span className="text-base-content">{paint.name}</span>
                                    </span>
                                ))
                            ) : (
                                <span className="text-sm text-base-content/70">
                                    No custom paints applied yet.
                                </span>
                            )}
                        </div>
                    </ControlBlock>

                    <button
                        className="btn btn-primary rounded-none"
                        onClick={resetModel}
                        aria-label="Reset all colors and clear selected armour panels"
                        title="Reset all colors and clear selected armour panels"
                        type="button"
                    >
                        Reset Model
                    </button>
                </div>
            </div>
        </section>
    );
}
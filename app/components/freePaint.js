"use client";

import { useState } from "react";
import { colourList } from "@/lib/colours";

import PaintBySections from "@/app/components/paintBySections";
import ImportWarband from "@/app/components/importWarband";
import ColorListbox from "./colourSelect";

import { usePainterStore } from "@/app/stores/painterStore";

import { debug } from "@/lib/debug";

const groupedColors = {
    Base: colourList.filter((c) => c.type === "Base"),
    Layer: colourList.filter((c) => c.type === "Layer"),
    Metallic: colourList.filter((c) => c.type === "Metallic"),
};

export default function FreePaint() {
    const { sections, setColor, resetColors } = usePainterStore();
    const [selectedSections, setSelectedSections] = useState([]);
    const [selectedColor, setSelectedColor] = useState("");

    const handleSectionClick = (sectionId) => {
        setSelectedSections((prev) =>
            prev.includes(sectionId)
                ? prev.filter((id) => id !== sectionId)
                : [...prev, sectionId]
        );
        setSelectedColor("");
        debug("Setting selectedSections to: ", selectedSections);
        debug("Selected color: ", selectedColor);

    };

    const handleColorChange = (value) => {
        const color = colourList.find((c) => c.hex === value);
        debug("color:", color)
        if (!selectedSections.length) return;
        setColor(selectedSections, color.hex);
        debug("Setting: ", selectedSections, " to ", color.name);
        setSelectedColor(value);
        debug("Set selected color to :", value);

    };

    const getRequiredPaints = () => {
        const usedColors = Object.values(sections)
            .map((hex) => colourList.find((color) => color.hex === hex)?.name);
        return [...new Set(usedColors)];
    };
    return (
        <main className="flex flex-1 flex-col justify-center items-center gap-4 p-4">
            <h1 className="font-semibold text-2xl text-center">Free Paint - Loyalist</h1>

            <aside className="w-full max-w-96 sm:max-w-[52rem] ">
                <ImportWarband />
            </aside>

            <section className="flex grow flex-col sm:flex-row gap-4 sm:gap-16 w-full justify-center items-center sm:items-start">
                <section id="space-marine-display" className="w-full max-w-96">
                    <div className="bg-white rounded-lg h-[60svh]">
                        <PaintBySections
                            sectionColors={sections}
                            selectedSections={selectedSections}
                            handleSectionClick={handleSectionClick}
                        />
                    </div>
                </section>
                <section id="customization-options" className="card w-full max-w-96">
                    <div className="card-body p-0">
                        <div className="flex flex-col gap-2">
                            <p className="card-title">Sections</p>
                            <p className="text-base">
                                Selected Sections: {selectedSections.length
                                    ? selectedSections.map((s) => s.replaceAll("-", " ")).join(", ")
                                    : "None"}
                            </p>

                            <button
                                className="btn btn-primary rounded-lg mb-8"
                                onClick={() => setSelectedSections([])}
                                aria-label="Clear selected sections"
                            >
                                Clear Selections
                            </button>
                        </div>

                        <div className="flex flex-col gap-2 mb-8">
                            <label id="freepaint-colour-label" className="card-title">Colours</label>
                            <div className="join w-full">
                                <ColorListbox
                                    id="freepaint-colour"
                                    options={groupedColors}
                                    value={selectedColor}
                                    onChange={handleColorChange}
                                    labelledById="freepaint-colour-label"
                                    ariaLabel="Colours"
                                    disabled={!selectedSections.length}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 mb-8" aria-labelledby="paints-needed-heading">
                            <p id="paints-needed-heading" className="card-title">Paints Needed</p>
                            <p>{getRequiredPaints().length ? getRequiredPaints().join(", ") : "White Scar"}</p>
                        </div>

                        <button
                            className="btn btn-primary rounded-lg"
                            onClick={() => {
                                setSelectedSections([]);
                                setSelectedColor("");
                                resetColors();
                            }}
                            aria-label="Reset all colors and clear selections"
                            title="Reset all colors and clear selections"
                        >
                            Reset to Blank
                        </button>
                    </div>
                </section>
            </section>
        </main>
    );
}
"use client";

import { useState } from "react";
import { colorList } from "@/lib/colors";
import PaintBySections from "@/app/components/paintBySections";

import { usePainterStore } from "@/app/stores/painterStore";

import ImportWarband from "@/app/components/importWarband";

export default function Home() {
    const { sections, setColor, resetColors } = usePainterStore();
    const [selectedSections, setSelectedSections] = useState([]);

    const handleSectionClick = (sectionId) => {
        setSelectedSections((prev) =>
            prev.includes(sectionId)
                ? prev.filter((id) => id !== sectionId)
                : [...prev, sectionId]
        );
    };

    const handleColorChange = (value) => {
        const color = colorList.find((c) => c.hex === value);
        if (!selectedSections.length) return;
        setColor(selectedSections, color.hex);
    };

    const getRequiredPaints = () => {
        const usedColors = Object.values(sections)
            .map((hex) => colorList.find((color) => color.hex === hex)?.name);
        return [...new Set(usedColors)];
    };

    return (
        <main className="flex flex-1 flex-col justify-center items-center gap-4 px-4 pb-4">
            <aside className="w-full max-w-96 sm:max-w-[52rem] ">
                <ImportWarband />
            </aside>

            <section className="flex grow flex-col sm:flex-row gap-4 sm:gap-16 w-full justify-center items-center sm:items-start">
                <section id="space-marine-display" className="grid grid-cols-1 w-full max-w-96 gap-4">
                    <div className="bg-white rounded-lg ">
                        <PaintBySections
                            sectionColors={sections}
                            selectedSections={selectedSections}
                            handleSectionClick={handleSectionClick}
                        />
                    </div>
                    <button
                        className="btn btn-primary rounded-lg"
                        onClick={() => {
                            setSelectedSections([]);
                            resetColors();
                        }}
                        aria-label="Reset all colors and clear selections"
                    >
                        Reset to Blank
                    </button>
                </section>
                <section id="customization-options" className="card w-full max-w-96">
                    <div className="card-body p-0">
                        <div className="flex flex-col gap-2">
                            <p className="card-title">Sections</p>
                            <p className="text-base">
                                Selected Sections: {selectedSections.length ? selectedSections.join(", ") : "None"}
                            </p>

                            <button
                                className="btn btn-primary rounded-lg mb-8"
                                onClick={() => setSelectedSections([])}
                                aria-label="Clear selected sections"
                            >
                                Clear Selections
                            </button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="card-title">Colours</p>
                            <label htmlFor="color-select" className="form-control w-full">
                                <select
                                    id="color-select"
                                    onChange={(e) => handleColorChange(e.target.value)}
                                    value=""
                                    className="select select-bordered rounded-lg mb-8"
                                    disabled={!selectedSections.length}
                                    aria-label="Select a color"
                                >
                                    <option value="" disabled>
                                        Select a color
                                    </option>
                                    {colorList.map((color, index) => (
                                        <option key={index} value={color.hex}>
                                            {color.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className="flex flex-col gap-2" aria-labelledby="paints-needed-heading" >
                            <p id="paints-needed-heading" className="card-title">Paints Needed</p>
                            <p>{getRequiredPaints().length ? getRequiredPaints().join(", ") : "White Scar"}</p>
                        </div>
                    </div>
                </section>
            </section>
        </main>
    );
}

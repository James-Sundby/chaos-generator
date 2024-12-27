"use client";

import { useState } from "react";
import { colorList } from "@/lib/colors";
import PaintBySections from "@/app/components/paintBySections";


export default function Home() {
    const [selectedSections, setSelectedSections] = useState([]);
    const [sectionColors, setSectionColors] = useState({});

    const handleSectionClick = (sectionId) => {
        setSelectedSections((prev) =>
            prev.includes(sectionId)
                ? prev.filter((id) => id !== sectionId) // Remove if already selected
                : [...prev, sectionId] // Add if not selected
        );
    };

    const handleColorChange = (value) => {
        const color = colorList.find((c) => c.hex === value);
        if (!selectedSections.length) return;

        setSectionColors((prev) => {
            const newColors = { ...prev };
            selectedSections.forEach((section) => {
                newColors[section] = color.hex;
            });
            return newColors;
        });
    };

    const getRequiredPaints = () => {
        const usedColors = Object.values(sectionColors)
            .filter(Boolean)
            .map((hex) => colorList.find((color) => color.hex === hex)?.name); // Map hex to color names
        return [...new Set(usedColors)];
    };

    return (
        <main className="flex flex-1 flex-col sm:flex-row justify-center items-center gap-4 sm:gap-16 px-4">
            <div className="flex flex-col w-full max-w-96 gap-4">
                <div className="bg-white rounded-lg">
                    <PaintBySections sectionColors={sectionColors} selectedSections={selectedSections} handleSectionClick={handleSectionClick} />
                </div>
                <div className="btn btn-primary rounded-lg" onClick={() => { setSelectedSections([]), setSectionColors({}) }}>Reset</div>
            </div>

            <div className="card w-full max-w-96">
                <div className="card-body p-0">

                    <p className="card-title">Sections</p>
                    <p className="text-base">Selected Sections: {selectedSections.length ? selectedSections.join(", ") : "None"}</p>
                    <div className="btn btn-primary rounded-lg" onClick={() => setSelectedSections([])}>Clear Selections</div>

                    <p className="card-title">Colours</p>
                    <label className="form-control w-full">
                        <select
                            onChange={(e) => handleColorChange(e.target.value)}
                            value=""
                            className="select select-bordered rounded-lg"
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
                    <div className="">
                        <h4>Paints Needed:</h4>
                        <p>{getRequiredPaints().length ? getRequiredPaints().join(", ") : "None"}</p>
                    </div>
                </div>
            </div>
        </main>
    );

}
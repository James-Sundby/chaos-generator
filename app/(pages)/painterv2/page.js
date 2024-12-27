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
        <>
            <div className="flex">
                <div role="alert" className="alert alert-warning p-4 m-4 w-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Warning: This page is still a work in progress</span>
                </div>
            </div>
            <div className="flex flex-1 flex-col sm:flex-row justify-center items-center gap-4 sm:gap-16 px-4">

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
            </div>
        </>
    );

}
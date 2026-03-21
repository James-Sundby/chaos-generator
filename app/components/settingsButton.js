"use client";

import { useRef } from "react";
import { useSettingsStore } from "@/app/stores/settingsStore";

const OPTIONS = [
    {
        value: "default",
        label: "Default",
        description:
            "Uses the Citadel range of Base, Layer, and Metallic paints.",
    },
    {
        value: "contrast",
        label: "Contrast",
        description:
            "Limits paint selection to Citadel Contrast paints only. Some split-panel armour patterns are unavailable.",
    },
    {
        value: "sm2",
        label: "Space Marine 2",
        description:
            "Limits paint selection to the colours available in Space Marine 2.",
    },
];

export default function SettingsButton() {
    const dialogRef = useRef(null);

    const colourMode = useSettingsStore((s) => s.colourMode);
    const setColourMode = useSettingsStore((s) => s.setColourMode);

    const openModal = () => dialogRef.current?.showModal();
    const closeModal = () => dialogRef.current?.close();

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) closeModal();
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-ghost btn-sm gap-2 rounded-none uppercase tracking-[0.16em]"
                onClick={openModal}
                aria-label="Open generator settings"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    className="size-4 fill-current"
                    aria-hidden="true"
                >
                    <path d="M102.8 57.3C108.2 51.9 116.6 51.1 123 55.3L241.9 134.5C250.8 140.4 256.1 150.4 256.1 161.1L256.1 210.7L346.9 301.5C380.2 286.5 420.8 292.6 448.1 320L574.2 446.1C592.9 464.8 592.9 495.2 574.2 514L514.1 574.1C495.4 592.8 465 592.8 446.2 574.1L320.1 448C292.7 420.6 286.6 380.1 301.6 346.8L210.8 256L161.2 256C150.5 256 140.5 250.7 134.6 241.8L55.4 122.9C51.2 116.6 52 108.1 57.4 102.7L102.8 57.3zM247.8 360.8C241.5 397.7 250.1 436.7 274 468L179.1 563C151 591.1 105.4 591.1 77.3 563C49.2 534.9 49.2 489.3 77.3 461.2L212.7 325.7L247.9 360.8zM416.1 64C436.2 64 455.5 67.7 473.2 74.5C483.2 78.3 485 91 477.5 98.6L420.8 155.3C417.8 158.3 416.1 162.4 416.1 166.6L416.1 208C416.1 216.8 423.3 224 432.1 224L473.5 224C477.7 224 481.8 222.3 484.8 219.3L541.5 162.6C549.1 155.1 561.8 156.9 565.6 166.9C572.4 184.6 576.1 203.9 576.1 224C576.1 267.2 558.9 306.3 531.1 335.1L482 286C448.9 253 403.5 240.3 360.9 247.6L304.1 190.8L304.1 161.1L303.9 156.1C303.1 143.7 299.5 131.8 293.4 121.2C322.8 86.2 366.8 64 416.1 63.9z" />
                </svg>
                <span className="hidden sm:inline">Settings</span>
            </button>

            <dialog
                ref={dialogRef}
                className="modal"
                onClick={handleBackdropClick}
                aria-labelledby="settings-title"
            >
                <div className="modal-box w-full max-w-3xl rounded-none border border-base-300 bg-base-100 p-0 shadow-xl">
                    <div className="flex flex-col gap-3 border-b border-base-300 px-6 py-5 sm:px-8 sm:py-6">
                        <div className="badge badge-outline badge-primary rounded-none px-3 py-3 text-[10px] font-bold uppercase tracking-[0.22em]">
                            Generator Settings
                        </div>

                        <div className="flex flex-col gap-2">
                            <h2
                                id="settings-title"
                                className="text-2xl font-black uppercase leading-none tracking-tight sm:text-3xl"
                            >
                                Paint Pool
                            </h2>

                            <p className="max-w-2xl text-sm leading-relaxed text-base-content/75">
                                Choose which colour pool the generator uses when creating new schemes.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 px-6 py-5 sm:px-8 sm:py-6">
                        {OPTIONS.map((option) => {
                            const selected = colourMode === option.value;

                            return (
                                <label
                                    key={option.value}
                                    className={[
                                        "group relative flex cursor-pointer flex-col gap-4 overflow-hidden border p-4 transition sm:p-5",
                                        "rounded-none",
                                        selected
                                            ? "border-primary bg-primary/5"
                                            : "border-base-300 bg-base-100 hover:border-base-content/30 hover:bg-base-200/40",
                                    ].join(" ")}
                                >
                                    <input
                                        type="radio"
                                        name="colourMode"
                                        className="sr-only"
                                        checked={selected}
                                        onChange={() => setColourMode(option.value)}
                                    />

                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex min-w-0 flex-col gap-2">
                                            <div className="text-lg font-black uppercase leading-none tracking-tight sm:text-xl">
                                                {option.label}
                                            </div>

                                            <p className="max-w-2xl text-sm leading-relaxed text-base-content/75">
                                                {option.description}
                                            </p>
                                        </div>

                                        <div className="flex shrink-0 items-start">
                                            <div
                                                className={[
                                                    "flex size-5 items-center justify-center border",
                                                    selected
                                                        ? "border-primary bg-primary text-primary-content"
                                                        : "border-base-content/30 bg-base-100",
                                                ].join(" ")}
                                                aria-hidden="true"
                                            >
                                                {selected ? (
                                                    <svg viewBox="0 0 512 512" className="size-3 fill-current">
                                                        <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416z" />
                                                    </svg>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            );
                        })}
                    </div>

                    <div className="flex flex-col gap-4 border-t border-base-300 px-6 py-5 sm:px-8 sm:py-6">
                        <div className="flex flex-col gap-2 text-sm leading-relaxed text-base-content/75">
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                                Note
                            </h3>

                            <ul className="flex flex-col gap-1">
                                <li>This affects newly generated schemes only.</li>
                                <li>Manual customization remains unrestricted.</li>
                            </ul>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="btn btn-primary rounded-none"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
}
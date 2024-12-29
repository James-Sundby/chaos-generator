"use client";

import { useForm } from "react-hook-form";
import { usePainterStore } from "@/app/stores/painterStore";

function setChapterSectionValues(chapter, setColor) {
    const primaryColor = chapter.colors[0].hex;
    const secondaryColor = chapter.colors[1].hex;
    const pattern = chapter.pattern;

    const patternMappings = {
        Arms: {
            primary: [
                "Right-Shoulder-Trim", "Right-Shoulder-Pad", "Left-Shoulder-Trim", "Left-Shoulder-Pad",
                "Right-Thigh", "Right-Boot", "Left-Boot", "Right-Shin", "Left-Shin", "Left-Thigh",
                "Right-Helmet", "Left-Helmet", "Cod-Right", "Cod-Left", "Torso-Right", "Torso-Left",
                "Right-Backpack", "Left-Backpack", "Right-Belt", "Left-Belt",
            ],
            secondary: ["Right-Hand", "Right-Forearm", "Left-Forearm", "Left-Hand"],
        },
        Shoulders: {
            primary: [
                "Right-Thigh", "Right-Boot", "Left-Boot", "Right-Shin", "Left-Shin", "Left-Thigh",
                "Cod-Right", "Cod-Left", "Torso-Right", "Torso-Left",
                "Right-Backpack", "Left-Backpack", "Right-Belt", "Left-Belt", "Right-Hand",
                "Right-Forearm", "Left-Forearm", "Left-Hand"
            ],
            secondary: ["Right-Shoulder-Trim", "Right-Shoulder-Pad", "Left-Shoulder-Trim", "Left-Shoulder-Pad",
                "Right-Helmet", "Left-Helmet",
            ],
        },
        Legs: {
            primary: [
                "Right-Shoulder-Trim", "Right-Shoulder-Pad", "Left-Shoulder-Trim", "Left-Shoulder-Pad",
                "Right-Helmet", "Left-Helmet", "Cod-Right", "Cod-Left", "Torso-Right", "Torso-Left",
                "Right-Backpack", "Left-Backpack", "Right-Belt", "Left-Belt", "Right-Hand",
                "Right-Forearm", "Left-Forearm", "Left-Hand"
            ],
            secondary: ["Right-Thigh", "Right-Boot", "Left-Boot", "Right-Shin", "Left-Shin", "Left-Thigh",],
        },
        Centered: {
            primary: [
                "Right-Shoulder-Trim", "Right-Shoulder-Pad", "Left-Shoulder-Trim", "Left-Shoulder-Pad",
                "Right-Thigh", "Right-Boot", "Left-Boot", "Right-Shin", "Left-Shin", "Left-Thigh",
                "Right-Backpack", "Left-Backpack", "Right-Hand",
                "Right-Forearm", "Left-Forearm", "Left-Hand"
            ],
            secondary: ["Right-Helmet", "Left-Helmet", "Cod-Right", "Cod-Left", "Torso-Right", "Torso-Left",
                "Right-Belt", "Left-Belt",
            ],
        },
        Half: {
            primary: [
                "Left-Shoulder-Trim", "Left-Shoulder-Pad", "Left-Boot", "Left-Shin", "Left-Thigh",
                "Left-Helmet", "Cod-Left", "Torso-Left", "Left-Backpack",
                "Left-Belt", "Left-Forearm", "Left-Hand"
            ],
            secondary: ["Right-Shoulder-Trim", "Right-Shoulder-Pad", "Right-Thigh", "Right-Boot", "Right-Shin",
                "Cod-Right", "Torso-Right", "Right-Backpack", "Right-Hand", "Right-Forearm", "Right-Belt",
                "Right-Helmet",
            ],
        },
        Quarter: {
            primary: [
                "Right-Thigh", "Right-Boot", "Right-Shin", "Cod-Right", "Torso-Left", "Left-Belt", "Left-Helmet",
                "Left-Backpack", "Left-Shoulder-Trim", "Left-Shoulder-Pad", "Left-Forearm", "Left-Hand"

            ],
            secondary: ["Right-Shoulder-Trim", "Right-Shoulder-Pad", "Left-Boot", "Left-Shin", "Left-Thigh",
                "Right-Helmet", "Cod-Left", "Torso-Right", "Right-Backpack", "Right-Belt",
                "Right-Hand", "Right-Forearm",],
        },
        Crusader: {
            primary: [
                "Right-Shoulder-Trim", "Left-Shoulder-Trim", "Right-Thigh", "Right-Boot", "Left-Boot",
                "Right-Shin", "Left-Shin", "Left-Thigh", "Cod-Right", "Cod-Left", "Torso-Right", "Torso-Left",
                "Right-Backpack", "Left-Backpack", "Right-Belt", "Left-Belt", "Right-Hand",
                "Right-Forearm", "Left-Forearm", "Left-Hand"
            ],
            secondary: ["Right-Shoulder-Pad", "Left-Shoulder-Pad", "Right-Helmet", "Left-Helmet",],
        },
        Disciple: {
            primary: [
                "Right-Shoulder-Trim", "Left-Shoulder-Trim", "Right-Thigh", "Right-Boot", "Left-Boot",
                "Left-Thigh", "Cod-Right", "Cod-Left", "Right-Backpack", "Left-Backpack", "Right-Belt",
                "Left-Belt", "Right-Hand", "Right-Forearm", "Left-Forearm", "Left-Hand"
            ],
            secondary: ["Right-Shin", "Left-Shin", "Right-Helmet", "Left-Helmet", "Torso-Right",
                "Torso-Left", "Right-Shoulder-Pad", "Left-Shoulder-Pad",
            ],
        },
        Talons: {
            primary: [
                "Right-Shoulder-Trim", "Left-Shoulder-Trim", "Cod-Right", "Cod-Left", "Torso-Right",
                "Torso-Left", "Right-Belt", "Left-Belt", "Right-Hand", "Right-Forearm", "Left-Forearm",
                "Left-Hand"
            ],
            secondary: ["Right-Backpack", "Left-Backpack", "Right-Shoulder-Pad", "Left-Shoulder-Pad",
                "Right-Helmet", "Left-Helmet", "Right-Thigh", "Right-Boot", "Left-Boot", "Right-Shin",
                "Left-Shin", "Left-Thigh",
            ],
        },
        Accipiters: {
            primary: [
                "Right-Shoulder-Trim", "Right-Shoulder-Pad", "Left-Shoulder-Trim", "Left-Shoulder-Pad",
                "Right-Helmet", "Left-Helmet", "Right-Hand", "Right-Forearm", "Left-Forearm", "Left-Hand"
            ],
            secondary: ["Right-Backpack", "Left-Backpack", "Torso-Right", "Torso-Left", "Right-Belt",
                "Left-Belt", "Cod-Right", "Cod-Left", "Right-Thigh", "Right-Boot", "Left-Boot",
                "Right-Shin", "Left-Shin", "Left-Thigh",
            ],
        },
        Blazoned: {
            primary: [
                "Right-Backpack", "Left-Backpack", "Right-Shoulder-Trim", "Left-Shoulder-Trim",
                "Cod-Right", "Cod-Left", "Torso-Right", "Torso-Left", "Right-Belt", "Left-Belt",

            ],
            secondary: ["Right-Shoulder-Pad", "Left-Shoulder-Pad", "Right-Helmet", "Left-Helmet", "Right-Hand",
                "Right-Thigh", "Right-Boot", "Left-Boot", "Right-Shin", "Left-Shin", "Left-Thigh",
                "Right-Forearm", "Left-Forearm", "Left-Hand"],
        },
        Eradicant: {
            primary: [
                "Right-Shoulder-Trim", "Right-Shoulder-Pad", "Left-Shoulder-Trim", "Left-Shoulder-Pad",
                "Right-Backpack", "Left-Backpack", "Right-Hand", "Right-Forearm", "Left-Forearm", "Left-Hand"
            ],
            secondary: ["Right-Thigh", "Right-Boot", "Left-Boot", "Right-Shin", "Left-Shin", "Left-Thigh",
                "Right-Helmet", "Left-Helmet", "Cod-Right", "Cod-Left", "Torso-Right", "Torso-Left",
                "Right-Belt", "Left-Belt",
            ],
        },
        Scythes: {
            primary: [
                "Right-Shoulder-Trim", "Right-Shoulder-Pad", "Left-Shoulder-Trim", "Left-Shoulder-Pad",
                "Right-Thigh", "Right-Boot", "Left-Boot", "Right-Shin", "Left-Shin", "Left-Thigh",
                "Right-Helmet", "Left-Helmet", "Right-Hand", "Right-Forearm", "Left-Forearm", "Left-Hand"
            ],
            secondary: ["Right-Backpack", "Left-Backpack", "Right-Belt", "Left-Belt", "Cod-Right", "Cod-Left",
                "Torso-Right", "Torso-Left",
            ],
        },
    };

    if (!patternMappings[pattern]) {
        console.warn("Pattern not recognized:", pattern);
        return;
    }

    const { primary, secondary } = patternMappings[pattern];
    if (primary.length > 0) setColor(primary, primaryColor);
    if (secondary.length > 0) setColor(secondary, secondaryColor);
    setColor(['Ribbing', 'Eagle'], "#3E494A");
}

export default function ImportWarband() {
    const {
        register,
        handleSubmit,
        clearErrors,
        setError,
        formState: { errors, isSubmitting },
    } = useForm();
    const { setColor } = usePainterStore();
    const onSubmit = async (data) => {
        const { lookupCode } = data;

        try {
            const response = await fetch(`/api/chapter-generator?slug=${lookupCode.trim()}`);
            if (!response.ok) {
                setError("lookupCode", {
                    type: "manual",
                    message: "Invalid chapter code. Please try again.",
                });
                setTimeout(() => {
                    clearErrors();
                }, 3000);
                return;
            }

            const fetchedChapter = await response.json();
            if (fetchedChapter.message === "valid") {
                setChapterSectionValues(fetchedChapter, setColor);
            } else {
                setError("lookupCode", {
                    type: "manual",
                    message: "No chapter found.",
                });
                setTimeout(() => {
                    clearErrors();
                }, 3000);
            }
        } catch (error) {
            setError("lookupCode", {
                type: "manual",
                message: "Something went wrong. Please try again later.",
            });
            setTimeout(() => {
                clearErrors();
            }, 3000);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 w-full">
            <div className="indicator w-full">
                <input
                    type="text"
                    className="input input-bordered rounded-lg w-full"
                    placeholder="chapter-code-88241C-35468F-"
                    {...register("lookupCode", {})}
                    required
                    aria-invalid={!!errors.lookupCode}
                    aria-describedby="lookupCodeError"
                    disabled={isSubmitting || errors.lookupCode}
                />
                {errors.lookupCode && (
                    <span
                        id="lookupCodeError"
                        className="indicator-item indicator-center indicator-bottom badge badge-error rounded-lg"
                    >
                        {errors.lookupCode.message}
                    </span>
                )}
            </div>
            <button
                type="submit"
                className={`btn btn-primary rounded-lg items-center justify-center ${isSubmitting ? "loading" : ""}`}
                disabled={isSubmitting || errors.lookupCode}
                aria-label="Look up a Chapter"
            >
                <p className="hidden sm:block">Import a Chapter</p>
                <p className="block sm:hidden">Import</p>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-4 aspect-square fill-primary-content"
                    aria-hidden="true"
                    focusable="false"
                >
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
            </button>
        </form>
    );
}
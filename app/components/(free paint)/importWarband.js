"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { usePainterStore } from "@/app/stores/painterStore";
import { colourList } from "@/lib/colours";
import { patterns } from "@/lib/armourPatterns";
import { chapterModes } from "@/lib/modes";
import { parseSlug, generateSlug } from "@/utils/parseSlugs";

const chapterImportSchema = z.object({
    q: z
        .string()
        .trim()
        .min(1, "Enter a chapter slug.")
        .max(200, "Slug is too long.")
        .regex(/^[A-Za-z0-9-]+$/, "Only letters, numbers, and hyphens are allowed."),
});

const colourMap = Object.fromEntries(
    colourList.map((c) => [c.hex.toLowerCase(), c])
);

const chapterParseConfig = {
    chapter: {
        colourCount: 3,
        colourMap,
        patternsSet: new Set(patterns.map((p) => p.toLowerCase())),
        modesSet: new Set(chapterModes.map((m) => m.toLowerCase())),
    },
};

function setChapterSectionValues(chapter, setColor) {
    const primaryColor = chapter.colors[0].hex;
    const secondaryColor = chapter.colors[1].hex;
    const trimColor = chapter.colors[2].hex;
    const patternKey = String(chapter.pattern ?? "").toLowerCase();

    const patternMappings = {
        arms: {
            primary: [
                "Right-Shoulder-Trim", "Right-Shoulder-Pad", "Left-Shoulder-Trim", "Left-Shoulder-Pad",
                "Right-Thigh", "Right-Boot", "Left-Boot", "Right-Shin", "Left-Shin", "Left-Thigh",
                "Cod-Right", "Cod-Left", "Torso-Right", "Torso-Left",
                "Right-Backpack", "Left-Backpack",
            ],
            secondary: ["Right-Hand", "Right-Forearm", "Left-Forearm", "Left-Hand"],
            trim: ["Right-Helmet", "Left-Helmet", "Right-Belt", "Left-Belt", "Eagle"],
        },
        shoulders: {
            primary: [
                "Right-Thigh", "Right-Boot", "Left-Boot", "Right-Shin", "Left-Shin", "Left-Thigh",
                "Cod-Right", "Cod-Left", "Torso-Right", "Torso-Left",
                "Right-Backpack", "Left-Backpack", "Right-Belt", "Left-Belt", "Right-Hand",
                "Right-Forearm", "Left-Forearm", "Left-Hand",
            ],
            secondary: ["Right-Shoulder-Trim", "Right-Shoulder-Pad", "Left-Shoulder-Trim", "Left-Shoulder-Pad"],
            trim: ["Right-Helmet", "Left-Helmet", "Eagle"],
        },
        legs: {
            primary: [
                "Right-Shoulder-Trim", "Right-Shoulder-Pad", "Left-Shoulder-Trim", "Left-Shoulder-Pad",
                "Right-Helmet", "Left-Helmet", "Cod-Right", "Cod-Left", "Torso-Right", "Torso-Left",
                "Right-Backpack", "Left-Backpack", "Right-Belt", "Left-Belt", "Right-Hand",
                "Right-Forearm", "Left-Forearm", "Left-Hand",
            ],
            secondary: ["Right-Thigh", "Right-Boot", "Left-Boot", "Right-Shin", "Left-Shin", "Left-Thigh"],
            trim: ["Eagle"],
        },
        centered: {
            primary: [
                "Right-Shoulder-Trim", "Right-Shoulder-Pad", "Left-Shoulder-Trim", "Left-Shoulder-Pad",
                "Right-Thigh", "Right-Boot", "Left-Boot", "Right-Shin", "Left-Shin", "Left-Thigh",
                "Right-Backpack", "Left-Backpack", "Right-Hand",
                "Right-Forearm", "Left-Forearm", "Left-Hand",
            ],
            secondary: [
                "Right-Helmet", "Left-Helmet", "Cod-Right", "Cod-Left", "Torso-Right", "Torso-Left",
                "Right-Belt", "Left-Belt",
            ],
            trim: ["Eagle"],
        },
        half: {
            primary: [
                "Left-Shoulder-Trim", "Left-Shoulder-Pad", "Left-Boot", "Left-Shin", "Left-Thigh",
                "Left-Helmet", "Cod-Left", "Torso-Left", "Left-Backpack",
                "Left-Belt", "Left-Forearm", "Left-Hand",
            ],
            secondary: [
                "Right-Shoulder-Trim", "Right-Shoulder-Pad", "Right-Thigh", "Right-Boot", "Right-Shin",
                "Cod-Right", "Torso-Right", "Right-Backpack", "Right-Hand", "Right-Forearm", "Right-Belt",
                "Right-Helmet",
            ],
            trim: ["Eagle"],
        },
        quarter: {
            primary: [
                "Right-Thigh", "Right-Boot", "Right-Shin", "Cod-Right", "Torso-Left", "Left-Belt", "Left-Helmet",
                "Left-Backpack", "Left-Shoulder-Trim", "Left-Shoulder-Pad", "Left-Forearm", "Left-Hand",
            ],
            secondary: [
                "Right-Shoulder-Trim", "Right-Shoulder-Pad", "Left-Boot", "Left-Shin", "Left-Thigh",
                "Right-Helmet", "Cod-Left", "Torso-Right", "Right-Backpack", "Right-Belt",
                "Right-Hand", "Right-Forearm",
            ],
            trim: ["Eagle"],
        },
        crusader: {
            primary: [
                "Right-Shoulder-Trim", "Left-Shoulder-Trim", "Right-Thigh", "Right-Boot", "Left-Boot",
                "Right-Shin", "Left-Shin", "Left-Thigh", "Cod-Right", "Cod-Left", "Torso-Right", "Torso-Left",
                "Right-Backpack", "Left-Backpack", "Right-Belt", "Left-Belt", "Right-Hand",
                "Right-Forearm", "Left-Forearm", "Left-Hand",
            ],
            secondary: ["Right-Shoulder-Pad", "Left-Shoulder-Pad", "Right-Helmet", "Left-Helmet"],
            trim: ["Eagle"],
        },
        disciple: {
            primary: [
                "Right-Shoulder-Trim", "Left-Shoulder-Trim", "Right-Thigh", "Right-Boot", "Left-Boot",
                "Left-Thigh", "Cod-Right", "Cod-Left", "Right-Backpack", "Left-Backpack", "Right-Belt",
                "Left-Belt", "Right-Hand", "Right-Forearm", "Left-Forearm", "Left-Hand",
            ],
            secondary: [
                "Right-Shin", "Left-Shin", "Right-Helmet", "Left-Helmet", "Torso-Right",
                "Torso-Left", "Right-Shoulder-Pad", "Left-Shoulder-Pad",
            ],
            trim: ["Eagle"],
        },
        talons: {
            primary: [
                "Right-Shoulder-Trim", "Left-Shoulder-Trim", "Cod-Right", "Cod-Left", "Torso-Right",
                "Torso-Left", "Right-Belt", "Left-Belt", "Right-Hand", "Right-Forearm", "Left-Forearm",
                "Left-Hand",
            ],
            secondary: [
                "Right-Backpack", "Left-Backpack", "Right-Shoulder-Pad", "Left-Shoulder-Pad",
                "Right-Helmet", "Left-Helmet", "Right-Thigh", "Right-Boot", "Left-Boot", "Right-Shin",
                "Left-Shin", "Left-Thigh",
            ],
            trim: ["Eagle"],
        },
        accipiters: {
            primary: [
                "Right-Shoulder-Trim", "Right-Shoulder-Pad", "Left-Shoulder-Trim", "Left-Shoulder-Pad",
                "Right-Helmet", "Left-Helmet", "Right-Hand", "Right-Forearm", "Left-Forearm", "Left-Hand",
            ],
            secondary: [
                "Right-Backpack", "Left-Backpack", "Torso-Right", "Torso-Left", "Right-Belt",
                "Left-Belt", "Cod-Right", "Cod-Left", "Right-Thigh", "Right-Boot", "Left-Boot",
                "Right-Shin", "Left-Shin", "Left-Thigh",
            ],
            trim: ["Eagle"],
        },
        blazoned: {
            primary: [
                "Right-Backpack", "Left-Backpack", "Right-Shoulder-Trim", "Left-Shoulder-Trim",
                "Cod-Right", "Cod-Left", "Torso-Right", "Torso-Left", "Right-Belt", "Left-Belt",
            ],
            secondary: [
                "Right-Shoulder-Pad", "Left-Shoulder-Pad", "Right-Helmet", "Left-Helmet", "Right-Hand",
                "Right-Thigh", "Right-Boot", "Left-Boot", "Right-Shin", "Left-Shin", "Left-Thigh",
                "Right-Forearm", "Left-Forearm", "Left-Hand",
            ],
            trim: ["Eagle"],
        },
        eradicant: {
            primary: [
                "Right-Shoulder-Trim", "Right-Shoulder-Pad", "Left-Shoulder-Trim", "Left-Shoulder-Pad",
                "Right-Backpack", "Left-Backpack", "Right-Hand", "Right-Forearm", "Left-Forearm", "Left-Hand",
            ],
            secondary: [
                "Right-Thigh", "Right-Boot", "Left-Boot", "Right-Shin", "Left-Shin", "Left-Thigh",
                "Right-Helmet", "Left-Helmet", "Cod-Right", "Cod-Left", "Torso-Right", "Torso-Left",
                "Right-Belt", "Left-Belt",
            ],
            trim: ["Eagle"],
        },
        scythes: {
            primary: [
                "Right-Shoulder-Trim", "Right-Shoulder-Pad", "Left-Shoulder-Trim", "Left-Shoulder-Pad",
                "Right-Thigh", "Right-Boot", "Left-Boot", "Right-Shin", "Left-Shin", "Left-Thigh",
                "Right-Helmet", "Left-Helmet", "Right-Hand", "Right-Forearm", "Left-Forearm", "Left-Hand",
            ],
            secondary: [
                "Right-Backpack", "Left-Backpack", "Right-Belt", "Left-Belt", "Cod-Right", "Cod-Left",
                "Torso-Right", "Torso-Left",
            ],
            trim: ["Eagle"],
        },
    };

    if (!patternMappings[patternKey]) {
        console.warn("Pattern not recognized:", chapter.pattern);
        return;
    }

    const { primary, secondary, trim } = patternMappings[patternKey];
    if (primary.length > 0) setColor(primary, primaryColor);
    if (secondary.length > 0) setColor(secondary, secondaryColor);
    if (trim.length > 0) setColor(trim, trimColor);
    setColor(["Ribbing"], "#3E494A");
}

export default function ImportWarband() {
    const { setColor } = usePainterStore();

    const {
        register,
        handleSubmit,
        clearErrors,
        setError,
        formState: { errors, isSubmitting },
        watch,
    } = useForm({
        resolver: zodResolver(chapterImportSchema),
        defaultValues: { q: "" },
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    });

    const q = watch("q");
    const isEmpty = !((q ?? "").trim());

    const onSubmit = async ({ q }) => {
        const raw = (q ?? "").trim();
        if (!raw) return;

        try {
            const parsed = parseSlug(raw, chapterParseConfig);

            if (parsed.faction !== "chapter") {
                throw new Error("That slug is not a chapter slug.");
            }

            const canonical = generateSlug(
                "chapter",
                parsed.name,
                parsed.colours,
                parsed.pattern,
                parsed.mode
            );

            const chapter = {
                warbandName: parsed.name,
                colors: parsed.colours,
                pattern: parsed.pattern,
                slug: canonical,
                mode: parsed.mode,
            };

            setChapterSectionValues(chapter, setColor);

            if (errors.q) clearErrors("q");
        } catch (e) {
            setError("q", {
                type: "manual",
                message: e?.message || "Invalid chapter code. Please try again.",
            });
        }
    };

    useEffect(() => {
        if (isEmpty && errors.q) clearErrors("q");
    }, [isEmpty, errors.q, clearErrors]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 w-full" noValidate>
            <div className="indicator w-full">
                <input
                    type="text"
                    className={`input input-bordered rounded-lg w-full ${errors.q ? "input-error" : ""}`}
                    placeholder="chapter-angels-of-the-gate-ffffff-317e57-989c94-blazoned"
                    {...register("q")}
                    aria-invalid={!!errors.q}
                    aria-describedby={errors.q ? "chapterLookupError" : undefined}
                    disabled={isSubmitting}
                />
                {errors.q && (
                    <span
                        id="chapterLookupError"
                        className="indicator-item indicator-center indicator-bottom badge badge-error rounded-lg"
                    >
                        {errors.q.message}
                    </span>
                )}
            </div>
            <button
                type="submit"
                className={`btn btn-primary rounded-lg items-center justify-center ${isSubmitting ? "loading" : ""}`}
                disabled={isSubmitting || isEmpty}
                aria-label="Import a Chapter"
            >
                <p className="hidden sm:block">Import a Chapter</p>
                <p className="block sm:hidden">Import</p>
                <svg viewBox="0 0 512 512" className="w-4 aspect-square fill-current" aria-hidden="true">
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
            </button>
        </form>
    );
}
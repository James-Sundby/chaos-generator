"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { usePainterStore } from "@/app/stores/painterStore";
import { colourList } from "@/lib/data/colours";
import { patterns } from "@/lib/factions/chapter/patternOptions";
import { factionModes as chapterModes } from "@/lib/factions/chapter/modes";
import { parseSlug, generateSlug } from "@/utils/parseSlugs";

const chapterImportSchema = z.object({
    q: z
        .string()
        .trim()
        .min(1, "Enter a chapter slug.")
        .max(200, "Slug is too long.")
        .regex(
            /^[A-Za-z0-9-]+$/,
            "Only letters, numbers, and hyphens are allowed."
        ),
});

const colourMap = Object.fromEntries(
    colourList.map((color) => [color.hex.toLowerCase(), color])
);

const chapterParseConfig = {
    chapter: {
        colourCount: 3,
        colourMap,
        patternsSet: new Set(patterns.map((pattern) => pattern.toLowerCase())),
        modesSet: new Set(chapterModes.map((mode) => mode.toLowerCase())),
    },
};

const DEFAULT_RIBBING_PAINT_NAME = "Mechanicus Standard Grey";
const defaultRibbingPaint = colourList.find(
    (paint) => paint.name === DEFAULT_RIBBING_PAINT_NAME
);

const ROLE_TO_SECTION_ID = {
    leftHelmet: "Left-Helmet",
    rightHelmet: "Right-Helmet",

    leftBackpack: "Left-Backpack",
    rightBackpack: "Right-Backpack",

    leftChest: "Torso-Left",
    rightChest: "Torso-Right",

    leftShoulder: "Left-Shoulder-Pad",
    rightShoulder: "Right-Shoulder-Pad",

    leftShoulderTrim: "Left-Shoulder-Trim",
    rightShoulderTrim: "Right-Shoulder-Trim",

    leftArm: "Left-Arm",
    rightArm: "Right-Arm",

    leftThigh: "Left-Leg",
    rightThigh: "Right-Leg",

    leftShin: "Left-Shin",
    rightShin: "Right-Shin",

    codLeft: "Cod-Left",
    codRight: "Cod-Right",

    eagle: "Eagle",
    belt: "Belt",
};

const R = {
    helmets: ["leftHelmet", "rightHelmet"],
    backpacks: ["leftBackpack", "rightBackpack"],
    chests: ["leftChest", "rightChest"],
    shoulders: ["leftShoulder", "rightShoulder"],
    shoulderTrims: ["leftShoulderTrim", "rightShoulderTrim"],
    arms: ["leftArm", "rightArm"],
    thighs: ["leftThigh", "rightThigh"],
    shins: ["leftShin", "rightShin"],
    cod: ["codLeft", "codRight"],

    leftSide: [
        "leftHelmet",
        "leftBackpack",
        "leftChest",
        "leftShoulder",
        "leftShoulderTrim",
        "leftArm",
        "leftThigh",
        "leftShin",
        "codLeft",
    ],

    rightSide: [
        "rightHelmet",
        "rightBackpack",
        "rightChest",
        "rightShoulder",
        "rightShoulderTrim",
        "rightArm",
        "rightThigh",
        "rightShin",
        "codRight",
    ],
};

const ALL_ARMOUR_ROLES = [
    ...R.helmets,
    ...R.backpacks,
    ...R.chests,
    ...R.shoulders,
    ...R.shoulderTrims,
    ...R.arms,
    ...R.thighs,
    ...R.shins,
    ...R.cod,
    "eagle",
    "belt",
];

function roles(...groups) {
    return [...new Set(groups.flat().filter(Boolean))];
}

function toSectionIds(roleList) {
    return [
        ...new Set(
            roleList
                .map((role) => ROLE_TO_SECTION_ID[role])
                .filter(Boolean)
        ),
    ];
}

function makeMapping({ primary = [], secondary = [], trim = [] }) {
    return {
        primary: toSectionIds(primary),
        secondary: toSectionIds(secondary),
        trim: toSectionIds(roles(trim, "belt")),
    };
}

const PATTERN_ROLE_MAPPINGS = {
    accipiters: {
        primary: roles(R.helmets, R.shoulders, R.shoulderTrims, R.arms),
        secondary: roles(R.backpacks, R.chests, R.cod, R.thighs, R.shins),
        trim: roles("eagle"),
    },

    arms: {
        primary: roles(
            R.shoulders,
            R.shoulderTrims,
            R.backpacks,
            R.chests,
            R.cod,
            R.thighs,
            R.shins
        ),
        secondary: roles(R.arms),
        trim: roles(R.helmets, "eagle"),
    },

    blazoned: {
        primary: roles(R.backpacks, R.chests, R.shoulderTrims, R.cod),
        secondary: roles(R.helmets, R.shoulders, R.arms, R.thighs, R.shins),
        trim: roles("eagle"),
    },

    centered: {
        primary: roles(R.backpacks, R.shoulders, R.shoulderTrims, R.arms, R.thighs, R.shins),
        secondary: roles(R.helmets, R.chests, R.cod),
        trim: roles("eagle"),
    },

    crusader: {
        primary: roles(R.backpacks, R.chests, R.shoulderTrims, R.arms, R.thighs, R.shins, R.cod),
        secondary: roles(R.helmets, R.shoulders),
        trim: roles("eagle"),
    },

    disciple: {
        primary: roles(R.backpacks, R.shoulderTrims, R.arms, R.thighs, R.cod),
        secondary: roles(R.helmets, R.chests, R.shins, R.shoulders),
        trim: roles("eagle"),
    },

    eradicant: {
        primary: roles(R.backpacks, R.shoulders, R.shoulderTrims, R.arms),
        secondary: roles(R.helmets, R.chests, R.cod, R.thighs, R.shins),
        trim: roles("eagle"),
    },

    half: {
        primary: roles(R.leftSide),
        secondary: roles(R.rightSide),
        trim: roles("eagle"),
    },

    legs: {
        primary: roles(R.helmets, R.backpacks, R.chests, R.shoulders, R.shoulderTrims, R.arms, R.cod),
        secondary: roles(R.thighs, R.shins),
        trim: roles("eagle"),
    },

    quarter: {
        primary: roles(
            "leftHelmet",
            "leftBackpack",
            "leftChest",
            "leftShoulder",
            "leftShoulderTrim",
            "leftArm",
            "rightThigh",
            "rightShin",
            "codRight"
        ),
        secondary: roles(
            "rightHelmet",
            "rightBackpack",
            "rightChest",
            "rightShoulder",
            "rightShoulderTrim",
            "rightArm",
            "codLeft",
            "leftThigh",
            "leftShin"
        ),
        trim: roles("eagle"),
    },

    scythes: {
        primary: roles(R.helmets, R.shoulders, R.shoulderTrims, R.arms, R.thighs, R.shins),
        secondary: roles(R.backpacks, R.cod, R.chests),
        trim: roles("eagle"),
    },

    shoulders: {
        primary: roles(R.backpacks, R.chests, R.arms, R.thighs, R.shins, R.cod),
        secondary: roles(R.shoulders, R.shoulderTrims),
        trim: roles(R.helmets, "eagle"),
    },

    talons: {
        primary: roles(R.chests, R.shoulderTrims, R.arms, R.cod),
        secondary: roles(R.helmets, R.backpacks, R.shoulders, R.thighs, R.shins),
        trim: roles("eagle"),
    },
};

const DEFAULT_ROLE_MAPPING = {
    primary: roles(ALL_ARMOUR_ROLES),
    secondary: [],
    trim: [],
};

function setChapterSectionValues(chapter, setColor) {
    const primaryColor = chapter.colors[0].hex;
    const secondaryColor = chapter.colors[1].hex;
    const trimColor = chapter.colors[2].hex;
    const patternKey = String(chapter.pattern ?? "").toLowerCase();

    const roleMapping = PATTERN_ROLE_MAPPINGS[patternKey] ?? DEFAULT_ROLE_MAPPING;
    const mapping = makeMapping(roleMapping);

    if (mapping.primary.length > 0) {
        setColor(mapping.primary, primaryColor);
    }

    if (mapping.secondary.length > 0) {
        setColor(mapping.secondary, secondaryColor);
    }

    if (mapping.trim.length > 0) {
        setColor(mapping.trim, trimColor);
    }

    setColor(["Ribbing"], defaultRibbingPaint?.hex ?? "#39484A");
}

export default function ImportWarband() {
    const { setColor } = usePainterStore();
    const [hasMounted, setHasMounted] = useState(false);

    const {
        register,
        handleSubmit,
        clearErrors,
        setError,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(chapterImportSchema),
        defaultValues: { q: "" },
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    });

    const q = useWatch({
        control,
        name: "q",
        defaultValue: "",
    });

    const isEmpty = String(q ?? "").trim().length === 0;
    const submitDisabled = hasMounted ? isSubmitting || isEmpty : false;

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        if (isEmpty && errors.q) clearErrors("q");
    }, [isEmpty, errors.q, clearErrors]);

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
                name: parsed.name,
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
                message:
                    e?.message || "Invalid chapter code. Please try again.",
            });
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full items-center gap-2"
            noValidate
        >
            <div className="indicator w-full">
                <input
                    type="text"
                    className={`input input-bordered w-full rounded-none border-base-300 bg-base-100 ${errors.q ? "input-error" : ""
                        }`}
                    placeholder="chapter-angels-of-the-gate-ffffff-317e57-989c94-blazoned-random"
                    {...register("q")}
                    aria-invalid={!!errors.q}
                    aria-describedby={
                        errors.q ? "chapterLookupError" : undefined
                    }
                    disabled={isSubmitting}
                />

                {errors.q ? (
                    <span
                        id="chapterLookupError"
                        className="indicator-item indicator-center indicator-bottom badge badge-error rounded-none"
                    >
                        {errors.q.message}
                    </span>
                ) : null}
            </div>

            <button
                type="submit"
                className={`btn btn-primary items-center justify-center rounded-none ${isSubmitting ? "loading" : ""
                    }`}
                disabled={submitDisabled}
                aria-label="Import a Chapter"
            >
                <p className="hidden sm:block">Import a Chapter</p>
                <p className="block sm:hidden">Import</p>

                <svg
                    viewBox="0 0 512 512"
                    className="aspect-square w-4 fill-current"
                    aria-hidden="true"
                >
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
            </button>
        </form>
    );
}
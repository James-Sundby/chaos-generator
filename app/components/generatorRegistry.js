import SpaceMarine from "./models/spaceMarine";
import Terminator from "./models/terminator";
import ChaosMarine from "./models/chaosSpaceMarine";
import EldarAvenger from "./models/eldarAvenger";

import { createChapterAndGo } from "@/app/(actions)/createChapter";
import { createWarbandAndGo } from "@/app/(actions)/createWarband";
import { createWarhostAndGo } from "@/app/(actions)/createWarhost";

import { chaosSearchObjectSchema as chaosSchema } from "@/app/schema/chaos";
import { chapterSearchObjectSchema as chapterSchema } from "@/app/schema/chapter";
import { warhostSearchObjectSchema as warhostSchema } from "@/app/schema/warhost";

import { warbandSearchServer } from "@/app/(actions)/warbandSearch";
import { chapterSearchServer } from "@/app/(actions)/chapterSearch";
import { warhostSearchServer } from "@/app/(actions)/warhostSearch";

export const generatorRegistry = {
    chapter: {
        group: "loyalist",
        variant: "Chapter",
        noun: "chapter",
        basePath: "/chapter",
        painterPath: "/painter",
        buttonTheme: "btn-primary",
        createAction: createChapterAndGo,

        models: {
            marine: {
                label: "Marine",
                component: SpaceMarine,
                getModelProps: ({ colors, pattern }) => ({
                    primary: colors[0]?.hex,
                    secondary: colors[1]?.hex,
                    trim: colors[2]?.hex,
                    pattern,
                }),
            },
            terminator: {
                label: "Terminator",
                component: Terminator,
                getModelProps: ({ colors, pattern }) => ({
                    primary: colors[0]?.hex,
                    secondary: colors[1]?.hex,
                    trim: colors[2]?.hex,
                    pattern,
                }),
            },
        },

        getSwatchIndices: ({ colors }) => {
            const areColorsDifferent = colors[0]?.hex !== colors[1]?.hex;
            return areColorsDifferent
                ? [0, 1, 2].filter((i) => colors[i])
                : [0, 2].filter((i) => colors[i]);
        },

        search: {
            schema: chapterSchema,
            serverAction: chapterSearchServer,
            placeholder: "ravens-of-the-keep-a99d95-440052-989898-eradicant-random",
            buttonLabel: "Look up a Chapter",
            ariaLabel: "Chapter lookup code",
        }
    },

    chaos: {
        group: "chaos",
        variant: "Chaos",
        noun: "warband",
        basePath: "/chaos",
        painterPath: "/chaos-painter",
        buttonTheme: "btn-accent",
        createAction: createWarbandAndGo,

        models: {
            marine: {
                label: "Chaos Marine",
                component: ChaosMarine,
                getModelProps: ({ colors, pattern }) => ({
                    primary: colors[0]?.hex,
                    secondary: colors[1]?.hex,
                    edge: colors[2]?.hex,
                    accent: colors[3]?.hex,
                    pattern,
                }),
            },
        },

        getSwatchIndices: ({ colors, pattern }) => {
            if (pattern === "Basic") {
                return [0, 2, 3].filter((i) => colors[i]);
            }
            return colors.map((_, i) => i).filter((i) => colors[i]);
        },

        search: {
            schema: chaosSchema,
            serverAction: warbandSearchServer,
            placeholder: "the-oathbroken-claws-02134E-4B213C-875408-003D15-half-tetradic",
            buttonLabel: "Look up a Warband",
            ariaLabel: "Warband lookup code",
        }
    },

    eldar: {
        group: "xenos",
        variant: "Eldar",
        noun: "warhost",
        basePath: "/warhost",
        painterPath: "/warhost-painter",
        buttonTheme: "btn-info",
        createAction: createWarhostAndGo,

        models: {
            avenger: {
                label: "Dire Avenger",
                component: EldarAvenger,
                getModelProps: ({ colors, pattern }) => ({
                    primary: colors[0]?.hex,
                    secondary: colors[1]?.hex,
                    accent: colors[2]?.hex,
                    pattern,
                }),
            },
        },

        getSwatchIndices: ({ colors }) => {
            const areColorsDifferent = colors[0]?.hex !== colors[1]?.hex;
            return areColorsDifferent
                ? [0, 1, 2].filter((i) => colors[i])
                : [0, 2].filter((i) => colors[i]);
        },

        search: {
            schema: warhostSchema,
            serverAction: warhostSearchServer,
            placeholder: "twilightbound-989898-6D655F-2C9BCC-8-analogous",
            buttonLabel: "Look up a Warhost",
            ariaLabel: "Warhost lookup code",
        }
    },
};
import "server-only";

import { randomElement } from "@/utils/randomElement";
import { normalizeName } from "@/utils/normalizeNames";

import { chaoticDescriptors, darkEntities, warriorTerms, abstractNouns, adjectives as chaosAdjectives } from "@/lib/names/chaosNameParts";
import { virtues, warriorTerms as loyalTerms, placesOrEntities, adjectives as loyalAdjectives, animals } from "@/lib/names/chapterNameParts";
import { eldarAdjectives, eldarWarriorTerms, eldarAbstracts, eldarCelestial } from "@/lib/names/eldarNameParts";


import { OFFICIAL_CHAPTER_BLACKLIST } from "@/lib/names/blacklistChapter";
import { OFFICIAL_CHAOS_WARBAND_BLACKLIST } from "@/lib/names/blacklistChaos";

const OFFICIAL_WARHOST_BLACKLIST = new Set();

function nameGenerator({
    formulae,
    blacklist = [],
    rng = Math.random,
    maxAttempts = 5,
    mode = "Name"
}) {
    return function generate() {
        for (let i = 0; i < maxAttempts; i++) {
            const name = randomElement(formulae, rng)();
            if (!blacklist.has(normalizeName(name))) return name;
        }
        return `Unregistered ${mode}`;
    };
}

// Chaos Warbands
const chaosFormulas = [
    () => `${randomElement(warriorTerms)} of ${randomElement(darkEntities)}`,
    () => `${randomElement(chaoticDescriptors)} ${randomElement(warriorTerms)}`,
    () => `${randomElement(abstractNouns)} ${randomElement(warriorTerms)}`,
    () => `${randomElement(chaosAdjectives)} ${randomElement(warriorTerms)} of ${randomElement(darkEntities)}`,
    () => `${randomElement(abstractNouns)} of ${randomElement([...darkEntities, ...chaoticDescriptors])}`,
    () => `The ${randomElement(chaosAdjectives)} ${randomElement(warriorTerms)}`,
    () => `Children of the ${randomElement(chaoticDescriptors)}`,
    () => `${randomElement(chaosAdjectives)} ${randomElement(warriorTerms)} of ${randomElement(abstractNouns)}`,
    () => `The ${randomElement(chaoticDescriptors)} ${randomElement(warriorTerms)}`,
    () => `The ${randomElement(warriorTerms)} of ${randomElement(chaoticDescriptors)}`,
    () => `${randomElement(darkEntities)} ${randomElement(warriorTerms)}`,
    () => `Cult of ${randomElement(abstractNouns)}`,
    () => `Order of the ${randomElement(chaoticDescriptors)} ${randomElement(abstractNouns)}`,
    () => `The Fallen ${randomElement(warriorTerms)}`,
    () => `The Oath-Broken ${randomElement(warriorTerms)}`,
    () => `${randomElement(warriorTerms)} of ${randomElement(["Blood", "Decay", "Change", "Excess"])}`,
    () => `The ${randomElement(abstractNouns)}bound`,
    () => `${randomElement(abstractNouns)}forged`,
];

export const generateWarbandName = nameGenerator({
    formulae: chaosFormulas,
    blacklist: OFFICIAL_CHAOS_WARBAND_BLACKLIST,
    mode: "Warband"
});

// Loyalist Chapters
const loyalistFormulas = [
    () => `${randomElement(loyalAdjectives)} ${randomElement(loyalTerms)}`,
    () => `${randomElement(loyalTerms)} of ${randomElement(virtues)}`,
    () => `${randomElement(loyalTerms)} of ${randomElement(placesOrEntities)}`,
    () => `The ${randomElement(loyalAdjectives)} ${randomElement(loyalTerms)}`,
    () => `${randomElement(loyalAdjectives)} ${randomElement(animals)}`,
    () => `${randomElement(animals)} of ${randomElement(placesOrEntities)}`,
    () => `${randomElement(placesOrEntities).replace(/^the\s+/i, "")}'s ${randomElement(loyalTerms)}`,
];

export const generateChapterName = nameGenerator({
    formulae: loyalistFormulas,
    blacklist: OFFICIAL_CHAPTER_BLACKLIST,
    mode: "Chapter"
});

// Xenos?
const eldarFormulas = [
    () => `${randomElement(eldarAdjectives)} ${randomElement(eldarWarriorTerms)}`,
    () => `${randomElement(eldarWarriorTerms)} of ${randomElement(eldarAbstracts)}`,
    () => `${randomElement(eldarWarriorTerms)} of the ${randomElement(eldarCelestial)}`,
    () => `The ${randomElement(eldarAdjectives)} ${randomElement(eldarWarriorTerms)}`,
    () => `${randomElement(eldarAbstracts)} of the ${randomElement(eldarCelestial)}`,
    () => `Children of the ${randomElement(eldarCelestial)}`,
    () => `${randomElement(eldarAdjectives)} ${randomElement(eldarAbstracts)}`,
    () => `The ${randomElement(eldarAbstracts)} Weavers`,
    () => `${randomElement(eldarAbstracts)}bound`,
    () => `${randomElement(eldarCelestial)}borne`,
];

export const generateEldarName = nameGenerator({
    formulae: eldarFormulas,
    blacklist: OFFICIAL_WARHOST_BLACKLIST,
    mode: "Warhost"
});
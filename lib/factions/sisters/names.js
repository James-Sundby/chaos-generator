import "server-only";

import { createNameGenerator } from "@/utils/createNameGenerator";
import { randomElement } from "@/utils/randomElement";
import { blacklist } from "./blacklist";
import { sororitasAdjectives, sororitasRelics, sororitasFigures } from "./nameParts";

const formulae = [
    (rng) => `Order of the ${randomElement(sororitasAdjectives, rng)} ${randomElement(sororitasFigures, rng)}`,
    (rng) => `Order of the ${randomElement(sororitasRelics, rng)} and ${randomElement(sororitasRelics, rng)}`,
    (rng) => `Order of Our ${randomElement(sororitasAdjectives, rng)} ${randomElement(sororitasFigures, rng)}`,
    (rng) => `Order of the ${randomElement(sororitasFigures, rng)} of the ${randomElement(sororitasRelics, rng)}`,
    (rng) => `Order of the ${randomElement(sororitasAdjectives, rng)} ${randomElement(sororitasRelics, rng)} Eternal`,
]

export const generateName = createNameGenerator({
    formulae,
    blacklist,
    fallback: "Unregistered Order",
});

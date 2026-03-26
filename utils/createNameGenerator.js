import "server-only";

import { randomElement } from "@/utils/randomElement";
import { normalizeName } from "@/utils/normalizeNames";

export function createNameGenerator({
    formulae,
    blacklist = new Set(),
    fallback = "Unregistered Name",
    maxAttempts = 5,
}) {
    return ({ rng = Math.random } = {}) => {
        for (let i = 0; i < maxAttempts; i++) {
            const formula = randomElement(formulae, rng);
            const name = formula(rng);

            if (!blacklist.has(normalizeName(name))) {
                return name;
            }
        }

        return fallback;
    };
}
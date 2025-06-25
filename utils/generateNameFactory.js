import { randomElement } from "@/utils/randomElement";

export function createNameGenerator(formulae) {
    return () => randomElement(formulae)();
}

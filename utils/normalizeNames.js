export function normalizeName(name) {
    return name
        .toLowerCase()
        .replace(/^the\s+/, "")
        .replace(/['’]/g, "")
        .replace(/[^a-z0-9\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}
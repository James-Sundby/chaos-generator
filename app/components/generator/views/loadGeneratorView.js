export async function loadGeneratorView(faction) {
    switch (faction) {
        case "chapter":
            return (await import("./chapterGeneratorView")).default;

        case "chaos":
            return (await import("./chaosGeneratorView")).default;

        case "eldar":
            return (await import("./eldarGeneratorView")).default;

        case "sisters":
            return (await import("./sistersGeneratorView")).default;

        default:
            throw new Error("bad-faction");
    }
}
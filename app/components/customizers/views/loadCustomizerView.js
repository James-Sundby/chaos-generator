export async function loadCustomizerView(faction) {
    switch (faction) {
        case "chapter":
            return (await import("./chapterCustomizerView")).default;

        case "chaos":
            return (await import("./chaosCustomizerView")).default;

        case "eldar":
            return (await import("./eldarCustomizerView")).default;

        case "sisters":
            return (await import("./sistersCustomizerView")).default;

        default:
            throw new Error("bad-faction");
    }
}
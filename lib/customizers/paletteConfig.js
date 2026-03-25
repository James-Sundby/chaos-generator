import { colourList } from "@/lib/data/colours";

export const groupedColors = {
    Base: colourList.filter((c) => c.type === "Base"),
    Layer: colourList.filter((c) => c.type === "Layer"),
    Contrast: colourList.filter((c) => c.type === "Contrast"),
    Metallic: colourList.filter((c) => c.type === "Metallic"),
};

export const nonMetallics = {
    Base: groupedColors.Base,
    Layer: groupedColors.Layer,
    Contrast: groupedColors.Contrast,
};

export const nonMetallicPool = colourList.filter((c) => c.type !== "Metallic");
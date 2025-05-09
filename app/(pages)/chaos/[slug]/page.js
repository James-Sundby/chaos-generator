import { parseChaosSlug } from "@/lib/slugParser";
import WarbandView from "@/app/components/warbandView";

export async function generateMetadata({ params }) {
    try {
        const { warbandName, colors, pattern, slug } = parseChaosSlug(params.slug);
        const colorNames = colors.map((c) => c.name).join(", ");

        return {
            title: `${warbandName}`,
            description: `Custom Chaos warband: ${warbandName} using ${colorNames} in ${pattern} pattern.`,
            openGraph: {
                title: `${warbandName}`,
                description: `Chaos Space Marine scheme: ${colorNames} + ${pattern}.`,
                url: `https://chapter-gen.jsundby.dev/chaos/${slug}`,
            },
            twitter: {
                title: `${warbandName}`,
                description: `Custom warband colors: ${colorNames}, ${pattern} pattern.`,
            },
        };
    } catch {
        return {
            title: "Chaos Warband Generator",
            description: "Create or view custom Chaos Space Marine warbands with randomized paint schemes.",
        };
    }
}

export default function Page() {
    return <WarbandView />;
}

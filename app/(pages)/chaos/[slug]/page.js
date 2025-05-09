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
                siteName: "Chapter Generator",
                images: [
                    {
                        url: "https://chapter-gen.jsundby.dev/card.jpg",
                        width: 1200,
                        height: 630,
                        alt: "Paintbrushes in a jar. Text overlay: Stuck with primer? Generate a chapter and break the block.",
                    },
                ],
                locale: 'en_US',
                type: 'website',
            },
            twitter: {
                title: `${warbandName}`,
                description: `Custom warband colors: ${colorNames}, ${pattern} pattern.`,
                card: 'summary_large_image',
                images: [
                    {
                        url: "https://chapter-gen.jsundby.dev/card.jpg",
                        alt: "Paintbrushes in a jar. Text overlay: Stuck with primer? Generate a chapter and break the block."
                    }
                ],
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

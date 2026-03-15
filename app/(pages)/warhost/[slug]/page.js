import { redirect, notFound } from "next/navigation";
import { parseWarhostFromSlugOrThrow } from "@/utils/warhost";
import WarhostView from "@/app/components/warhostView";

export const dynamic = "force-static";

export async function generateMetadata(props) {
    const params = await props.params;

    try {
        const { warhost, canonical } = parseWarhostFromSlugOrThrow(params.slug);
        const colourNames = warhost.colors.map((c) => c.name).join(", ");

        return {
            title: warhost.warbandName,
            description: `Custom Aeldari warhost: ${warhost.warbandName} using ${colourNames} in the "${warhost.pattern}" pattern.`,
            openGraph: {
                title: warhost.warbandName,
                description: `Aeldari colour scheme: ${colourNames} + ${warhost.pattern}.`,
                url: `https://chapter-gen.jsundby.dev/warhost/${canonical}`,
                siteName: "Chapter Generator",
                images: [
                    {
                        url: "https://chapter-gen.jsundby.dev/card.png",
                        width: 1200,
                        height: 630,
                        alt: "Line-art image of a Space Marine. Text overlay: Stuck with primer? Generate a chapter and break the block.",
                    },
                ],
                locale: "en_US",
                type: "website",
            },
            twitter: {
                title: warhost.warbandName,
                description: `Custom Aeldari warhost: ${warhost.warbandName} using ${colourNames} in the "${warhost.pattern}" pattern.`,
                card: "summary_large_image",
                images: [
                    {
                        url: "https://chapter-gen.jsundby.dev/card.png",
                        alt: "Line-art image of a Space Marine. Text overlay: Stuck with primer? Generate a chapter and break the block.",
                    },
                ],
            },
            alternates: { canonical: `/warhost/${canonical}` },
        };
    } catch {
        return {
            title: "Aeldari Warhost Generator",
            description: "Create or view custom Aeldari warhosts with randomized paint schemes.",
        };
    }
}

export default async function Page(props) {
    const params = await props.params;

    try {
        const { warhost, canonical } = parseWarhostFromSlugOrThrow(params.slug);
        if (canonical !== params.slug) redirect(`/warhost/${canonical}`);

        return <WarhostView initialBand={warhost} />;
    } catch {
        notFound();
    }
}

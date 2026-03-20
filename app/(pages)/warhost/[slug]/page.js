import { redirect, notFound } from "next/navigation";
import { parseWarhostFromSlugOrThrow } from "@/utils/(faction wrappers)/warhost";
import WarhostView from "@/app/components/wrappers/views/warhostView";

export async function generateMetadata(props) {
    const params = await props.params;

    try {
        const { warhost, canonical } = parseWarhostFromSlugOrThrow(params.slug);
        const colourNames = warhost.colors.map((c) => c.name).join(", ");

        return {
            title: warhost.warbandName,
            description: `Custom Aeldari warhost: ${warhost.warbandName} using ${colourNames} in the "${warhost.pattern}" pattern.`,
            alternates: {
                canonical: `/warhost/${canonical}`,
            },
            openGraph: {
                title: warhost.warbandName,
                description: `Aeldari colour scheme: ${colourNames} in the ${warhost.pattern} pattern.`,
                url: `/warhost/${canonical}`,
                images: [
                    {
                        url: "/card.png",
                        width: 1200,
                        height: 630,
                        alt: "Line-art image of a Space Marine. Text overlay: Stuck with primer? Generate a chapter and break the block.",
                    },
                ],
            },
            twitter: {
                title: warhost.warbandName,
                description: `Custom Aeldari warhost: ${warhost.warbandName} using ${colourNames} in the "${warhost.pattern}" pattern.`,
                images: ["/card.png"],
            },
        };
    } catch {
        return {
            title: "Aeldari Warhost Generator",
            description: "Create or view custom Aeldari warhosts with randomized paint schemes.",
            alternates: {
                canonical: "/warhost",
            },
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

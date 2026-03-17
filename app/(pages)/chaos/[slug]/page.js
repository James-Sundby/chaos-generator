import { redirect, notFound } from "next/navigation";
import { parseFromSlugOrThrow } from "@/utils/warband";
import WarbandView from "@/app/components/wrappers/views/warbandView";

export async function generateMetadata(props) {
    const params = await props.params;

    try {
        const { band, canonical } = parseFromSlugOrThrow(params.slug);
        const colourNames = band.colors.map((c) => c.name).join(", ");

        return {
            title: band.warbandName,
            description: `Custom Chaos warband: ${band.warbandName} using ${colourNames} in the "${band.pattern}" pattern.`,
            alternates: {
                canonical: `/chaos/${canonical}`,
            },
            openGraph: {
                title: band.warbandName,
                description: `Chaos Space Marine scheme: ${colourNames} in the ${band.pattern} pattern.`,
                url: `/chaos/${canonical}`,
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
                title: band.warbandName,
                description: `Custom Chaos warband: ${band.warbandName} using ${colourNames} in the "${band.pattern}" pattern.`,
                images: ["/card.png"],
            },
        };
    } catch {
        return {
            title: "Chaos Warband Generator",
            description: "Create or view custom Chaos Space Marine warbands with randomized paint schemes.",
            alternates: {
                canonical: "/chaos",
            },
        };
    }
}

export default async function Page(props) {
    const params = await props.params;
    try {
        const { band, canonical } = parseFromSlugOrThrow(params.slug);
        if (canonical !== params.slug) redirect(`/chaos/${canonical}`);
        return <WarbandView initialBand={band} />;
    } catch {
        notFound();
    }
}

import { redirect, notFound } from "next/navigation";
import { parseWarhostFromSlugOrThrow } from "@/utils/(faction wrappers)/warhost";
import GeneratorView from "@/app/components/generator/generatorView";
import GeneratorStoreHydrator from "@/app/components/generator/generatorStoreHydrator";

export async function generateMetadata(props) {
    const params = await props.params;

    try {
        const { eldar, canonical } = parseWarhostFromSlugOrThrow(params.slug);
        const colourNames = eldar.colors.map((c) => c.name).join(", ");

        return {
            title: eldar.name,
            description: `Custom Aeldari warhost: ${eldar.name} using ${colourNames} in the "${eldar.pattern}" pattern.`,
            alternates: {
                canonical: `/warhost/${canonical}`,
            },
            openGraph: {
                title: eldar.name,
                description: `Aeldari colour scheme: ${colourNames} in the ${eldar.pattern} pattern.`,
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
                title: eldar.name,
                description: `Custom Aeldari warhost: ${eldar.name} using ${colourNames} in the "${eldar.pattern}" pattern.`,
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
        const { eldar, canonical } = parseWarhostFromSlugOrThrow(params.slug);
        if (canonical !== params.slug) redirect(`/warhost/${canonical}`);

        return (
            <>
                <GeneratorStoreHydrator generatorKey="eldar" entity={eldar} />
                <GeneratorView generatorKey="eldar" band={eldar} />
            </>
        );
    } catch {
        notFound();
    }
}
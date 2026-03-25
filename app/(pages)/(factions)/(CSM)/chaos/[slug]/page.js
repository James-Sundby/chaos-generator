import { redirect, notFound } from "next/navigation";
import { parseFromSlugOrThrow } from "@/utils/(faction wrappers)/warband";
import GeneratorStoreHydrator from "@/app/components/generator/generatorStoreHydrator";
import GeneratorView from "@/app/components/generator/generatorView";

export async function generateMetadata(props) {
    const params = await props.params;

    try {
        const { chaos, canonical } = parseFromSlugOrThrow(params.slug);
        const colourNames = chaos.colors.map((c) => c.name).join(", ");

        return {
            title: chaos.name,
            description: `Custom Chaos warband: ${chaos.name} using ${colourNames} in the "${chaos.pattern}" pattern.`,
            alternates: {
                canonical: `/chaos/${canonical}`,
            },
            openGraph: {
                title: chaos.name,
                description: `Chaos Space Marine scheme: ${colourNames} in the ${chaos.pattern} pattern.`,
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
                title: chaos.name,
                description: `Custom Chaos warband: ${chaos.name} using ${colourNames} in the "${chaos.pattern}" pattern.`,
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
        const { chaos, canonical } = parseFromSlugOrThrow(params.slug);
        console.log("params", params);
        if (canonical !== params.slug) redirect(`/chaos/${canonical}`);
        return (
            <>

                <GeneratorStoreHydrator generatorKey="chaos" entity={chaos} />
                <GeneratorView generatorKey="chaos" band={chaos} />
            </>
        );
    } catch {
        notFound();
    }
}

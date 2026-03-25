import { redirect, notFound } from "next/navigation";
import { parseFromSlugOrThrow } from "@/utils/(faction wrappers)/chapter";
import GeneratorView from "@/app/components/generator/generatorView";
import GeneratorStoreHydrator from "@/app/components/generator/generatorStoreHydrator";

export async function generateMetadata(props) {
    const params = await props.params;

    try {
        const { chapter, canonical } = parseFromSlugOrThrow(params.slug);
        const colorNames = chapter.colors.map((c) => c.name).join(", ");

        return {
            title: chapter.name,
            description: `Custom chapter: ${chapter.name} using ${colorNames}, in the "${chapter.pattern}" pattern.`,
            alternates: {
                canonical: `/chapter/${canonical}`,
            },
            openGraph: {
                title: chapter.name,
                description: `Custom Space Marine scheme: ${colorNames} in the ${chapter.pattern} pattern.`,
                url: `/chapter/${canonical}`,
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
                title: chapter.name,
                description: `Space Marine paint scheme: ${colorNames} in the "${chapter.pattern}" pattern.`,
                images: ["/card.png"],
            },
        };
    } catch {
        return {
            title: "Chapter Generator",
            description: "Generate or view a custom Space Marine chapter with random paint schemes.",
            alternates: {
                canonical: "/chapter",
            },
        };
    }
}

export default async function Page(props) {
    const params = await props.params;
    try {
        const { chapter, canonical } = parseFromSlugOrThrow(params.slug);
        if (canonical !== params.slug) redirect(`/chapter/${canonical}`);
        return (
            <>
                <GeneratorStoreHydrator generatorKey="chapter" entity={chapter} />
                <GeneratorView generatorKey="chapter" band={chapter} defaultModelKey="marine" />
            </>
        );
    } catch {
        notFound();
    }
}

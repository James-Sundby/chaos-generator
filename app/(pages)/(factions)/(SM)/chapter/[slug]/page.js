import { redirect, notFound } from "next/navigation";
import { parseEntity } from "@/utils/factionEntity";
import GeneratorStoreHydrator from "@/app/components/generator/generatorStoreHydrator";
import ChapterGeneratorView from "@/app/components/generator/views/chapterGeneratorView";

export async function generateMetadata(props) {
    const params = await props.params;

    try {
        const { entity: chapter, canonical } = parseEntity("chapter", params.slug);
        const colorNames = chapter.colors.map((c) => c.name).join(", ");

        return {
            title: chapter.name,
            description: `Custom chapter: ${chapter.name} using ${colorNames}, in the "${chapter.pattern}" pattern.`,
            alternates: {
                canonical: `/chapter/${canonical}`,
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
        const { entity: chapter, canonical } = parseEntity("chapter", params.slug);
        if (canonical !== params.slug) redirect(`/chapter/${canonical}`);

        return (
            <>
                <GeneratorStoreHydrator generatorKey="chapter" entity={chapter} />
                <ChapterGeneratorView band={chapter} defaultModelKey="marine" />
            </>
        );
    } catch {
        notFound();
    }
}
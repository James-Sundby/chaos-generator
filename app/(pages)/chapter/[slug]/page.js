import { redirect, notFound } from "next/navigation";
import { parseFromSlugOrThrow } from "@/utils/chapter";
import ChapterView from "@/app/components/chapterView";

export const dynamic = "force-static";

export async function generateMetadata(props) {
    const params = await props.params;
    try {
        const { chapter, canonical } = parseFromSlugOrThrow(params.slug);
        const colorNames = chapter.colors.map((c) => c.name).join(", ");

        return {
            title: chapter.warbandName,
            description: `Custom chapter: ${chapter.warbandName} using ${colorNames}, in the "${chapter.pattern}" pattern.`,
            openGraph: {
                title: chapter.warbandName,
                description: `Custom Space Marine scheme: ${colorNames} in the ${chapter.pattern} pattern.`,
                url: `https://chapter-gen.jsundby.dev/chapter/${canonical}`,
                siteName: "Chapter Generator",
                images: [{ url: "https://chapter-gen.jsundby.dev/card.png", width: 1200, height: 630, alt: "Line-art image of a Space Marine.  Text overlay: Stuck with primer? Generate a chapter and break the block." }],
                locale: "en_US",
                type: "website",
            },
            twitter: {
                title: chapter.warbandName,
                description: `Space Marine paint scheme: ${colorNames}, "${chapter.pattern}" pattern.`,
                card: "summary_large_image",
                images: [{ url: "https://chapter-gen.jsundby.dev/card.png", alt: "Line-art image of a Space Marine.  Text overlay: Stuck with primer? Generate a chapter and break the block." }],
            },
        };
    } catch {
        return {
            title: "Chapter Generator",
            description: "Generate or view a custom Space Marine chapter with random paint schemes.",
        };
    }
}

export default async function Page(props) {
    const params = await props.params;
    try {
        const { chapter, canonical } = parseFromSlugOrThrow(params.slug);
        if (canonical !== params.slug) redirect(`/chapter/${canonical}`);
        return <ChapterView initialChapter={chapter} />;
    } catch {
        notFound();
    }
}

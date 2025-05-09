// app/chapter/[slug]/page.tsx
import { parseChapterSlug } from "@/lib/slugParser";
import ChapterView from "@/app/components/chapterView";

export async function generateMetadata({ params }) {
    try {
        const { chapterName, colors, pattern, slug } = parseChapterSlug(params.slug);
        const colorNames = colors.map((c) => c.name).join(", ");

        return {
            title: `${chapterName}`,
            description: `Custom chapter: ${chapterName} using ${colorNames}, ${pattern} pattern.`,
            openGraph: {
                title: `${chapterName}`,
                description: `Custom Space Marine scheme: ${colorNames} + ${pattern}.`,
                url: `https://chapter-gen.jsundby.dev/chapter/${slug}`,
                siteName: "Chapter Generator",
                images: [
                    {
                        url: "/card.jpg",
                        width: 1200,
                        height: 630,
                        alt: "Paintbrushes in a jar. Text overlay: Stuck with primer? Generate a chapter and break the block.",
                    },
                ],
                locale: 'en_US',
                type: 'website',
            },
            twitter: {
                title: `${chapterName}`,
                description: `Space Marine paint scheme: ${colorNames}, ${pattern} pattern.`,
                card: 'summary_large_image',
                images: [
                    {
                        url: "/card.jpg",
                        alt: "Paintbrushes in a jar. Text overlay: Stuck with primer? Generate a chapter and break the block."
                    }
                ],
            },
        };
    } catch {
        return {
            title: "Chapter Generator",
            description: "Generate or view a custom Space Marine chapter with random paint schemes.",
        };
    }
}

export default function Page() {
    return <ChapterView />;
}

import FreePaint from "@/app/components/freePaint";

export const metadata = {
    title: "Loyalist Free Paint",
    description: "Customize your Space Marine down to the armor segment. Click to color each section and get a complete list of paints used.",
    openGraph: {
        title: "Loyalist Free Paint",
        description: "Use detailed armor selection to paint your Space Marine piece by piece.",
        url: "https://chapter-gen.jsundby.dev/open-paint",
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
        title: "Loyalist Free Paint",
        description: "Click to color each armor section and get a breakdown of paints used.",
        card: 'summary_large_image',
        images: [
            {
                url: "https://chapter-gen.jsundby.dev/card.jpg",
                alt: "Paintbrushes in a jar. Text overlay: Stuck with primer? Generate a chapter and break the block."
            }
        ],
    },
};


export default function Page() {
    return <FreePaint />;
}
import CustomizerChapter from "@/app/components/customizerChapter";

export const metadata = {
    title: "Custom Chapter",
    description: "Customize your own Space Marine chapter with hand-picked colours and armor patterns. Preview your scheme and generate a unique chapter ID.",
    openGraph: {
        title: "Custom Chapter",
        description: "Customize your own Space Marine chapter with hand-picked colours and armor patterns.",
        url: "https://chapter-gen.jsundby.dev/painter",
        siteName: "Chapter Generator",
        images: [
            {
                url: "https://chapter-gen.jsundby.dev/card.png",
                width: 1200,
                height: 630,
                alt: "Line-art image of a Space Marine.  Text overlay: Stuck with primer? Generate a chapter and break the block.",
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        title: "Custom Chapter",
        description: "Customize your own Space Marine chapter with hand-picked colours and armor patterns.",
        card: 'summary_large_image',
        images: [
            {
                url: "https://chapter-gen.jsundby.dev/card.png",
                alt: "Line-art image of a Space Marine.  Text overlay: Stuck with primer? Generate a chapter and break the block."
            }
        ],
    },
};


export default function Page() {
    return <CustomizerChapter />;
}
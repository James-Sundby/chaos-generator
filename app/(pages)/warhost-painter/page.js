import CustomizerWarhost from "@/app/components/customizerWarhost";

export const metadata = {
    title: "Custom Warhost",
    description:
        "Customize your custom Aeldari warhost with hand-picked colors and patterns. Preview armor schemes and generate a unique warhost ID.",
    openGraph: {
        title: "Custom Warhost",
        description:
            "Customize your custom Aeldari warhost with hand-picked colors and patterns.",
        url: "https://chapter-gen.jsundby.dev/warhost-painter",
        siteName: "Chapter Generator",
        images: [
            {
                url: "https://chapter-gen.jsundby.dev/card.png",
                width: 1200,
                height: 630,
                alt: "Line-art image of a Space Marine. Text overlay: Stuck with primer? Generate a chapter and break the block.",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        title: "Custom Warhost",
        description:
            "Customize your custom Aeldari warhost with hand-picked colors and patterns.",
        card: "summary_large_image",
        images: [
            {
                url: "https://chapter-gen.jsundby.dev/card.png",
                alt: "Line-art image of a Space Marine. Text overlay: Stuck with primer? Generate a chapter and break the block.",
            },
        ],
    },
};

export default function Page() {
    return <CustomizerWarhost />;
}

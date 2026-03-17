import CustomizerChapter from "@/app/components/wrappers/customizers/customizerChapter";

export const metadata = {
    title: "Chapter Painter",
    description:
        "Customize a Space Marine chapter with hand-picked colours and armour patterns. Preview your scheme and generate a unique chapter ID.",
    alternates: {
        canonical: "/painter",
    },
    openGraph: {
        title: "Chapter Painter",
        description:
            "Customize a Space Marine chapter with hand-picked colours and armour patterns.",
        url: "/painter",
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
        title: "Chapter Painter",
        description:
            "Customize a Space Marine chapter with hand-picked colours and armour patterns.",
        images: ["/card.png"],
    },
};


export default function Page() {
    return <CustomizerChapter />;
}
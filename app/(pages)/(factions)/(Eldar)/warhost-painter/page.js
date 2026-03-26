import EldarCustomizerView from "@/app/components/customizers/eldarCustomizerView";

export const metadata = {
    title: "Warhost Painter",
    description:
        "Customize an Aeldari warhost with hand-picked colours and armour patterns. Preview your scheme and generate a unique warhost ID.",
    alternates: {
        canonical: "/warhost-painter",
    },
    openGraph: {
        title: "Warhost Painter",
        description:
            "Customize an Aeldari warhost with hand-picked colours and armour patterns.",
        url: "/warhost-painter",
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
        title: "Warhost Painter",
        description:
            "Customize an Aeldari warhost with hand-picked colours and armour patterns.",
        images: ["/card.png"],
    },
};

export default function Page() {
    return <EldarCustomizerView />;
}
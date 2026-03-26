import ChaosCustomizerView from "@/app/components/customizers/chaosCustomizerView";

export const metadata = {
    title: "Chaos Warband Painter",
    description:
        "Customize a Chaos Space Marine warband with hand-picked colours and armour patterns. Preview your scheme and generate a unique shareable ID.",
    alternates: {
        canonical: "/chaos-painter",
    },
    openGraph: {
        title: "Chaos Warband Painter",
        description:
            "Customize a Chaos Space Marine warband with hand-picked colours and armour patterns.",
        url: "/chaos-painter",
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
        title: "Chaos Warband Painter",
        description:
            "Customize a Chaos Space Marine warband with hand-picked colours and armour patterns.",
        images: ["/card.png"],
    },
};


export default function Page() {
    return <ChaosCustomizerView />;
}

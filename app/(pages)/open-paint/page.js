import FreePaint from "@/app/components/(free paint)/freePaint";

export const metadata = {
    title: "Loyalist Free Paint Tool",
    description:
        "Customize a loyalist Space Marine scheme down to individual armour segments. Paint each section manually and get a full breakdown of colours used.",
    alternates: {
        canonical: "/open-paint",
    },
    openGraph: {
        title: "Loyalist Free Paint Tool",
        description:
            "Paint a loyalist Space Marine piece by piece with detailed armour section controls.",
        url: "/open-paint",
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
        title: "Loyalist Free Paint Tool",
        description:
            "Paint a loyalist Space Marine piece by piece with detailed armour section controls.",
        images: ["/card.png"],
    },
};


export default function Page() {
    return <FreePaint />;
}
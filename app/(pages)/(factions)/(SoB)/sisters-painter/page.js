import CustomizerEntry from "@/app/components/customizers/customizerEntry";

export const metadata = {
    title: "Order Painter",
    description:
        "Customize an Adepta Sororitas order with hand-picked colours and armour patterns. Preview your scheme and generate a unique order ID.",
    alternates: {
        canonical: "/sisters-painter",
    },
    openGraph: {
        title: "Order Painter",
        description:
            "Customize an Adepta Sororitas order with hand-picked colours and armour patterns.",
        url: "/sisters-painter",
        images: [
            {
                url: "/card.png",
                width: 1200,
                height: 630,
                alt: "Line-art image of a Battle Sister. Text overlay: Design a custom Adepta Sororitas order.",
            },
        ],
    },
    twitter: {
        title: "Order Painter",
        description:
            "Customize an Adepta Sororitas order with hand-picked colours and armour patterns.",
        images: ["/card.png"],
    },
};

export default function Page() {
    return <CustomizerEntry generatorKey="sisters" />;
}
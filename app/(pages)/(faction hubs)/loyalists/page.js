import FactionHub from "@/app/components/factionHub";
import SpaceMarine from "@/lib/models/spaceMarine";

export const metadata = {
    title: "Loyalist Forge",
    description:
        "Generate paint schemes for loyalist Imperial forces, including Space Marines and other defenders of the Throne.",
    alternates: {
        canonical: "/loyalists",
    },
    openGraph: {
        title: "Loyalist Forge | Chapter Generator",
        description:
            "Generate paint schemes for loyalist Imperial forces, including Space Marines and other defenders of the Throne.",
        url: "/loyalists",
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
        title: "Loyalist Forge | Chapter Generator",
        description:
            "Generate paint schemes for loyalist Imperial forces, including Space Marines and other defenders of the Throne.",
        images: ["/card.png"],
    },
};

const loyalistCards = [
    {
        key: "space-marines",
        label: "Astartes",
        title: "SPACE\nMARINES",
        mobileTitle: "SPACE MARINES",
        body: "Generate schemes worthy of the Adeptus Astartes, from ancient brotherhoods to newly founded scions of the Imperium.",
        tags: ["Space Marines"],
        href: "/chapter",
        generatorKey: "chapter",
        accentBarClass: "bg-faction-loyalist",
        badgeClass: "badge-loyalist",
        buttonClass: "btn-primary",
        ghostModel: SpaceMarine,
        ghostModelProps: {
            primary: "#d9d9d9",
            secondary: "#d9d9d9",
            trim: "#d9d9d9",
            pattern: "Shoulders",
        },
        status: "live",
    },
    {
        key: "sisters",
        label: "Sororitas",
        title: "SISTERS\nOF\nBATTLE",
        mobileTitle: "SISTERS OF BATTLE",
        body: "Coming soon: armour, robes, and sacred colours fit for the Emperor's most zealous daughters.",
        accentBarClass: "bg-faction-loyalist",
        badgeClass: "badge-loyalist",
        buttonClass: "btn-primary",
        status: "coming-soon",
    },
];

export default function LoyalistsPage() {
    return (
        <FactionHub
            eyebrow="Loyalist Archive"
            title="Loyalist Forge"
            intro="Generate schemes for the Imperium's loyal defenders, from the Adeptus Astartes to other faithful servants of the Throne."
            cards={loyalistCards}
            cogitator={{
                eyebrow: "Loyalist Archive",
                title: "Sanctioned Access",
                lines: [
                    "> Imperial heraldry protocols active.",
                    "> Approved chapter records available for review.",
                    "> Additional loyalist designations pending archive expansion.",
                    "> Clearance maintained.",
                ],
            }}
        />
    );
}
import FactionHub from "@/app/components/factionHub";
import ChaosMarine from "@/app/components/models/chaosSpaceMarine";

export const metadata = {
    title: "Chaos Forge",
    description:
        "Generate corrupted paint schemes for Chaos Space Marines, traitor warbands, and profane heraldry inspired by the Long War.",
    alternates: {
        canonical: "/chaos-hub",
    },
    openGraph: {
        title: "Chaos Forge | Chapter Generator",
        description:
            "Generate corrupted paint schemes for Chaos Space Marines, traitor warbands, and profane heraldry inspired by the Long War.",
        url: "/chaos-hub",
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
        title: "Chaos Forge | Chapter Generator",
        description:
            "Generate corrupted paint schemes for Chaos Space Marines, traitor warbands, and profane heraldry inspired by the Long War.",
        images: ["/card.png"],
    },
};

const chaosCards = [
    {
        key: "chaos-marines",
        label: "Heretic Astartes",
        title: "CHAOS\nSPACE\nMARINES",
        mobileTitle: "CHAOS MARINES",
        body: "Forge corrupted schemes worthy of traitor warbands, blasphemous heraldry, and armour long given over to ruin.",
        href: "/chaos",
        generatorKey: "chaos",
        accentBarClass: "bg-faction-chaos",
        badgeClass: "badge-chaos",
        buttonClass: "btn-primary",
        ghostModel: ChaosMarine,
        ghostModelProps: {
            primary: "#d9d9d9",
            secondary: "#d9d9d9",
            edge: "#d9d9d9",
            accent: "#d9d9d9",
            pattern: "Basic",
        },
        status: "live",
    },
];

export default function ChaosHubPage() {
    return (
        <FactionHub
            eyebrow="Heretic Archive"
            title="Chaos Forge"
            intro="Create corrupted schemes for traitor warbands, profane heraldry, and forces shaped by the Long War."
            cards={chaosCards}
            cogitator={{
                eyebrow: "Heretic Archive",
                title: "Corruption Notice",
                lines: [
                    "> Archive purity compromised.",
                    "> Profane heraldic records detected.",
                    "> Multiple warband identities remain unstable.",
                    "> Proceed with due suspicion.",
                ],
            }}
        />
    );
}
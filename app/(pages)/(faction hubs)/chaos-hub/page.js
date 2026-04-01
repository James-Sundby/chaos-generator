import FactionHub from "@/app/components/factionHub";
import { createWarbandAndGo } from "@/app/(actions)/serverActions";
import { meta as chaosMeta } from "@/lib/factions/chaos/meta";
import ChaosMarine from "@/lib/factions/chaos/models/chaosSpaceMarine";

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
        createAction: createWarbandAndGo,
        noun: chaosMeta.noun,
        generateLabel: chaosMeta.copy.generateLabel,
        accentBarClass: chaosMeta.faction.accentBarClass,
        badgeClass: chaosMeta.faction.badgeClass,
        buttonClass: chaosMeta.buttonTheme,
        ghostModel: ChaosMarine,
        ghostModelInput: {
            colors: [
                { name: "Test", hex: "#d6d6d6", type: "Base" },
                { name: "Test", hex: "#d6d6d6", type: "Base" },
                { name: "Test", hex: "#d6d6d6", type: "Base" },
                { name: "Test", hex: "#d6d6d6", type: "Base" },
            ],
            pattern: "Basic",
        },
        ghostModelGetProps: ({ colors, pattern }) => ({
            primary: colors[0],
            secondary: colors[1],
            accent: colors[2],
            edge: colors[3],
            pattern,
        }),
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
            meta={{
                archive: "Heretic Archive",
                era: "M41",
                location: "Eye of Terror // Classified",
                status: "Status: Compromised",
                statusClassName: "text-faction-chaos",
            }}
        />
    );
}
import FactionHub from "@/app/components/factionHub";
import EldarAvenger from "@/lib/factions/eldar/models/eldarAvenger";

export const metadata = {
    title: "Xenos Forge",
    description:
        "Generate paint schemes for alien warhosts, xenos factions, and non-Imperial forces including Aeldari-inspired designs.",
    alternates: {
        canonical: "/xenos",
    },
    openGraph: {
        title: "Xenos Forge | Chapter Generator",
        description:
            "Generate paint schemes for alien warhosts, xenos factions, and non-Imperial forces including Aeldari-inspired designs.",
        url: "/xenos",
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
        title: "Xenos Forge | Chapter Generator",
        description:
            "Generate paint schemes for alien warhosts, xenos factions, and non-Imperial forces including Aeldari-inspired designs.",
        images: ["/card.png"],

    },
};

const xenosCards = [
    {
        key: "aeldari",
        label: "Aeldari",
        title: "AELDARI\nWARHOST",
        mobileTitle: "AELDARI WARHOST",
        body: "Generate sleek xenos schemes for the warhosts of an ancient, dying alien empire.",
        href: "/warhost",
        generatorKey: "eldar",
        accentBarClass: "bg-faction-xenos",
        badgeClass: "badge-xenos",
        buttonClass: "btn-primary",
        ghostModel: EldarAvenger,
        ghostModelProps: {
            primary: "#d9d9d9",
            secondary: "#d9d9d9",
            accent: "#d9d9d9",
            pattern: "1",
        },
        status: "live",
    },
    {
        key: "tau",
        label: "T'au Empire",
        title: "T'AU\nHUNTER\nCADRE",
        mobileTitle: "T'AU HUNTER CADRE",
        body: "Coming soon: sept colours, pristine armour, and disciplined schemes in service to the Greater Good.",
        accentBarClass: "bg-faction-xenos",
        badgeClass: "badge-xenos",
        buttonClass: "btn-primary",
        ghost: "T",
        status: "coming-soon",
    },
];

export default function XenosPage() {
    return (
        <FactionHub
            eyebrow="Xenos Archive"
            title="Xenos Forge"
            intro="Generate schemes for alien forces beyond the Imperium, from ancient warhosts to fast-striking hunter cadres."
            cards={xenosCards}
            cogitator={{
                eyebrow: "Xenos Archive",
                title: "Non-Imperial Classification",
                lines: [
                    "> Alien pattern logic detected.",
                    "> Non-compliant visual systems catalogued.",
                    "> Additional xenos records pending assimilation.",
                    "> Purity seals advised.",
                ],
            }}
            meta={{
                archive: "Xenos Archive",
                era: "M41",
                location: "Ordo Xenos // Restricted",
                status: "Status: Monitored",
                statusClassName: "text-faction-xenos",
            }}
        />
    );
}
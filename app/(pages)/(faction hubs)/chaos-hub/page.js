import FactionHub from "@/app/components/factionHub";
import ChaosMarine from "@/app/components/models/chaosSpaceMarine";

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
        />
    );
}
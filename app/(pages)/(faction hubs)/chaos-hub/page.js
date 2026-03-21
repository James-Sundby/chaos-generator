import FactionHub from "@/app/components/factionHub";
import ChaosMarine from "@/app/components/models/chaosSpaceMarine";

const chaosCards = [
    {
        key: "chaos-marines",
        label: "Heretic Astartes",
        title: "CHAOS\nSPACE\nMARINES",
        mobileTitle: "CHAOS MARINES",
        body: "Create warbands, corrupted heraldry, and traitor paint schemes with stronger contrast and trim options.",
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
            intro="Build warband identities, corrupted armour schemes, and faction palettes drawn from the long war."
            cards={chaosCards}
        />
    );
}
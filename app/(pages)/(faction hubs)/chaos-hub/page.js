import FactionHub from "@/app/components/factionHub";

const chaosCards = [
    {
        key: "chaos-marines",
        label: "Heretic Astartes",
        title: "CHAOS\nSPACE\nMARINES",
        mobileTitle: "CHAOS MARINES",
        body: "Create warbands, corrupted heraldry, and traitor paint schemes with stronger contrast and trim options.",
        href: "/chaos",
        generatorKey: "chaos",
        accentBar: "bg-accent",
        badgeClass: "badge-accent",
        buttonClass: "btn-accent",
        ghost: "Ω",
        status: "live",
    }
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
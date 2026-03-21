import FactionHub from "@/app/components/factionHub";

import SpaceMarine from "@/app/components/models/spaceMarine";

const loyalistCards = [
    {
        key: "space-marines",
        label: "Astartes",
        title: "SPACE\nMARINES",
        mobileTitle: "SPACE MARINES",
        body: "Generate and customize loyalist chapter schemes for your next army or painting project.",
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
        body: "Placeholder hub for ecclesiastic armour palettes, robes, and Order colour layouts.",
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
            intro="Generate sanctioned heraldry, regiment colours, and faithful wargear schemes for defenders of the Imperium."
            cards={loyalistCards}
        />
    );
}
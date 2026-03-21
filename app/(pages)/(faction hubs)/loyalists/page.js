import FactionHub from "@/app/components/factionHub";

import SpaceMarine from "@/app/components/models/spaceMarine";

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
            intro="Generate schemes for the Imperium’s loyal defenders, from the Adeptus Astartes to other faithful servants of the Throne."
            cards={loyalistCards}
        />
    );
}
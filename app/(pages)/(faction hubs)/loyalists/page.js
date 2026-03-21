import FactionHub from "@/app/components/factionHub";

const loyalistCards = [
    {
        key: "space-marines",
        label: "Astartes",
        title: "SPACE\nMARINES",
        mobileTitle: "SPACE MARINES",
        body: "Generate and customize loyalist chapter schemes for your next army or painting project.",
        href: "/chapter",
        generatorKey: "chapter",
        accentBar: "bg-primary",
        badgeClass: "badge-primary",
        buttonClass: "btn-primary",
        ghost: "A",
        status: "live",
    },
    {
        key: "sisters",
        label: "Sororitas",
        title: "SISTERS\nOF\nBATTLE",
        mobileTitle: "SISTERS OF BATTLE",
        body: "Placeholder hub for ecclesiastic armour palettes, robes, and Order colour layouts.",
        accentBar: "bg-secondary",
        badgeClass: "badge-secondary",
        buttonClass: "btn-secondary",
        ghost: "✦",
        status: "coming-soon",
    },
    // {
    //     key: "guard",
    //     label: "Militarum",
    //     title: "IMPERIAL\nGUARD",
    //     mobileTitle: "IMPERIAL GUARD",
    //     body: "Placeholder hub for regiment uniforms, armour panels, and practical campaign colour schemes.",
    //     accentBar: "bg-accent",
    //     badgeClass: "badge-accent",
    //     buttonClass: "btn-accent",
    //     ghost: "I",
    //     status: "coming-soon",
    // },
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
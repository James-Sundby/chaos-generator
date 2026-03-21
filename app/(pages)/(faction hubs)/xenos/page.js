import FactionHub from "@/app/components/factionHub";
import EldarAvenger from "@/app/components/models/eldarAvenger";

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
        />
    );
}
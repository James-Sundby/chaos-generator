import FactionHub from "@/app/components/factionHub";
import EldarAvenger from "@/app/components/models/eldarAvenger";

const xenosCards = [
    {
        key: "aeldari",
        label: "Aeldari",
        title: "AELDARI\nWARHOST",
        mobileTitle: "AELDARI WARHOST",
        body: "Explore Eldar-inspired palettes, patterns, and cleaner alien colour layouts for custom hosts.",
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
        body: "Placeholder hub for sept colours, clean panel armour, and disciplined ranged-war aesthetic schemes.",
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
            intro="Access alien war palettes, non-imperial heraldry, and distinct visual systems for custom xenos factions."
            cards={xenosCards}
        />
    );
}
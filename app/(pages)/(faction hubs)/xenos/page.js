import FactionHub from "@/app/components/factionHub";

const xenosCards = [
    {
        key: "aeldari",
        label: "Aeldari",
        title: "AELDARI\nWARHOST",
        mobileTitle: "AELDARI WARHOST",
        body: "Explore Eldar-inspired palettes, patterns, and cleaner alien colour layouts for custom hosts.",
        href: "/warhost",
        generatorKey: "eldar",
        accentBar: "bg-info",
        badgeClass: "badge-info",
        buttonClass: "btn-info",
        ghost: "A",
        status: "live",
    },
    {
        key: "tau",
        label: "T'au Empire",
        title: "T'AU\nHUNTER\nCADRE",
        mobileTitle: "T'AU HUNTER CADRE",
        body: "Placeholder hub for sept colours, clean panel armour, and disciplined ranged-war aesthetic schemes.",
        accentBar: "bg-secondary",
        badgeClass: "badge-secondary",
        buttonClass: "btn-secondary",
        ghost: "T",
        status: "coming-soon",
    },
    // {
    //     key: "orks",
    //     label: "Orks",
    //     title: "ORK\nWARBAND",
    //     mobileTitle: "ORK WARBAND",
    //     body: "Placeholder hub for scrap-built armour, clan-inspired palettes, and loud high-contrast combinations.",
    //     accentBar: "bg-success",
    //     badgeClass: "badge-success",
    //     buttonClass: "btn-success",
    //     ghost: "W",
    //     status: "coming-soon",
    // },
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
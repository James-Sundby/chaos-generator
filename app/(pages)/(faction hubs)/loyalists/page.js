import FactionHub from "@/app/components/factionHub";
import { createChapterAndGo, createSistersAndGo } from "@/app/(actions)/serverActions";
import { meta as chapterMeta } from "@/lib/factions/chapter/meta";
import { meta as sistersMeta } from "@/lib/factions/sisters/meta";
import SpaceMarine from "@/lib/factions/chapter/models/spaceMarine";
import SisterOfBattle from "@/lib/factions/sisters/models/sisterOfBattle";

export const metadata = {
    title: "Loyalist Forge",
    description:
        "Generate paint schemes for loyalist Imperial forces, including Space Marines and other defenders of the Throne.",
    alternates: {
        canonical: "/loyalists",
    },
    openGraph: {
        title: "Loyalist Forge | Chapter Generator",
        description:
            "Generate paint schemes for loyalist Imperial forces, including Space Marines and other defenders of the Throne.",
        url: "/loyalists",
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
        title: "Loyalist Forge | Chapter Generator",
        description:
            "Generate paint schemes for loyalist Imperial forces, including Space Marines and other defenders of the Throne.",
        images: ["/card.png"],
    },
};

const loyalistCards = [
    {
        key: "space-marines",
        label: "Astartes",
        title: "SPACE\nMARINES",
        mobileTitle: "SPACE MARINES",
        body: "Generate schemes worthy of the Adeptus Astartes, from ancient brotherhoods to newly founded scions of the Imperium.",
        tags: ["Space Marines"],
        href: "/chapter",
        createAction: createChapterAndGo,
        noun: chapterMeta.noun,
        generateLabel: chapterMeta.copy.generateLabel,
        accentBarClass: chapterMeta.faction.accentBarClass,
        badgeClass: chapterMeta.faction.badgeClass,
        buttonClass: chapterMeta.buttonTheme,
        ghostModel: SpaceMarine,
        ghostModelInput: {
            colors: [
                { name: "Test", hex: "#d6d6d6", type: "Base" },
                { name: "Test", hex: "#d6d6d6", type: "Base" },
                { name: "Test", hex: "#d6d6d6", type: "Base" },
            ],
            pattern: "Shoulders",
        },
        ghostModelGetProps: ({ colors, pattern }) => ({
            primary: colors[0],
            secondary: colors[1],
            trim: colors[2],
            pattern,
        }),
        status: "live",
    },
    {
        key: "sisters",
        label: "Sororitas",
        title: "SISTERS\nOF\nBATTLE",
        mobileTitle: "SISTERS OF BATTLE",
        body: "Generate sacred armour schemes for the Adepta Sororitas, with disciplined heraldry, ceremonial contrast, and colours fit for the Emperor's most zealous daughters.",
        tags: ["Adepta Sororitas"],
        href: "/sisters",
        createAction: createSistersAndGo,
        noun: sistersMeta.noun,
        generateLabel: sistersMeta.copy.generateLabel,
        accentBarClass: sistersMeta.faction.accentBarClass,
        badgeClass: sistersMeta.faction.badgeClass,
        buttonClass: sistersMeta.buttonTheme,
        ghostModel: SisterOfBattle,
        ghostModelInput: {
            colors: [
                { name: "Test", hex: "#d6d6d6", type: "Base" },
                { name: "Test", hex: "#d6d6d6", type: "Base" },
                { name: "Test", hex: "#d6d6d6", type: "Base" },
                { name: "Test", hex: "#d6d6d6", type: "Base" },
            ],
            pattern: "1",
        },
        ghostModelGetProps: ({ colors, pattern }) => ({
            primary: colors[0],
            secondary: colors[1],
            edge: colors[2],
            accent: colors[3],
            pattern,
        }),
        status: "live",
    },
];

export default function LoyalistsPage() {
    return (
        <FactionHub
            eyebrow="Loyalist Archive"
            title="Loyalist Forge"
            intro="Generate schemes for the Imperium's loyal defenders, from the Adeptus Astartes to other faithful servants of the Throne."
            cards={loyalistCards}
            cogitator={{
                eyebrow: "Loyalist Archive",
                title: "Sanctioned Access",
                lines: [
                    "> Imperial heraldry protocols active.",
                    "> Approved chapter records available for review.",
                    "> Additional loyalist designations pending archive expansion.",
                    "> Clearance maintained.",
                ],
            }}
            meta={{
                archive: "Imperial Archive",
                era: "M41",
                location: "Segmentum Solar // Sol",
                status: "Status: Operational",
                statusClassName: "text-faction-loyalist",
            }}
        />
    );
}
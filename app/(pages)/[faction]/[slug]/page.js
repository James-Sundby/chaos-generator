import { redirect, notFound } from "next/navigation";
import { parseEntity } from "@/utils/factionEntity";
import { getFactionMeta } from "@/lib/factions/public";
import GeneratorStoreHydrator from "@/app/components/generator/generatorStoreHydrator";
import { loadGeneratorView } from "@/app/components/generator/views/loadGeneratorView";

function formatFactionLabel(meta, fallback) {
    return meta?.copy?.classification ?? meta?.variant ?? fallback;
}

function buildDescription(entity, meta) {
    const colourNames = entity.colors.map((c) => c.name).join(", ");
    const label = formatFactionLabel(meta, entity.faction);

    return `Custom ${label}: ${entity.name} using ${colourNames} in the "${entity.pattern}" pattern.`;
}

export async function generateMetadata(props) {
    const params = await props.params;
    const faction = String(params.faction ?? "").toLowerCase();

    try {
        const meta = getFactionMeta(faction);
        const { entity, canonical } = parseEntity(faction, params.slug);
        const colourNames = entity.colors.map((c) => c.name).join(", ");
        const label = formatFactionLabel(meta, faction);

        return {
            title: entity.name,
            description: buildDescription(entity, meta),
            alternates: {
                canonical: `/${faction}/${canonical}`,
            },
            openGraph: {
                title: entity.name,
                description: `${label} scheme: ${colourNames} in the ${entity.pattern} pattern.`,
                url: `/${faction}/${canonical}`,
                images: [
                    {
                        url: "/card.png",
                        width: 1200,
                        height: 630,
                        alt: "Line-art miniature paint scheme generator preview.",
                    },
                ],
            },
            twitter: {
                title: entity.name,
                description: buildDescription(entity, meta),
                images: ["/card.png"],
            },
        };
    } catch {
        return {
            title: "Paint Scheme Generator",
            description: "Create or view custom miniature paint schemes.",
            alternates: {
                canonical: `/${faction}`,
            },
        };
    }
}

export default async function Page(props) {
    const params = await props.params;
    const faction = String(params.faction ?? "").toLowerCase();

    let entity;
    let canonical;

    try {
        getFactionMeta(faction);

        const parsed = parseEntity(faction, params.slug);
        entity = parsed.entity;
        canonical = parsed.canonical;
    } catch {
        notFound();
    }

    if (canonical !== params.slug) {
        redirect(`/${faction}/${canonical}`);
    }

    const GeneratorView = await loadGeneratorView(faction);

    return (
        <>
            <GeneratorStoreHydrator generatorKey={faction} entity={entity} />
            <GeneratorView band={entity} />
        </>
    );
}
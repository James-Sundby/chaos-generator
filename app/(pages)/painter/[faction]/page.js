import { notFound } from "next/navigation";
import { getFactionMeta } from "@/lib/factions/public";
import { loadCustomizerView } from "@/app/components/customizers/views/loadCustomizerView";

export async function generateMetadata(props) {
    const params = await props.params;
    const faction = String(params.faction ?? "").toLowerCase();

    try {
        const meta = getFactionMeta(faction);
        const label = meta?.copy?.classification ?? meta?.variant ?? faction;

        return {
            title: `Customize ${label}`,
            description: `Customize the colours and pattern for this ${label} paint scheme.`,
            alternates: {
                canonical: `/painter/${faction}`,
            },
        };
    } catch {
        return {
            title: "Scheme Painter",
            description: "Customize a miniature paint scheme.",
            alternates: {
                canonical: "/painter",
            },
        };
    }
}

export default async function Page(props) {
    const params = await props.params;
    const faction = String(params.faction ?? "").toLowerCase();

    try {
        getFactionMeta(faction);

        const CustomizerView = await loadCustomizerView(faction);

        return <CustomizerView />;
    } catch {
        notFound();
    }
}
import { redirect, notFound } from "next/navigation";
import { parseEntity } from "@/utils/factionEntity";
import GeneratorView from "@/app/components/generator/generatorView";
import GeneratorStoreHydrator from "@/app/components/generator/generatorStoreHydrator";

export async function generateMetadata(props) {
    const params = await props.params;

    try {
        const { entity: sisters, canonical } = parseEntity("sisters", params.slug);
        const colorNames = sisters.colors.map((c) => c.name).join(", ");

        return {
            title: sisters.name,
            description: `Custom order: ${sisters.name} using ${colorNames}, in the "${sisters.pattern}" pattern.`,
            alternates: {
                canonical: `/sisters/${canonical}`,
            },
            openGraph: {
                title: sisters.name,
                description: `Custom Adepta Sororitas scheme: ${colorNames} in the ${sisters.pattern} pattern.`,
                url: `/sisters/${canonical}`,
                images: [
                    {
                        url: "/card.png",
                        width: 1200,
                        height: 630,
                        alt: "Line-art image of a Battle Sister. Text overlay: Design a custom Adepta Sororitas order.",
                    },
                ],
            },
            twitter: {
                title: sisters.name,
                description: `Adepta Sororitas paint scheme: ${colorNames} in the "${sisters.pattern}" pattern.`,
                images: ["/card.png"],
            },
        };
    } catch {
        return {
            title: "Order Generator",
            description: "Generate or view a custom Adepta Sororitas order with random paint schemes.",
            alternates: {
                canonical: "/sisters",
            },
        };
    }
}

export default async function Page(props) {
    const params = await props.params;

    try {
        const { entity: sisters, canonical } = parseEntity("sisters", params.slug);
        if (canonical !== params.slug) redirect(`/sisters/${canonical}`);
        return (
            <>
                <GeneratorStoreHydrator generatorKey="sisters" entity={sisters} />
                <GeneratorView generatorKey="sisters" band={sisters} />
            </>
        );
    } catch {
        notFound();
    }
}
import { redirect, notFound } from "next/navigation";
import { parseFromSlugOrThrow } from "@/utils/(faction wrappers)/sisters";
import GeneratorView from "@/app/components/generator/generatorView";
import GeneratorStoreHydrator from "@/app/components/generator/generatorStoreHydrator";

export async function generateMetadata(props) {
    const params = await props.params;

    try {
        const { order, canonical } = parseFromSlugOrThrow(params.slug);
        const colorNames = order.colors.map((c) => c.name).join(", ");

        return {
            title: order.warbandName,
            description: `Custom order: ${order.warbandName} using ${colorNames}, in the "${order.pattern}" pattern.`,
            alternates: {
                canonical: `/sisters/${canonical}`,
            },
            openGraph: {
                title: order.warbandName,
                description: `Custom Adepta Sororitas scheme: ${colorNames} in the ${order.pattern} pattern.`,
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
                title: order.warbandName,
                description: `Adepta Sororitas paint scheme: ${colorNames} in the "${order.pattern}" pattern.`,
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
        const { order, canonical } = parseFromSlugOrThrow(params.slug);
        if (canonical !== params.slug) redirect(`/sisters/${canonical}`);
        return (
            <>
                <GeneratorStoreHydrator generatorKey="sisters" entity={order} />
                <GeneratorView generatorKey="sisters" band={order} />
            </>
        );
    } catch {
        notFound();
    }
}
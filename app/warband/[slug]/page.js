import { parseSlug } from "../../_utils/helpers.js";
import TradingCard from "@/app/components/trading-card.js";

export default function WarbandPage({ params }) {
    const { slug } = params;
    const { warbandName, namedColors, capitalizedPattern, metal } = parseSlug(slug);

    return (
        <div className="flex flex-1 justify-center mt-4">
            <TradingCard
                warbandName={warbandName}
                namedColors={namedColors}
                slug={slug}
                patternName={capitalizedPattern}
                metal={metal}
            />
        </div>
    );
}

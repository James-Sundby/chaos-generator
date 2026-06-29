import GeneratorViewShell from "@/app/components/generator/generatorViewShell";
import ChapterTradingCardPane from "@/app/components/generator/panes/chapterTradingCardPane";
import { chapterGenerator } from "@/lib/generators/chapter";

export default function ChapterGeneratorView({
    band,
    defaultModelKey = "marine",
}) {
    return (
        <GeneratorViewShell
            generatorKey="chapter"
            generator={chapterGenerator}
            band={band}
            defaultModelKey={defaultModelKey}
            TradingCardPane={ChapterTradingCardPane}
        />
    );
}
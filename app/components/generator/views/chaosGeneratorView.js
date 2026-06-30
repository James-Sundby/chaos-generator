import GeneratorViewShell from "@/app/components/generator/generatorViewShell";
import ChaosTradingCardPane from "@/app/components/generator/panes/chaosTradingCardPane";
import { chaosGenerator } from "@/lib/generators/chaos";

export default function ChaosGeneratorView({
    band,
    defaultModelKey,
}) {
    return (
        <GeneratorViewShell
            generatorKey="chaos"
            generator={chaosGenerator}
            band={band}
            defaultModelKey={defaultModelKey}
            TradingCardPane={ChaosTradingCardPane}
        />
    );
}
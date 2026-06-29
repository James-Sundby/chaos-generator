import GeneratorViewShell from "@/app/components/generator/generatorViewShell";
import EldarTradingCardPane from "@/app/components/generator/panes/eldarTradingCardPane";
import { eldarGenerator } from "@/lib/generators/eldar";

export default function EldarGeneratorView({
    band,
    defaultModelKey,
}) {
    return (
        <GeneratorViewShell
            generatorKey="eldar"
            generator={eldarGenerator}
            band={band}
            defaultModelKey={defaultModelKey}
            TradingCardPane={EldarTradingCardPane}
        />
    );
}
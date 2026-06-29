import GeneratorViewShell from "@/app/components/generator/generatorViewShell";
import SistersTradingCardPane from "@/app/components/generator/panes/sistersTradingCardPane";
import { sistersGenerator } from "@/lib/generators/sisters";

export default function SistersGeneratorView({
    band,
    defaultModelKey,
}) {
    return (
        <GeneratorViewShell
            generatorKey="sisters"
            generator={sistersGenerator}
            band={band}
            defaultModelKey={defaultModelKey}
            TradingCardPane={SistersTradingCardPane}
        />
    );
}
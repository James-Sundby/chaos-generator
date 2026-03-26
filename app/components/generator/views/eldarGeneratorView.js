import GeneratorActions from "@/app/components/generator/generatorActions";
import GeneratorModelProvider from "@/app/components/generator/generatorModelProvider";
import GeneratorModelSwitcher from "@/app/components/generator/generatorModelSwitcher";
import EldarTradingCardPane from "@/app/components/generator/panes/eldarTradingCardPane";
import { eldarGenerator } from "@/lib/generators/eldar";

function pickStableText(options = [], seed = "") {
    if (!options.length) return null;

    let hash = 0;
    for (let i = 0; i < seed.length; i += 1) {
        hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }

    return options[hash % options.length];
}

function formatMode(mode) {
    if (!mode) return "";

    const normalized = String(mode).toLowerCase();

    if (normalized === "splitcomplementary") {
        return "Split Complementary";
    }

    return String(mode)
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function EldarGeneratorView({
    band,
    defaultModelKey = "marine",
}) {
    const generator = eldarGenerator;
    const copy = generator.copy ?? {};
    const faction = generator.faction ?? {};

    const modelOptions = Object.entries(generator.models ?? {}).map(([key, model]) => ({
        key,
        label: model.label,
    }));

    const hasMultipleModels = modelOptions.length > 1;

    const displayName =
        band?.name ?? band?.warbandName ?? `Unknown ${generator.variant}`;

    const prettyMode = formatMode(band?.mode);

    const heroDescription =
        pickStableText(copy.heroDescriptions ?? [], band?.slug ?? displayName) ??
        copy.heroDescription ??
        "Technical readouts indicate a viable faction identity suitable for refinement, customization, or archive preservation.";

    return (
        <GeneratorModelProvider
            modelOptions={modelOptions}
            defaultModelKey={defaultModelKey}
        >
            <section className="mx-auto my-auto flex w-full max-w-7xl flex-col items-center justify-center gap-6 md:flex-row md:items-stretch lg:gap-16">
                <EldarTradingCardPane
                    band={band}
                    displayName={displayName}
                />

                <div className="flex w-full max-w-105 flex-col gap-4 md:flex-1">
                    <div className="hidden md:block">
                        <h1 className="hidden text-3xl font-black uppercase leading-none tracking-tight sm:text-4xl lg:text-5xl md:block">
                            {displayName}
                        </h1>

                        <p className="mt-4 max-w-xl text-sm leading-relaxed text-base-content/70 md:text-base">
                            {heroDescription}
                        </p>
                    </div>

                    {hasMultipleModels && (
                        <div className="hidden py-4 md:block">
                            <div className="mb-4 flex items-center justify-between gap-4">
                                <span className="text-sm font-bold uppercase tracking-[0.18em]">
                                    {copy.modelSectionLabel ?? "Model Designation"}
                                </span>
                            </div>

                            <GeneratorModelSwitcher className="join flex w-full" />
                        </div>
                    )}

                    <GeneratorActions
                        createAction={generator.createAction}
                        noun={generator.noun}
                        variant={generator.variant}
                        painterPath={generator.painterPath}
                        basePath={generator.basePath}
                        copy={copy}
                        group={generator.group}
                        generatorKey="eldar"
                        band={band}
                        displayName={displayName}
                    />
                </div>
            </section>
        </GeneratorModelProvider>
    );
}
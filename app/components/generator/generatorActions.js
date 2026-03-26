import { generatorRegistry } from "@/lib/generators";

import GenerateNewButton from "@/app/components/generateNewButton";
import CustomizerButton from "@/app/components/customizerButton";
import ShareButton from "@/app/components/shareButton";
import RecentSchemeRecorder from "../recentSchemeRecorder";

export default function GeneratorActions({
    generatorKey,
    band,
    displayName,
}) {
    const generator = generatorRegistry[generatorKey] ?? generatorRegistry.chapter;
    const copy = generator.copy ?? {};

    return (
        <>
            <RecentSchemeRecorder generatorKey={generatorKey} band={band} />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <div className="sm:col-span-2">
                    <GenerateNewButton
                        generatorKey={generatorKey}
                        label={copy.generateLabel ?? `Generate New ${generator.variant}`}
                    />
                </div>

                <div className="w-full">
                    <CustomizerButton generatorKey={generatorKey} />
                </div>

                <div className="w-full">
                    <ShareButton
                        generatorKey={generatorKey}
                        slug={band?.slug}
                        title={displayName}
                    />
                </div>
            </div>
        </>
    );
}
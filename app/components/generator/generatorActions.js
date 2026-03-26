import GenerateNewButton from "@/app/components/generateNewButton";
import CustomizerButton from "@/app/components/customizerButton";
import ShareButton from "@/app/components/shareButton";
import RecentSchemeRecorder from "@/app/components/recentSchemeRecorder";

export default function GeneratorActions({
    createAction,
    noun,
    variant,
    painterPath,
    basePath,
    copy,
    group,
    generatorKey,
    band,
    displayName,
}) {
    return (
        <>
            <RecentSchemeRecorder
                generatorKey={generatorKey}
                band={band}
                variant={variant}
                classification={copy?.classification ?? ""}
                group={group}
                basePath={basePath}
            />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <div className="sm:col-span-2">
                    <GenerateNewButton
                        action={createAction}
                        noun={noun}
                        label={copy?.generateLabel ?? `Generate New ${variant}`}
                    />
                </div>

                <div className="w-full">
                    <CustomizerButton
                        painterPath={painterPath}
                        noun={noun}
                        label={copy?.customizeLabel ?? "Customize"}
                    />
                </div>

                <div className="w-full">
                    <ShareButton
                        basePath={basePath}
                        noun={noun}
                        slug={band?.slug}
                        title={displayName}
                    />
                </div>
            </div>
        </>
    );
}
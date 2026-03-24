import Link from "next/link";
import GenerateNewButton from "@/app/components/generateNewButton";
import CogitatorBox from "./cogitatorBox";
import MetaBar from "./metaBar";

export default function FactionHub({ eyebrow, title, intro, cards, cogitator, meta }) {
    return (
        <>
            <section className="relative flex flex-col">
                <section className="relative z-10 mb-8 flex flex-col md:mb-12">
                    <div className="max-w-4xl">
                        <div className="flex flex-col gap-3">
                            {meta ? <MetaBar {...meta} /> : null}
                            <h1 className="text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl lg:text-7xl">
                                {title}
                            </h1>

                            <p className="max-w-2xl text-sm leading-relaxed text-base-content/75 sm:text-lg">
                                {intro}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-8 grid grid-cols-1 gap-6 md:mb-12 md:grid-cols-3">
                    {cards.map((card) => {
                        const isComingSoon = card.status === "coming-soon";
                        const GhostModel = card.ghostModel;

                        return (
                            <div
                                key={card.key}
                                className="card relative overflow-hidden rounded-none border border-base-300 bg-base-100 shadow-sm"
                            >
                                <div className={`absolute left-0 top-0 h-full w-1 ${card.accentBarClass}`} />

                                {GhostModel && (
                                    <div
                                        aria-hidden="true"
                                        className="pointer-events-none absolute -right-6 top-1 hidden h-[80%] w-[80%] opacity-[0.08] md:block"
                                    >
                                        <GhostModel {...card.ghostModelProps} />
                                    </div>
                                )}

                                <div className="card-body relative z-10 flex flex-col justify-between gap-6 p-6 sm:p-8">
                                    <div className="flex flex-col gap-4">
                                        {isComingSoon ? (
                                            <div className="badge badge-outline badge-warning badge-sm w-fit rounded-none uppercase tracking-[0.2em]">
                                                Coming Soon
                                            </div>
                                        ) : null}

                                        <h2 className="text-2xl font-black uppercase leading-none tracking-tight sm:text-3xl lg:hidden">
                                            {card.mobileTitle}
                                        </h2>

                                        <h2 className="hidden whitespace-pre-line text-4xl font-black uppercase leading-none tracking-tight lg:block lg:text-5xl">
                                            {card.title}
                                        </h2>

                                        <p className="max-w-xs text-sm leading-relaxed text-base-content/70">
                                            {card.body}
                                        </p>
                                    </div>

                                    <div className="card-actions">
                                        {isComingSoon ? (
                                            <button
                                                className="btn btn-outline w-full rounded-none"
                                                disabled
                                                aria-disabled="true"
                                            >
                                                Coming Soon
                                            </button>
                                        ) : card.generatorKey ? (
                                            <GenerateNewButton generatorKey={card.generatorKey} />
                                        ) : (
                                            <Link
                                                href={card.href || "#"}
                                                className={`btn w-full rounded-none ${card.buttonClass || "btn-primary"}`}
                                                prefetch={false}
                                            >
                                                Open Section
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </section>
            </section>
            {cogitator ? (
                <section className="relative mt-auto">
                    <CogitatorBox
                        lines={cogitator.lines}
                    />
                </section>
            ) : null}


        </>
    );
}
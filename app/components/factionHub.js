import Link from "next/link";
import GenerateNewButton from "@/app/components/generateNewButton";

export default function FactionHub({ eyebrow, title, intro, cards }) {


    return (
        <section className="relative flex flex-col">
            <section className="relative z-10 mb-8 flex flex-col md:mb-12">
                <div className="max-w-4xl">
                    <span className="badge badge-outline badge-primary mb-4 rounded-none px-4 py-3 text-[10px] font-bold uppercase tracking-[0.25em]">
                        {eyebrow}
                    </span>

                    <div>
                        <h1 className="mb-3 text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl lg:text-7xl">
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

                            <div className="card-body relative z-10 justify-between p-6 sm:p-8">
                                <div>
                                    <div className="mb-4 flex flex-wrap items-center gap-2">
                                        <div
                                            className={`badge badge-sm rounded-none uppercase tracking-[0.2em] ${card.badgeClass}`}
                                        >
                                            {card.label}
                                        </div>

                                        {isComingSoon && (
                                            <div className="badge badge-outline badge-warning badge-sm rounded-none uppercase tracking-[0.2em]">
                                                Coming Soon
                                            </div>
                                        )}
                                    </div>

                                    <h2 className="text-2xl font-black uppercase leading-none tracking-tight sm:text-3xl lg:hidden">
                                        {card.mobileTitle}
                                    </h2>

                                    <h2 className="mb-4 hidden whitespace-pre-line text-4xl font-black uppercase leading-none tracking-tight lg:block lg:text-5xl">
                                        {card.title}
                                    </h2>

                                    <p className="hidden max-w-xs text-sm leading-relaxed text-base-content/70 lg:block">
                                        {card.body}
                                    </p>
                                </div>

                                <div className="card-actions mt-6">
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
    );
}
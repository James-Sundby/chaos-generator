export default function CogitatorBox({ lines = [] }) {
    return (
        <section className="card rounded-none border border-base-300 bg-base-100 shadow-sm">
            <div className="card-body flex flex-col gap-4 p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
                            Live Feed: Cogitator Aleph-9-Beta
                        </h2>
                    </div>

                    <div className="mt-1 flex shrink-0 items-center gap-2" aria-hidden="true">
                        <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        <span className="h-2 w-2 rounded-full bg-primary/50" />
                        <span className="h-2 w-2 rounded-full bg-primary/25" />
                    </div>
                </div>

                <div className="rounded-none border border-base-300 bg-base-200/40 px-4 py-4 font-mono text-sm leading-relaxed text-base-content/75">
                    <div className="flex flex-col gap-2">
                        {lines.map((line) => (
                            <p key={line}>{line}</p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
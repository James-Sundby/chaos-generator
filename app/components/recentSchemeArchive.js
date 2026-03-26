"use client";

import Link from "next/link";
import { useRecentSchemesStore } from "@/app/stores/recentSchemesStore";

function groupLabel(group) {
    switch (group) {
        case "loyalist":
            return "Loyalists";
        case "chaos":
            return "Chaos";
        case "xenos":
            return "Xenos";
        default:
            return "Archive";
    }
}

export default function RecentSchemeArchive() {
    const schemes = useRecentSchemesStore((s) => s.schemes);

    return (
        <section className="card rounded-none border border-base-300 bg-base-100 shadow-sm">
            <div className="card-body flex flex-col gap-4 p-6 sm:p-8">
                <div className="flex flex-col gap-1">
                    <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
                        Recent Archives
                    </h2>
                    <p className="text-sm text-base-content/75">
                        Your last five generated schemes are stored here for quick access.
                    </p>
                </div>

                {schemes.length === 0 ? (
                    <div className="rounded-none border border-dashed border-base-300 px-4 py-5 text-sm text-base-content/60">
                        No archived schemes yet. Generate one to begin building your local archive.
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {schemes.map((scheme) => (
                            <Link
                                key={scheme.slug}
                                href={scheme.href}
                                prefetch={false}
                                className="flex items-center justify-between gap-4 rounded-none border border-base-300 px-4 py-3 transition-colors hover:border-base-content/30 hover:bg-base-200/40"
                            >
                                <div className="flex min-w-0 flex-col gap-1">
                                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-base-content/45">
                                        {groupLabel(scheme.group)} · {scheme.description}
                                    </div>
                                    <div className="truncate text-sm font-bold uppercase tracking-[0.08em]">
                                        {scheme.name}
                                    </div>
                                </div>

                                <div className="flex shrink-0 items-center gap-1">
                                    {scheme.colors?.map((hex, index) => (
                                        <span
                                            key={`${hex}-${index}`}
                                            className="h-4 w-4 rounded-none border border-base-300"
                                            style={{ backgroundColor: hex }}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
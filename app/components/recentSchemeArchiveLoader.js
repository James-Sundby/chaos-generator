"use client";

import dynamic from "next/dynamic";

const RecentSchemeArchive = dynamic(() => import("./recentSchemeArchive"), {
    ssr: false,
    loading: () => (
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

                <div className="rounded-none border border-dashed border-base-300 px-4 py-5 text-sm text-base-content/60">
                    Loading local archive…
                </div>
            </div>
        </section>
    ),
});

export default function RecentSchemeArchiveLoader() {
    return <RecentSchemeArchive />;
}
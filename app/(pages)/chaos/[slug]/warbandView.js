"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useChaosStore } from "@/app/stores/chaosStore";
import ChaosMarine from "@/app/components/chaosSpaceMarine";
import { createWarbandAndGo } from './actions';

export default function WarbandClient({ initialBand }) {
    const setChaosBand = useChaosStore(s => s.setChaosBand);
    const chaosBand = useChaosStore(s => s.chaosBand);

    useEffect(() => { setChaosBand(initialBand); }, [initialBand, setChaosBand]);
    const band = chaosBand.slug ? chaosBand : initialBand;

    const handleShare = () => {
        const url = `${window.location.origin}/chaos/${band.slug}`;
        if (navigator.share) navigator.share({ title: "Check out this Warband!", text: band.slug, url }).catch(() => { });
        else navigator.clipboard.writeText(url).catch(() => { });
    };

    return (
        <main className="flex flex-1 flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 p-4">
            <div id="trading-card" className="card bg-yellow-600 text-neutral w-full max-w-96 rounded-lg opacity-0 animate-fade-in">
                <div className="card-body p-2 m-2 bg-white rounded-lg">
                    <h1 className="card-title justify-center text-center">{band.warbandName}</h1>
                    <div className="h-[45svh]">
                        <ChaosMarine
                            primary={band.colors[0]?.hex}
                            secondary={band.colors[1]?.hex}
                            edge={band.colors[2]?.hex}
                            accent={band.colors[3]?.hex}
                            pattern={band.pattern}
                        />
                    </div>
                    <div className="flex flex-1 join join-horizontal rounded-lg">
                        {(band.pattern === "Basic" ? [0, 2, 3] : band.colors.map((_, i) => i)).map((i) =>
                            band.colors[i] ? (
                                <div key={i} className="w-full h-8 join-item border border-neutral" style={{ backgroundColor: band.colors[i].hex }} title={band.colors[i].name} />
                            ) : null
                        )}
                    </div>
                    <p className="text-sm font-bold">
                        {band.pattern === "Basic"
                            ? [band.colors[0]?.name, band.colors[2]?.name, band.colors[3]?.name].filter(Boolean).join(", ")
                            : [band.colors[0]?.name, band.colors[1]?.name, band.colors[2]?.name, band.colors[3]?.name].filter(Boolean).join(", ")}
                    </p>
                    <p className="font-bold text-xs">ID: <span className="font-normal">{band.slug}</span></p>
                </div>
            </div>
            <div className="flex flex-col w-full max-w-96 gap-4">
                <form action={createWarbandAndGo}>
                    <button type="submit" className="btn btn-error rounded-lg w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className={`h-6 w-6 fill-error-content`} aria-hidden="true">
                            <path d="M274.9 34.3c-28.1-28.1-73.7-28.1-101.8 0L34.3 173.1c-28.1 28.1-28.1 73.7 0 101.8L173.1 413.7c28.1 28.1 73.7 28.1 101.8 0L413.7 274.9c28.1-28.1 28.1-73.7 0-101.8L274.9 34.3zM200 224a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM96 200a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM224 376a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM352 200a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM224 120a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm96 328c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-192c0-35.3-28.7-64-64-64l-114.3 0c11.6 36 3.1 77-25.4 105.5L320 413.8l0 34.2zM480 328a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
                        </svg>
                        New
                    </button>
                </form>
                <Link className="btn btn-error rounded-lg w-full" href="/chaos-painter" aria-label="Customize your warband" title="Customize your warband">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        className="h-6 w-6 fill-error-content"
                        aria-hidden="true"
                    >
                        <path d="M162.4 6c-1.5-3.6-5-6-8.9-6l-19 0c-3.9 0-7.5 2.4-8.9 6L104.9 57.7c-3.2 8-14.6 8-17.8 0L66.4 6c-1.5-3.6-5-6-8.9-6L48 0C21.5 0 0 21.5 0 48L0 224l0 22.4L0 256l9.6 0 364.8 0 9.6 0 0-9.6 0-22.4 0-176c0-26.5-21.5-48-48-48L230.5 0c-3.9 0-7.5 2.4-8.9 6L200.9 57.7c-3.2 8-14.6 8-17.8 0L162.4 6zM0 288l0 32c0 35.3 28.7 64 64 64l64 0 0 64c0 35.3 28.7 64 64 64s64-28.7 64-64l0-64 64 0c35.3 0 64-28.7 64-64l0-32L0 288zM192 432a16 16 0 1 1 0 32 16 16 0 1 1 0-32z" />
                    </svg>
                    Customize
                </Link>
                <button className="btn btn-error rounded-lg w-full" onClick={handleShare} aria-label="Share this warband">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        className="h-6 w-6 fill-error-content"
                        aria-hidden="true">
                        <path d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z" />
                    </svg>
                    Share
                </button>
            </div>
        </main>
    );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWarbandStore } from "../stores/warbandStore";

export default function WarbandButton({ message }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const setWarband = useWarbandStore((state) => state.setWarband);

    const generateWarband = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/chapter-generator");
            const data = await res.json();
            setWarband(data);
            router.push(`/chapter/${data.slug}`);
        } catch (error) {
            // console.error("Failed to fetch Chapter data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={generateWarband}
            className="btn btn-primary rounded-lg items-center justify-center w-full h-auto px-6 py-2"
            disabled={loading}
            aria-busy={loading}
        >
            {loading ? (
                <>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        className="h-6 w-6 fill-primary-content"
                        aria-hidden="true"
                    >
                        <path d="M32 0C14.3 0 0 14.3 0 32S14.3 64 32 64l0 11c0 42.4 16.9 83.1 46.9 113.1L146.7 256 78.9 323.9C48.9 353.9 32 394.6 32 437l0 11c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0 256 0 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-11c0-42.4-16.9-83.1-46.9-113.1L237.3 256l67.9-67.9c30-30 46.9-70.7 46.9-113.1l0-11c17.7 0 32-14.3 32-32s-14.3-32-32-32L320 0 64 0 32 0zM288 437l0 11L96 448l0-11c0-25.5 10.1-49.9 28.1-67.9L192 301.3l67.9 67.9c18 18 28.1 42.4 28.1 67.9z" />
                    </svg>
                    <p className=""> Loading... </p>
                    <span className="sr-only" aria-live="polite">
                        Loading new chapter ...
                    </span>
                </>
            ) : (
                <>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                        className="h-6 w-6 fill-primary-content"
                        aria-hidden="true"
                    >
                        <path d="M274.9 34.3c-28.1-28.1-73.7-28.1-101.8 0L34.3 173.1c-28.1 28.1-28.1 73.7 0 101.8L173.1 413.7c28.1 28.1 73.7 28.1 101.8 0L413.7 274.9c28.1-28.1 28.1-73.7 0-101.8L274.9 34.3zM200 224a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM96 200a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM224 376a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM352 200a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM224 120a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm96 328c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-192c0-35.3-28.7-64-64-64l-114.3 0c11.6 36 3.1 77-25.4 105.5L320 413.8l0 34.2zM480 328a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
                    </svg>
                    <p className="">{message}</p>
                </>
            )}
        </button>
    );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WarbandButton({ message }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const generateWarband = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/chapter-generator", {
                method: "GET",
                cache: "no-store",
            });
            const data = await res.json();
            const { slug } = data;
            router.push(`/chapter/${slug}`);
        } catch (error) {
            console.error("Failed to fetch Chapter data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={generateWarband}
            className={`px-6 py-2 btn btn-primary rounded-lg`}
            disabled={loading}
        >
            {loading ? "Loading..." :
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="h-6 w-6 fill-primary-content">
                        <path d="M274.9 34.3c-28.1-28.1-73.7-28.1-101.8 0L34.3 173.1c-28.1 28.1-28.1 73.7 0 101.8L173.1 413.7c28.1 28.1 73.7 28.1 101.8 0L413.7 274.9c28.1-28.1 28.1-73.7 0-101.8L274.9 34.3zM200 224a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM96 200a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM224 376a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM352 200a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM224 120a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm96 328c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-192c0-35.3-28.7-64-64-64l-114.3 0c11.6 36 3.1 77-25.4 105.5L320 413.8l0 34.2zM480 328a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
                    </svg>
                    <p className="hidden sm:block">{message}</p>
                </>
            }
        </button>
    );
}

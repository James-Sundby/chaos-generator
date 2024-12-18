"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WarbandButton({ message }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const generateWarband = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/warband-generator", {
                method: "GET",
                cache: "no-store",
            });
            const data = await res.json();
            const { slug } = data;
            router.push(`/warband/${slug}`);
        } catch (error) {
            console.error("Failed to fetch Warband data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={generateWarband}
            className={`px-6 py-2 btn btn-primary`}
            disabled={loading}
        >
            {loading ? "Loading..." : `${message}`}
        </button>
    );
}

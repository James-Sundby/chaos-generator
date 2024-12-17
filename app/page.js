"use client";

import { useState } from "react";
import TradingCard from "./components/trading-card";

export default function Home() {
  const [colors, setColors] = useState([]);
  const [warbandName, setWarbandName] = useState("");
  const [pattern, setPattern] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWarband = async () => {
    try {
      setLoading(true); // Set loading to true when fetching starts
      const res = await fetch('/api/warband-generator', {
        method: 'GET',
        cache: 'no-store',
      });
      const data = await res.json();
      setWarbandName(data.warbandName);
      setColors(data.colors);
      setPattern(data.pattern);
      setSlug(data.slug);
    } catch (error) {
      console.error("Failed to fetch Warband data:", error);
    } finally {
      setLoading(false); // Set loading to false once fetching is complete
    }
  };

  return (

    <main className="flex flex-col flex-1 justify-center items-center px-4">

      <button
        onClick={fetchWarband}
        className="px-6 py-2 btn btn-primary mb-7"
        disabled={loading}
      >
        {loading ? "Loading..." : "Get Warband"}
      </button>

      {warbandName && (
        <TradingCard
          warbandName={warbandName}
          pattern={pattern}
          colors={colors}
          slug={slug}
        />
      )}
    </main>

  );
}

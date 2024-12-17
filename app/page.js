"use client";

import { useState } from "react";
import TradingCard from "./components/trading-card";

export default function Home() {
  const [colors, setColors] = useState([]);
  const [warbandName, setWarbandName] = useState("");
  const [pattern, setPattern] = useState("");
  const [slug, setSlug] = useState("");


  const fetchWarband = async () => {
    try {
      const res = await fetch('/api/warband-generator', {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      const data = await res.json();
      console.log(data.warbandName, data.colors);
      setWarbandName(data.warbandName);
      setColors(data.colors);
      setPattern(data.pattern);
      setSlug(data.slug);
      console.log(data.warbandName, data.colors, data.pattern, data.slug);
    } catch (error) {
      console.error("Failed to fetch Warband data:", error);
    }
  };

  return (

    <main className="flex flex-col flex-1 justify-center items-center px-4">

      <button
        onClick={fetchWarband}
        className="px-6 py-2 btn btn-primary mb-7"
      >
        Get Warband
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

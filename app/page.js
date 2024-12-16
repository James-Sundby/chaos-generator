"use client";

import { useState } from "react";

export default function Home() {
  const [colors, setColors] = useState([]);
  const [warbandName, setWarbandName] = useState("");


  const fetchWarband = async () => {
    try {
      const res = await fetch('/api/warband-generator');
      const data = await res.json();
      console.log(data.warbandName, data.colors);
      setWarbandName(data.warbandName);
      setColors(data.colors);
      console.log(data.warbandName, data.colors);
    } catch (error) {
      console.error("Failed to fetch Warband data:", error);
    }
  };

  return (

    <main className="flex-1 justify-center items-center">
      <button
        onClick={fetchWarband}
        className="px-6 py-2 btn btn-primary"
      >
        Get Warband
      </button>
      <p>{warbandName}</p>
      <div className="mt-8 join join-vertical lg:join-horizontal">
        {colors.map((color, index) => (
          <div
            key={index}
            className="lg:w-96 lg:h-96 join-item"
            style={{ backgroundColor: color }}
          >
            <p className="text-center mt-12 text-white">{color}</p>
          </div>
        ))}
      </div>
    </main>

  );
}

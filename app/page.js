"use client";

import { useState } from "react";
import Footer from "./components/footer";

export default function Home() {
  const [generatedName, setGeneratedName] = useState("");

  const generateWarbandName = () => {
    const chaoticDescriptors = ["Blood", "Shadow", "Warp", "Doom", "Hell"];
    const darkEntities = ["Daemon", "Abyss", "Corruption", "Fury", "Oblivion"];
    const warriorTerms = [
      "Warriors",
      "Blades",
      "Legion",
      "Host",
      "Brotherhood",
      "Swords",
    ];

    // Generate [Warrior or Legion Term] of [Dark Entity or Concept]
    const randomDarkEntity =
      darkEntities[Math.floor(Math.random() * darkEntities.length)];
    const randomWarriorTerm =
      warriorTerms[Math.floor(Math.random() * warriorTerms.length)];
    const nameOption1 = `${randomWarriorTerm} of ${randomDarkEntity}`;

    // Generate ([Chaotic Descriptor] or [Dark Entity or Concept]) + [Warrior or Legion Term]
    const randomChaoticOrDark =
      Math.random() < 0.5 ? chaoticDescriptors : darkEntities;
    const randomDescriptorOrEntity =
      randomChaoticOrDark[
        Math.floor(Math.random() * randomChaoticOrDark.length)
      ];
    const nameOption2 = `${randomDescriptorOrEntity} ${randomWarriorTerm}`;

    // Display the generated name
    const generatedName = Math.random() < 0.5 ? nameOption1 : nameOption2;
    setGeneratedName(generatedName);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <p className="text-4xl m-4 font-bold text-center">
          Chaos Idea Generator
        </p>
        <button
          className="btn btn-primary btn-wide"
          onClick={generateWarbandName}
        >
          Generate Warband Name
        </button>
        {generatedName && <p>Generated Name: {generatedName}</p>}
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}

import { useState } from "react";

export default function WarbandNameGenerator() {
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
    <div>
      <button onClick={generateWarbandName}>Generate Warband Name</button>
      {generatedName && <p>Generated Name: {generatedName}</p>}
    </div>
  );
}

"use client";

import WarbandNameGenerator from "./components/warband-name-generator";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <p className="text-4xl m-4 font-bold">Chaos Idea Generator</p>
        <WarbandNameGenerator />
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}

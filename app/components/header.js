"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import WarbandButton from "./warbandButton";

export default function Header() {
  const pathname = usePathname();

  return (<>

    <header className="navbar">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl font-bold rounded-lg" aria-label="Back to Chapter Generator home page">Chapter Generator</Link>
      </div>
    </header>
  </>
  );
}

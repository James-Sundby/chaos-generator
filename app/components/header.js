import Link from "next/link";

export default function Header() {
  return (
    <header className="navbar container mx-auto text-sm">
      <nav aria-label="Primary" className="flex w-full justify-center">
        <Link href="/" className="btn btn-ghost text-lg font-bold rounded-sm" aria-label="Back to Chapter Generator home page">Chapter Generator</Link>
      </nav>
    </header>
  );
}

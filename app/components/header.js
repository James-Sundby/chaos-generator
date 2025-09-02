import Link from "next/link";

export default function Header() {
  return (
    <header className="navbar">
      <div className="flex w-full justify-center">
        <Link href="/" className="btn btn-ghost text-xl font-bold rounded-sm" aria-label="Back to Chapter Generator home page">Chapter Generator</Link>
      </div>
    </header>
  );
}

import Link from "next/link";
import SettingsButton from "./settingsButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8"
      >
        <div className="shrink-0">
          <Link
            href="/"
            className="text-lg font-black uppercase tracking-tight sm:text-2xl"
            aria-label="Back to Chapter Generator home page"
            prefetch={false}
          >
            Chapter Generator
          </Link>
        </div>

        <div className="hidden md:flex flex-1 items-center justify-center gap-6 text-xs font-semibold uppercase tracking-[0.18em] text-base-content/70">
          <Link href="/loyalists" className="transition-colors hover:text-primary">
            Loyalist
          </Link>
          <Link href="/chaos-hub" className="transition-colors hover:text-primary">
            Chaos
          </Link>
          <Link href="/xenos" className="transition-colors hover:text-primary">
            Xenos
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <SettingsButton />
        </div>
      </nav>
    </header>
  );
}
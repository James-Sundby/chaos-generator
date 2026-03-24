"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import SettingsButton from "./settingsButton";
import SettingsPanel from "./settingsPanel";

const navLinks = [
  { href: "/loyalists", label: "Loyalist" },
  { href: "/chaos-hub", label: "Chaos" },
  { href: "/xenos", label: "Xenos" },
];

function MenuIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M6 6l12 12" />
      <path d="M18 6l-12 12" />
    </svg>
  );
}

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileNavRef = useRef(null);
  const mobileButtonRef = useRef(null);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handlePointerDown(event) {
      if (!mobileNavRef.current) return;
      if (!mobileNavRef.current.contains(event.target)) {
        setMobileOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setMobileOpen(false);
        mobileButtonRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown, { passive: true });
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <nav
        aria-label="Primary"
        className="navbar mx-auto w-full max-w-7xl px-4 py-2 md:px-8"
      >
        <div className="navbar-start min-w-0">
          <Link
            href="/"
            className="truncate text-lg font-black uppercase tracking-tight sm:text-2xl"
            aria-label="Back to Chapter Generator home page"
            prefetch={false}
          >
            Chapter Generator
          </Link>
        </div>

        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal gap-2 rounded-box px-2 text-xs font-semibold uppercase tracking-[0.18em]">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);

              return (
                <li key={link.href}>
                  {active ? (
                    <span className="inline-flex items-center rounded-box px-3 py-2 text-primary">
                      {link.label}
                    </span>
                  ) : (
                    <Link
                      href={link.href}
                      className="inline-flex items-center rounded-box px-3 py-2 text-base-content/70 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="navbar-end gap-2">
          <div className="relative md:hidden" ref={mobileNavRef}>
            <button
              ref={mobileButtonRef}
              type="button"
              className="btn btn-ghost btn-square h-11 min-h-11 w-11"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-site-nav"
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? (
                <CloseIcon className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
            </button>

            {mobileOpen && (
              <div
                id="mobile-site-nav"
                className="absolute right-0 top-[calc(100%+0.75rem)] z-30 w-[min(20rem,calc(100vw-2rem))] rounded-box border border-base-300 bg-base-100 p-2 shadow-xl"
              >
                <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-base-content/50">
                  Generator Hubs
                </div>

                <ul className="menu w-full gap-1">
                  {navLinks.map((link) => {
                    const active = isActive(pathname, link.href);

                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={active ? "active" : undefined}
                          aria-current={active ? "page" : undefined}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-2 border-t border-base-300 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-base-content/50">
                  Generator Settings
                </div>

                <div className="px-1 pb-2">
                  <SettingsPanel compact />
                </div>

                <div className="mt-2 border-t border-base-300 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-base-content/50">
                  Other
                </div>

                <ul className="menu w-full gap-1">
                  <li>
                    <Link href="/help" onClick={() => setMobileOpen(false)}>
                      Help
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="hidden md:flex">
            <SettingsButton />
          </div>
        </div>
      </nav>
    </header>
  );
}
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-base-300 bg-base-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 md:px-8">
        <p className="max-w-3xl text-center text-xs text-base-content/70 md:text-left">
          This is a fan-made project and is not affiliated with or endorsed by Games Workshop.
          No challenge to their trademarks or intellectual property is intended.
        </p>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold uppercase tracking-[0.18em] text-base-content/70 md:justify-start">
              <li>
                <Link
                  href="/credits"
                  className="transition hover:text-primary"
                  aria-label="View asset credits and attributions"
                  title="View asset credits and attributions"
                  prefetch={false}
                >
                  Credits
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  aria-label="View the help section"
                  title="View the help section"
                  className="transition hover:text-primary"
                  prefetch={false}
                >
                  Help
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  aria-label="View our privacy policy"
                  title="View our privacy policy"
                  className="transition hover:text-primary"
                  prefetch={false}
                >
                  Privacy
                </Link>
              </li>
              <li>
                <a
                  href="mailto:james@jsundby.dev"
                  aria-label="Send an email to james@jsundby.dev"
                  title="Send an email to james@jsundby.dev"
                  className="transition hover:text-primary"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="https://jsundby.dev/projects/chaos-generator/"
                  aria-label="Visit my personal blog on jsundby.dev"
                  title="Visit my personal blog on jsundby.dev"
                  className="transition hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/James-Sundby/chaos-generator/"
                  aria-label="Visit my GitHub"
                  title="Visit my GitHub"
                  className="transition hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </nav>

          <div className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-base-content/70 md:text-right">
            Unofficial hobby project
          </div>
        </div>
      </div>
    </footer>
  );
}
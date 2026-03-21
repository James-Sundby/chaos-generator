import Link from "next/link";
import SchemeSearch from "@/app/components/schemeSearch";
import SpaceMarine from "@/app/components/models/spaceMarine";
import ChaosMarine from "@/app/components/models/chaosSpaceMarine";
import EldarAvenger from "@/app/components/models/eldarAvenger";

const factionCards = [
  {
    key: "chapter",
    label: "Loyalists",
    title: "THE\nEMPEROR'S\nOWN",
    mobileTitle: "EMPEROR'S OWN",
    body: "Generate and customize loyalist chapter schemes for your next army or painting project.",
    href: "/loyalists",
    accentBarClass: "bg-faction-loyalist",
    badgeClass: "badge-loyalist",
    buttonClass: "btn-primary",
    ghostModel: SpaceMarine,
    ghostModelProps: {
      primary: "#d6d6d6",
      secondary: "#d6d6d6",
      trim: "#d6d6d6",
      pattern: "Quartered",
    },
  },
  {
    key: "chaos",
    label: "Chaos",
    title: "LEGIONS\nOF\nCHAOS",
    mobileTitle: "LEGIONS OF CHAOS",
    body: "Create warbands, corrupted heraldry, and traitor paint schemes with stronger contrast and trim options.",
    href: "/chaos-hub",
    accentBarClass: "bg-faction-chaos",
    badgeClass: "badge-chaos",
    buttonClass: "btn-primary",
    ghostModel: ChaosMarine,
    ghostModelProps: {
      primary: "#d6d6d6",
      secondary: "#d6d6d6",
      edge: "#d6d6d6",
      accent: "#d6d6d6",
      pattern: "Basic",
    },
  },
  {
    key: "eldar",
    label: "Xenos",
    title: "ALIEN\nTHREAT\nDATA",
    mobileTitle: "ALIEN THREATS",
    body: "Explore Eldar-inspired palettes, patterns, and cleaner alien colour layouts for custom hosts.",
    href: "/xenos",
    accentBarClass: "bg-faction-xenos",
    badgeClass: "badge-xenos",
    buttonClass: "btn-primary",
    ghostModel: EldarAvenger,
    ghostModelProps: {
      primary: "#d6d6d6",
      secondary: "#d6d6d6",
      accent: "#d6d6d6",
      pattern: "Default",
    },
  },
];

export default function Home() {
  return (
    <section className="relative flex flex-col">
      <section className="relative z-10 mb-8 flex flex-col md:mb-12">
        <div className="max-w-3xl">
          <span className="badge badge-outline badge-primary mb-4 rounded-none px-4 py-3 text-[10px] font-bold uppercase tracking-[0.25em]">
            Archive Terminal
          </span>

          <div>
            <h1 className="mb-3 text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl lg:text-7xl">
              Chapter Generator
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-base-content/75 sm:text-lg">
              An unofficial Warhammer hobby tool for generating, searching, and customizing
              paint schemes for loyalists, chaos warbands, and xenos forces.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8 grid grid-cols-1 gap-6 md:mb-12 md:grid-cols-3">
        {factionCards.map((card) => {
          const GhostModel = card.ghostModel;

          return (
            <div
              key={card.key}
              className="card relative overflow-hidden rounded-none border border-base-300 bg-base-100 shadow-sm"
            >
              <div className={`absolute left-0 top-0 h-full w-1 ${card.accentBarClass}`} />

              {GhostModel && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-6 top-1 hidden h-[80%] w-[80%] opacity-[0.08] md:block"
                >
                  <GhostModel {...card.ghostModelProps} />
                </div>
              )}

              <div className="card-body relative z-10 justify-between p-6 sm:p-8">
                <div>
                  <div className={`badge badge-sm mb-4 rounded-none uppercase tracking-[0.2em] ${card.badgeClass}`}>
                    {card.label}
                  </div>

                  <h2 className="text-2xl font-black uppercase leading-none tracking-tight sm:text-3xl md:hidden">
                    {card.mobileTitle}
                  </h2>

                  <h2 className="mb-4 hidden whitespace-pre-line text-3xl font-black uppercase leading-none tracking-tight md:block lg:text-5xl">
                    {card.title}
                  </h2>

                  <p className="hidden max-w-xs text-sm leading-relaxed text-base-content/70 md:block">
                    {card.body}
                  </p>
                </div>

                <div className="card-actions mt-6">
                  <Link
                    href={card.href}
                    className={`btn w-full rounded-none ${card.buttonClass}`}
                    prefetch={false}
                  >
                    Open Hub
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section className="relative z-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="mb-4">
              <h2 className="mb-1 text-xs font-bold uppercase tracking-[0.25em] text-secondary">
                Search Any Scheme
              </h2>
              <p className="text-sm text-base-content/75">
                Search chapters, chaos warbands, or eldar warhosts using a full faction-prefixed slug.
              </p>
            </div>

            <SchemeSearch
              placeholder="chapter-ravens-of-the-keep-a99d95-440052-989898-eradicant-random"
              buttonLabel="Look up a Scheme"
              ariaLabel="Scheme lookup code"
              buttonTheme="btn-secondary"
            />
          </div>
        </div>

        <div className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="mb-4">
              <h2 className="mb-1 text-xs font-bold uppercase tracking-[0.25em] text-primary">
                Legacy Tools
              </h2>
              <p className="text-sm text-base-content/75">
                Jump straight into free painting and manual colour testing.
              </p>
            </div>

            <Link
              className="btn btn-secondary w-full rounded-none"
              href="/open-paint"
              aria-label="Open the free paint tool"
              prefetch={false}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                className="size-5 fill-current"
                aria-hidden="true"
              >
                <path d="M162.4 6c-1.5-3.6-5-6-8.9-6l-19 0c-3.9 0-7.5 2.4-8.9 6L104.9 57.7c-3.2 8-14.6 8-17.8 0L66.4 6c-1.5-3.6-5-6-8.9-6L48 0C21.5 0 0 21.5 0 48L0 224l0 22.4L0 256l9.6 0 364.8 0 9.6 0 0-9.6 0-22.4 0-176c0-26.5-21.5-48-48-48L230.5 0c-3.9 0-7.5 2.4-8.9 6L200.9 57.7c-3.2 8-14.6 8-17.8 0L162.4 6zM0 288l0 32c0 35.3 28.7 64 64 64l64 0 0 64c0 35.3 28.7 64 64 64s64-28.7 64-64l0-64 64 0c35.3 0 64-28.7 64-64l0-32L0 288zM192 432a16 16 0 1 1 0 32 16 16 0 1 1 0-32z" />
              </svg>
              Primaris Paint
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}
import Link from "next/link";
import Background from "@/app/components/background";
import GenerateNewButton from "@/app/components/generateNewButton";
import SchemeSearch from "@/app/components/schemeSearch";

export default function Home() {
  return (
    <section className="relative flex flex-1 flex-col items-center justify-center gap-4 md:gap-8">
      <Background />

      <section className="max-w-2xl text-center">
        <h1 className="text-2xl font-black uppercase tracking-wide sm:text-5xl">
          Chapter Generator
        </h1>
        <p className="mt-4 text-base-content sm:text-lg">
          An unofficial Warhammer hobby tool for generating and customizing paint schemes.
        </p>
      </section>

      <div className="flex gap-4 flex-col sm:flex-row w-full max-w-2xl">
        <GenerateNewButton generatorKey="chapter" />
        <GenerateNewButton generatorKey="chaos" />
        <GenerateNewButton generatorKey="eldar" />
      </div>

      <div className="flex w-full max-w-2xl flex-col gap-8">
        <fieldset className="fieldset bg-base-100 border-secondary w-full border-2 p-4 gap-4 rounded-sm">
          <legend className="text-sm xl:text-base font-semibold px-2 py-1 bg-secondary rounded-sm text-secondary-content">
            Search Any Scheme
          </legend>

          <p className="text-sm text-base-content/80">
            Search chapters, chaos warbands, or eldar warhosts using a full faction-prefixed slug.
          </p>

          <SchemeSearch
            placeholder="chapter-ravens-of-the-keep-a99d95-440052-989898-eradicant-random"
            buttonLabel="Look up a Scheme"
            ariaLabel="Scheme lookup code"
            buttonTheme="btn-secondary"
          />
        </fieldset>




      </div>

      <div className="mt-4 flex w-full max-w-2xl justify-center">
        <Link
          className="btn btn-secondary btn-block rounded-sm"
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
          Open Paint
        </Link>
      </div>
    </section>
  );
}
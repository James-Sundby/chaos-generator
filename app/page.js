import Link from "next/link";

import Background from "./components/background";
import GenerateNewButton from "./components/generateNewButton";
import SchemeSearch from "./components/schemeSearch";

export default function Home() {
  return (
    <main className="flex flex-col flex-1 justify-center items-center px-4 relative">
      <h1 className="font-semibold rounded bg-base-100/80 p-2 text-xl max-w-md xl:max-w-full sm:text-2xl xl:text-4xl text-center mb-8">
        Unofficial Warhammer Paint Scheme Generator
      </h1>
      <div className="flex flex-col gap-8 items-center w-full max-w-md">
        <fieldset className="fieldset bg-base-100 border-primary w-full border-2 p-4 gap-4">
          <h2 id="loyalist-section" className="sr-only">Loyalist Chapter Generator</h2>
          <legend className="text-sm xl:text-base font-semibold px-2 py-1 bg-primary">Loyalists</legend>
          <GenerateNewButton variant="Chapter" />
          <SchemeSearch variant="Chapter" id="chapter-search" />
          <Link
            className="btn btn-primary btn-block"
            href={"/open-paint"}
            aria-label="Open the free paint tool"
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
        </fieldset>
        <fieldset className="fieldset bg-base-100 border-accent w-full border-2 p-4 gap-4">
          <h2 id="chaos-section" className="sr-only">Chaos Warband Generator</h2>
          <legend className="text-sm xl:text-base font-semibold px-2 py-1 bg-accent">Chaos</legend>
          <GenerateNewButton variant="Chaos" />
          <SchemeSearch variant="Chaos" id="chaos-search" />
        </fieldset>
      </div>
      <Background />
    </main>
  );
}

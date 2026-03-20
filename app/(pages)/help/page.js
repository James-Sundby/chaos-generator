import { metals } from "@/lib/colourChart";
import Link from "next/link";

export const metadata = {
    title: "Help & ID Conversion Guide",
    description:
        "Convert older chapter IDs that use outdated metal colour codes into updated hex-based IDs. Includes a reference chart for matching legacy colours.",
    alternates: {
        canonical: "/help",
    },
    openGraph: {
        title: "Help & ID Conversion Guide",
        description:
            "Convert older chapter IDs with legacy metal colour codes into updated hex-based IDs.",
        url: "/help",
        images: [
            {
                url: "/card.png",
                width: 1200,
                height: 630,
                alt: "Line-art image of a Space Marine. Text overlay: Stuck with primer? Generate a chapter and break the block.",
            },
        ],
    },
    twitter: {
        title: "Help & ID Conversion Guide",
        description:
            "Convert older chapter IDs with legacy metal colour codes into updated hex-based IDs.",
        images: ["/card.png"],
    },
};

export default function Page() {
    return (
        <section className="flex flex-1 flex-col max-w-full mx-auto prose prose-sm md:prose-base dark:prose-invert">

            <h1>Help</h1>

            <h2>Scheme ID Update - March 20th, 2026</h2>
            <p>
                I&apos;ve recently updated scheme IDs so they now include the faction at the start in order to support a single shared search and make links more consistent across
                the site.
            </p>
            <p>
                If you&apos;re revisiting a saved URL or bookmark and hit an error, the ID itself is probably still fine, it just needs the faction prefix added to the front.
            </p>
            <p>
                For example:
            </p>
            <ul>
                <li><code>chapter-ravens-of-the-keep-a99d95-440052-989898-eradicant-random</code></li>
                <li><code>chaos-the-oathbroken-claws-02134e-4b213c-875408-003d15-half-tetradic</code></li>
                <li><code>eldar-twilightbound-989898-6d655f-2c9bcc-8-analogous</code></li>
            </ul>
            <div className="divider"></div>
            <h2>Colour Hex Changes - May 5th, 2025</h2>
            <p>
                I&apos;ve recently updated the colour codes to match Citadel paint references more accurately.
                Previously, the hex codes were sampled from screenshots, which resulted in reduced saturation when converting back from RGB values.
            </p>
            <p>
                If you&apos;re revisiting a saved URL or bookmark and encounter an error, it&apos;s likely due to an outdated hex code.
                To fix this, I recommend recreating your scheme using the{" "}
                <Link
                    href="/painter"
                    aria-label="Open the Chapter Customizer tool to generate a new chapter ID"
                    className="link"
                    title="Open the Chapter Customizer tool to generate a new chapter ID"
                    prefetch={false}
                >
                    Chapter Customizer
                </Link>
                {" or "}
                <Link
                    href="/chaos-painter"
                    aria-label="Open the Warband Customizer tool to generate a new warband ID"
                    className="link"
                    title="Open the Warband Customizer tool to generate a new warband ID"
                    prefetch={false}
                >
                    Warband Customizer
                </Link>
                {" "}to generate a fresh ID.
            </p>
            <div className="divider"></div>
            <h2>Updating Your ID</h2>
            <p>
                If your old id used a metal code (like <code>ihs</code>), you now need to replace it with the corresponding <strong>hex value</strong> listed below.
            </p>
            <p>
                For example, change: <br />
                <code>wolves-of-the-bastion-1C191A-35468F-ihs-arms</code> <br />
                to: <br />
                <code>wolves-of-the-bastion-1C191A-35468F-a99d95-arms</code>
            </p>

            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Preview</th>
                        <th>Code</th>
                        <th>New Hex Code</th>

                    </tr>
                </thead>
                <tbody>
                    {metals.map((metal) => (
                        <tr key={metal.code}>
                            <td>
                                <div
                                    style={{
                                        backgroundColor: metal.hex2,
                                        width: "2rem",
                                        height: "1.5rem",
                                        borderRadius: "0.25rem",
                                        border: "1px solid #ccc"
                                    }}
                                    title={metal.hex2}
                                ></div>
                            </td>
                            <td>{metal.code}</td>
                            <td>{metal.hex2}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}
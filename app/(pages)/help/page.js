import { metals } from "@/lib/colourChart";
import Link from "next/link";

export const metadata = {
    title: "Help & Conversion Guide",
    description: "Use this guide to convert old chapter IDs with outdated metal codes into updated versions using hex codes. Includes a colour chart for reference.",
    openGraph: {
        title: "Help & Conversion Guide",
        description: "Having trouble with old chapter IDs? This guide helps you update them using the new colour codes.",
        url: "https://chapter-gen.jsundby.dev/help",
        siteName: "Chapter Generator",
        images: [
            {
                url: "https://chapter-gen.jsundby.dev/card.png",
                width: 1200,
                height: 630,
                alt: "Line-art image of a Space Marine. Text overlay: Stuck with primer? Generate a chapter and break the block.",
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        title: "Help & Conversion Guide",
        description: "Update old metal colour codes with ease using this chart-based guide.",
        card: 'summary_large_image',
        images: [
            {
                url: "https://chapter-gen.jsundby.dev/card.png",
                alt: "Line-art image of a Space Marine. Text overlay: Stuck with primer? Generate a chapter and break the block."
            }
        ],
    },
};

export default function Page() {
    return (
        <main
            role="main"
            className="flex flex-1 flex-col max-w-3xl mx-auto px-4 py-10 prose prose-sm md:prose-base dark:prose-invert"
        >
            <h1>Help</h1>

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
                >
                    Chapter Customizer
                </Link>
                {" or "}
                <Link
                    href="/chaos-painter"
                    aria-label="Open the Warband Customizer tool to generate a new warband ID"
                    className="link"
                    title="Open the Warband Customizer tool to generate a new warband ID"
                >
                    Warband Customizer
                </Link>
                {" "}to generate a fresh ID.
            </p>

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
        </main>
    );
}
import { metals } from "@/lib/colourChart";

export const metadata = {
    title: "Help & Conversion Guide",
    description: "Use this guide to convert old chapter IDs with outdated metal codes into updated versions using hex codes. Includes a color chart for reference.",
    openGraph: {
        title: "Help & Conversion Guide",
        description: "Having trouble with old chapter IDs? This guide helps you update them using the new color codes.",
        url: "https://chapter-gen.jsundby.dev/help",
        siteName: "Chapter Generator",
        images: [
            {
                url: "/card.jpg",
                width: 1200,
                height: 630,
                alt: "Paintbrushes in a jar. Text overlay: Stuck with primer? Generate a chapter and break the block.",
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        title: "Help & Conversion Guide",
        description: "Update old metal color codes with ease using this chart-based guide.",
        card: 'summary_large_image',
        images: [
            {
                url: "/card.jpg",
                alt: "Paintbrushes in a jar. Text overlay: Stuck with primer? Generate a chapter and break the block."
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
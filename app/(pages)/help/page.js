import { metals } from "@/lib/colourChart";

export const metadata = {
    title: "Help",
    description: "Instructions for updating old chapter IDs with new hex codes for metallic paints. Includes a visual reference table for each code.",
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
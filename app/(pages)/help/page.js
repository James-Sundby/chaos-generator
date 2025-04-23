const metals = [
    { code: "gks", name: "Grey Knight's Steel", hex1: "#ffffff", hex2: "#a5b4be", hex3: "#465863" },
    { code: "ihs", name: "Iron Hand's Steel", hex1: "#efede9", hex2: "#a99d95", hex3: "#44423f" },
    { code: "iwr", name: "Iron Warriors", hex1: "#d2d2d2", hex2: "#63605d", hex3: "#292725" },
    { code: "ldb", name: "Leadbelcher", hex1: "#f0f0f0", hex2: "#8a8a8a", hex3: "#152724" },
    { code: "rta", name: "Retributor Armour", hex1: "#ffffff", hex2: "#ebb854", hex3: "#89571d" },
    { code: "rlb", name: "Runelord Brass", hex1: "#f5ede3", hex2: "#74624d", hex3: "#190e07" },
    { code: "scb", name: "Screaming Bell", hex1: "#f8e6ba", hex2: "#cc7d51", hex3: "#642f1f" },
    { code: "wpb", name: "Warplock Bronze", hex1: "#f2c2a8", hex2: "#aa6243", hex3: "#440808" },
    { code: "blg", name: "Balthasar Gold", hex1: "#ffc28a", hex2: "#9b684b", hex3: "#1d0f07" },
];

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
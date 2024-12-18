import Image from "next/image";
import { parseSlug } from "../../_utils/helpers.js";


export default function WarbandPage({ params }) {
    const { slug } = params;
    const { warbandName, patternSrc, namedColors } = parseSlug(slug);

    return (
        <div className="flex flex-1 justify-center">
            <div id="trading-card" className="card bg-yellow-600 text-primary-content w-full max-w-96 h-fit">
                <div className="card-body p-2 m-2 bg-white rounded-lg">
                    <h2 className="card-title">{warbandName}</h2>
                    <Image
                        src={patternSrc}
                        width={400}
                        height={600}
                        alt={`Pattern for ${warbandName}`}
                        className="rounded-lg"
                    />
                    <div className="flex-1 join join-horizontal">
                        {namedColors.map((color, index) => (
                            <div
                                key={index}
                                className="w-full h-24 join-item"
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                            >
                            </div>
                        ))}
                    </div>
                    {/* <div >
                        {namedColors.map((color, index) => (
                            <p key={index} className="text-center text-xs">{color.name}</p>
                        ))}
                    </div> */}
                    <div className="card-actions justify-end text-xs">
                        <p>{slug}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

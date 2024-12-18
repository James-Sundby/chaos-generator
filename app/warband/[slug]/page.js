import Image from "next/image";
import { parseSlug } from "../../_utils/helpers.js";


export default function WarbandPage({ params }) {
    const { slug } = params;
    const { warbandName, patternSrc, namedColors } = parseSlug(slug);

    return (
        <div className="flex flex-1 justify-center">
            <div id="trading-card" className="card bg-yellow-600 text-primary-content w-full max-w-96 my-auto">
                <div className="card-body p-2 m-2 bg-white rounded-lg">
                    <h2 className="card-title">{warbandName}</h2>
                    <div className="flex flex-row gap-2">
                        <Image
                            src={patternSrc}
                            width={300}
                            height={450}
                            alt={`Pattern for ${warbandName}`}
                            className="rounded-lg"
                        />

                        <div className="flex-1 join join-vertical">
                            {namedColors.map((color, index) => (
                                <div
                                    key={index}
                                    className="w-100 h-full join-item border border-primary-content"
                                    style={{ backgroundColor: color.hex }}
                                    title={color.name}
                                >
                                </div>
                            ))}
                        </div>
                    </div>
                    <p className="text-sm">Colors: <span className="font-bold">{namedColors[0].name}, {namedColors[1].name}, {namedColors[2].name}</span></p>
                    <div className=" justify-end text-xs">
                        <p>{slug}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

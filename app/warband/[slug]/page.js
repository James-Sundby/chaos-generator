import Image from "next/image";
import { capitalizeName } from "../../_utils/helpers.js"

export default function WarbandPage({ params }) {
    const { slug } = params;

    const slugParts = slug.split("-");

    const pattern = slugParts.pop();
    const patternSrc = `/${pattern}.png`;

    const color3 = `#${slugParts.pop()}`;
    const color2 = `#${slugParts.pop()}`;
    const color1 = `#${slugParts.pop()}`;
    const colors = [color1, color2, color3];

    const warbandName = slugParts.join(" ").replace(/-/g, " ");
    const capitalizedName = capitalizeName(warbandName);

    return (
        <div className="flex flex-1 justify-center">
            <div id="trading-card" className="card bg-yellow-600 text-primary-content w-full max-w-96 h-fit">
                <div className="card-body p-2 m-2 bg-white rounded-lg">
                    <h2 className="card-title">{capitalizedName}</h2>
                    <Image
                        src={patternSrc}
                        width={400}
                        height={600}
                        alt={`Pattern for ${warbandName}`}
                        className="rounded-lg"
                    />
                    <div className="flex-1 join join-horizontal">
                        {colors.map((color, index) => (
                            <div
                                key={index}
                                className="w-full h-24 join-item"
                                style={{ backgroundColor: color }}
                            ></div>
                        ))}
                    </div>
                    <div className="card-actions justify-end text-xs">
                        <p>{slug}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

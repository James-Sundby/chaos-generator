import { backgroundPresets } from "@/lib/backgroundPresets";

import SpaceMarine from "./spaceMarine";
import ChaosMarine from "./chaosSpaceMarine";

function renderMarineCard(item, index) {
    return (
        <div key={index} className="w-28 h-28 sm:h-auto sm:w-auto opacity-40 aspect-square">
            {item.type === "chaos" ? (
                <ChaosMarine
                    primary={item.colors[0]?.hex}
                    secondary={item.colors[1]?.hex}
                    edge={item.colors[2]?.hex}
                    accent={item.colors[3]?.hex}
                    pattern={item.pattern}
                />
            ) : (
                <SpaceMarine
                    primary={item.colors[0]?.hex}
                    secondary={item.colors[1]?.hex}
                    trim={item.colors[2]?.hex}
                    pattern={item.pattern}
                />
            )}
        </div>
    );
}

export default function Background() {
    return (
        <div className="absolute inset-0 z-[-1]" aria-hidden="true">
            <div className="flex flex-wrap justify-around overflow-hidden h-full">
                {backgroundPresets.map(renderMarineCard)}
            </div>
        </div>
    );
}
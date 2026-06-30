"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SpaceMarineGhost = dynamic(
    () => import("@/lib/factions/chapter/models/spaceMarine"),
    {
        ssr: false,
        loading: () => null,
    }
);

const ChaosMarineGhost = dynamic(
    () => import("@/lib/factions/chaos/models/chaosSpaceMarine"),
    {
        ssr: false,
        loading: () => null,
    }
);

const EldarAvengerGhost = dynamic(
    () => import("@/lib/factions/eldar/models/eldarAvenger"),
    {
        ssr: false,
        loading: () => null,
    }
);

const SisterOfBattleGhost = dynamic(
    () => import("@/lib/factions/sisters/models/sisterOfBattle"),
    {
        ssr: false,
        loading: () => null,
    }
);

const FireWarriorGhost = dynamic(
    () => import("@/lib/factions/tau/models/fireWarrior"),
    {
        ssr: false,
        loading: () => null,
    }
);

const modelMap = {
    chapter: SpaceMarineGhost,
    chaos: ChaosMarineGhost,
    eldar: EldarAvengerGhost,
    sisters: SisterOfBattleGhost,
    tau: FireWarriorGhost,
};

function useIsMdUp() {
    const [isMdUp, setIsMdUp] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 768px)");

        const update = () => {
            setIsMdUp(mediaQuery.matches);
        };

        update();

        mediaQuery.addEventListener("change", update);

        return () => {
            mediaQuery.removeEventListener("change", update);
        };
    }, []);

    return isMdUp;
}

export default function GhostModelLoader({ model, modelProps }) {
    const isMdUp = useIsMdUp();

    if (!isMdUp) return null;

    const GhostModel = modelMap[model];

    if (!GhostModel) return null;

    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 top-1 h-[80%] w-[80%] opacity-[0.08]"
        >
            <GhostModel {...modelProps} />
        </div>
    );
}
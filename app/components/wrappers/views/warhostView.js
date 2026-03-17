"use client";

import { useEffect } from "react";
import { useWarhostStore } from "@/app/stores/warhostStore";
import GeneratorView from "@/app/components/generatorView";


export default function WarhostView({ initialBand }) {
    const setWarhost = useWarhostStore(s => s.setWarhost);
    const warhost = useWarhostStore(s => s.warhost);

    useEffect(() => { setWarhost(initialBand); }, [initialBand, setWarhost]);
    const band = warhost.slug ? warhost : initialBand;

    return (
        <GeneratorView
            generatorKey="eldar"
            band={band}
        />
    )
}

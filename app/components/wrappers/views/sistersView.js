"use client";

import { useEffect } from "react";
import { useSistersStore } from "@/app/stores/sistersStore";
import GeneratorView from "@/app/components/generatorView";

export default function SistersView({ initialOrder }) {
    const setOrder = useSistersStore((s) => s.setOrder);
    const order = useSistersStore((s) => s.order);

    useEffect(() => {
        setOrder(initialOrder);
    }, [initialOrder, setOrder]);

    const band = order.slug ? order : initialOrder;

    console.log("Slug order", order);
    console.log("Initial order", initialOrder);

    return (
        <GeneratorView
            generatorKey="sisters"
            band={band}
            defaultModelKey="sister"
        />
    );
}   
"use client";

import { useEffect } from "react";
import { useWarbandStore } from "@/app/stores/warbandStore";
import GeneratorView from "@/app/components/generatorView";

export default function ChapterView({ initialChapter }) {
    const setChapter = useWarbandStore((s) => s.setWarband);
    const chapter = useWarbandStore((s) => s.warband);

    useEffect(() => {
        setChapter(initialChapter);
    }, [initialChapter, setChapter]);

    const band = chapter.slug ? chapter : initialChapter;

    return (
        <GeneratorView
            generatorKey="chapter"
            band={band}
            defaultModelKey="marine"
        />
    );
}

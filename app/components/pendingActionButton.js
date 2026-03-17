"use client";

import { useFormStatus } from "react-dom";
import { generatorRegistry } from "./generatorRegistry";

export default function PendingActionButton({
    generatorKey = "chapter",
    children,
    loadingLabel = "Generating…",
}) {
    const { pending } = useFormStatus();
    const config = generatorRegistry[generatorKey] ?? generatorRegistry.chapter;

    return (
        <button
            type="submit"
            className={`btn ${config.buttonTheme} btn-block rounded-sm`}
            disabled={pending}
            aria-busy={pending}
        >
            {pending ? loadingLabel : children}
        </button>
    );
}
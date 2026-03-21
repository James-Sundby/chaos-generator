"use client";

import { useFormStatus } from "react-dom";

export default function PendingActionButton({
    children,
    loadingLabel = "Generating…",
}) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className="btn btn-primary w-full rounded-none"
            disabled={pending}
            aria-busy={pending}
        >
            {pending ? loadingLabel : children}
        </button>
    );
}
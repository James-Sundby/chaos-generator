"use client";

import { useState, useTransition, useEffect } from "react";
import { schemeSearchServer } from "@/app/(actions)/serverActions";

export default function SchemeSearch({
    id = "scheme-search",
    placeholder = "chapter-ravens-of-the-keep-989c94-440052-aa7d67-eradicant-random",
    buttonLabel = "Look up a Scheme",
    ariaLabel = "Scheme lookup code",
    buttonTheme = "btn-primary",
}) {
    const [q, setQ] = useState("");
    const [serverError, setServerError] = useState(null);
    const [pending, startTransition] = useTransition();
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    const value = q.trim();
    const isEmpty = !value;
    const submitDisabled = hasMounted ? isEmpty || pending : false;

    function handleSubmit(event) {
        event.preventDefault();
        if (!value || pending) return;

        setServerError(null);

        startTransition(async () => {
            const res = await schemeSearchServer({ q: value });
            if (res?.error) setServerError(res.error);
        });
    }

    function handleClear() {
        setQ("");
        setServerError(null);
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="w-full">
            <div className="flex flex-col gap-2">
                <label htmlFor={id} className="sr-only">
                    {ariaLabel}
                </label>

                <div className="join w-full">
                    <input
                        id={id}
                        name="q"
                        value={q}
                        onChange={(event) => {
                            setQ(event.target.value);
                            if (serverError) setServerError(null);
                        }}
                        className={`input input-bordered join-item w-full rounded-none border-base-300 bg-base-100 ${serverError ? "input-error" : ""
                            }`}
                        placeholder={placeholder}
                        autoComplete="off"
                        aria-invalid={!!serverError}
                        aria-describedby={serverError ? `${id}-error` : undefined}
                    />

                    {!isEmpty ? (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="btn btn-neutral join-item rounded-none"
                            aria-label="Clear search"
                            disabled={pending}
                        >
                            X
                        </button>
                    ) : null}

                    <button
                        type="submit"
                        className={`btn ${buttonTheme} join-item rounded-none`}
                        disabled={submitDisabled}
                        aria-busy={pending}
                        aria-label={buttonLabel}
                    >
                        {pending ? (
                            <span className="loading loading-spinner loading-sm" aria-hidden="true" />
                        ) : (
                            <>
                                <span className="hidden sm:inline">{buttonLabel}</span>
                                <svg
                                    viewBox="0 0 512 512"
                                    className="size-4 fill-current sm:ml-2"
                                    aria-hidden="true"
                                >
                                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                                </svg>
                            </>
                        )}
                    </button>
                </div>

                {serverError ? (
                    <p
                        id={`${id}-error`}
                        role="alert"
                        aria-live="polite"
                        className="text-sm text-error"
                    >
                        {serverError}
                    </p>
                ) : null}
            </div>
        </form>
    );
}
"use client";

import { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { schemeSearchObjectSchema } from "@/app/schema/schemeSearch";
import { schemeSearchServer } from "@/app/(actions)/serverActions";

export default function SchemeSearch({
    id = "scheme-search",
    placeholder = "chapter-ravens-of-the-keep-a99d95-440052-989898-eradicant-random",
    buttonLabel = "Look up a Scheme",
    ariaLabel = "Scheme lookup code",
    buttonTheme = "btn-secondary",
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        watch,
        setFocus,
        setValue,
    } = useForm({
        resolver: zodResolver(schemeSearchObjectSchema),
        defaultValues: { q: "" },
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        shouldFocusError: true,
    });

    const q = watch("q");
    const isEmpty = !((q ?? "").trim());

    const [serverError, setServerError] = useState(null);
    const [pending, startTransition] = useTransition();

    const onSubmit = ({ q }) => {
        const value = (q ?? "").trim();
        if (!value) return;

        setServerError(null);

        startTransition(async () => {
            const res = await schemeSearchServer({ q: value });
            if (res?.error) setServerError(res.error);
        });
    };

    const onInvalid = () => setFocus("q");
    const hasError = !!errors.q || !!serverError;

    const handleClear = () => {
        setValue("q", "", {
            shouldDirty: false,
            shouldTouch: false,
            shouldValidate: false,
        });
        clearErrors("q");
        setServerError(null);
        setFocus("q");
    };

    useEffect(() => {
        if (isEmpty) {
            if (errors.q) clearErrors("q");
            if (serverError) setServerError(null);
        }
    }, [isEmpty, errors.q, clearErrors, serverError]);

    useEffect(() => {
        if (serverError && q?.trim()) {
            setServerError(null);
        }
    }, [q]);

    return (
        <form
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            noValidate
            className="w-full"
        >
            <div className="flex flex-col gap-2">
                <label htmlFor={id} className="sr-only">
                    {ariaLabel}
                </label>

                <div className="join w-full">
                    <input
                        id={id}
                        {...register("q")}
                        className={`input input-bordered join-item w-full rounded-none border-base-300 bg-base-100 ${hasError ? "input-error" : ""
                            }`}
                        placeholder={placeholder}
                        autoComplete="off"
                        aria-invalid={hasError}
                        aria-describedby={hasError ? `${id}-error` : undefined}
                    />

                    {!isEmpty ? (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="btn btn-neutral join-item rounded-none"
                            aria-label="Clear search"
                            title="Clear search"
                            disabled={pending}
                        >
                            X
                        </button>
                    ) : null}

                    <button
                        type="submit"
                        className={`btn ${buttonTheme} join-item rounded-none`}
                        aria-busy={pending}
                        disabled={isEmpty || pending}
                        aria-disabled={isEmpty || pending}
                        title={isEmpty ? "Enter a slug to search" : undefined}
                    >
                        {pending ? (
                            <span className="inline-flex items-center gap-2">
                                <span
                                    className="loading loading-spinner loading-sm"
                                    aria-hidden="true"
                                />
                                <span className="hidden sm:inline">Searching…</span>
                                <span className="sr-only">Searching…</span>
                            </span>
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

                {hasError ? (
                    <p
                        id={`${id}-error`}
                        role="alert"
                        aria-live="polite"
                        className="text-sm text-error"
                    >
                        {serverError || errors.q?.message}
                    </p>
                ) : null}
            </div>
        </form>
    );
}
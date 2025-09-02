'use client';

import { useState, useTransition, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { chaosSearchObjectSchema as chaosSchema } from "@/app/schema/chaos";
import { chapterSearchObjectSchema as chapterSchema } from "@/app/schema/chapter";

import { warbandSearchServer } from "@/app/(actions)/warbandSearch";
import { chapterSearchServer } from "@/app/(actions)/chapterSearch";

const BTN_CLASS = {
    Chaos: "btn-error",
    Chapter: "btn-primary",
};

const PLACEHOLDER = {
    Chaos: "true-sons-63605d-354D4C-66656E-8CC276-center",
    Chapter: "angels-of-the-gate-FFFFFF-317E57-989C94-blazoned",
};

export default function SchemeSearch({
    variant = "Chaos", // "Chaos" | "Chapter"
    id = "scheme-search",
}) {
    const {
        schema,
        serverAction,
        placeholder,
        btnColour,
        buttonLabel,
        ariaLabel,
    } = useMemo(() => {
        if (variant === "Chapter") {
            return {
                schema: chapterSchema,
                serverAction: chapterSearchServer,
                placeholder: PLACEHOLDER.Chapter,
                btnColour: BTN_CLASS.Chapter,
                buttonLabel: "Look up a Chapter",
                ariaLabel: "Chapter lookup code",
            };
        }
        return {
            schema: chaosSchema,
            serverAction: warbandSearchServer,
            placeholder: PLACEHOLDER.Chaos,
            btnColour: BTN_CLASS.Chaos,
            buttonLabel: "Look up a Warband",
            ariaLabel: "Warband lookup code",
        };
    }, [variant]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        watch,
        setFocus,
    } = useForm({
        resolver: zodResolver(schema),
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
        const v = (q ?? "").trim();
        if (!v) return;
        setServerError(null);
        startTransition(async () => {
            const res = await serverAction({ q: v });
            if (res?.error) setServerError(res.error);
        });
    };

    const onInvalid = () => setFocus("q");
    const hasError = !!errors.q || !!serverError;

    useEffect(() => {
        if (serverError) setServerError(null);
        if (isEmpty && errors.q) clearErrors("q");
    }, [isEmpty, errors.q, clearErrors, serverError]);

    return (
        <form onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate className="w-full">
            {/* Visible label keeps the “what is this?” context clear */}
            <div className="form-control w-full">
                <label htmlFor={id} className="sr-only">
                    {ariaLabel}
                </label>

                {/* Input + Button as a single joined control */}
                <div className="join w-full">
                    <input
                        id={id}
                        {...register("q")}
                        className={`input input-bordered join-item w-full ${hasError ? "input-error" : ""}`}
                        placeholder={placeholder}
                        autoComplete="off"
                        aria-invalid={hasError}
                        aria-describedby={hasError ? `${id}-error` : undefined}
                    />

                    <button
                        type="submit"
                        className={`btn ${btnColour} join-item`}
                        aria-busy={pending}
                        disabled={isEmpty || pending}
                        aria-disabled={isEmpty || pending}
                        title={isEmpty ? "Enter a slug to search" : undefined}
                    >
                        {pending ? (
                            <span className="inline-flex items-center gap-2">
                                <span className="loading loading-spinner loading-sm" aria-hidden="true" />
                                <span className="sr-only">Searching…</span>
                            </span>
                        ) : (
                            <>
                                <span className="hidden sm:inline">{buttonLabel}</span>
                                <svg viewBox="0 0 512 512" className="size-4 fill-current sm:ml-2" aria-hidden="true">
                                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                                </svg>
                            </>
                        )}
                    </button>
                </div>

                {hasError && (
                    <div className="label">
                        <span id={`${id}-error`} role="alert" aria-live="polite" className="label-text-alt text-error">
                            {serverError || errors.q?.message}
                        </span>
                    </div>
                )}
            </div>
        </form>
    );
}

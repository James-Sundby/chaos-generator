"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { useWarbandStore } from "../stores/warbandStore";

export default function WarbandSearch() {
    const {
        register,
        handleSubmit,
        clearErrors,
        setError,
        formState: { errors, isSubmitting },
    } = useForm();
    const router = useRouter();
    const setWarband = useWarbandStore((state) => state.setWarband);

    const onSubmit = async (data) => {
        const { lookupCode } = data;

        try {
            const response = await fetch(`/api/chapter-generator?slug=${lookupCode.trim()}`);
            if (!response.ok) {
                setError("lookupCode", {
                    type: "manual",
                    message: "Invalid chapter code. Please try again.",
                });
                setTimeout(() => {
                    clearErrors()
                }, 3000);
                return;
            }

            const fetchedWarband = await response.json();
            if (fetchedWarband.message === "valid") {
                setWarband(fetchedWarband);
                router.push(`/chapter/${fetchedWarband.slug}`);
            } else {
                setError("lookupCode", {
                    type: "manual",
                    message: "No chapter found.",
                });
                setTimeout(() => {
                    clearErrors()
                }, 3000);
            }
        } catch (error) {
            // console.error("Error validating chapter code:", error);
            setError("lookupCode", {
                type: "manual",
                message: "Something went wrong. Please try again later.",
            });
            setTimeout(() => {
                clearErrors()
            }, 3000);
        }
    };

    return (

        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 w-full">
            <div className="indicator w-full">
                <input
                    type="text"
                    className="input input-bordered rounded-lg w-full"
                    placeholder="chapter-code-88241C-35468F-"
                    {...register("lookupCode", {
                    })}
                    required
                    aria-invalid={!!errors.lookupCode}
                    aria-describedby="lookupCodeError"
                    disabled={isSubmitting || errors.lookupCode}
                />
                {errors.lookupCode && (
                    <span id="lookupCodeError" className="indicator-item indicator-center indicator-bottom badge badge-error rounded-lg">{errors.lookupCode.message}</span>
                )}
            </div>
            <button
                type="submit"
                className={`btn btn-primary rounded-lg items-center justify-center ${isSubmitting ? "loading" : ""}`}
                disabled={isSubmitting || errors.lookupCode}
                aria-label="Look up a Chapter"
            >
                <p className="hidden sm:block">Look up a Chapter</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 aspect-square fill-primary-content" aria-hidden="true" focusable="false" >
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
            </button>
        </form>

    );
}

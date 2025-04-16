"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function StorageAlert() {
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const alertDismissed = sessionStorage.getItem("storageAlertDismissed");
        if (!alertDismissed) {
            setShowAlert(true);
        }
    }, []);

    const handleDismiss = () => {
        sessionStorage.setItem("storageAlertDismissed", "true");
        setShowAlert(false);
    };

    return (
        <>
            {showAlert && (
                <div
                    role="alert"
                    className="alert max-w-md mx-auto my-8 rounded-lg border border-primary text-sm shadow"
                >
                    <div className="flex flex-col gap-2">
                        We use session storage to keep your chapter and paint data while you&apos;re here. It&apos;s gone when you close this tab.
                        <Link href="/privacy" className="link link-hover" aria-label="Read the privacy policy">
                            Learn more
                        </Link>
                    </div>

                    <button
                        className="btn btn-primary rounded-lg ml-auto"
                        onClick={handleDismiss}
                    >
                        Got it
                    </button>
                </div>
            )}
        </>
    );
}

"use client";

import { useState, useEffect } from "react";

export default function StorageAlert() {
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        // Check if the alert has already been dismissed in the current session
        const alertDismissed = sessionStorage.getItem("storageAlertDismissed");
        if (!alertDismissed) {
            setShowAlert(true); // Show the alert if it hasn't been dismissed
        }
    }, []);

    const handleDismiss = () => {
        sessionStorage.setItem("storageAlertDismissed", "true"); // Mark the alert as dismissed for the session
        setShowAlert(false);
    };

    return (
        <>
            {showAlert && (
                <div role="alert" className="card card-compact bg-base-300 max-w-sm shadow-lg">
                    <div className="card-body">
                        <p className="w-full h-auto">
                            This site uses session storage to temporarily save your chapter data and paint scheme to your browser. This data is not shared or stored after your session ends.
                        </p>
                        <div className="card-actions justify-end">
                            <button
                                className="btn btn-sm btn-primary"
                                onClick={handleDismiss}
                            >
                                Got it
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

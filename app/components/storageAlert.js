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
                // <div role="alert" className="card card-sm bg-base-300 max-w-xs shadow-lg rounded-lg border border-primary">
                //     <div className="card-body">
                //         <p className="">
                //             This site uses session storage to temporarily save your chapter data and paint scheme to your browser. This data is not shared or stored after your session ends.
                //         </p>
                //         <div className="card-actions justify-end">
                //             <button
                //                 className="btn btn-sm btn-primary rounded-lg"
                //                 onClick={handleDismiss}
                //             >
                //                 Got it
                //             </button>
                //         </div>
                //     </div>
                // </div>
                <div role="alert" className="alert alert-vertical max-w-xs text-left rounded-lg border border-primary">
                    <p className="">
                        This site uses session storage to temporarily save your chapter data and paint scheme to your browser. This data is not shared or stored after your session ends.
                    </p>
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

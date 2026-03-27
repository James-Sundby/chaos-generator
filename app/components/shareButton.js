"use client";

import { useState } from "react";

export default function ShareButton({
    basePath,
    noun = "scheme",
    slug,
    title,
}) {
    const [copied, setCopied] = useState(false);

    const aria = `Share this ${noun}`;

    const handleShare = async () => {
        const url = `${window.location.origin}${basePath}/${slug}`;
        const shareTitle = `Check out this ${noun}!`;
        const shareText = title ?? "";

        if (navigator.share) {
            try {
                await navigator.share({
                    title: shareTitle,
                    text: `${shareTitle} ${shareText}`.trim(),
                    url,
                });
            } catch {
                // user cancelled or share failed
            }
            return;
        }

        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-primary w-full rounded-none"
                onClick={handleShare}
                aria-label={aria}
                title={aria}
            >
                Share
            </button>

            {copied && (
                <div className="toast toast-end toast-bottom">
                    <div className="alert alert-info rounded-none">
                        <span>Link copied to clipboard!</span>
                    </div>
                </div>
            )}
        </>
    );
}
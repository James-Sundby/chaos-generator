"use client";

import { useState } from "react";
import { generatorRegistry } from "@/lib/generators/index";


export default function ShareButton({
    generatorKey = "chapter",
    slug,
    title,
}) {
    const [copied, setCopied] = useState(false);
    const config = generatorRegistry[generatorKey] ?? generatorRegistry.chapter;

    const aria = `Share this ${config.noun}`;

    const handleShare = async () => {
        const url = `${window.location.origin}${config.basePath}/${slug}`;
        const shareTitle = `Check out this ${config.noun}!`;
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
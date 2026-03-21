"use client";

import { useState } from "react";
import { generatorRegistry } from "./generatorRegistry";

export default function ShareButton({
    generatorKey = "chapter",
    slug,
    title,
}) {
    const [copied, setCopied] = useState(false);
    const config = generatorRegistry[generatorKey] ?? generatorRegistry.chapter;

    const aria = `Share this ${config.noun}`;

    const handleShare = () => {
        const url = `${window.location.origin}${config.basePath}/${slug}`;
        const shareTitle = `Check out this ${config.noun}!`;
        const shareText = title ?? "";

        if (navigator.share) {
            navigator
                .share({ title: shareTitle, text: `${shareTitle} ${shareText}`.trim(), url })
                .catch(() => { });
        } else {
            navigator.clipboard.writeText(url).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };

    return (
        <>
            <button
                className="btn btn-primary btn-block rounded-none"
                onClick={handleShare}
                aria-label={aria}
                title={aria}
                type="button"
            >
                <span>Share</span>
            </button>

            {copied && (
                <div className="toast">
                    <div className="alert alert-info rounded-none">
                        <span>Link copied to clipboard!</span>
                    </div>
                </div>
            )}
        </>
    );
}
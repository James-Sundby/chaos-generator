"use client";

import { useState } from "react";

export default function ShareButton({
    variant = "Chapter", // "Chapter" | "Chaos"
    slug,
    title,
}) {
    const [copied, setCopied] = useState(false);

    const basePath = variant === "Chapter" ? "/chapter" : "/chaos";
    const labelNoun = variant === "Chapter" ? "chapter" : "warband";
    const typeColour = variant === "Chapter" ? "btn-primary" : "btn-accent";
    const aria = `Share this ${labelNoun}`;

    const handleShare = () => {
        const url = `${window.location.origin}${basePath}/${slug}`;
        const shareTitle = `Check out this ${variant}!`;
        const shareText = title ?? "";

        if (navigator.share) {
            navigator
                .share({ title: shareTitle, text: shareTitle, shareText, url: url })
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
                className={`btn ${typeColour} btn-block rounded-sm`}
                onClick={handleShare}
                aria-label={aria}
                title={aria}
                type="button"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="size-5 fill-current"
                    aria-hidden="true"
                >
                    <path d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z" />
                </svg>
                <span >Share</span>
            </button>

            {copied && (
                <div className="toast">
                    <div className="alert alert-info">
                        <span>Link copied to clipboard!</span>
                    </div>
                </div>
            )}
        </>
    );
}

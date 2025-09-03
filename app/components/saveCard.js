"use client";

import { useCallback, useState } from "react";
import * as htmlToImage from "html-to-image";

async function fileToDataURL(path) {
    const res = await fetch(path);
    const blob = await res.blob();
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}

function buildFontCSS(fonts) {
    return fonts
        .map(
            (f) =>
                `
                    @font-face {
                    font-family: "${f.family}";
                    src: url(${f.dataUrl}) format("truetype");
                    font-weight: ${f.weight ?? "400"};
                    font-style: ${f.style ?? "normal"};
                    font-display: swap;
                }`
        )
        .join("\n");
}

function mountOffscreen(node) {
    const mount = document.createElement("div");
    Object.assign(mount.style, {
        position: "fixed",
        left: "-10000px",
        top: "0",
        pointerEvents: "none",
        opacity: "0",
        zIndex: "-1",
    });
    mount.appendChild(node);
    document.body.appendChild(mount);
    return mount;
}

export default function SaveCard({
    variant = "Chapter",
    targetId,
    filename = "trading-card",
    fonts = [
        { family: "Inter", src: "/fonts/Inter-Var.ttf", weight: "100 900" },
    ],
    forceFamily = '"Inter", system-ui, sans-serif',
    pixelRatio = Math.max(2, typeof window !== "undefined" ? window.devicePixelRatio || 1 : 2),
}) {
    const typeColour = variant === "Chapter" ? "btn-primary" : "btn-accent";
    const [busy, setBusy] = useState(false);

    const onClick = useCallback(async () => {
        const node = document.getElementById(targetId);
        if (!node) {
            console.error(`[SaveCardPngTTF] target #${targetId} not found`);
            alert("Card not found. Check targetId and the card's id.");
            return;
        }

        try {
            setBusy(true);
            const fontDatas = await Promise.all(
                fonts.map(async (f) => ({ ...f, dataUrl: await fileToDataURL(f.src) }))
            );

            const clone = node.cloneNode(true);
            const style = document.createElement("style");
            style.textContent = buildFontCSS(fontDatas);
            if (forceFamily) clone.style.fontFamily = forceFamily;
            clone.insertBefore(style, clone.firstChild);

            const mount = mountOffscreen(clone);
            try {
                node.scrollIntoView({ block: "nearest" });
                await new Promise((r) => requestAnimationFrame(r));
                try { if (document.fonts?.ready) await document.fonts.ready; } catch { }

                const rect = node.getBoundingClientRect();
                const dataUrl = await htmlToImage.toPng(clone, {
                    cacheBust: true,
                    backgroundColor: "#ffffff",
                    pixelRatio,
                    skipFonts: true,
                    style: { transform: "none", width: `${rect.width}px`, height: `${rect.height}px` },
                    filter: (n) => n?.dataset?.noExport !== "true" && !n?.classList?.contains("tooltip"),
                });

                // Convert dataURL -> Blob -> object URL
                const blob = await (await fetch(dataUrl)).blob();
                const objectUrl = URL.createObjectURL(blob);

                const tryDirectDownload = () => {
                    const a = document.createElement("a");
                    a.href = objectUrl;
                    a.download = `${filename}.png`;
                    // Some browsers require it in the DOM:
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                };
                try {
                    tryDirectDownload();
                } catch {
                    window.open(objectUrl, "_blank", "noopener,noreferrer");
                }
            } finally {
                mount.remove();
            }
        } catch (err) {
            console.error("[SaveCardPngTTF] export failed:", err);
            alert("PNG export failed. See console for details.");
        } finally {
            setBusy(false);
        }
    }, [targetId, filename, fonts, forceFamily, pixelRatio]);

    return (
        <div className="" data-no-export="true">
            <button
                className={`btn ${typeColour} btn-block rounded-sm`}
                onClick={onClick}
                disabled={busy}
                aria-label="Download card as PNG"
            >
                {busy ? "Rendering…" : "Save PNG"}
            </button>
        </div>
    );
}

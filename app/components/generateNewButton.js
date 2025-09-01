import PendingActionButton from "./pendingActionButton";
import { createWarbandAndGo } from "@/app/(actions)/createWarband";
import { createChapterAndGo } from "@/app/(actions)/createChapter";

export default function GenerateNewButton({
    variant = "Chapter", // "Chaos" or "Chapter"
    label, // optional override
}) {
    const action =
        variant === "Chaos" ? createWarbandAndGo : createChapterAndGo;

    const defaultLabel =
        variant === "Chaos" ? "Generate a New Chaos Warband" : "Generate a New Chapter";

    return (
        <form action={action}>
            <PendingActionButton
                variant={variant}
            >
                {label ?? defaultLabel}
            </PendingActionButton>
        </form>
    );
}

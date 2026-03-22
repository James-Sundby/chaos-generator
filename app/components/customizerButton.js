import Link from "next/link";
import { generatorRegistry } from "@/lib/generators/index";

export default function CustomizerButton({
    generatorKey = "chapter",
    label,
}) {
    const config = generatorRegistry[generatorKey] ?? generatorRegistry.chapter;
    const aria = label ?? `Customize your ${config.noun}`;

    return (
        <Link
            href={config.painterPath}
            className="btn btn-primary w-full rounded-none"
            aria-label={aria}
            title={aria}
        >
            {label ?? "Customize"}
        </Link>
    );
}
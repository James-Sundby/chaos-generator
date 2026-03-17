import Link from "next/link";
import { generatorRegistry } from "./generatorRegistry";

export default function CustomizerButton({
    generatorKey = "chapter",
    label,
}) {
    const config = generatorRegistry[generatorKey] ?? generatorRegistry.chapter;
    const aria = label ?? `Customize your ${config.noun}`;

    return (
        <Link
            className={`btn ${config.buttonTheme} btn-block rounded-sm`}
            href={config.painterPath}
            aria-label={aria}
            title={aria}
        >
            <span>{label ?? "Customize"}</span>
        </Link>
    );
}
import Link from "next/link";

export default function CustomizerButton({
    painterPath,
    noun = "scheme",
    label,
}) {
    const aria = label ?? `Customize your ${noun}`;

    return (
        <Link
            href={painterPath}
            className="btn btn-primary w-full rounded-none"
            aria-label={aria}
            title={aria}
        >
            {label ?? "Customize"}
        </Link>
    );
}
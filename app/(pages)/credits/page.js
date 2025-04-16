import Link from "next/link";

export default function Page() {
    return (
        <main
            role="main"
            className="flex flex-1 flex-col max-w-3xl mx-auto px-4 py-10 prose prose-sm md:prose-base dark:prose-invert"
        >
            <h1>Credits & Attribution</h1>

            <h2>Disclaimer</h2>
            <p>
                This site is a fan-made, non-commercial project inspired by the Warhammer 40K universe.
                <strong> Space Marines</strong>, <strong>Chaos Space Marines</strong>, and related names, designs, and imagery are the intellectual
                property of{" "}
                <Link
                    href="https://www.warhammer.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                    aria-label="Visit Games Workshop website"
                >
                    Games Workshop
                </Link>
                . This project is not affiliated with, endorsed by, or supported by Games Workshop in any way.
            </p>

            <p>
                If you are the owner of any artwork or IP featured here and would like it removed or updated, please contact me at{" "}
                <Link
                    href="mailto:james@jsundby.dev"
                    className="link"
                    aria-label="Email James Sundby"
                    title="Email James Sundby"
                >
                    james@jsundby.dev
                </Link>
                .
            </p>

            <h2>Line Art & Fan Asset Credits</h2>
            <p>
                This project includes original fan-made artwork inspired by Warhammer 40K. Special thanks to the following creators:
            </p>
            <ul>
                <li>
                    <Link
                        href="https://www.deviantart.com/40kresources"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit 40kResources on DeviantArt"
                        className="link"
                    >
                        40kResources on DeviantArt
                    </Link>
                </li>
                <li>
                    <Link
                        href="https://www.deviantart.com/shawnpleil"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit ShawnPleil on DeviantArt"
                        className="link"
                    >
                        ShawnPleil on DeviantArt
                    </Link>
                </li>
            </ul>
            <p>
                If you are one of the credited artists and would like your artwork removed or updated,
                feel free to reach out via the contact above.
            </p>

            <h2>Open Graph Image Credit</h2>
            <p>
                The background image used in the site&apos;s social media preview card is licensed under the Pixabay license:
            </p>

            <ul>
                <li>
                    Image by{" "}
                    <Link
                        href="https://pixabay.com/users/jan_photo-2842014/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4226688"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link"
                        aria-label="View Jan Mateboer's profile on Pixabay"
                    >
                        Jan Mateboer
                    </Link>{" "}
                    from{" "}
                    <Link
                        href="https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4226688"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link"
                        aria-label="Visit Pixabay"
                    >
                        Pixabay
                    </Link>
                </li></ul>
        </main>
    );
}
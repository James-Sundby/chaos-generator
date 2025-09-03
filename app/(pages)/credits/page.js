import Link from "next/link";


export const metadata = {
    title: "Credits & Attribution List",
    description: "Attribution and credits for fan art, icons, and external assets used in Chapter Generator. Includes contact info for takedown or update requests.",
    openGraph: {
        title: "Credits & Attribution List",
        description: "Attribution and credits for fan art, icons, and external assets used in Chapter Generator. ",
        url: "https://chapter-gen.jsundby.dev/credits",
        siteName: "Chapter Generator",
        images: [
            {
                url: "https://chapter-gen.jsundby.dev/card.png",
                width: 1200,
                height: 630,
                alt: "Line-art image of a Space Marine. Text overlay: Stuck with primer? Generate a chapter and break the block.",
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        title: "Credits & Attribution List",
        description: "Attribution and credits for fan art, icons, and external assets used in Chapter Generator. ",
        card: 'summary_large_image',
        images: [
            {
                url: "https://chapter-gen.jsundby.dev/card.png",
                alt: "Line-art image of a Space Marine. Text overlay: Stuck with primer? Generate a chapter and break the block."
            }
        ],
    },
};

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
                Space Marines, Chaos Space Marines, and related names, designs, and imagery are the intellectual
                property of{" "}
                <Link
                    href="https://www.warhammer.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                    aria-label="Visit the Games Workshop website"
                    title="Visit the Games Workshop website"
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
                This project relies on original fan-made artwork inspired by the Warhammer 40K universe. Special thanks to the following creators:
            </p>
            <ul>
                <li>
                    <Link
                        href="https://www.deviantart.com/40kresources"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit 40kResources on DeviantArt"
                        title="Visit 40kResources on DeviantArt"
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
                        title="Visit ShawnPleil on DeviantArt"
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

            {/* <h2>Open Graph Image Credit</h2>
            <p>
                The background image used in the site&apos;s social media preview card is by{" "}
                <Link
                    href="https://pixabay.com/users/jan_photo-2842014/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4226688"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                    aria-label="View Jan Mateboer's profile on Pixabay"
                    title="View Jan Mateboer's profile on Pixabay"
                >
                    Jan Mateboer
                </Link>
                {" "}and is licensed under the{" "}
                <Link
                    href="https://pixabay.com/service/license-summary/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                    aria-label="View Pixabay's content license"
                    title="View Pixabay's content license"
                >
                    Pixabay content license
                </Link>.
            </p> */}

            <h2>Icon Credits</h2>
            <p>
                This site uses icons provided by{" "}
                <Link
                    href="https://fontawesome.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                    aria-label="Visit Font Awesome"
                    title="Visit Font Awesome"
                >
                    Font Awesome Free
                </Link>
                , licensed under {" "}
                <Link
                    href="https://creativecommons.org/licenses/by/4.0/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                    aria-label="View Creative Commons Attribution 4.0 License"
                    title="View Creative Commons Attribution 4.0 License"
                >
                    Creative Commons Attribution 4.0 (CC BY 4.0)
                </Link>
                .
            </p>
        </main>
    );
}
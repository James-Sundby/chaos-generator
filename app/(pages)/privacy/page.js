import Link from "next/link";

export const metadata = {
    title: "Privacy Policy & Project Information",
    description: "Read how Chapter Generator handles your data. This fan-made tool avoids tracking and respects your privacy by using only session-based storage.",
    openGraph: {
        title: "Privacy Policy & Project Information",
        description: "Learn how Chapter Generator protects your privacy while you design custom Space Marine chapters.",
        url: "https://chapter-gen.jsundby.dev/privacy",
        siteName: "Chapter Generator",
        images: [
            {
                url: "https://chapter-gen.jsundby.dev/card.png",
                width: 1200,
                height: 630,
                alt: "Paintbrushes in a jar. Text overlay: Stuck with primer? Generate a chapter and break the block.",
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        title: "Privacy Policy & Project Information",
        description: "This fan tool doesn't use cookies or trackers. Find out how your data is handled.",
        card: 'summary_large_image',
        images: [
            {
                url: "https://chapter-gen.jsundby.dev/card.png",
                alt: "Paintbrushes in a jar. Text overlay: Stuck with primer? Generate a chapter and break the block."
            }
        ],
    },
};

export default function Page() {
    return (
        <main role="main" className="flex flex-1 flex-col max-w-3xl mx-auto p-4 prose prose-sm md:prose-base dark:prose-invert">

            <h1>Privacy Policy</h1>
            <p>
                This privacy policy explains what personal data is collected and how it&apos;s used and protected
                when you use <strong>Chapter Generator</strong>.
            </p>

            <h2>1. About the Project</h2>
            <p>
                <strong>Chapter Generator</strong> is a personal hobby project maintained by me.
                You can contact me at:{" "}
                <Link
                    href="mailto:james@jsundby.dev"
                    className="link"
                    aria-label="Email James at james@jsundby.dev"
                    title="Email James at james@jsundby.dev"
                >
                    james@jsundby.dev
                </Link>
            </p>

            <h2>2. Data & Tracking</h2>
            <p>
                This site does not use cookies or tracking scripts directly. However, third-party services like hosting providers may collect technical data such as IP address or browser type as part of their standard operations. See their policies below for details.
            </p>

            <h2>3. Third-party Services</h2>
            <p>This site is hosted on Vercel:
                {" "}
                <Link
                    href="https://vercel.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                    aria-label="Read the Vercel privacy policy"
                    title="Read the Vercel privacy policy"
                >
                    Vercel Privacy Policy
                </Link>

            </p>

            <h2>4. Session Storage</h2>
            <p>
                This site uses your browser&apos;s <strong>sessionStorage</strong> to temporarily store chapter data and paint schemes during your session. This data:
            </p>
            <ul>
                <li>Is stored locally in your browser</li>
                <li>Is cleared automatically when you close the browser tab or window</li>
                <li>Is never sent to any server, database, or third-party service</li>
            </ul>
            <p>
                This is done to provide a better user experience without the need for user accounts or cookies.
            </p>

            <h2>5. Questions or Requests</h2>
            <p>
                If you have any questions about privacy, attribution, or content usage, you can reach me at:{" "}
                <Link
                    href="mailto:james@jsundby.dev"
                    className="link"
                    aria-label="Email James at james@jsundby.dev"
                    title="Email James at james@jsundby.dev"
                >
                    james@jsundby.dev
                </Link>
            </p>

        </main>
    );
}

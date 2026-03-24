export const metadata = {
    title: "Privacy Policy",
    description:
        "Read how Chapter Generator handles data, storage, and privacy. This fan-made tool avoids tracking and uses only limited session-based storage where needed.",
    alternates: {
        canonical: "/privacy",
    },
    openGraph: {
        title: "Privacy Policy",
        description:
            "Learn how Chapter Generator handles data, storage, and privacy.",
        url: "/privacy",
        images: [
            {
                url: "/card.png",
                width: 1200,
                height: 630,
                alt: "Line-art image of a Space Marine. Text overlay: Stuck with primer? Generate a chapter and break the block.",
            },
        ],
    },
    twitter: {
        title: "Privacy Policy",
        description:
            "Learn how Chapter Generator handles data, storage, and privacy.",
        images: ["/card.png"],
    },
};

export default function Page() {
    return (
        <section className="flex flex-1 flex-col max-w-full mx-auto prose prose-sm md:prose-base dark:prose-invert">

            <h1>Privacy Policy</h1>
            <p>
                This privacy policy explains what personal data is collected and how it&apos;s used and protected
                when you use <strong>Chapter Generator</strong>.
            </p>

            <h2>1. About the Project</h2>
            <p>
                <strong>Chapter Generator</strong> is a personal hobby project maintained by me.
                You can contact me at:{" "}
                <a
                    href="mailto:james@jsundby.dev"
                    className="link"
                    aria-label="Email James at james@jsundby.dev"
                    title="Email James at james@jsundby.dev"
                >
                    james@jsundby.dev
                </a>
            </p>

            <h2>2. Data & Tracking</h2>
            <p>
                This site does not use cookies or tracking scripts directly. However, third-party services like hosting providers may collect technical data such as IP address or browser type as part of their standard operations. See their policies below for details.
            </p>

            <h2>3. Third-party Services</h2>
            <p>This site is hosted on Vercel:
                {" "}
                <a
                    href="https://vercel.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                    aria-label="Read the Vercel privacy policy"
                    title="Read the Vercel privacy policy"
                >
                    Vercel Privacy Policy
                </a>

            </p>

            <h2>4. Browser Storage</h2>
            <p>
                This site uses browser storage on your device to improve the user experience without requiring accounts or cookies.
            </p>

            <h3>Local Storage</h3>
            <p>
                <strong>localStorage</strong> may be used to store things like app settings and saved scheme history. This data:
            </p>
            <ul>
                <li>Is stored locally in your browser</li>
                <li>May remain available after you close the tab or browser</li>
                <li>Remains until you clear it or your browser removes it</li>
                <li>Is never sent to any server, database, or third-party service by this site</li>
            </ul>

            <h3>Session Storage</h3>
            <p>
                <strong>sessionStorage</strong> may be used for temporary in-session data while you use the site. This data:
            </p>
            <ul>
                <li>Is stored locally in your browser</li>
                <li>Is typically cleared when the tab or browser session ends</li>
                <li>Is never sent to any server, database, or third-party service by this site</li>
            </ul>

            <h2>5. Questions or Requests</h2>
            <p>
                If you have any questions about privacy, attribution, or content usage, you can reach me at:{" "}
                <a
                    href="mailto:james@jsundby.dev"
                    className="link"
                    aria-label="Email James at james@jsundby.dev"
                    title="Email James at james@jsundby.dev"
                >
                    james@jsundby.dev
                </a>
            </p>

        </section>
    );
}

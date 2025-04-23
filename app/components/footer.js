import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer footer-center p-4 text-xs text-neutral-content space-y-2">

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/credits"
          className="link link-hover"
          aria-label="View asset credits and attributions"
          title="View asset credits and attributions"
        >
          Credits
        </Link>
        <Link
          href="/help"
          aria-label="View the help section"
          title="View the help section"
          className="link link-hover"
        >
          Help
        </Link>
        <Link
          href="/privacy"
          aria-label="View our privacy policy"
          title="View our privacy policy"
          className="link link-hover"
        >
          Privacy
        </Link>
        <Link
          href="mailto:james@jsundby.dev"
          aria-label="Send an email to james@jsundby.dev"
          title="Send an email to james@jsundby.dev"
          className="link link-hover"
        >
          Contact
        </Link>

        <Link
          href="https://jsundby.dev"
          aria-label="Visit my personal blog on jsundby.dev"
          title="Visit my personal blog on jsundby.dev"
          className="link link-hover"
          target="_blank"
          rel="noopener noreferrer"
        >
          Blog
        </Link>
        <Link
          href="https://github.com/James-Sundby/chaos-generator/"
          aria-label="Visit my GitHub"
          title="Visit my GitHub"
          className="link link-hover"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </Link>
      </div>
    </footer>
  );
}

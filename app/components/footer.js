import Link from "next/link";

export default function Footer() {
  return (
    <footer className="container mx-auto p-4 text-xs text-base-content flex flex-col gap-4">
      <p className="text-center">
        This is a fan-made project and is not affiliated with or endorsed by Games Workshop.
        No challenge to their trademarks or intellectual property is intended.
      </p>

      <nav aria-label="Footer" className="flex justify-center">
        <ul className="flex flex-wrap justify-center gap-x-4">
          <li>
            <Link
              href="/credits"
              className="link link-hover"
              aria-label="View asset credits and attributions"
              title="View asset credits and attributions"
            >
              Credits
            </Link>
          </li>
          <li>
            <Link
              href="/help"
              aria-label="View the help section"
              title="View the help section"
              className="link link-hover"
            >
              Help
            </Link>
          </li>
          <li>
            <Link
              href="/privacy"
              aria-label="View our privacy policy"
              title="View our privacy policy"
              className="link link-hover"
            >
              Privacy
            </Link>
          </li>
          <li>
            <a
              href="mailto:james@jsundby.dev"
              aria-label="Send an email to james@jsundby.dev"
              title="Send an email to james@jsundby.dev"
              className="link link-hover"
            >
              Contact
            </a>
          </li>
          <li>
            <a
              href="https://jsundby.dev/projects/chaos-generator/"
              aria-label="Visit my personal blog on jsundby.dev"
              title="Visit my personal blog on jsundby.dev"
              className="link link-hover"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blog
            </a>
          </li>
          <li>
            <a
              href="https://github.com/James-Sundby/chaos-generator/"
              aria-label="Visit my GitHub"
              title="Visit my GitHub"
              className="link link-hover"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

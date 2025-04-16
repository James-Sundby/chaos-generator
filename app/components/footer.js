import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer footer-center p-4 text-xs text-neutral-content">
      <div>
        <p>
          Based on line art by{" "}
          <Link
            className="underline"
            href="https://www.deviantart.com/40kresources"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit 40kResources' DeviantArt page"
            title="Visit 40kResources' DeviantArt page"
          >
            40kResources
          </Link>
          {" "}and{" "}
          <Link
            className="underline"
            href="https://www.deviantart.com/shawnpleil"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit ShawnPleil's DeviantArt page"
            title="Visit ShawnPleil's DeviantArt page"
          >
            ShawnPleil
          </Link>
        </p>
      </div>
    </footer>
  );
}

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer footer-center p-4">
      <div>
        <p>Based on line art by{" "}
          <Link
            className="underline"
            href="https://www.deviantart.com/40kresources"
            target="_blank"
            aria-label="Visit 40kResources' DeviantArt page, the creator from which the line art was adapted">
            40kResources
          </Link>
          {" "}under{" "}
          <Link
            className="underline"
            href="https://creativecommons.org/licenses/by/3.0/ "
            target="_blank"
            aria-label="Read the Creative Commons 3.0 license definition."
          >
            CC 3.0
          </Link>
        </p>
      </div>
    </footer>
  );
}


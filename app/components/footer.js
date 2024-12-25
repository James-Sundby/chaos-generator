import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer footer-center p-4">
      <div>
        <p>Based on line art by{" "}<Link className="underline" href="https://www.deviantart.com/40kresources" target="_blank">40kResources</Link>{" "}under{" "}<Link className="underline" href="https://creativecommons.org/licenses/by/3.0/ " target="_blank">CC 3.0</Link></p>
      </div>
    </footer>
  );
}


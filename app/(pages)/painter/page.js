import Painter from "./painter";

export const metadata = {
    title: "Custom Chapter",
    description: "Customize your own Space Marine chapter with hand-picked colors and armor patterns. Preview your scheme and generate a unique chapter ID.",
    openGraph: {
        title: "Custom Chapter",
        description: "Customize your own Space Marine chapter with hand-picked colors and armor patterns.",
        url: "https://chapter-gen.jsundby.dev/painter",
    },
    twitter: {
        title: "Custom Chapter",
        description: "Customize your own Space Marine chapter with hand-picked colors and armor patterns.",
    },
};


export default function Page() {
    return <Painter />;
}
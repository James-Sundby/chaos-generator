import Painter from "@/app/components/painter";

export const metadata = {
    title: "Custom Chapter",
    description: "Customize your own Space Marine chapter with hand-picked colors and armor patterns. Preview your scheme and generate a unique chapter ID.",
    openGraph: {
        title: "Custom Chapter",
        description: "Customize your own Space Marine chapter with hand-picked colors and armor patterns.",
        url: "https://chapter-gen.jsundby.dev/painter",
        siteName: "Chapter Generator",
        images: [
            {
                url: "/card.jpg",
                width: 1200,
                height: 630,
                alt: "Paintbrushes in a jar. Text overlay: Stuck with primer? Generate a chapter and break the block.",
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        title: "Custom Chapter",
        description: "Customize your own Space Marine chapter with hand-picked colors and armor patterns.",
        card: 'summary_large_image',
        images: [
            {
                url: "/card.jpg",
                alt: "Paintbrushes in a jar. Text overlay: Stuck with primer? Generate a chapter and break the block."
            }
        ],
    },
};


export default function Page() {
    return <Painter />;
}
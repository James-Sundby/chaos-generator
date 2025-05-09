import ChaosPainter from "./chaosPainter";

export const metadata = {
    title: "Custom Warband",
    description: "Customize your custom Chaos Space Marine warband with hand-picked colors and patterns. Preview armor schemes and generate a unique warband ID.",
    openGraph: {
        title: "Custom Warband",
        description: "Customize your custom Chaos Space Marine warband with hand-picked colors and patterns.",
        url: "https://chapter-gen.jsundby.dev/chaos-painter",
    },
    twitter: {
        title: "Custom Warband",
        description: "Customize your custom Chaos Space Marine warband with hand-picked colors and patterns.",
    },
};


export default function Page() {
    return <ChaosPainter />;
}

import FreePaint from "./freePaint";

export const metadata = {
    title: "Loyalist Free Paint",
    description: "Customize your Space Marine down to the armor segment. Click to color each section and get a complete list of paints used.",
    openGraph: {
        title: "Loyalist Free Paint",
        description: "Use detailed armor selection to paint your Space Marine piece by piece.",
        url: "https://chapter-gen.jsundby.dev/open-paint",
    },
    twitter: {
        title: "Loyalist Free Paint",
        description: "Click to color each armor section and get a breakdown of paints used.",
    },
};


export default function Page() {
    return <FreePaint />;
}
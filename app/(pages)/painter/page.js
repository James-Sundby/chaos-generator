import Painter from "./painter";

export const metadata = {
    title: "Custom Chapter",
    description: "Customize your custom Space Marine chapter with hand-picked colors and patterns. Preview armor schemes and generate a unique chapter ID."
}

export default function Page() {
    return <Painter />;
}
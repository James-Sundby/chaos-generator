import WarbandButton from "./components/warbandButton";
import Background from "./components/background";

export default function Home() {
  return (
    <main className="flex flex-col flex-1 justify-center items-center px-4 relative">
      <WarbandButton message="Generate a New Chapter" />
      <Background />
    </main>
  );
}

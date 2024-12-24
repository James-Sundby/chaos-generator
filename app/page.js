import WarbandButton from "./components/warbandButton";
import Background from "./components/background";
import WarbandSearch from "./components/warbandSearch";

export default function Home() {
  return (
    <main className="flex flex-col flex-1 justify-center items-center px-4 relative">
      <div className="flex flex-col gap-4 items-center w-full max-w-lg">
        <WarbandButton message="Generate a New Chapter" />
        <WarbandSearch />
      </div>
      <Background />
    </main>
  );
}

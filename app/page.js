import WarbandButton from "./components/warbandButton";

export default function Home() {

  return (
    <main className="flex flex-col flex-1 justify-center items-center px-4">
      <WarbandButton message="Generate a New Warband" />
    </main>
  );
}

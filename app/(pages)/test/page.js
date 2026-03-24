import SisterOfBattle from "@/lib/models/sisterOfBattle";

export default function TestPage() {
    return (
        <div className="min-h-scree flex flex-col items-center justify-center p-8">
            <h1 className="text-2xl font-bold text-center mb-6">Sister of Battle</h1>
            <div className="w-full h-150">
                <SisterOfBattle
                    primary="#989898"
                    secondary="#8869AE"
                    edge="#ebb854"
                    accent="#7A0E44"
                    pattern="5"
                />
            </div>
        </div>

    );
}

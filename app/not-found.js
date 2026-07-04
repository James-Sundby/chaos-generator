export default function NotFound() {
    return (
        <div className="flex-1 flex items-center justify-center">
            <div className="card border border-primary text-base-content w-full max-w-xl">
                <div className="card-body items-center text-center">
                    <h1 className="card-title text-5xl sm:text-9xl font-black">404</h1>
                    <p>Oops! We couldn&apos;t find that page.</p>
                </div>
            </div>
        </div>
    );
}
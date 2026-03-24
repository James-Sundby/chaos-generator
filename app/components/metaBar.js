export default function MetaBar({
    archive = "Imperial Archive",
    era = "M41",
    location = "Segmentum Solar // Sol",
    status = "Status: Operational",
    statusClassName = "text-primary",
}) {
    return (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] font-bold uppercase tracking-[0.22em] text-base-content/50 sm:text-xs">
            <span>{archive} // {era}</span>
            <span className="hidden sm:inline">{location}</span>
            <span className={statusClassName}>{status}</span>
        </div>
    );
}
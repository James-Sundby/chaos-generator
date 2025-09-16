import { Fragment, useMemo } from "react";
import { Listbox, Transition, ListboxButton, ListboxOptions, ListboxOption, } from "@headlessui/react";

export default function ColorListbox({
    id,
    options,
    value,
    onChange,
    ariaLabel,
    labelledById,
    describedById,
    disabled = false,
}) {
    const isGrouped = Array.isArray(options) === false;

    const flatOptions = useMemo(() => {
        if (!isGrouped) return options;
        return Object.entries(options).flatMap(([group, items]) =>
            items.map((opt) => ({ ...opt, __group: group }))
        );
    }, [options, isGrouped]);

    const getVal = (o) => o?.value || o?.hex || o?.code;
    const getHex = (o) => o?.hex || "";
    const selectedOption = useMemo(
        () => flatOptions.find((o) => getVal(o) === value) || null,
        [flatOptions, value]
    );

    return (
        <div className="relative w-full">
            <Listbox
                value={selectedOption}
                onChange={(opt) => onChange(getVal(opt))}
                by={(a, b) => getVal(a) === getVal(b)}
                disabled={disabled}
            >
                <ListboxButton
                    id={id}
                    type="button"
                    aria-label={ariaLabel}
                    aria-labelledby={labelledById}
                    aria-describedby={describedById}
                    className={`select select-bordered join-item w-full ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    <span className="flex items-center gap-2 truncate">
                        <span
                            aria-hidden
                            className="size-4 rounded border border-base-300"
                            style={{ backgroundColor: selectedOption ? getHex(selectedOption) : "transparent" }}
                        />
                        <span className="truncate">{selectedOption?.name ?? "Select…"}</span>
                    </span>
                </ListboxButton>

                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <ListboxOptions className="absolute left-0 z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-base-100 p-1 shadow-lg ring-1 ring-base-300 focus:outline-none">
                        {isGrouped
                            ? Object.entries(options).map(([group, items]) => (
                                <div key={group}>
                                    <div className="px-2 py-1 divider font-bold text-base">{group}</div>
                                    {items.map((opt) => (
                                        <ListboxOption
                                            key={getVal(opt)}
                                            value={{ ...opt, __group: group }}
                                            className={({ focus }) =>
                                                [
                                                    "cursor-pointer select-none rounded-md px-2 py-2 flex items-center gap-2",
                                                    focus ? "bg-base-200" : "",
                                                ].join(" ")
                                            }
                                        >
                                            {() => (
                                                <>
                                                    <span
                                                        aria-hidden
                                                        className="h-4 w-4 rounded border border-base-300"
                                                        style={{ backgroundColor: getHex(opt) }}
                                                    />
                                                    <span className="truncate" title={opt.name}>{opt.name}</span>
                                                </>
                                            )}
                                        </ListboxOption>
                                    ))}
                                </div>
                            ))
                            : flatOptions.map((opt) => (
                                <ListboxOption
                                    key={getVal(opt)}
                                    value={opt}
                                    className={({ focus }) =>
                                        [
                                            "cursor-pointer select-none rounded-md px-2 py-2 flex items-center gap-2",
                                            focus ? "bg-base-200" : "",
                                        ].join(" ")
                                    }
                                >
                                    {() => (
                                        <>
                                            <span
                                                aria-hidden
                                                className="h-4 w-4 rounded border border-base-300"
                                                style={{ backgroundColor: getHex(opt) }}
                                            />
                                            <span className="truncate" title={opt.name}>{opt.name}</span>
                                        </>
                                    )}
                                </ListboxOption>
                            ))}
                    </ListboxOptions>
                </Transition>
            </Listbox>
        </div>
    );
}

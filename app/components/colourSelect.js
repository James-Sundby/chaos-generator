import { Fragment, useMemo } from "react";
import {
    Listbox,
    Transition,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from "@headlessui/react";

function getSwatchStyle(option) {
    if (!option) {
        return { backgroundColor: "transparent" };
    }

    if (option.type === "Metallic" && option.metallic) {
        return {
            background: `radial-gradient(
                circle at 32% 28%,
                ${option.metallic.highlight} 0%,
                ${option.metallic.mid} 32%,
                ${option.metallic.shadow} 78%,
                ${option.metallic.shadow} 100%
            )`,
        };
    }

    return {
        backgroundColor: option.hex || "transparent",
    };
}

export default function ColorListbox({
    id,
    options,
    value,
    onChange,
    ariaLabel,
    labelledById,
    describedById,
    disabled = false,
    useNativeMobile = false,
    placeholder = "Select…",
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
            {useNativeMobile ? (
                <div className="flex w-full items-center gap-2 md:hidden">
                    <span
                        aria-hidden
                        className="size-5 shrink-0 rounded-none border border-base-300"
                        style={getSwatchStyle(selectedOption)}
                    />

                    <select
                        id={`${id}-native`}
                        value={value || ""}
                        onChange={(event) => onChange(event.target.value)}
                        disabled={disabled}
                        aria-label={ariaLabel}
                        aria-labelledby={labelledById}
                        aria-describedby={describedById}
                        className={`select select-bordered w-full rounded-none bg-base-100 ${disabled ? "cursor-not-allowed opacity-50" : ""
                            }`}
                    >
                        <option value="">{placeholder}</option>

                        {isGrouped
                            ? Object.entries(options).map(([group, items]) => (
                                <optgroup key={group} label={group}>
                                    {items.map((opt) => (
                                        <option key={getVal(opt)} value={getVal(opt)}>
                                            {opt.name}
                                        </option>
                                    ))}
                                </optgroup>
                            ))
                            : flatOptions.map((opt) => (
                                <option key={getVal(opt)} value={getVal(opt)}>
                                    {opt.name}
                                </option>
                            ))}
                    </select>
                </div>
            ) : null}

            <div className={useNativeMobile ? "hidden md:block" : ""}>
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
                        className={`select select-bordered join-item w-full rounded-none bg-base-100 ${disabled ? "cursor-not-allowed opacity-50" : ""
                            }`}
                    >
                        <span className="flex items-center gap-2 truncate">
                            <span
                                aria-hidden
                                className="size-4 rounded-none border border-base-300"
                                style={getSwatchStyle(selectedOption)}
                            />
                            <span className="truncate">
                                {selectedOption?.name ?? placeholder}
                            </span>
                        </span>
                    </ListboxButton>

                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <ListboxOptions className="absolute left-0 z-50 mt-1 max-h-60 w-full overflow-auto rounded-none border border-base-300 bg-base-100 p-1 shadow-lg focus:outline-none">
                            {isGrouped
                                ? Object.entries(options).map(([group, items]) => (
                                    <div key={group}>
                                        <div className="px-2 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-base-content/60">
                                            {group}
                                        </div>

                                        {items.map((opt) => (
                                            <ListboxOption
                                                key={getVal(opt)}
                                                value={{ ...opt, __group: group }}
                                                className={({ focus }) =>
                                                    [
                                                        "flex cursor-pointer select-none items-center gap-2 rounded-none px-2 py-2",
                                                        focus ? "bg-base-200" : "",
                                                    ].join(" ")
                                                }
                                            >
                                                {() => (
                                                    <>
                                                        <span
                                                            aria-hidden
                                                            className="h-4 w-4 rounded-none border border-base-300"
                                                            style={getSwatchStyle(opt)}
                                                        />
                                                        <span className="truncate" title={opt.name}>
                                                            {opt.name}
                                                        </span>
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
                                                "flex cursor-pointer select-none items-center gap-2 rounded-none px-2 py-2",
                                                focus ? "bg-base-200" : "",
                                            ].join(" ")
                                        }
                                    >
                                        {() => (
                                            <>
                                                <span
                                                    aria-hidden
                                                    className="h-4 w-4 rounded-none border border-base-300"
                                                    style={{ backgroundColor: getHex(opt) }}
                                                />
                                                <span className="truncate" title={opt.name}>
                                                    {opt.name}
                                                </span>
                                            </>
                                        )}
                                    </ListboxOption>
                                ))}
                        </ListboxOptions>
                    </Transition>
                </Listbox>
            </div>
        </div>
    );
}
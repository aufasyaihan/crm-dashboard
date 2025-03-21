"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "./button";
import { RxCross2 } from "react-icons/rx";

interface Option {
    label: string;
    value: string;
}

interface DropdownMenuProps {
    options: Option[];
    paramKey: string; // "sort" atau "filter" dll
    icon: React.ReactNode;
    title: string; // "Sort" / "Filter"
}

export default function DropdownMenu({
    options,
    paramKey,
    icon,
    title,
}: DropdownMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentValue = searchParams.get(paramKey) || "";

    const handleSelect = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set(paramKey, value);
        params.set("page", "1");
        router.push(`?${params.toString()}`);
        setIsOpen(false);
    };

    const handleClear = () => {
        const params = new URLSearchParams(searchParams);
        params.delete(paramKey); // hapus param filter
        params.set("page", "1");
        router.push(`?${params.toString()}`);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <Button
                styling="secondary"
                icon={icon}
                title={title}
                onClick={() => setIsOpen(!isOpen)}
            />
            {isOpen && (
                <ul className="absolute right-0 mt-2 bg-white border border-gray-200 drop-shadow-md z-10 w-48 rounded-sm p-1">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                                currentValue === option.value
                                    ? "font-semibold bg-gray-100"
                                    : ""
                            }`}
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.label}
                            {currentValue === option.value && (
                                <RxCross2
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleClear();
                                    }}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

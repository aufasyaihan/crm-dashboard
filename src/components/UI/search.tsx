"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { IoSearchOutline } from "react-icons/io5";

export default function Search() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const queryValue = searchParams.get("query") || "";
    const [searchInput, setSearchInput] = useState(queryValue);

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const debounce = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (searchInput) {
                params.set("query", searchInput);
            } else {
                params.delete("query");
            }

            params.set("page", "1");
            router.push(`?${params.toString()}`);
        }, 500);

        return () => clearTimeout(debounce);
    }, [searchInput, router, searchParams]);

    return (
        <div className="flex relative font-medium">
            <IoSearchOutline className="absolute left-2 top-1/4 cursor-pointer" />
            <input
                className="pl-8 pr-4 py-1 border border-gray-400 rounded-md"
                type="search"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
        </div>
    );
}

"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    length: number;
    siblingCount?: number;
}

export default function Pagination({
    currentPage,
    totalPages,
    length,
    siblingCount = 1,
}: PaginationProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const range = (start: number, end: number) => {
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    let pages: (number | string)[] = [];
    if (totalPages <= 1) {
        pages = [1];
    } else {
        const leftSibling = Math.max(2, currentPage - siblingCount);
        const rightSibling = Math.min(
            totalPages - 1,
            currentPage + siblingCount
        );

        if (leftSibling > 2) pages.push(1, "...");
        else pages.push(1);

        pages = [...pages, ...range(leftSibling, rightSibling)];

        if (rightSibling < totalPages - 1) pages.push("...", totalPages);
        else if (rightSibling < totalPages) pages.push(totalPages);
    }
    const startItem = (currentPage - 1) * 10 + 1;
    const endItem = Math.min(startItem + 9, length);

    const createPageLink = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
        <div className="flex justify-between items-center w-full">
            <p className="text-sm text-gray-500">
                Showing {startItem} to {endItem} of {length} entries
            </p>
            <div className="flex justify-center items-center gap-2">
                <a
                    href={createPageLink(currentPage - 1)}
                    className={`p-2 rounded ${
                        currentPage === 1
                            ? "text-neutral-500 pointer-events-none"
                            : "text-black transition"
                    }`}
                >
                    <MdArrowBackIosNew />
                </a>

                {pages.map((page, index) =>
                    typeof page === "number" ? (
                        <a
                            key={index}
                            href={createPageLink(page)}
                            className={`px-3 py-1 rounded ${
                                page === currentPage
                                    ? "bg-indigo-500 text-white pointer-events-none"
                                    : "bg-indigo-400 text-white hover:bg-indigo-500 transition"
                            }`}
                        >
                            {page}
                        </a>
                    ) : (
                        <span key={index} className="px-2 text-gray-500">
                            {page}
                        </span>
                    )
                )}

                <a
                    href={createPageLink(currentPage + 1)}
                    className={`p-2 rounded ${
                        currentPage === totalPages
                            ? "text-neutral-500 pointer-events-none"
                            : "text-black transition"
                    }`}
                >
                    <MdArrowForwardIos />
                </a>
            </div>
        </div>
    );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
    icon: React.ReactNode;
    text: string;
    isOpen: boolean;
    href: string;
}

export default function SidebarItem({
    icon,
    text,
    isOpen,
    href,
}: SidebarItemProps) {
    const path = usePathname();
    const isActive = path === href;
    return (
        <Link href={href}>
            <div
                className={` flex gap-2 items-center cursor-pointer rounded-md select-none ${
                    isActive
                        ? "bg-white text-indigo-600 "
                        : "hover:bg-indigo-700"
                } ${isOpen ? "px-4 py-2 " : "p-2 w-full justify-center"}`}
            >
                <span className="text-xl">{icon}</span>
                {isOpen && <span>{text}</span>}
            </div>
        </Link>
    );
}

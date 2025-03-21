"use client";

import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import {
    TbLayoutSidebarRightCollapseFilled,
    TbLayoutSidebarRightExpandFilled,
} from "react-icons/tb";
import { IoPerson } from "react-icons/io5";
import Link from "next/link";
import { RxExit } from "react-icons/rx";

interface NavbarProps {
    toggleSidebar: () => void;
    sidebar: boolean;
}

export default function Navbar({ toggleSidebar, sidebar }: NavbarProps) {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <nav className="bg-white w-full flex items-center justify-between p-4 text-black border-b border-gray-200">
            <button onClick={toggleSidebar} className="cursor-pointer text-2xl text-indigo-600">
                {sidebar ? (
                    <TbLayoutSidebarRightExpandFilled />
                ) : (
                    <TbLayoutSidebarRightCollapseFilled />
                )}
            </button>

            <div className="relative">
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                        <Image
                            className="rounded-full"
                            src="https://xsgames.co/randomusers/avatar.php?g=male"
                            alt="Logo"
                            width={40}
                            height={40}
                        />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="font-semibold text-black">
                            Matthew Connanigan
                        </h3>
                        <p className="text-gray-500 text-sm">
                            matthew@gmail.com
                        </p>
                    </div>
                    <IoIosArrowDown
                        className={`text-xl transition-transform ${
                            showDropdown ? "rotate-180" : ""
                        }`}
                    />
                </div>

                {showDropdown && (
                    <div className="absolute right-0 mt-5 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200 select-none">
                        <div className="p-1">
                            <Link
                                href="/profile"
                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <span>
                                    <IoPerson />
                                </span>
                                Profile
                            </Link>
                            <Link
                                href="/login"
                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <span>
                                    <RxExit />
                                </span>
                                Log out
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

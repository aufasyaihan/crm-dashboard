import { FaClock, FaFile } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { RiBarChartBoxFill } from "react-icons/ri";
import SidebarItem from "./side-nav-item";

interface SidebarProps {
    isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
    return (
        <div
            className={`h-[100dvh] bg-indigo-600 text-white transition-all duration-300 ${
                isOpen ? "lg:w-64 w-18" : "w-18"
            } overflow-hidden p-4`}
        >
            {isOpen && (
                <div className="p-4 hidden lg:block">
                    <h1
                        className={`text-2xl font-bold  ${
                            !isOpen && "lg:text-center"
                        }`}
                    >
                        CRM
                    </h1>
                </div>
            )}
            <div className="">
                {isOpen && (
                    <p
                        className={`px-4 text-xs uppercase text-indigo-200 mb-2 hidden lg:block ${
                            !isOpen && "hidden lg:block lg:text-center"
                        }`}
                    >
                        Main Menu
                    </p>
                )}
                <nav className="flex flex-col gap-2">
                    <SidebarItem
                        icon={<RiBarChartBoxFill />}
                        text="Business Overview"
                        isOpen={isOpen}
                        href="/"
                    />
                    <SidebarItem
                        icon={<HiUsers />}
                        text="Customers"
                        isOpen={isOpen}
                        href="/customers"
                    />
                    <SidebarItem
                        icon={<FaClock />}
                        text="Automation"
                        isOpen={isOpen}
                        href="/automations"
                    />
                    <SidebarItem
                        icon={<FaFile />}
                        text="Reports"
                        isOpen={isOpen}
                        href="/reports"
                    />
                </nav>
            </div>
        </div>
    );
}

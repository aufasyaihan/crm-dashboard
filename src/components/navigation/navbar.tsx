import Image from "next/image";
import {
    TbLayoutSidebarRightCollapseFilled,
    TbLayoutSidebarRightExpandFilled,
} from "react-icons/tb";

interface NavbarProps {
    toggleSidebar: () => void;
    sidebar: boolean;
}

export default function Navbar({ toggleSidebar, sidebar }: NavbarProps) {
    return (
        <nav className="bg-white w-full flex items-center justify-end lg:justify-between p-4 text-black border-b border-gray-200">
            <button
                onClick={toggleSidebar}
                className="cursor-pointer text-2xl text-indigo-600 lg:block hidden"
            >
                {sidebar ? (
                    <TbLayoutSidebarRightExpandFilled />
                ) : (
                    <TbLayoutSidebarRightCollapseFilled />
                )}
            </button>

            <div className="relative">
                <div className="flex items-center gap-2 cursor-pointer">
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
                        <h3 className="font-semibold text-sm md:text-base text-black">
                            Matthew Connanigan
                        </h3>
                        <p className="text-gray-500 text-xs md:text-sm">
                            matthew@gmail.com
                        </p>
                    </div>
                </div>
            </div>
        </nav>
    );
}

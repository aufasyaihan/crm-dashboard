interface CardProps {
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
}

export default function Card({ title, icon, children }: CardProps) {
    return (
        <div className={`flex flex-col gap-4 w-full lg:h-full border border-gray-200 p-4 rounded-lg `}>
            <div className="flex justify-between items-center text-base md:text-lg lg:text-xl ">
                <h1 className="font-medium capitalize">{title}</h1>
                {icon}
            </div>
            <div className="flex-grow">{children}</div>
        </div>
    );
}

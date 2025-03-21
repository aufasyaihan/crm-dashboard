import Pagination from "./pagination";
import Button from "./UI/button";
import { FiFilter } from "react-icons/fi";
import { LuArrowDownUp } from "react-icons/lu";
import { Column } from "@/types/data";
import DropdownMenu from "./UI/dropdown";
import Search from "./UI/search";

interface TableDataProps<T> {
    data: T[];
    columns: Column<T>[];
    title: string;
    icon: React.ReactNode;
    filter?: boolean;
    sort?: boolean;
    getRowId?: (item: T) => string | number;
    page?: number;
    itemsPerPage?: number;
}

export default function TableData<T extends object>({
    data,
    columns,
    title,
    icon,
    filter,
    sort,
    getRowId,
    page = 1,
    itemsPerPage = 10,
}: TableDataProps<T>) {
    let filterOptions = [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Pending", value: "pending" },
    ];

    if (title.toLowerCase() === "report") {
        const types = Array.from(
            new Set(data.map((item) => (item as { type: string }).type))
        );
        filterOptions = types.map((type) => ({
            label: type,
            value: type.toLowerCase(),
        }));
    }

    let sortOptions = [
        { label: "Latest", value: "latest" },
        { label: "Oldest", value: "oldest" },
    ];

    if (title.toLowerCase() === "customer") {
        sortOptions = [
            { label: "Latest", value: "latest" },
            { label: "Oldest", value: "oldest" },
            { label: "Highest Revenue", value: "highest" },
            { label: "Lowest Revenue", value: "lowest" },
        ];
    }

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    return (
        <>
            <div className="flex flex-col border border-gray-200 rounded-md">
                <div className="flex justify-between items-center p-4">
                    <Button
                        styling="disabled"
                        icon={icon}
                        title={`Add ${title}`}
                    />
                    <div className="flex gap-2">
                        {filter && (
                            <DropdownMenu
                                options={filterOptions}
                                paramKey="filter"
                                icon={<FiFilter />}
                                title="Filter"
                            />
                        )}
                        {sort && (
                            <DropdownMenu
                                options={sortOptions}
                                paramKey="sort"
                                icon={<LuArrowDownUp />}
                                title="Sort"
                            />
                        )}
                        <Search />
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <table className="w-full">
                        <thead className="border-t border-gray-200">
                            <tr className="capitalize text-gray-500">
                                <th className="py-2">No</th>
                                {columns.map((col, index) => (
                                    <th key={index} className="py-2">
                                        {col.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((item, index) => (
                                <tr
                                    key={getRowId ? getRowId(item) : index}
                                    className="border-t border-gray-200 text-center"
                                >
                                    <td className="py-2">
                                        {startIndex + index + 1}
                                    </td>
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex} className="py-2">
                                            {col.render
                                                ? col.render(item)
                                                : col.accessor
                                                ? String(item[col.accessor])
                                                : null}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                length={data.length}
            />
        </>
    );
}

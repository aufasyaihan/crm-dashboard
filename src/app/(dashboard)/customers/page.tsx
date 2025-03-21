import { Export } from "@/components/icon/figma";
import Status from "@/components/status";
import TableData from "@/components/table-data";
import Button from "@/components/UI/button";
import { fetchData } from "@/lib/utils";
import { Column, CustomersData } from "@/types/data";
import { IoPersonAddOutline } from "react-icons/io5";

interface CustomersPageProps {
    searchParams: Promise<{
        page: string;
        query: string;
        filter: string;
        sort: string;
    }>;
}

const customerColumns: Column<CustomersData>[] = [
    { header: "Name", accessor: "name" as keyof CustomersData },
    { header: "Email Address", accessor: "email" as keyof CustomersData },
    {
        header: "Status",
        render: (item: CustomersData) => <Status status={item.status} />,
    },
    {
        header: "Total Revenue",
        render: (item: CustomersData) =>
            `$${item.totalRevenue.toLocaleString()}`,
    },
    {
        header: "Date Joined",
        render: (item: CustomersData) =>
            new Date(item.joined).toLocaleDateString(),
    },
];

async function CustomersTable({
    page,
    query,
    filter,
    sort,
}: {
    page: number;
    query: string;
    sort: string;
    filter: string;
}) {
    const customers = await fetchData<CustomersData>("customers");

    let filteredData = customers;

    if (query) {
        const lowerQuery = query.toLowerCase();
        filteredData = filteredData.filter((item) =>
            item.name.toLowerCase().includes(lowerQuery) ||
            item.email.toLowerCase().includes(lowerQuery)
        );
    }

    if (filter) {
        filteredData = filteredData.filter(
            (item) => item.status.toLowerCase() === filter.toLowerCase()
        );
    }

    if (sort === "latest") {
        filteredData = filteredData.sort(
            (a, b) => new Date(b.joined).getTime() - new Date(a.joined).getTime()
        );
    } else if (sort === "oldest") {
        filteredData = filteredData.sort(
            (a, b) => new Date(a.joined).getTime() - new Date(b.joined).getTime()
        );
    } else if (sort === "highest") {
        filteredData = filteredData.sort((a, b) => b.totalRevenue - a.totalRevenue);
    } else if (sort === "lowest") {
        filteredData = filteredData.sort((a, b) => a.totalRevenue - b.totalRevenue);
    }

    return (
        <TableData
            data={filteredData}
            columns={customerColumns}
            title="Customer"
            icon={<IoPersonAddOutline />}
            filter
            sort
            getRowId={(item) => item.id}
            page={page}
            itemsPerPage={10}
        />
    );
}

export default async function CustomersPage({
    searchParams,
}: CustomersPageProps) {
    const {page, filter, query, sort} = (await searchParams);
    const currentPage = page ? parseInt(page) : 1;

    return (
        <div className="m-10 flex flex-col gap-4">
            <div className="flex items-center justify-between relative">
                <h1 className="flex flex-col gap-1 text-3xl font-medium">
                    Customers{" "}
                    <span className="text-sm text-gray-500">
                        Shows list of customers
                    </span>
                </h1>
                <Button styling="disabled" icon={<Export />} title="Export" />
            </div>
            <main className="flex flex-col gap-4">
                <CustomersTable page={currentPage} filter={filter} query={query} sort={sort} />
            </main>
        </div>
    );
}

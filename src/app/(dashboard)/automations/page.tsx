import TableData from "@/components/table-data";
import Toggle from "@/components/UI/toggle";
import { fetchData } from "@/lib/utils";
import { AutomationData, Column } from "@/types/data";
import { FaRegClock } from "react-icons/fa";

interface AutomationPageProps {
    searchParams: Promise<{
        page: string;
        query: string;
        filter: string;
        sort: string;
    }>;
}

const automationColumn: Column<AutomationData>[] = [
    { header: "Name", accessor: "name" as keyof AutomationData },
    { header: "Trigger", accessor: "trigger" as keyof AutomationData },
    { header: "Action", accessor: "action" as keyof AutomationData },
    { header: "Status", render: (item: AutomationData) => <Toggle id={item.id} status={item.status} /> },
];

async function AutomationTable({
    page,
    query,
    filter,
}: {
    page: number;
    query: string;
    filter: string;
}) {
    const customers = await fetchData<AutomationData>("automations");

    let filteredData = customers;

    if (query) {
        const lowerQuery = query.toLowerCase();
        filteredData = filteredData.filter(
            (item) =>
                item.name.toLowerCase().includes(lowerQuery) ||
                item.trigger.toLowerCase().includes(lowerQuery) ||
                item.action.toLowerCase().includes(lowerQuery)
        );
    }

    if (filter) {
        filteredData = filteredData.filter(
            (item) => item.status.toLowerCase() === filter.toLowerCase()
        );
    }

    return (
        <TableData
            data={filteredData}
            columns={automationColumn}
            title="Automation"
            icon={<FaRegClock />}
            filter
            getRowId={(item) => item.id}
            page={page}
            itemsPerPage={10}
        />
    );
}

export default async function AutomationPage({
    searchParams,
}: AutomationPageProps) {
    const { page, filter, query } = await searchParams;
    const currentPage = page ? parseInt(page) : 1;

    return (
        <div className="m-10 flex flex-col gap-4">
            <div className="flex items-center justify-between relative">
                <h1 className="flex flex-col gap-1 text-xl md:text-3xl font-medium">
                    Automations{" "}
                    <span className="text-xs md:text-sm text-gray-500">
                        Shows list of automations
                    </span>
                </h1>
            </div>
            <main className="flex flex-col gap-4">
                <AutomationTable
                    page={currentPage}
                    filter={filter}
                    query={query}
                />
            </main>
        </div>
    );
}

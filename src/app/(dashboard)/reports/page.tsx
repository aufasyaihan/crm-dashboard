import { UploadReport } from "@/components/icon/figma";
import Status from "@/components/status";
import TableData from "@/components/table-data";
import Button from "@/components/UI/button";
import { fetchData } from "@/lib/utils";
import { Column, ReportData } from "@/types/data";
// import { FaRegClock } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";

interface ReportsPageProps {
    searchParams: Promise<{
        page: string;
        query: string;
        filter: string;
        sort: string;
    }>;
}

const reportsColumn: Column<ReportData>[] = [
    { header: "Title", accessor: "title" as keyof ReportData },
    {
        header: "Date",
        render: (item: ReportData) => new Date(item.date).toLocaleDateString(),
    },
    {
        header: "Type",
        render: (item: ReportData) => <Status status={item.type} />,
    },
    {
        header: "Action",
        render: () => (
            <div className="flex items-center justify-center">
                <Button
                    title="Download"
                    icon={<FiDownload />}
                    styling="success"
                />
            </div>
        ),
    },
];

async function ReportsTable({
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
    const reports = await fetchData<ReportData>("reports");

    let filteredData = reports;

    if (query) {
        const lowerQuery = query.toLowerCase();
        filteredData = filteredData.filter((item) =>
            item.title.toLowerCase().includes(lowerQuery)
        );
    }

    if (filter) {
        filteredData = filteredData.filter(
            (item) => item.type.toLowerCase() === filter.toLowerCase()
        );
    }

    if (sort === "latest") {
        filteredData = filteredData.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    } else if (sort === "oldest") {
        filteredData = filteredData.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
    }

    return (
        <TableData
            data={filteredData}
            columns={reportsColumn}
            title="Report"
            icon={<UploadReport />}
            filter
            sort
            getRowId={(item) => item.id}
            page={page}
            itemsPerPage={10}
        />
    );
}

export default async function ReportPage({ searchParams }: ReportsPageProps) {
    const { page, filter, query, sort } = await searchParams;
    const currentPage = page ? parseInt(page) : 1;
    return (
        <div className="m-10 flex flex-col gap-4">
            <div className="flex items-center justify-between relative">
                <h1 className="flex flex-col gap-1 text-3xl font-medium">
                    Reports{" "}
                    <span className="text-sm text-gray-500">
                        Shows list of reports
                    </span>
                </h1>
            </div>
            <main className="flex flex-col gap-4">
                <ReportsTable
                    page={currentPage}
                    filter={filter}
                    query={query}
                    sort={sort}
                />
            </main>
        </div>
    );
}

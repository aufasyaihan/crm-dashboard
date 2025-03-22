import Card from "@/components/UI/card";
import ChartBar from "@/components/charts/bar-chart";
import ChartLine from "@/components/charts/line-chart";
import { DollarReceive, DollarSend } from "@/components/icon/figma";
import Status from "@/components/status";
import Summary from "@/components/summary";
import { fetchData } from "@/lib/utils";
import {
    AutomationData,
    CustomersData,
    CustomersGrowthData,
    ReportData,
    RevenueData,
} from "@/types/data";
import { Suspense } from "react";
import { BsPersonCheck } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi";
import { MdArrowForwardIos } from "react-icons/md";

async function Chart({
    type,
    endpoint,
}: {
    type: string;
    endpoint: "revenues" | "customersGrowth";
}) {
    if (type === "bar") {
        const data = await fetchData<RevenueData>(endpoint);
        return <ChartBar data={data} />;
    } else {
        const data = await fetchData<CustomersGrowthData>(endpoint);
        return <ChartLine data={data} />;
    }
}
async function Reports() {
    const reports = (await fetchData<ReportData>("reports")).slice(0, 3);
    return reports.map((report) => (
        <div
            key={report.id}
            className="flex items-center justify-between w-full"
        >
            <div className="flex flex-col gap-1">
                <h3 className="text-sm md:text-base">{report.title}</h3>
                <p className="text-xs text-gray-500">
                    {new Date(report.date).toLocaleDateString()}
                </p>
            </div>
            <Status status={report.status} />
        </div>
    ));
}
async function Automations() {
    const automations = (await fetchData<AutomationData>("automations")).slice(
        0,
        3
    );
    return automations.map((automation) => (
        <div
            key={automation.id}
            className="flex items-center justify-between w-full"
        >
            <h3 className="text-sm md:text-base">{automation.name}</h3>
            <Status status={automation.status} />
        </div>
    ));
}
async function Customers() {
    const customers = (await fetchData<CustomersData>("customers"))
        .slice(0, 5)
        .sort((a, b) => b.totalRevenue - a.totalRevenue);
    return customers.map((customer, idx) => (
        <tr key={customer.id} className="text-center">
            <td>{idx + 1}</td>
            <td>{customer.name}</td>
            <td>${customer.totalRevenue?.toLocaleString()}</td>
        </tr>
    ));
}

export default function Home() {
    return (
        <div className="m-10 flex flex-col gap-4">
            <div className="flex items-center justify-between relative">
                <h1 className="flex flex-col gap-1 text-xl md:text-3xl font-medium">
                    Hi, Matthew!{" "}
                    <span className="text-xs md:text-sm text-gray-500">
                        Let&apos;s see the current business overview
                    </span>
                </h1>
            </div>
            <main className="flex flex-col gap-4">
                <div className="flex flex-wrap lg:flex-nowrap lg:items-center justify-between gap-4">
                    <Card title="Total Customers" icon={<HiOutlineUsers />}>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Summary
                                metric="total"
                                type="customers"
                                increase
                                percentage={15}
                            />
                        </Suspense>
                    </Card>
                    <Card title="Active Customers" icon={<BsPersonCheck />}>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Summary
                                type="customers"
                                metric="active"
                                increase={false}
                                percentage={10}
                            />
                        </Suspense>
                    </Card>
                    <Card title="Total Profits" icon={<DollarReceive />}>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Summary
                                metric="profit"
                                type="revenues"
                                increase
                                percentage={20}
                            />
                        </Suspense>
                    </Card>
                    <Card title="Total Expenses" icon={<DollarSend />}>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Summary
                                metric="expense"
                                type="revenues"
                                increase
                                percentage={20}
                            />
                        </Suspense>
                    </Card>
                </div>
                <div className="flex gap-4 justify-between items-stretch flex-wrap lg:flex-nowrap">
                    <div className="w-full lg:w-1/2">
                        <Card title="Revenue Overview">
                            <Suspense fallback={<div>Loading...</div>}>
                                <Chart type="bar" endpoint="revenues" />
                            </Suspense>
                        </Card>
                    </div>
                    <div className="flex flex-col gap-4 w-full lg:w-1/2">
                        <Card title="Reports" icon={<MdArrowForwardIos />}>
                            <Suspense fallback={<div>Loading...</div>}>
                                <div className="flex flex-col gap-2">
                                    <Reports />
                                </div>
                            </Suspense>
                        </Card>
                        <Card title="Automations" icon={<MdArrowForwardIos />}>
                            <div className="flex flex-col gap-2">
                                <Suspense fallback={<div>Loading...</div>}>
                                    <Automations />
                                </Suspense>
                            </div>
                        </Card>
                    </div>
                </div>
                <div className="flex gap-4 justify-between items-stretch flex-wrap lg:flex-nowrap">
                    <div className="w-full lg:flex-1">
                        <Card title="Top Customers">
                            <table className="w-full">
                                <thead className="text-sm sm:text-base">
                                    <tr>
                                        <th>Rank</th>
                                        <th>Name</th>
                                        <th>Total Revenue</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm sm:text-base">
                                    <Customers />
                                </tbody>
                            </table>
                        </Card>
                    </div>
                    <div className="w-full lg:flex-1/5">
                        <Card title="Customer Growth">
                            <Suspense fallback={<div>Loading...</div>}>
                                <Chart type="line" endpoint="customersGrowth" />
                            </Suspense>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}

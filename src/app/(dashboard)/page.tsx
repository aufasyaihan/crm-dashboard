import Card from "@/components/card";
import ChartBar from "@/components/charts/bar-chart";
import ChartLine from "@/components/charts/line-chart";
import { DollarReceive, DollarSend } from "@/components/icon/figma";
import Status from "@/components/status";
import { customers, customersGrowth, revenue } from "@/lib/data";
import { BsPersonCheck } from "react-icons/bs";
import { GoArrowDownRight, GoArrowUpRight } from "react-icons/go";
import { HiOutlineUsers } from "react-icons/hi";
import { MdArrowForwardIos } from "react-icons/md";

export default function Home() {
    const topCustomers = customers.slice(0, 5);
    return (
        <div className="m-10 flex flex-col gap-4">
            <div className="flex items-center justify-between relative">
                <h1 className="flex flex-col gap-1 text-3xl font-medium">
                    Hi, Matthew!{" "}
                    <span className="text-sm text-gray-500">
                        Let&apos;s see the current business overview
                    </span>
                </h1>
            </div>
            <main className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                    <Card title="Total Customers" icon={<HiOutlineUsers />}>
                        <div className="flex flex-col gap-2">
                            <h2 className="text-5xl font-medium">1,200</h2>
                            <p className="flex items-center gap-1">
                                <span className="flex items-center text-green-500 text-md">
                                    <GoArrowUpRight /> 15%
                                </span>
                                From last Month
                            </p>
                        </div>
                    </Card>
                    <Card title="Active Customers" icon={<BsPersonCheck />}>
                        <div className="flex flex-col gap-2">
                            <h2 className="text-5xl font-medium">1,200</h2>
                            <p className="flex items-center gap-1">
                                <span className="flex items-center text-red-500 text-md">
                                    <GoArrowDownRight /> 15%
                                </span>
                                From last Month
                            </p>
                        </div>
                    </Card>
                    <Card title="Total Profits" icon={<DollarReceive />}>
                        <div className="flex flex-col gap-2">
                            <h2 className="text-5xl font-medium">1,200</h2>
                            <p className="flex items-center gap-1">
                                <span className="flex items-center text-green-500 text-md">
                                    <GoArrowUpRight /> 15%
                                </span>
                                From last Month
                            </p>
                        </div>
                    </Card>
                    <Card title="Total Expenses" icon={<DollarSend />}>
                        <div className="flex flex-col gap-2">
                            <h2 className="text-5xl font-medium">1,200</h2>
                            <p className="flex items-center gap-1">
                                <span className="flex items-center text-green-500 text-md">
                                    <GoArrowUpRight /> 15%
                                </span>
                                From last Month
                            </p>
                        </div>
                    </Card>
                </div>
                <div className="flex gap-4 justify-between items-stretch">
                    <div className="w-1/2">
                        <Card title="Revenue Overview">
                            <ChartBar data={revenue} />
                        </Card>
                    </div>
                    <div className="flex flex-col gap-4 w-1/2">
                        <Card title="Reports" icon={<MdArrowForwardIos />}>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-base">
                                            Q4 Sales Report
                                        </h3>
                                        <p className="text-xs text-gray-500">
                                            01/02/2024
                                        </p>
                                    </div>
                                    <Status status="Completed" />
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-base">
                                            Monthly Revenue
                                        </h3>
                                        <p className="text-xs text-gray-500">
                                            01/02/2024
                                        </p>
                                    </div>
                                    <Status status="Completed" />
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-base">
                                            Weekly Summary
                                        </h3>
                                        <p className="text-xs text-gray-500">
                                            01/02/2024
                                        </p>
                                    </div>
                                    <Status status="Pending" />
                                </div>
                            </div>
                        </Card>
                        <Card title="Automations" icon={<MdArrowForwardIos />}>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between w-full">
                                    <h3 className="text-base">Welcome Email</h3>
                                    <Status status="Active" />
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <h3 className="text-base">
                                        Follow Up Reminder
                                    </h3>
                                    <Status status="Active" />
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <h3 className="text-base">
                                        Feedback Request
                                    </h3>
                                    <Status status="Inactive" />
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
                <div className="flex gap-4 justify-between items-stretch">
                    <div className="flex-1">
                        <Card title="Top Customers">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Name</th>
                                        <th>Total Revenue</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topCustomers.map((items,idx) => (
                                        <tr key={idx} className="text-center">
                                            <td>{idx + 1}</td>
                                            <td>{items.name}</td>
                                            <td>${items.totalRevenue.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Card>
                    </div>
                    <div className="flex-1/5">
                        <Card title="Customer Growth">
                            <ChartLine data={customersGrowth} />
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}

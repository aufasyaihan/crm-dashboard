"use client";

import { RevenueData } from "@/types/data";
import {
    Bar,
    BarChart,
    ResponsiveContainer,
    Tooltip,
    TooltipProps,
    XAxis,
    YAxis,
} from "recharts";

export default function ChartBar({ data }: { data: RevenueData[] }) {
    const formattedData = data.map((item) => ({
        ...item,
        shortMonth: new Date(item.date).toLocaleString("en-US", {
            month: "short",
        }),
    }));
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart
                width={500}
                height={300}
                data={formattedData}
                margin={{
                    top: 5,
                    right: 5,
                    left: 5,
                    bottom: 5,
                }}
            >
                <XAxis dataKey="shortMonth" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "transparent" }}
                />
                <Bar
                    dataKey="revenue"
                    fill="#4F46E5"
                    background={{ fill: "#E5E7EB", radius: 10 }}
                    radius={[10, 10, 0, 0]}
                    barSize={20}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}

function CustomTooltip({
    active,
    payload,
    coordinate,
}: TooltipProps<number, string>) {
    if (active && payload && payload.length && coordinate) {
        const value = payload[0].value;
        const fullMonth = new Date(payload[0].payload.date).toLocaleString("en-US", {
            month: "long",
        });
        const formattedValue = value ? (value / 1000).toFixed(1) : "0.0";
        const { x, y } = coordinate;

        return (
            <div
                className="absolute z-50"
                style={{
                    transform: `translate(${x ? x - 63 : 0}px, ${
                        y ? y - 70 : 0
                    }px)`,
                }}
            >
                <div className="custom-tooltip bg-indigo-100 flex flex-col px-2 py-1 rounded-lg w-32">
                    <p className="label text-indigo-500">{fullMonth}</p>
                    <p className="intro font-semibold text-indigo-600">
                        {formattedValue}K
                    </p>
                    <div className="absolute left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-indigo-100 bottom-[-5px]" />
                </div>
            </div>
        );
    }

    return null;
}

"use client";

import { customersGrowthType } from "@/types/data";
import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    TooltipProps,
    XAxis,
    YAxis,
} from "recharts";

export default function ChartLine({ data }: { data: customersGrowthType[] }) {
    const formattedData = data.map((item) => ({
        ...item,
        shortMonth: item.month.substring(0, 3), // Add this!
    }));
    return (
        <ResponsiveContainer width="100%" height={200}>
            <AreaChart
                data={formattedData}
                margin={{
                  top: 5,
                  right: 5,
                  left: 5,
                  bottom: 5,
              }}
            >
                <defs>
                    <linearGradient
                        id="revenueGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop
                            offset="5%"
                            stopColor="#4F46E5"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor="#4F46E5"
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>
                <XAxis dataKey="shortMonth" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "transparent" }}
                />
                <Area
                    type="monotone"
                    dataKey="customers"
                    stroke="#4F46E5"
                    fill="url(#revenueGradient)"
                />
            </AreaChart>
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
        const fullMonth = payload[0].payload.month;
        const formattedValue = value
            ? value > 1000
                ? (value / 1000).toFixed(1)
                : value
            : "0.0";
        const { x, y } = coordinate;

        return (
            <div
                className="absolute z-50"
                style={{
                    transform: `translate(${x ? x - 65 : 0}px, ${
                        y ? y - 70 : 0
                    }px)`,
                }}
            >
                <div className="custom-tooltip bg-indigo-100 flex flex-col px-2 py-1 rounded-lg w-32">
                    <p className="label text-indigo-500">{fullMonth}</p>
                    <p className="intro font-semibold text-indigo-600">
                        {`${formattedValue} ${
                            value ? (value > 1000 ? "K" : "") : null
                        }`}
                        Users
                    </p>
                    <div className="absolute left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-indigo-100 bottom-[-5px]" />
                </div>
            </div>
        );
    }

    return null;
}

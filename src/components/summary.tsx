import { fetchData } from "@/lib/utils";
import { CustomersData, RevenueData } from "@/types/data";
import { GoArrowDownRight, GoArrowUpRight } from "react-icons/go";

type SummaryProps = {
    increase: boolean;
    percentage: number;
    type: "customers" | "revenues";
    metric: "total" | "active" | "revenue" | "expense" | "profit";
};

const calculateValue = (
    data: CustomersData[] | RevenueData[],
    type: "customers" | "revenues",
    metric: SummaryProps["metric"]
): number => {
    if (type === "customers") {
        const customerData = data as CustomersData[];
        if (metric === "active") {
            return customerData.filter((c) => c.status === "Active").length;
        }
        return customerData.length;
    }

    const revenueData = data as RevenueData[];
    if (metric === "revenue") {
        return revenueData.reduce((sum, item) => sum + item.revenue, 0);
    }
    if (metric === "expense") {
        return revenueData.reduce((sum, item) => sum + item.expense, 0);
    }
    return revenueData.reduce(
        (sum, item) => sum + (item.revenue - item.expense),
        0
    );
};

export default async function Summary({
    increase,
    percentage,
    type,
    metric,
}: SummaryProps) {
    const data =
        type === "customers"
            ? await fetchData<CustomersData>("customers")
            : await fetchData<RevenueData>("revenues");

    const displayValue = calculateValue(data, type, metric);

    return (
        <div className="flex flex-col gap-2 h-full">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-medium">
                {type === "revenues" && metric !== "total"
                    ? `$${displayValue.toLocaleString()}`
                    : displayValue}
            </h2>
            <p className="flex items-center gap-1 text-xs md:text-sm lg:text-base">
                <span
                    className={`flex items-center ${
                        increase ? "text-green-500" : "text-red-500"
                    } text-md`}
                >
                    {increase ? <GoArrowUpRight /> : <GoArrowDownRight />}{" "}
                    {percentage}%
                </span>
                From last Month
            </p>
        </div>
    );
}

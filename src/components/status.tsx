export default function Status({ status }: { status: string }) {
    const statusName = status.toLowerCase();
    let statusColor = "";
    if (statusName === "active" || statusName === "completed") {
        statusColor = "bg-green-500";
    }
    if (statusName === "inactive") {
        statusColor = "bg-red-500";
    }
    if (statusName === "pending") {
        statusColor = "bg-yellow-500";
    }
    return (
        <div className="flex justify-center items-center ">
            <p
                className={`${statusColor} px-1 py-0.5 text-white rounded-sm capitalize font-medium`}
            >
                {status}
            </p>
        </div>
    );
}

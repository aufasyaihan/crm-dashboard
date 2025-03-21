export default function Status({ status }: { status: string }) {
    const statusName = status.toLowerCase();
    let statusColor = "";
    if (statusName == "active" || statusName == "completed") {
        statusColor = "bg-green-500";
    }
    else if (statusName == "inactive") {
        statusColor = "bg-red-500";
    }
    else if (statusName == "pending") {
        statusColor = "bg-yellow-500";
    } else {
        statusColor = "bg-indigo-600";
    }
    return (
        <div className="flex justify-center items-center ">
            <p
                className={`${statusColor} px-2 py-1 text-white rounded-sm capitalize font-medium`}
            >
                {status}
            </p>
        </div>
    );
}

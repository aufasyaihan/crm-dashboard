"use client";

import { sendData } from "@/lib/utils";
import { useState } from "react";

export default function Toggle({
    status,
    id,
}: {
    status: string;
    id: string | number;
}) {
    const [checked, setChecked] = useState<boolean>(
        status?.toLowerCase() === "active"
    );

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = e.target.checked;
        setChecked(newChecked);

        try {
            await sendData(`automations/${id}`, "PATCH", {
                status: newChecked ? "Active" : "Inactive",
            });

        } catch (error) {
            console.error("Error updating status:", error);
            setChecked(!newChecked);
        }
    };

    const uniqueId = `status-${id}`;

    return (
        <label
            htmlFor={uniqueId}
            className="flex justify-center items-center gap-2 cursor-not-allowed"
        >
            <input
                type="checkbox"
                name={uniqueId}
                id={uniqueId}
                checked={checked}
                onChange={handleChange}
                hidden
                disabled
                className="disabled:cursor-not-allowed"
            />
            <div
                className={`flex items-center rounded-full ${
                    checked ? "bg-green-500" : "bg-red-500"
                } w-10 h-6 p-1 transition-all duration-200 ease-in-out`}
            >
                <div
                    className={`rounded-full w-4 h-4 bg-white transition-transform duration-200 ease-in-out ${
                        checked ? "translate-x-4" : "translate-x-0"
                    }`}
                ></div>
            </div>
        </label>
    );
}

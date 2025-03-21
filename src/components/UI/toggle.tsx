"use client";

import { useState } from "react";

export default function Toggle({
    status,
    id,
}: {
    status: string;
    id: string | number;
}) {
    const [checked, setChecked] = useState<boolean>(
        status.toLowerCase() === "active"
    );

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked;
      setChecked(newChecked);

      try {
          const response = await fetch(`http://localhost:3002/automations/${id}`, {
              method: "PATCH",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  status: newChecked ? "Active" : "Inactive",
              }),
          });

          if (!response.ok) {
              throw new Error("Failed to update status");
          }

          console.log(`Status updated to: ${newChecked ? "active" : "inactive"}`);
      } catch (error) {
          console.error("Error updating status:", error);
          // Optional: Rollback UI change if update fails
          setChecked(!newChecked);
      }
  };

    const uniqueId = `status-${id}`;

    return (
        <label
            htmlFor={uniqueId}
            className="cursor-pointer flex justify-center items-center gap-2"
        >
            <input
                type="checkbox"
                name={uniqueId}
                id={uniqueId}
                checked={checked}
                onChange={handleChange}
                hidden
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

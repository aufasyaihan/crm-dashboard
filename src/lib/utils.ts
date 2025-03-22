import data from "@/lib/db.json";

// export const fetchData = async <T extends object>(
//     endpoint: string
// ): Promise<T[]> => {
//     const baseUrl =
//         typeof window === "undefined"
//             ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001"
//             : "";

//     const res = await fetch(`${baseUrl}/api/${endpoint}`, {
//         next: { revalidate: 3600 },
//     });

//     return res.json();
// };

// export const fetchData = <T extends keyof typeof data>(
//     endpoint: T
// ): Promise<(typeof data)[T]> => {
//     return Promise.resolve(data[endpoint]);
// };

export const fetchData = async <T extends object>(
    endpoint: keyof typeof data
  ): Promise<T[]> => {
    return Promise.resolve(data[endpoint] as T[]);
  };

export const sendData = async <T extends object>(
    endpoint: string,
    method: string,
    data: object
): Promise<T[]> => {
    const res = await fetch(`/api/${endpoint}`, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error("Failed to update status");
    }
    return res.json();
};

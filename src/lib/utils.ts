export const fetchData = async <T extends object>(
    endpoint: string
): Promise<T[]> => {
    const res = await fetch(`http://localhost:3002/${endpoint}`, {
        next: { revalidate: 3600 },
    });
    return res.json();
};
export const sendData = async <T extends object>(
    endpoint: string,
    method: string,
    data: object
): Promise<T[]> => {
    const res = await fetch(`http://localhost:3002/${endpoint}`, {
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

export const fetchData = async <T extends object>(endpoint: string): Promise<T[]> => {
    const res = await fetch(`http://localhost:3002/${endpoint}`, {
        next: { revalidate: 3600 },
    });
    return res.json();
};
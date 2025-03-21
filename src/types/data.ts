export interface CustomersData {
    id: number;
    name: string;
    email: string;
    status: string;
    totalRevenue: number;
    joined: string;
}

export interface RevenueData {
    id: number;
    revenue: number;
    expense: number;
    date: string;
}

export interface ReportData {
    id: number;
    title: string;
    date: string;
    type: string;
    status: string;
}

export interface AutomationData {
    id: number;
    name: string;
    trigger: string;
    action: string;
    status: string;
}

export interface CustomersGrowthData {
    id: number;
    date: string;
    customers: number;
}

export interface Column<T> {
    header: string;
    accessor?: keyof T;
    render?: (item: T) => React.ReactNode;
  }
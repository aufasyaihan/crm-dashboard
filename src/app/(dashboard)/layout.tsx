import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import DashboardLayout from "@/components/dashboard-layout";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "CRM Dashboard",
    description: "Dashboard for managing customers",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`bg-white ${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <DashboardLayout>{children}</DashboardLayout>
            </body>
        </html>
    );
}

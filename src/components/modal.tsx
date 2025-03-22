"use client";

import { useState, useRef, useEffect } from "react";
import Button from "./UI/button";
import { sendData } from "@/lib/utils";

interface ModalProps {
    title: string;
    icon: React.ReactNode;
}

export default function Modal({ title, icon }: ModalProps) {
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState<boolean>(false); 
    const modalRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    useEffect(() => {
        function handleEscKey(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setOpen(false);
            }
        }

        if (open) {
            document.addEventListener("keydown", handleEscKey);
        }

        return () => {
            document.removeEventListener("keydown", handleEscKey);
        };
    }, [open]);

    const handleToggle = () => {
        setChecked(!checked);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formRef.current) {
            const formData = new FormData(formRef.current);
            const name = formData.get("name");
            const email = formData.get("email");
            const date = formData.get("date");
            const reportTitle = formData.get("title");
            const type = formData.get("type");
            const trigger = formData.get("trigger");
            const action = formData.get("action");
            const isActive = checked;

            if (title === "Customer") {
                await sendData("customers", "POST", {
                    id: Math.floor(Math.random() * 1000),
                    name,
                    email,
                    status: "Active",
                    totalRevenue: 0,
                    joined: new Date().toISOString(),
                });
            } else if (title === "Automation") {
                await sendData("automations", "POST", {
                    id: Math.floor(Math.random() * 1000),
                    name,
                    trigger,
                    action,
                    status: isActive ? "Active" : "Inactive",
                });
            } else if (title === "Report") {
                await sendData("reports", "POST", {
                    id: Math.floor(Math.random() * 1000),
                    title : reportTitle,
                    date,
                    type,
                    status: "Pending",
                });
            }
        }

        setOpen(false);
        setChecked(false);
    };

    return (
        <>
            <Button
                styling="disabled"
                icon={icon}
                title={`Add ${title}`}
                onClick={() => setOpen(true)}
                disabled
            />

            {open && (
                <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center">
                    <div
                        ref={modalRef}
                        className="bg-white rounded-lg shadow-lg w-3/4 md:w-full max-w-md mx-4 overflow-hidden p-4 flex flex-col gap-4"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center">
                            <h3 className="text-4xl font-semibold">{title}</h3>
                        </div>

                        <div className="space-y-4">
                            <form
                                ref={formRef}
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-2"
                            >
                                {(title.toLowerCase() === "customer" ||
                                    title.toLowerCase() === "automation") && (
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Name
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder={`${title} name...`}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                )}

                                {title.toLowerCase() === "customer" && (
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Email
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder={`${title} email...`}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                )}

                                {title.toLowerCase() === "automation" && (
                                    <>
                                        <div className="space-y-2">
                                            <label
                                                htmlFor="trigger"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Trigger
                                            </label>
                                            <input
                                                id="trigger"
                                                name="trigger"
                                                type="text"
                                                placeholder={`${title} trigger...`}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label
                                                htmlFor="action"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Action
                                            </label>
                                            <input
                                                id="action"
                                                name="action"
                                                type="text"
                                                placeholder={`${title} trigger...`}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Active
                                            </label>
                                            <div
                                                onClick={handleToggle}
                                                className={`cursor-pointer w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                                                    checked
                                                        ? "bg-green-500"
                                                        : "bg-red-500"
                                                }`}
                                            >
                                                <div
                                                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                                                        checked
                                                            ? "translate-x-4"
                                                            : "translate-x-0"
                                                    }`}
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

                                {title.toLowerCase() === "report" && (
                                    <>
                                        <div className="space-y-2">
                                            <label
                                                htmlFor="title"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Title
                                            </label>
                                            <input
                                                id="title"
                                                name="title"
                                                type="text"
                                                placeholder={`${title} title...`}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label
                                                htmlFor="type"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Type
                                            </label>
                                            <input
                                                id="type"
                                                name="type"
                                                type="text"
                                                placeholder={`${title} type...`}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label
                                                htmlFor="date"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Date
                                            </label>
                                            <input
                                                id="date"
                                                name="date"
                                                type="date"
                                                placeholder={`${title} date...`}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </>
                                )}

                                {/* Footer Buttons */}
                                <div className="flex justify-end gap-2 pt-4">
                                    <Button
                                        styling="danger"
                                        title="Cancel"
                                        onClick={() => {
                                            setOpen(false);
                                            setChecked(false);
                                        }}
                                        type="button"
                                    />
                                    <Button
                                        styling="primary"
                                        title="Save"
                                        type="submit"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

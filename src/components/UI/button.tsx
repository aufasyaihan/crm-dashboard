import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  title: string;
  styling: "primary" | "secondary" | "danger" | "disabled" | "success";
}

export default function Button({ styling, icon, title, ...props }: ButtonProps) {
  if (styling === "primary") {
    return (
      <button
        className="flex items-center gap-2 bg-indigo-600 text-white px-2 py-1 rounded-sm cursor-pointer hover:bg-indigo-700 capitalize text-sm md:text-base"
        {...props}
      >
        {icon}
        {title}
      </button>
    );
  }
  if(styling === "success"){
    return (
      <button
        className="flex items-center gap-2 bg-green-600 text-white px-2 py-1 rounded-sm cursor-pointer hover:bg-green-700 capitalize text-sm md:text-base" 
        {...props}
      >
        {icon}
        {title}
      </button>
    );
  }
  if (styling === "secondary") {
    return (
      <button
        className="flex items-center gap-2 bg-white text-black border border-gray-400 px-2 py-1 rounded-sm cursor-pointer hover:bg-gray-100 capitalize font-medium text-sm md:text-base"
        {...props}
      >
        {icon}
        {title}
      </button>
    );
  }
  if (styling === "danger") {
    return (
      <button
        className="flex items-center gap-2 bg-red-600 text-white px-2 py-1 rounded-sm cursor-pointer hover:bg-red-700 capitalize text-sm md:text-base"
        {...props}
      >
        {icon}
        {title}
      </button>
    );
  }
  if(styling === "disabled") {
    return (
      <button
        className="flex items-center gap-2 bg-gray-400 text-white px-2 py-1 rounded-sm cursor-not-allowed capitalize text-sm md:text-base"
        {...props}
      >
        {icon}
        {title}
      </button>
    );
  }
}

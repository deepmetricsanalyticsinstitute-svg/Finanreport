import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`px-6 py-3 rounded-md font-semibold text-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-75 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    className?: string;
}

export function PrimaryButton({ children, className = '', ...props }: ButtonProps) {
    return (
        <button
            className={`
                bg-accent
                text-black
                font-semibold
                px-6 py-3
                rounded-xl
                transition-all
                duration-350
                hover:scale-105
                hover:shadow-glow
                disabled:opacity-50
                disabled:pointer-events-none
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
}

export function SecondaryButton({ children, className = '', ...props }: ButtonProps) {
    return (
        <button
            className={`
                bg-white/5
                text-[#f3f3f3]
                font-semibold
                px-6 py-3
                rounded-xl
                border border-white/10
                transition-all
                duration-350
                hover:bg-white/10
                hover:border-white/20
                disabled:opacity-50
                disabled:pointer-events-none
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
}

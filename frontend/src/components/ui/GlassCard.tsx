'use client';

import React from 'react';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
}

export default function GlassCard({ children, className = '' }: GlassCardProps) {
    return (
        <div
            className={`
                bg-card
                border border-border
                rounded-xl
                backdrop-blur-xl
                p-6
                transition-all
                duration-350
                hover:border-accent
                hover:shadow-glow
                hover:scale-[1.02]
                ${className}
            `}
        >
            {children}
        </div>
    );
}

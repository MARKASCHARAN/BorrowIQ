'use client';

import React from 'react';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export default function Section({ children, className = '', id }: SectionProps) {
    return (
        <section
            id={id}
            className={`
                max-w-7xl
                mx-auto
                px-6
                py-32
                ${className}
            `}
        >
            {children}
        </section>
    );
}

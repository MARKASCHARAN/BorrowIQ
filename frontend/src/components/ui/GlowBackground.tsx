'use client';

import React from 'react';

export default function GlowBackground() {
    return (
        <div
            className="
                absolute
                top-0 left-1/2 -translate-x-1/2
                w-[900px]
                h-[900px]
                bg-[#ff4d2d]/20
                blur-[200px]
                rounded-full
                pointer-events-none
                z-[-1]
            "
        />
    );
}

'use client';

import Link from 'next/link';

export default function Navbar() {
    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Resources', href: '/resources' },
        { name: 'Contact', href: '/contact' }
    ];

    return (
        <nav className="absolute top-0 left-0 right-0 z-50 flex justify-between items-start pointer-events-none">
            {/* Logo */}
            <div className="p-6 md:p-8 pointer-events-auto flex items-center gap-3">
                <img src="/logo.png" alt="BorrowIQ Logo" className="w-26 h-26 object-contain" />
                <span className="text-[16px] md:text-xl font-bold tracking-widest text-black uppercase mt-2">
                    BORROWIQ
                </span>
            </div>

            {/* Nav Links Strip */}
            <div className="flex pointer-events-auto">
                <div className="hidden md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="w-[100px] xl:w-[120px] h-[80px] border-b border-l border-black/10 bg-white/60 backdrop-blur-md p-4 flex flex-col justify-between hover:bg-black/10 transition-colors group"
                        >
                            <div className="flex justify-end">
                                <div className="w-1.5 h-1.5 bg-black/30 rounded-full group-hover:bg-black transition-colors" />
                            </div>
                            <span className="text-[11px] font-mono text-black/80 group-hover:text-black transition-colors uppercase">
                                {link.name}
                            </span>
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <Link
                    href="/dashboard"
                    className="w-[120px] md:w-[140px] xl:w-[160px] h-[80px] border-b border-l border-[#FF4D2D] bg-[#FF4D2D] p-4 flex flex-col justify-between hover:brightness-110 transition-all group"
                >
                    <div className="flex justify-end">
                        <div className="w-1.5 h-1.5 bg-white rounded-full group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-white uppercase">
                        Launch App
                    </span>
                </Link>
            </div>
        </nav>
    );
}

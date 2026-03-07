'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

export default function Footer() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <footer className="bg-white text-black px-8 md:px-16 pt-24 pb-12 w-full relative overflow-hidden">
            {/* Animated Background blobs */}
            <motion.div
                className="absolute -top-40 right-[-10%] w-[500px] h-[500px] bg-[#FF4D2D]/5 rounded-full blur-3xl pointer-events-none"
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, -50, 0],
                    y: [0, 50, 0]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute -bottom-40 left-[-10%] w-[600px] h-[600px] bg-[#017CEE]/5 rounded-full blur-3xl pointer-events-none"
                animate={{
                    scale: [1, 1.1, 1],
                    x: [0, 50, 0],
                    y: [0, -30, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 font-mono border-b border-black/10 pb-20 relative z-10"
            >
                <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 pr-12">
                    <h3 className="font-bold tracking-widest uppercase mb-8 max-w-[280px] text-[11px] leading-relaxed text-black/90">
                        BORROWIQ - AI-POWERED ON-CHAIN CREDIT INTELLIGENCE
                    </h3>
                    <p className="text-[11px] font-bold text-black/60 max-w-[350px] leading-loose mb-8 uppercase tracking-widest">
                        DYNAMIC LENDING • AI CREDIT SCORING • BUILT ON CREDITCOIN
                    </p>
                    <div className="flex w-full max-w-[400px] group shadow-sm hover:shadow-md transition-shadow">
                        <input type="email" placeholder="E-MAIL ADDRESS" className="bg-gray-100 text-black px-5 py-4 w-2/3 outline-none text-[10px] tracking-widest placeholder:text-black/40 border border-transparent focus:border-black/10 transition-colors" />
                        <button className="bg-black text-white px-6 py-4 w-1/3 text-[10px] tracking-widest uppercase font-bold hover:bg-[#FF4D2D] transition-colors">SUBSCRIBE</button>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <h3 className="font-bold tracking-widest uppercase text-[11px] mb-8 text-black/40">DISCOVER</h3>
                    <ul className="space-y-4 text-[11px] font-bold tracking-widest uppercase">
                        <li><Link href="/" className="hover:text-[#FF4D2D] transition-colors">HOME</Link></li>
                        <li><Link href="/about" className="hover:text-[#FF4D2D] transition-colors">ABOUT</Link></li>
                        <li><Link href="/resources" className="hover:text-[#FF4D2D] transition-colors">RESOURCES</Link></li>
                        <li><Link href="/resources" className="hover:text-[#FF4D2D] transition-colors">DOCS</Link></li>
                        <li><Link href="#" className="hover:text-[#FF4D2D] transition-colors">GITHUB</Link></li>
                    </ul>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <h3 className="font-bold tracking-widest uppercase text-[11px] mb-8 text-black/40">CONTACT</h3>
                    <ul className="space-y-4 text-[11px] font-bold tracking-widest uppercase mb-12">
                        <li className="text-black/90">Marka Sai Charan</li>
                        <li className="text-black/50 mt-1">Web3 Developer</li>
                    </ul>

                    <div className="flex gap-3">
                        <a href="#" className="w-10 h-10 bg-gray-100 border border-gray-200 flex items-center justify-center rounded-sm hover:-translate-y-1 hover:shadow-lg hover:border-black/10 transition-all cursor-pointer">
                            <span className="text-black text-lg font-sans">𝕏</span>
                        </a>
                        <a href="#" className="w-10 h-10 bg-gray-100 border border-gray-200 flex items-center justify-center rounded-sm hover:-translate-y-1 hover:shadow-lg hover:border-black/10 transition-all cursor-pointer">
                            <span className="text-black text-sm font-bold tracking-widest">in</span>
                        </a>
                        <a href="#" className="w-10 h-10 bg-gray-100 border border-gray-200 flex items-center justify-center rounded-sm hover:-translate-y-1 hover:shadow-lg hover:border-black/10 transition-all cursor-pointer">
                            <span className="text-black text-lg font-sans leading-none">▶</span>
                        </a>
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-[1400px] mx-auto mt-12 flex flex-col md:flex-row justify-between items-end font-mono relative z-10"
            >
                <div className="flex items-center gap-4 group">
                    <img
                        src="/logo.png"
                        alt="BorrowIQ Logo"
                        className="w-28 h-28 object-contain transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
                    /* Removed grayscale so the blue pops on the white background */
                    />
                    <span className="text-xl font-bold tracking-widest text-black uppercase">BORROWIQ</span>
                </div>

                <div className="flex justify-between items-end w-full md:w-1/2 mt-12 md:mt-0">
                    <div>
                        <h3 className="font-bold tracking-widest uppercase text-[10px] mb-4 text-black/40">LEGALS</h3>
                        <ul className="space-y-2 text-[10px] font-bold tracking-widest uppercase leading-loose text-black/70">
                            <li><Link href="#" className="hover:text-black hover:underline transition-colors">PRIVACY POLICY</Link></li>
                            <li><Link href="#" className="hover:text-black hover:underline transition-colors">TERMS OF USE</Link></li>
                        </ul>
                    </div>

                    <div className="text-[10px] font-bold tracking-widest uppercase text-black/50">
                        BORROWIQ ©2026
                    </div>
                </div>
            </motion.div>
        </footer>
    );
}

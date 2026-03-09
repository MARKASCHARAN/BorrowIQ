'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    LayoutTemplate, ArrowDown, Cpu, ShieldCheck,
    Target, Zap, Globe, Sparkles
} from 'lucide-react';
import Section from '@/components/ui/Section';

const cinematicReveal: any = {
    hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
};

export default function AboutPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const yBG = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

    return (
        <div ref={containerRef} className="min-h-screen pt-40 pb-40 px-6 relative overflow-hidden bg-[#FAFAFA] text-gray-900 font-sans selection:bg-accent selection:text-white">
            {/* Ambient Background Lights */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[150vh] pointer-events-none z-0">
                <motion.div style={{ y: yBG, rotate }} className="absolute -top-[10%] right-[-10%] w-[800px] h-[800px] bg-accent/5 blur-[150px] rounded-full" />
                <motion.div style={{ y: yBG }} className="absolute top-[40%] left-[-20%] w-[1000px] h-[1000px] bg-blue-500/5 blur-[180px] rounded-full" />
            </div>

            <div className="max-w-[1400px] mx-auto relative z-10 space-y-48">
                {/* Hero Section */}
                <Section className="!py-0 text-center space-y-24">
                    <div className="space-y-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-black/5 shadow-sm rounded-full text-[11px] font-bold text-gray-500 uppercase tracking-[0.3em]"
                        >
                            <Sparkles className="w-4 h-4 text-accent" />
                            Next-Generation DeFi Architecture
                        </motion.div>

                        <div className="overflow-hidden py-4">
                            <motion.h1
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                className="text-6xl md:text-8xl lg:text-[110px] font-semibold tracking-tighter leading-[0.9] text-gray-900"
                            >
                                Redefining <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">On-Chain Reputation</span>
                            </motion.h1>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="text-xl md:text-3xl text-gray-500 max-w-4xl mx-auto leading-relaxed tracking-tight font-light"
                        >
                            BorrowIQ is the first decentralized credit protocol utilizing deep-learning AI
                            to eliminate the barrier of overcollateralization.
                        </motion.p>
                    </div>

                    
                </Section>

                {/* Mission Section */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="grid lg:grid-cols-12 gap-16 items-center"
                >
                    <motion.div variants={cinematicReveal} className="lg:col-span-12">
                        <div className="bg-white rounded-[64px] p-16 md:p-32 relative overflow-hidden border border-black/5 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.06)] transition-shadow duration-1000">
                            <div className="absolute -top-60 -left-60 w-[700px] h-[700px] bg-accent/5 blur-[120px] rounded-full" />

                            <div className="relative z-10 grid md:grid-cols-12 gap-24 items-center">
                                <div className="md:col-span-7 space-y-12">
                                    <span className="text-[12px] uppercase tracking-[0.4em] text-accent font-black">THE MISSION</span>
                                    <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter leading-[1.05] text-gray-900">DeFi Capital is Trapped.</h2>
                                    <p className="text-2xl text-gray-500 leading-relaxed font-light">
                                        Traditional DeFi protocols require you to lock up more capital than you borrow.
                                        This inefficiency limits growth and excludes billions of users.
                                        BorrowIQ was built to solve this by bringing seamless trust into a trustless environment.
                                    </p>
                                </div>
                                <div className="md:col-span-5 relative">
                                    <div className="bg-gray-50 rounded-[48px] p-20 border border-black/5 flex flex-col items-center text-center space-y-12 group hover:bg-white hover:shadow-2xl transition-all duration-700">
                                        <div className="w-28 h-28 rounded-[2.5rem] bg-white flex items-center justify-center border border-black/5 shadow-xl group-hover:scale-110 transition-transform duration-700">
                                            <Zap className="w-12 h-12 text-accent" />
                                        </div>
                                        <div className="space-y-6">
                                            <h3 className="text-2xl font-bold tracking-widest uppercase text-gray-900">The Solution</h3>
                                            <p className="text-xl text-gray-500 leading-relaxed italic border-l-2 border-accent/20 pl-6">
                                                "AI-driven reputation scores that transform your past on-chain history
                                                into modern borrowing power."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.section>

                {/* Architecture Visualizer */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="space-y-32"
                >
                    <div className="text-center space-y-8">
                        <motion.h2 variants={cinematicReveal} className="text-5xl md:text-8xl font-semibold text-gray-900 tracking-tighter">Stack <span className="text-accent">Layer</span></motion.h2>
                        <motion.p variants={cinematicReveal} className="text-2xl text-gray-500 max-w-3xl mx-auto font-light">Multilayer trust orchestration from data ingestion to on-chain execution.</motion.p>
                    </div>

                    <div className="relative max-w-5xl mx-auto py-10">
                        <div className="absolute left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-black/10 to-transparent -translate-x-[50%]" />

                        <div className="space-y-32">
                            {[
                                { name: 'Wallet Activity', desc: 'Real-time on-chain footprint monitoring', icon: Globe },
                                { name: 'AI Credit Engine', desc: 'Neural analysis of over data factors', icon: Cpu, glow: true },
                                { name: 'Risk Categorization', desc: 'Dynamic interest & margin assignment', icon: ShieldCheck },
                                { name: 'On-Chain Settlement', desc: 'Automated lending through smart contracts', icon: LayoutTemplate, accent: true }
                            ].map((layer, i) => (
                                <motion.div
                                    key={i}
                                    variants={cinematicReveal}
                                    className={`relative z-10 flex items-center justify-between w-full group ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                                >
                                    <div className={`w-[42%] ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                        <div className="bg-white p-12 rounded-[40px] border border-black/5 shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2 group-hover:border-black/10 transition-all duration-700">
                                            <div className={`text-3xl font-semibold tracking-tight mb-6 ${layer.glow || layer.accent ? 'text-accent' : 'text-gray-900'}`}>{layer.name}</div>
                                            <div className="text-xl text-gray-500 leading-relaxed font-light">{layer.desc}</div>
                                        </div>
                                    </div>

                                    <div className="absolute left-[50%] -translate-x-[50%] w-20 h-20 rounded-full bg-white border-[6px] border-gray-50 flex items-center justify-center shadow-xl group-hover:scale-125 group-hover:border-white group-hover:bg-gray-50 transition-all duration-700">
                                        <layer.icon className={`w-8 h-8 ${layer.glow || layer.accent ? 'text-accent' : 'text-gray-400 group-hover:text-gray-900'} transition-colors duration-500`} />
                                    </div>

                                    <div className="w-[42%]" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Final CTA Area */}
                <Section className="!py-0">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={cinematicReveal}
                        className="bg-black rounded-[64px] p-24 md:p-32 text-center space-y-16 relative overflow-hidden shadow-2xl"
                    >
                        <div className="absolute top-[-30%] right-[-10%] w-[800px] h-[800px] bg-accent/20 blur-[150px] pointer-events-none rounded-full" />
                        <div className="absolute bottom-[-30%] left-[-10%] w-[600px] h-[600px] bg-blue-500/20 blur-[150px] pointer-events-none rounded-full" />

                        <h2 className="text-6xl md:text-9xl font-semibold text-white tracking-tighter leading-[0.95] relative z-10">
                            Unlock your <br /> <span className="text-accent">capital potential.</span>
                        </h2>
                        <p className="text-2xl md:text-3xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light relative z-10">
                            Join thousands of borrowers who are already leveraging their history for better rates today.
                        </p>
                        <div className="flex justify-center pt-8 relative z-10">
                            <button className="bg-accent text-white px-14 py-7 rounded-full text-sm tracking-[0.3em] font-bold uppercase hover:scale-105 hover:bg-white hover:text-black hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] transition-all duration-500">
                                Launch Protocol
                            </button>
                        </div>
                    </motion.div>
                </Section>
            </div>
        </div>
    );
}

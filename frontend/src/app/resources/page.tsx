'use client';

import { motion, Variants } from 'framer-motion';
import {
    FileText, Code, Server, Globe, ExternalLink,
    FileCode2, BookOpen, Terminal, Github
} from 'lucide-react';
import Section from '@/components/ui/Section';
import GlassCard from '@/components/ui/GlassCard';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';

const cinematicReveal: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

export default function ResourcesPage() {
    return (
        <div className="min-h-screen pt-32 pb-40 px-6 relative overflow-hidden bg-bg text-text">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[100vh] pointer-events-none opacity-20 z-0">
                <div className="absolute top-[-10%] left-[-20%] w-[700px] h-[700px] bg-accent/20 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto space-y-32 relative z-10">
                {/* Header Section */}
                <Section className="!py-0 text-center space-y-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-border rounded-full text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">
                        <BookOpen className="w-3 h-3 text-accent" />
                        Knowledge Base
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-semibold text-text tracking-tighter leading-[1.05]"
                    >
                        Developer <span className="text-accent">Resources</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-text-muted max-w-2xl mx-auto leading-relaxed font-medium"
                    >
                        Access our core documentation, API specifications, and audited smart contract source code.
                    </motion.p>
                </Section>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid lg:grid-cols-2 gap-8"
                >
                    {/* Whitepaper Card */}
                    <motion.div variants={cinematicReveal}>
                        <GlassCard className="!p-12 group !bg-white/[0.02] border-border relative overflow-hidden h-full">
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/10 blur-[60px] group-hover:bg-accent/20 transition-all pointer-events-none" />
                            <FileText className="w-16 h-16 text-accent mb-10 group-hover:scale-110 transition-transform" />
                            <h3 className="text-3xl font-semibold mb-6 tracking-tight">Protocol Whitepaper</h3>
                            <p className="text-text-muted text-lg leading-relaxed mb-12">
                                Deep-dive into our AI credit intelligence framework, mathematical interest models, and tokenomic structure.
                            </p>
                            <SecondaryButton
                                onClick={() => window.open('/whitepaper.pdf', '_blank')}
                                className="!px-10 text-[10px] font-black uppercase tracking-widest flex items-center gap-3"
                            >
                                Read Document <ExternalLink className="w-4 h-4" />
                            </SecondaryButton>
                        </GlassCard>
                    </motion.div>

                    {/* GitHub Section */}
                    <motion.div variants={cinematicReveal}>
                        <GlassCard className="!p-12 group !bg-white/[0.02] border-border h-full relative overflow-hidden">
                            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-accent/10 blur-[60px] group-hover:bg-accent/20 transition-all pointer-events-none" />
                            <Github className="w-16 h-16 text-accent mb-10 group-hover:scale-110 transition-transform" />
                            <h3 className="text-3xl font-semibold tracking-tight mb-6">GitHub Repository</h3>
                            <p className="text-text-muted text-lg leading-relaxed mb-8">
                                Full open source code including smart contracts, our custom AI engine, and the frontend protocol dashboard.
                            </p>
                            <SecondaryButton
                                onClick={() => window.open('https://github.com/MARKASCHARAN/BorrowIQ', '_blank')}
                                className="!px-10 text-[10px] font-black uppercase tracking-widest flex items-center gap-3 w-fit"
                            >
                                View Source <ExternalLink className="w-4 h-4" />
                            </SecondaryButton>
                        </GlassCard>
                    </motion.div>

                    {/* Smart Contracts Card */}
                    <motion.div variants={cinematicReveal}>
                        <GlassCard className="!p-12 group !bg-white/[0.02] border-border h-full">
                            <div className="flex justify-between items-start mb-10">
                                <h3 className="text-3xl font-semibold tracking-tight">On-Chain Core</h3>
                                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20">
                                    <Code className="w-7 h-7 text-accent" />
                                </div>
                            </div>
                            <p className="text-text-muted mb-10 text-lg leading-relaxed">
                                Audited non-custodial contracts powering secure lending and automated repayment logic.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {['LendingPool.sol', 'LoanManager.sol', 'CreditScoreRegistry.sol', 'InterestModel.sol'].map((contract, i) => (
                                    <a
                                        key={i}
                                        href={`https://github.com/yourrepo/contracts/blob/main/${contract}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 bg-black border border-border p-5 rounded-2xl hover:border-accent hover:bg-accent/[0.02] transition-all group/item"
                                    >
                                        <FileCode2 className="w-5 h-5 text-text-muted group-hover/item:text-accent transition-colors" />
                                        <span className="text-sm font-semibold text-text-muted group-hover/item:text-text transition-colors">{contract}</span>
                                    </a>
                                ))}
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* API Card */}
                    <motion.div variants={cinematicReveal} className="h-full">
                        <GlassCard className="!p-12 border-border !bg-white/[0.02] group h-full">
                            <div className="flex items-center gap-6 mb-10">
                                <div className="w-16 h-16 rounded-[2rem] bg-accent/10 border border-accent/20 flex items-center justify-center">
                                    <Globe className="w-8 h-8 text-accent" />
                                </div>
                                <h3 className="text-3xl font-semibold tracking-tight text-text">Public APIs</h3>
                            </div>
                            <p className="text-text-muted text-lg leading-relaxed mb-12">
                                Integrate the BorrowIQ Oracle into your dApps or analytics dashboards via REST endpoints.
                            </p>
                            <div className="space-y-4">
                                {[
                                    { m: 'GET', p: '/eligibility/{wallet}' },
                                    { m: 'GET', p: '/protocol/stats' },
                                    { m: 'GET', p: '/loan/status/{wallet}' },
                                    { m: 'GET', p: '/ai/explain/{wallet}' },
                                    { m: 'GET', p: '/ai/loan-advice/{wallet}' }
                                ].map((api, i) => (
                                    <div key={i} className="flex items-center justify-between bg-black border border-border p-5 rounded-2xl group/api hover:border-accent transition-all cursor-crosshair">
                                        <span className="text-[10px] font-black tracking-widest text-accent uppercase w-16">{api.m}</span>
                                        <span className="font-mono text-sm text-text-muted group-hover/api:text-text transition-colors text-right flex-1">{api.p}</span>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* TensorStax-style Animated Developer Console */}
                    <motion.div variants={cinematicReveal} className="lg:col-span-2 mt-4">
                        <GlassCard className="!p-0 border-border !bg-black relative overflow-hidden group shadow-2xl">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/10 blur-[100px] pointer-events-none group-hover:bg-accent/20 transition-all duration-1000" />

                            {/* Mac Window Header */}
                            <div className="bg-[#111] border-b border-white/5 px-6 py-4 flex items-center relative z-10">
                                <div className="flex items-center gap-2">
                                    <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                                    <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                                    <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                                </div>
                                <div className="absolute left-1/2 -translate-x-1/2 text-xs text-text-muted font-mono tracking-widest uppercase">
                                    borrowiq-cli — node
                                </div>
                            </div>

                            {/* Terminal Content */}
                            <div className="p-10 font-mono text-[15px] space-y-6 relative z-10 min-h-[300px]">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <span className="text-accent font-bold">~ $</span> <span className="text-text font-medium">borrowiq analyze 0x71C...39E</span>
                                </motion.div>

                                <div className="pl-6 space-y-4">
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ delay: 1.5, type: 'spring' }}
                                        className="text-text-muted"
                                    >
                                        <span className="text-accent/50 mr-4">→</span> credit score: <span className="text-white font-bold text-lg ml-2">82</span>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ delay: 2.2, type: 'spring' }}
                                        className="text-text-muted"
                                    >
                                        <span className="text-accent/50 mr-4">→</span> interest rate: <span className="text-white font-bold text-lg ml-2">7%</span>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ delay: 2.9, type: 'spring' }}
                                        className="text-text-muted"
                                    >
                                        <span className="text-accent/50 mr-4">→</span> loan eligibility: <span className="text-green-400 font-bold ml-2">approved</span>
                                    </motion.div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ delay: 3.8 }}
                                    className="pt-4 flex items-center gap-3"
                                >
                                    <span className="text-accent font-bold">~ $</span>
                                    <motion.div
                                        animate={{ opacity: [1, 0] }}
                                        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                                        className="w-2.5 h-5 bg-accent/80"
                                    />
                                </motion.div>
                            </div>
                        </GlassCard>
                    </motion.div>
                </motion.div>

                {/* Developer CTA */}
                <Section className="!py-0">
                    <GlassCard className="!py-16 !px-12 border-border !bg-accent/[0.02] flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="space-y-4 text-center md:text-left">
                            <h3 className="text-4xl font-semibold tracking-tight text-text">Build on <span className="text-accent">BorrowIQ</span></h3>
                            <p className="text-text-muted text-lg font-medium max-w-lg">Join the ecosystem and help us build the future of decentralized capital reputation.</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-6">
                            <PrimaryButton className="!px-10 text-[10px] uppercase tracking-[0.2em] flex items-center gap-3">
                                <Terminal className="w-4 h-4" /> Start Building
                            </PrimaryButton>
                            <SecondaryButton className="!px-10 text-[10px] uppercase tracking-[0.2em]">
                                Join Discord
                            </SecondaryButton>
                        </div>
                    </GlassCard>
                </Section>
            </div>
        </div>
    );
}

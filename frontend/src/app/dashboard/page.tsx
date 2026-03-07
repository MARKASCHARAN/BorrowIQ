'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import {
    Activity, ShieldCheck, Sparkles, Bot, Loader2, CheckCircle2,
    Wallet, Brain, TrendingUp, ArrowUpRight, ArrowDownLeft,
    Zap, Target, Globe
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import {
    fetchEligibility,
    fetchLoanStatus,
    fetchProtocolStats,
    fetchAIExplanation,
    fetchLoanAdvice,
    type EligibilityResponse,
    type LoanStatusResponse,
    type ProtocolStatsResponse,
    type AIExplainResponse,
    type AIAdvisorResponse,
} from '@/lib/api';
import { LOAN_MANAGER_ABI, LOAN_MANAGER_ADDRESS } from '@/lib/contracts';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';

const cardReveal: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function AppDashboard() {
    const { address, isConnected, chain } = useAccount();
    const [borrowAmount, setBorrowAmount] = useState<number>(0);

    // Live data states
    const [eligibility, setEligibility] = useState<EligibilityResponse | null>(null);
    const [loanStatus, setLoanStatus] = useState<LoanStatusResponse | null>(null);
    const [protocolStats, setProtocolStats] = useState<ProtocolStatsResponse | null>(null);
    const [aiExplanation, setAiExplanation] = useState<AIExplainResponse | null>(null);
    const [loanAdvice, setLoanAdvice] = useState<AIAdvisorResponse | null>(null);

    const [loading, setLoading] = useState(false);
    const [explainLoading, setExplainLoading] = useState(false);
    const [adviceLoading, setAdviceLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Smart Contract Writes
    const { data: borrowTxHash, writeContract: writeBorrow, isPending: isBorrowing } = useWriteContract();
    const { data: repayTxHash, writeContract: writeRepay, isPending: isRepaying } = useWriteContract();
    const { isSuccess: borrowConfirmed } = useWaitForTransactionReceipt({ hash: borrowTxHash });
    const { isSuccess: repayConfirmed } = useWaitForTransactionReceipt({ hash: repayTxHash });

    const loadData = async () => {
        if (!address) return;
        setLoading(true);
        setError(null);
        try {
            const [elig, loan, stats] = await Promise.all([
                fetchEligibility(address),
                fetchLoanStatus(address).catch(() => null),
                fetchProtocolStats(),
            ]);
            setEligibility(elig);
            setLoanStatus(loan);
            setProtocolStats(stats);
        } catch (err: any) {
            setError('System link failed. Ensure the AI Backend is operational on port 8000.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isConnected || !address) {
            setEligibility(null);
            setLoanStatus(null);
            setAiExplanation(null);
            setLoanAdvice(null);
            return;
        }
        loadData();
    }, [isConnected, address]);

    useEffect(() => {
        if (borrowConfirmed || repayConfirmed) loadData();
    }, [borrowConfirmed, repayConfirmed]);

    const handleAIExplain = async () => {
        if (!address) return;
        setExplainLoading(true);
        try {
            const res = await fetchAIExplanation(address);
            setAiExplanation(res);
        } catch { } finally { setExplainLoading(false); }
    };

    const handleAIAdvice = async () => {
        if (!address) return;
        setAdviceLoading(true);
        try {
            const res = await fetchLoanAdvice(address);
            setLoanAdvice(res);
        } catch { } finally { setAdviceLoading(false); }
    };

    const handleBorrow = () => {
        if (borrowAmount <= 0) return;
        writeBorrow({
            address: LOAN_MANAGER_ADDRESS,
            abi: LOAN_MANAGER_ABI,
            functionName: 'requestLoan',
            args: [parseEther(String(borrowAmount))],
            gas: BigInt(350000), 
        });
    };

    const handleRepay = () => {
        if (!loanStatus?.active || repaymentAmount <= 0) return;
        writeRepay({
            address: LOAN_MANAGER_ADDRESS,
            abi: LOAN_MANAGER_ABI,
            functionName: 'repayLoan',
            value: parseEther(String(repaymentAmount.toFixed(6))),
            gas: BigInt(350000), 
        });
    };

    const score = eligibility?.credit_score ?? 0;
    const maxLoan = eligibility?.max_loan ?? 0;
    const interest = eligibility?.interest_rate ?? 0;
    const risk = eligibility?.risk_level ?? '—';
    const loanAmountEth = loanStatus ? (loanStatus.amount_wei / 1e18) : 0;
    const loanInterest = loanStatus?.interest_rate ?? 0;
    const repaymentAmount = loanAmountEth > 0 ? (loanAmountEth * (1 + loanInterest / 100)) : 0;

    return (
        <div className="min-h-screen pt-40 pb-40 px-6 relative bg-[#FAFAFA] font-sans selection:bg-accent selection:text-white overflow-hidden">
            {/* Ambient Background Lights */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[100vh] pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-accent/5 blur-[150px] rounded-full" />
                <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full" />
            </div>

            <div className="max-w-[1400px] mx-auto space-y-12 relative z-10 w-full">
                {/* Header Area */}
                <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-8 border-b border-black/5 pb-12">
                    <div className="space-y-4">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-black/5 shadow-sm rounded-full text-[11px] font-bold text-gray-500 uppercase tracking-[0.3em]">
                            <Activity className="w-3 h-3 text-accent" />
                            Live Status: {chain?.name || 'Monitoring'}
                        </motion.div>
                        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl font-semibold text-gray-900 tracking-tighter">
                            Control <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">Center</span>
                        </motion.h1>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="bg-white border border-black/5 shadow-sm rounded-2xl py-4 px-8 flex items-center gap-8 relative overflow-hidden">
                            <div className="absolute right-0 top-0 w-32 h-32 bg-accent/5 blur-[30px] rounded-full pointer-events-none" />
                            <div className="text-right relative z-10">
                                <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Net Liquidity</div>
                                <div className="text-2xl font-semibold text-gray-900">{protocolStats?.pool_liquidity || '...'}</div>
                            </div>
                            <div className="w-px h-10 bg-black/5 relative z-10" />
                            <div className="relative z-10">
                                <ConnectButton accountStatus="avatar" showBalance={false} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Toasts / Notifications */}
                <AnimatePresence>
                    {(borrowConfirmed || repayConfirmed) && (
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-green-50 border border-green-200 p-6 rounded-2xl flex items-center gap-4 justify-center mb-8 shadow-sm">
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                            <span className="text-green-800 font-semibold tracking-tight text-lg">Protocol Sync Complete. Finalized on-chain.</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {!isConnected ? (
                    <div className="py-32 flex flex-col items-center justify-center text-center space-y-12 bg-white border border-black/5 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.03)] rounded-[48px] overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 blur-[150px] pointer-events-none rounded-full" />
                        <div className="w-28 h-28 rounded-[3rem] bg-gray-50 border border-black/5 flex items-center justify-center shadow-lg relative z-10">
                            <Wallet className="w-12 h-12 text-accent" />
                        </div>
                        <div className="space-y-4 relative z-10">
                            <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 tracking-tight">Synchronize Identity</h2>
                            <p className="text-gray-500 max-w-md text-xl leading-relaxed mx-auto font-light">Connect your wallet to generate your neural-weighted credit reputation.</p>
                        </div>
                        <div className="relative z-10">
                            <ConnectButton />
                        </div>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-12 gap-8 items-start">
                        {/* LEFT: Identity & Orb (4/12) */}
                        <div className="lg:col-span-4 space-y-8">
                            <motion.div variants={cardReveal} initial="hidden" animate="visible">
                                <div className="bg-white border border-black/5 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.03)] text-center space-y-10 relative overflow-hidden group p-10 rounded-[40px]">
                                    <div className="absolute top-0 right-0 w-44 h-44 bg-accent/5 blur-[60px] pointer-events-none rounded-full" />
                                    <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-accent">AI Identity Orb</div>

                                    {/* The Credit Score Orb (Premium White Polish) */}
                                    <div className="relative flex justify-center py-6">
                                        <div className="relative w-56 h-56 rounded-full flex items-center justify-center shadow-2xl">
                                            {/* Outer Glow Ring */}
                                            <div className="absolute inset-[-10px] rounded-full border border-black/5 animate-[spin_20s_linear_infinite]" />
                                            <div className="absolute inset-2 rounded-full border border-accent/20 animate-[spin_10s_linear_reverse_infinite]" />

                                            {/* Inner Sphere */}
                                            <div className="absolute inset-8 rounded-full bg-accent/10 blur-[30px] animate-pulse" />
                                            <div className="absolute inset-6 rounded-full bg-white shadow-[0_0_50px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center border border-black/5 transition-transform duration-700 group-hover:scale-105">
                                                <span className="text-7xl font-bold text-gray-900 leading-none tracking-tighter">{score}</span>
                                                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 mt-3">IQ Score</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-50/80 p-6 rounded-3xl border border-black/5 group-hover:bg-white group-hover:shadow-md transition-all duration-500">
                                            <div className="text-[10px] uppercase text-gray-400 font-bold mb-2 tracking-widest">Risk Level</div>
                                            <div className={`text-2xl font-semibold tracking-tight ${risk === 'LOW' ? 'text-green-500' : 'text-accent'}`}>{risk}</div>
                                        </div>
                                        <div className="bg-gray-50/80 p-6 rounded-3xl border border-black/5 group-hover:bg-white group-hover:shadow-md transition-all duration-500">
                                            <div className="text-[10px] uppercase text-gray-400 font-bold mb-2 tracking-widest">Base Rate</div>
                                            <div className="text-2xl font-semibold text-gray-900 tracking-tight">{interest}%</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Neural Advisor */}
                            <motion.div variants={cardReveal} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
                                <div className="bg-white border border-black/5 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.03)] rounded-[40px] p-8 space-y-6 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[50px] pointer-events-none rounded-full" />
                                    <div className="flex justify-between items-center relative z-10 px-2">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center border border-black/5 shadow-sm">
                                                <Brain className="w-6 h-6 text-accent" />
                                            </div>
                                            <h3 className="font-semibold text-2xl text-gray-900 tracking-tight">Neural Advisor</h3>
                                        </div>
                                        <Bot className="w-6 h-6 text-accent animate-pulse" />
                                    </div>

                                    <div className="space-y-4 relative z-10 w-full">
                                        {/* Explanation Box */}
                                        <div className="bg-gray-50/50 border border-black/5 rounded-[24px] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md">
                                            <div className="p-4 flex justify-between items-center bg-white border-b border-black/5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-blue-50/50 flex items-center justify-center">
                                                        <Zap className="w-5 h-5 text-blue-500" />
                                                    </div>
                                                    <span className="font-bold text-gray-900">Score Analysis</span>
                                                </div>
                                                <button onClick={handleAIExplain} disabled={explainLoading} className="bg-white border border-black/10 hover:border-accent hover:shadow-md text-[10px] font-bold uppercase tracking-[0.2em] px-5 py-3 rounded-2xl transition-all text-gray-700 disabled:opacity-50 min-w-[100px] flex justify-center items-center">
                                                    {explainLoading ? <Loader2 className="w-4 h-4 animate-spin text-accent" /> : 'Explain'}
                                                </button>
                                            </div>
                                            <AnimatePresence>
                                                {aiExplanation && (
                                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                                                        <div className="p-6 bg-gray-50/80 max-h-[500px] overflow-y-auto custom-scrollbar border-t border-black/5 text-[14px]">
                                                            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.6 }} className="prose prose-sm max-w-none text-gray-700 prose-p:text-gray-700 prose-li:text-gray-700 prose-p:leading-loose prose-headings:text-accent prose-strong:text-gray-900 prose-strong:font-bold prose-headings:font-semibold">
                                                                <ReactMarkdown>{aiExplanation.ai_explanation}</ReactMarkdown>
                                                            </motion.div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Advice Box */}
                                        <div className="bg-gray-50/50 border border-black/5 rounded-[24px] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md">
                                            <div className="p-4 flex justify-between items-center bg-white border-b border-black/5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-orange-50/50 flex items-center justify-center">
                                                        <Sparkles className="w-5 h-5 text-orange-500" />
                                                    </div>
                                                    <span className="font-bold text-gray-900">Credit Strategy</span>
                                                </div>
                                                <button onClick={handleAIAdvice} disabled={adviceLoading} className="bg-white border border-black/10 hover:border-accent hover:shadow-md text-[10px] font-bold uppercase tracking-[0.2em] px-5 py-3 rounded-2xl transition-all text-gray-700 disabled:opacity-50 min-w-[100px] flex justify-center items-center">
                                                    {adviceLoading ? <Loader2 className="w-4 h-4 animate-spin text-accent" /> : 'Optimize'}
                                                </button>
                                            </div>
                                            <AnimatePresence>
                                                {loanAdvice && (
                                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                                                        <div className="p-6 bg-gray-50/80 max-h-[500px] overflow-y-auto custom-scrollbar border-t border-black/5 text-[14px]">
                                                            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.6 }} className="prose prose-sm max-w-none text-gray-700 prose-p:text-gray-700 prose-li:text-gray-700 prose-p:leading-loose prose-headings:text-accent prose-strong:text-gray-900 prose-strong:font-bold prose-headings:font-semibold">
                                                                <ReactMarkdown>{loanAdvice.loan_advice}</ReactMarkdown>
                                                            </motion.div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* RIGHT: Financial Actions (8/12) */}
                        <div className="lg:col-span-8 space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Borrow Card */}
                                <motion.div variants={cardReveal} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="h-full">
                                    <div className="bg-white border border-black/5 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.03)] rounded-[40px] p-10 flex flex-col justify-between h-full min-h-[480px] relative overflow-hidden group hover:shadow-[0_30px_100px_-20px_rgba(0,0,0,0.06)] transition-all duration-700">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[80px] pointer-events-none rounded-full" />
                                        <div className="space-y-12 w-full relative z-10">
                                            <div className="flex justify-between items-center">
                                                <h3 className="text-3xl font-semibold text-gray-900 tracking-tight flex items-center gap-3">
                                                    <ArrowUpRight className="text-accent w-8 h-8" /> Borrow
                                                </h3>
                                                <div className="text-[11px] uppercase font-bold text-gray-500 tracking-widest bg-gray-50 px-4 py-2 rounded-full border border-black/5">Max: {maxLoan} ETH</div>
                                            </div>

                                            <div className="space-y-8">
                                                <div className="bg-gray-50 border border-transparent p-8 rounded-[32px] relative focus-within:border-accent/30 focus-within:bg-white focus-within:shadow-xl transition-all duration-500">
                                                    <span className="absolute top-6 left-8 text-[11px] uppercase font-bold text-gray-400 tracking-[0.2em]">ETH Amount</span>
                                                    <input
                                                        type="number"
                                                        className="bg-transparent text-5xl md:text-6xl font-semibold w-full outline-none pt-8 text-gray-900 selection:bg-accent/20 placeholder:text-gray-300 tracking-tighter"
                                                        value={borrowAmount || ''}
                                                        onChange={(e) => setBorrowAmount(Math.min(e.target.valueAsNumber || 0, maxLoan))}
                                                        placeholder="0.00"
                                                    />
                                                    <div className="mt-8">
                                                        <input
                                                            type="range"
                                                            min="0" max={maxLoan} step="0.01"
                                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
                                                            value={borrowAmount}
                                                            onChange={(e) => setBorrowAmount(e.target.valueAsNumber)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-10 relative z-10">
                                            <PrimaryButton
                                                onClick={handleBorrow}
                                                disabled={borrowAmount <= 0 || !eligibility?.eligible || isBorrowing}
                                                className="w-full !py-6 text-sm uppercase tracking-[0.2em] font-bold shadow-xl shadow-accent/20"
                                            >
                                                {isBorrowing ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : 'Confirm Protocol Loan'}
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Repay Card */}
                                <motion.div variants={cardReveal} initial="hidden" animate="visible" transition={{ delay: 0.3 }} className="h-full">
                                    <div className="bg-white border border-black/5 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.03)] rounded-[40px] p-10 flex flex-col justify-between h-full min-h-[480px] relative overflow-hidden group hover:shadow-[0_30px_100px_-20px_rgba(0,0,0,0.06)] transition-all duration-700">
                                        <div className="space-y-12 w-full relative z-10">
                                            <div className="flex justify-between items-center">
                                                <h3 className="text-3xl font-semibold text-gray-900 tracking-tight flex items-center gap-3">
                                                    <ArrowDownLeft className="text-gray-400 w-8 h-8" /> Obligations
                                                </h3>
                                                <div className={`text-[11px] uppercase font-bold tracking-widest px-4 py-2 rounded-full border ${loanStatus?.active ? 'text-accent border-accent/20 bg-accent/5 animate-pulse' : 'text-gray-500 border-black/5 bg-gray-50'}`}>
                                                    {loanStatus?.active ? 'Debt Detected' : 'Clearance 100%'}
                                                </div>
                                            </div>

                                            {!loanStatus?.active ? (
                                                <div className="flex-1 flex flex-col items-center justify-center py-24">
                                                    <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center border border-black/5">
                                                        <ShieldCheck className="w-10 h-10 text-gray-300" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="bg-gray-50 border border-black/5 p-8 rounded-[32px] space-y-8">
                                                    <div className="flex justify-between items-center border-b border-black/5 pb-5">
                                                        <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Principal</span>
                                                        <span className="text-2xl font-semibold text-gray-900">{loanAmountEth.toFixed(4)} ETH</span>
                                                    </div>
                                                    <div className="flex justify-between items-center border-b border-black/5 pb-5">
                                                        <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Accrued Interest</span>
                                                        <span className="text-2xl font-semibold text-accent">+{(repaymentAmount - loanAmountEth).toFixed(5)}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center pt-2">
                                                        <span className="text-gray-900 font-bold uppercase text-xs tracking-[0.2em]">Total Settle</span>
                                                        <span className="text-4xl lg:text-5xl font-semibold tracking-tighter text-gray-900">{repaymentAmount.toFixed(4)}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {loanStatus?.active && (
                                            <div className="pt-10 relative z-10">
                                                <SecondaryButton
                                                    onClick={handleRepay}
                                                    disabled={isRepaying}
                                                    className="w-full !py-6 text-sm uppercase tracking-[0.2em] font-bold !bg-gray-900 !text-white hover:!bg-black hover:shadow-xl"
                                                >
                                                    {isRepaying ? <Loader2 className="w-6 h-6 animate-spin mx-auto text-white" /> : 'Settle On-Chain'}
                                                </SecondaryButton>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Portfolio Metrics Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    { t: 'Utilization rate', v: loanStatus?.active ? '85%' : '0%', icon: Target },
                                    { t: 'Safety Tier', v: 'Level 2/5', icon: ShieldCheck },
                                    { t: 'Personalized APR', v: interest + '%', icon: TrendingUp }
                                ].map((m, i) => (
                                    <motion.div key={i} variants={cardReveal} initial="hidden" animate="visible" transition={{ delay: 0.4 + (i * 0.1) }}>
                                        <div className="bg-white border border-black/5 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.03)] p-8 rounded-[32px] flex items-center gap-6 group hover:-translate-y-1 transition-transform duration-500 cursor-default">
                                            <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-black/5 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:shadow-md">
                                                <m.icon className="w-7 h-7 text-gray-400 group-hover:text-accent transition-colors" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-2">{m.t}</div>
                                                <div className="text-3xl font-semibold text-gray-900 tracking-tight group-hover:text-accent transition-colors">{m.v}</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

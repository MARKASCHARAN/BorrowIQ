'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function LandingPage() {
  const [activeStep, setActiveStep] = useState(1);

  // Auto-rotate the capabilities feature tab every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev === 3 ? 1 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const keyCapabilities = [
    {
      id: 1,
      name: "AI CREDIT\nSCORING",
      title: "AI CREDIT SCORING",
      items: ["BorrowIQ analyzes blockchain activity", "Generates a dynamic credit score", "Representing borrower reliability."],
      image: "/premium_photo-1733317429945-a3688f50430b.avif"
    },
    {
      id: 2,
      name: "DYNAMIC\nRATES",
      title: "DYNAMIC INTEREST RATES",
      items: ["Loan interest rates automatically adjust", "Based on borrower risk", "Adapts to protocol liquidity conditions."],
      image: "/pexels-pixabay-210607.jpg"
    },
    {
      id: 3,
      name: "CAPITAL\nEFFICIENT",
      title: "CAPITAL EFFICIENT LENDING",
      items: ["Access loans with lower collateral", "Build persistent on-chain credit history", "Improve future borrowing terms."],
      image: "/pexels-davidmcbee-730564.jpg"
    },
  ];

  return (
    <div className="relative min-h-screen bg-white text-black font-sans overflow-x-hidden">

      {/* --- HERO SECTION (DARK MODE) --- */}
      {/* Background Planet (Simplified as a big gradient sphere) */}
      <div className="absolute right-[-20%] top-[10%] w-[1000px] h-[1000px] xl:w-[1300px] xl:h-[1300px] rounded-full pointer-events-none z-0 flex items-center justify-center">
        {/* Massive orange sphere with red/dark gradient */}
        <div
          className="absolute inset-0 rounded-full mix-blend-multiply opacity-90 shadow-[0_0_150px_rgba(255,77,45,0.4)]"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #FF6A3D 0%, #a2301c 40%, #000000 80%, transparent 100%)',
            boxShadow: '-40px -40px 100px rgba(0,0,0,0.8) inset',
            filter: 'blur(20px)'
          }}
        />
        <div className="absolute inset-0 rounded-full border border-black/5 opacity-50 shadow-[inset_0_0_80px_rgba(255,77,45,0.2)]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen bg-white/40 backdrop-blur-sm lg:backdrop-blur-none lg:bg-transparent">
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 pt-32 pb-16">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#FF4D2D]/30 bg-[#FF4D2D]/10 text-[#FF4D2D] font-mono text-[10px] sm:text-[11px] font-bold tracking-widest uppercase mb-6 max-w-fit lg:mt-12">
            <span className="w-2 h-2 rounded-full bg-[#FF4D2D] animate-pulse" />
            BUIDL CTC Hackathon: BUIDL For The Real World
          </div>

          <h1 className="text-[56px] md:text-[80px] leading-[1.05] font-semibold tracking-tight max-w-2xl mb-8 text-black">
            On-Chain Credit<br />That Understands Risk
          </h1>
          <p className="text-[14px] text-black/70 max-w-md mb-12 leading-relaxed">
            BorrowIQ introduces AI-driven credit scoring for DeFi on the <strong className="text-black">Creditcoin Network</strong>. Instead of requiring heavy collateral, BorrowIQ analyzes on-chain activity to determine borrower trust and dynamically price loan risk.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/dashboard" className="inline-flex h-[56px] w-[200px] bg-black text-white hover:opacity-90 transition-opacity rounded-sm overflow-hidden">
              <div className="flex-1 flex items-center justify-center font-mono text-[13px] uppercase tracking-widest font-bold">
                LAUNCH APP
              </div>
              <div className="w-[56px] h-full bg-[#FF4D2D] flex items-center justify-center text-black">
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
            <Link href="/resources" className="inline-flex h-[56px] px-8 border border-black/20 text-black hover:bg-black/5 transition-all rounded-sm items-center justify-center font-mono text-[13px] uppercase tracking-widest font-bold">
              VIEW DOCUMENTATION
            </Link>
          </div>
        </div>

        <div className="w-full border-t border-black/10 mt-12 lg:mt-auto" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-white/40 backdrop-blur-md relative z-10">
          <div className="p-8 lg:p-12 border-b lg:border-b-0 md:border-r border-black/10 flex flex-col justify-center hover:bg-black/5 transition-colors">
            <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF4D2D] mb-3">Legacy Scoring Lag</h3>
            <p className="text-4xl lg:text-5xl font-semibold text-black mb-3">30 Days</p>
            <p className="text-[12px] text-black/50 leading-relaxed max-w-[220px]">Time for traditional bureaus to update vs our 24ms real-time AI inference.</p>
          </div>

          <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-black/10 flex flex-col justify-center hover:bg-black/5 transition-colors">
            <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF4D2D] mb-3">DeFi Collateral Avg</h3>
            <p className="text-4xl lg:text-5xl font-semibold text-black mb-3">150%+</p>
            <p className="text-[12px] text-black/50 leading-relaxed max-w-[220px]">Current over-collateralization locking up capital and preventing true lending.</p>
          </div>

          <div className="p-8 lg:p-12 border-b md:border-b-0 md:border-r border-black/10 flex flex-col justify-center hover:bg-black/5 transition-colors">
            <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF4D2D] mb-3">Global Credit Gap</h3>
            <p className="text-4xl lg:text-5xl font-semibold text-black mb-3">$5.2T</p>
            <p className="text-[12px] text-black/50 leading-relaxed max-w-[220px]">World Bank estimated SME financing shortfall due to lack of verifiable credit.</p>
          </div>

          <div className="p-8 lg:p-12 flex flex-col justify-center hover:bg-black/5 transition-colors">
            <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF4D2D] mb-4">Core Architecture Stack</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-[#FF4D2D]/10 border border-[#FF4D2D] text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF4D2D] shadow-[0_0_15px_rgba(255,77,45,0.3)] rounded-sm transition-colors">Creditcoin</span>
              <span className="px-3 py-1.5 bg-black/5 border border-black/10 text-[10px] font-mono font-bold uppercase tracking-widest text-black/80 rounded-sm hover:border-[#FF4D2D] transition-colors">FastAPI</span>
              <span className="px-3 py-1.5 bg-black/5 border border-black/10 text-[10px] font-mono font-bold uppercase tracking-widest text-black/80 rounded-sm hover:border-[#FF4D2D] transition-colors">Next.js</span>
              <span className="px-3 py-1.5 bg-black/5 border border-black/10 text-[10px] font-mono font-bold uppercase tracking-widest text-black/80 rounded-sm hover:border-[#FF4D2D] transition-colors">Solidity</span>
              <span className="px-3 py-1.5 bg-black/5 border border-black/10 text-[10px] font-mono font-bold uppercase tracking-widest text-black/80 rounded-sm hover:border-[#FF4D2D] transition-colors">Python AI</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- THE PROBLEM & SOLUTION (HACKATHON FOCUS) --- */}
      <section className="w-full relative z-10 px-8 md:px-16 py-32 bg-black text-white border-y border-white/10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Problem */}
          <div className="bg-[#0a0a0a] p-10 lg:p-16 border border-white/5 hover:border-[#FF4D2D]/30 transition-colors group">
            <h3 className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#FF4D2D] mb-6">01. The Problem</h3>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-8 text-white leading-tight">
              DeFi lending is<br />fundamentally broken.
            </h2>
            <div className="space-y-4 font-mono text-[13px] text-white/70 mb-12 leading-relaxed">
              <p>In today's ecosystem, lending is entirely over-collateralized. Users must lock assets worth more than the loan they want.</p>
              <p>Capital is incredibly inefficient. Millions of users lack true financial access because there is no system to measure real creditworthiness or reputation.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-auto">
              <div className="bg-black p-6 border border-white/5">
                <div className="text-3xl font-bold text-[#FF4D2D] mb-2">0%</div>
                <div className="text-[10px] font-mono tracking-widest uppercase text-white/50">Risk-based pricing</div>
              </div>
              <div className="bg-black p-6 border border-white/5">
                <div className="text-3xl font-bold text-[#FF4D2D] mb-2">&gt;150%</div>
                <div className="text-[10px] font-mono tracking-widest uppercase text-white/50">Collateral needed</div>
              </div>
            </div>
          </div>

          {/* Solution */}
          <div className="bg-white p-10 lg:p-16 text-black transition-colors border-2 border-transparent hover:border-[#FF4D2D]/30 relative overflow-hidden">
            {/* Subtle red ambiance in the white box */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF4D2D] rounded-full blur-[120px] opacity-20 pointer-events-none" />

            <div className="relative z-10">
              <h3 className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#FF4D2D] mb-6">02. The Solution</h3>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-8 text-black leading-tight">
                AI-Driven Credit<br />Intelligence.
              </h2>
              <div className="space-y-4 font-mono text-[13px] text-black/70 mb-12 leading-relaxed">
                <p>BorrowIQ builds an AI-driven credit system that analyzes real blockchain activity to determine borrower trustworthiness.</p>
                <p>Better on-chain credit history means lower interest rates, unlocking a capital-efficient lending network through smart contracts.</p>
              </div>

              <ul className="space-y-4 font-mono text-[11px] text-black/60 uppercase tracking-widest">
                <li className="flex items-center gap-4"><div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> Analyze Wallet Behavior Engine</li>
                <li className="flex items-center gap-4"><div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> Generate Dynamic Credit Score</li>
                <li className="flex items-center gap-4"><div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> Calculate Risk-based Interest Rates</li>
                <li className="flex items-center gap-4"><div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> Issue Loans via Smart Contracts</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* --- 02. Explainable AI Credit Intelligence (DARK MODE) --- */}
      <section className="w-full relative z-10 px-8 md:px-16 py-32 bg-white text-black">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">

          <div className="space-y-6 lg:order-1 order-2 max-w-md">
            <div className="w-12 h-8 bg-[#FF4D2D] text-black font-mono font-bold flex items-center justify-center text-[11px] rounded-sm">02.</div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter leading-[1.1] text-black">
              Explainable AI<br />Credit Intelligence
            </h2>
            <p className="text-[14px] text-black/60 leading-relaxed space-y-4">
              BorrowIQ combines machine learning with blockchain analytics to evaluate borrower trust. Each wallet receives a dynamic credit score that updates over time based on multiple signals.
            </p>
            <ul className="text-[12px] font-mono font-bold text-black/40 uppercase tracking-widest space-y-2 pt-4">
              <li>• Wallet Age</li>
              <li>• Transaction Activity</li>
              <li>• DeFi Protocol Usage</li>
              <li>• Loan Repayment History</li>
              <li>• Liquidation Events</li>
            </ul>
          </div>

          <div className="lg:order-2 order-1 relative h-[380px]">
            {/* The hovering glass window */}
            <div
              className="absolute left-0 top-0 w-full sm:w-[120%] lg:-left-20 bg-black/5 border border-black/10 backdrop-blur-md rounded-lg shadow-[0_0_80px_rgba(255,77,45,0.1)] z-10 overflow-hidden"
            >
              <div className="flex justify-between items-center bg-white/40 border-b border-black/10 px-6 py-4">
                <span className="text-[11px] text-black/50 font-mono tracking-widest uppercase">BorrowIQ Inference Engine</span>
                <span className="text-[11px] text-black/50 font-mono tracking-widest">24ms inference</span>
              </div>
              <pre className="text-[11px] font-mono text-black/70 p-6 overflow-x-auto space-y-2 leading-relaxed">
                <code className="text-black/40">{"{"}</code><br />
                <code>  <span className="text-[#29B5E8]">"wallet_age"</span>: <span className="text-black/50">"2.3 years"</span>,</code><br />
                <code>  <span className="text-[#29B5E8]">"defi_transactions"</span>: <span className="text-[#10B981]">120</span>,</code><br />
                <code>  <span className="text-[#29B5E8]">"liquidation_history"</span>: <span className="text-[#FF4D2D]">"None"</span>,</code><br />
                <code>  <span className="text-[#29B5E8]">"repayment_behavior"</span>: <span className="text-black/50">"Strong"</span>,</code><br />
                <br />
                <code className="text-black/20">  // Final Evaluated Output</code><br />
                <code className="text-black/90">  <span className="text-[#FF4D2D]">"dynamic_credit_score"</span>: <span className="text-[#10B981]">72</span>,</code><br />
                <code>  <span className="text-[#29B5E8]">"risk_tier"</span>: <span className="text-black/50">"Low Risk (Silver)"</span></code><br />
                <code className="text-black/40">{"}"}</code><br />
              </pre>
              <div className="absolute right-6 bottom-6 flex justify-end">
                <span className="text-[10px] font-bold uppercase text-[#FF4D2D] font-mono flex items-center gap-2 tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF4D2D] animate-pulse" /> SCORING...
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- 03. Transparent Credit Decisions (LIGHT MODE OVERLAY) --- */}
      <section className="w-full relative z-10 px-8 md:px-16 py-32 bg-[#0a0a0a] text-white border-y border-white/5">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-end mb-16">
          <div className="space-y-6">
            <div className="w-12 h-8 bg-[#FF4D2D] text-black font-mono font-bold flex items-center justify-center text-[11px] rounded-sm">03.</div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter leading-[1.1] text-white mb-4">
              Transparent Credit<br />Decisions
            </h2>
            <p className="text-[14px] text-white/60 leading-relaxed max-w-sm">
              BorrowIQ includes an AI explanation layer that shows exactly why a wallet received a specific credit score.
            </p>
          </div>
          <div></div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-black border border-white/10 rounded-sm p-10 hover:border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[#017CEE] font-bold italic text-2xl opacity-80">AI</span>
              <h3 className="font-mono text-[13px] font-bold text-white tracking-widest uppercase">Visible Risk Metrics</h3>
            </div>
            <p className="font-mono text-[11px] text-white/60 mb-16 leading-relaxed">
              Users can clearly see breakdown metrics derived directly from the blockchain state.
            </p>
            <ul className="space-y-2 font-mono text-[11px] text-white/60 uppercase tracking-widest">
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> Credit Score Reasoning</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> Computed Risk Level</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> Safe Borrowing Suggestions</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> Recommended Limits</li>
            </ul>
          </div>

          <div className="bg-black border border-white/10 rounded-sm p-10 hover:border-white/20 hover:shadow-xl transition-all duration-300 flex flex-col justify-center">
            <p className="font-mono text-[14px] text-white/90 mb-6 leading-relaxed bg-[#FF4D2D]/10 p-6 rounded border border-[#FF4D2D]/20">
              "Your credit score is <strong className="text-[#10B981] text-lg">72</strong>."
            </p>
            <div className="space-y-4 font-mono text-[11px] text-white/60">
              <div className="uppercase tracking-widest text-[#FF4D2D] mb-4 text-[10px] font-bold">Reasons identified:</div>
              <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-white/20" /> Wallet age length: 2.3 years</div>
              <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-white/20" /> Consistent: 120 DeFi interactions</div>
              <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> Risk averted: No liquidation history</div>
              <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> Financial health: Strong repayment behavior</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Key Protocol Capabilities (DARK MODE) --- */}
      <section className="w-full relative z-10 px-8 md:px-16 py-32 bg-white text-black">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-4 text-black">Key Protocol</h2>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-16 text-[#FF4D2D]">Capabilities</h2>

        <div className="flex flex-col lg:flex-row w-full h-[800px] lg:h-[600px] gap-4 md:gap-6 mt-12">
          {keyCapabilities.map((step) => (
            <div
              key={step.id}
              className="relative flex-1 lg:hover:flex-[3] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-2xl overflow-hidden group border border-black/10 shadow-lg cursor-pointer"
              onClick={() => setActiveStep(step.id)}
            >
              {/* Background Image */}
              <img
                src={step.image}
                alt={step.title}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 
                  ${activeStep === step.id ? 'opacity-100 scale-105 blur-none' : 'opacity-60 blur-[2px] lg:group-hover:opacity-100 lg:group-hover:scale-105 lg:group-hover:blur-none'}`}
              />
              {/* Dark Gradient Overlay for Text Visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-90 transition-opacity duration-700" />

              {/* Content Container */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end h-full">
                {/* Always visible title layer */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center font-mono text-[11px] md:text-[13px] font-bold backdrop-blur-md transition-colors
                    ${activeStep === step.id ? 'border-[#FF4D2D] text-[#FF4D2D] bg-[#FF4D2D]/10' : 'border-white/30 text-white lg:group-hover:border-[#FF4D2D] lg:group-hover:text-[#FF4D2D]'}`}>
                    0{step.id}
                  </div>
                  <h3 className="font-mono font-bold uppercase tracking-widest text-white text-sm md:text-lg drop-shadow-lg whitespace-nowrap">
                    {step.title}
                  </h3>
                </div>

                {/* Expandable Bullet Points */}
                <div className={`overflow-hidden transition-all duration-700 ease-in-out
                  ${activeStep === step.id ? 'lg:max-h-56 max-h-56 opacity-100 translate-y-0' : 'lg:max-h-0 max-h-0 opacity-0 translate-y-4 lg:group-hover:max-h-56 lg:group-hover:opacity-100 lg:group-hover:translate-y-0'}`}>
                  <ul className="text-white/80 font-mono text-[11px] md:text-[13px] space-y-3 leading-relaxed mt-4 pr-4">
                    {step.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-[#10B981] mr-3 text-xs mt-0.5">▶</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>



      {/* --- Secure Smart Contract Architecture (DARK & RED SPLIT) --- */}
      <section className="w-full grid grid-cols-1 lg:grid-cols-2">

        <div className="bg-[#FF4D2D] p-12 md:p-24 flex flex-col justify-between min-h-[600px] text-white">
          <div>
            <div className="flex justify-between items-start">
              <h2 className="text-4xl md:text-[52px] font-mono font-medium tracking-tight mb-8 max-w-md leading-[1.1]">Secure Smart<br />Contract Architecture</h2>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-2">
                <ShieldCheck className="w-6 h-6 text-[#FF4D2D]" />
              </div>
            </div>
            <p className="font-mono text-[13px] font-medium leading-relaxed max-w-sm mt-4">
              BorrowIQ uses audited smart contracts to manage lending pools, loan issuance, and repayments.
            </p>
            <p className="font-mono text-[13px] font-medium leading-relaxed max-w-sm mt-6">
              All credit scoring occurs off-chain through the AI engine, while financial settlement occurs fully on-chain.
            </p>
          </div>

          <div className="mt-24 space-y-10 font-mono">
            <div>
              <h4 className="font-bold tracking-widest uppercase mb-1 text-[13px]">LENDING POOLS</h4>
              <p className="text-[11px] opacity-80 uppercase tracking-widest mt-2 bg-white/10 inline-block px-3 py-1 rounded-sm border border-white/20">LendingPool.sol</p>
            </div>
            <div>
              <h4 className="font-bold tracking-widest uppercase mb-1 text-[13px]">LOAN MANAGEMENT</h4>
              <p className="text-[11px] opacity-80 uppercase tracking-widest mt-2 bg-white/10 inline-block px-3 py-1 rounded-sm border border-white/20">LoanManager.sol</p>
            </div>
            <div>
              <h4 className="font-bold tracking-widest uppercase mb-1 text-[13px]">USER REGISTRY</h4>
              <p className="text-[11px] opacity-80 uppercase tracking-widest mt-2 bg-white/10 inline-block px-3 py-1 rounded-sm border border-white/20">CreditScoreRegistry.sol</p>
            </div>
            <div>
              <h4 className="font-bold tracking-widest uppercase mb-1 text-[13px]">YIELD CURVES</h4>
              <p className="text-[11px] opacity-80 uppercase tracking-widest mt-2 bg-white/10 inline-block px-3 py-1 rounded-sm border border-white/20">InterestRateModel.sol</p>
            </div>
          </div>
        </div>

        <div className="bg-[#050505] min-h-[400px] lg:min-h-full relative overflow-hidden flex items-center justify-center">
          <img src="/traxer-Aa98wCc8Xlc-unsplash.jpg" alt="Secure Smart Contract Architecture" className="absolute inset-0 w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-[#FF4D2D]/10 pointer-events-none mix-blend-overlay" />
        </div>

      </section>

    </div>
  );
}

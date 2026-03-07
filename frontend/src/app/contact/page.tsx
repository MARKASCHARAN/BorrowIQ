'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import {
    Github, Mail, Twitter, Linkedin,
    Send, MessageCircle, Sparkles, Globe
} from 'lucide-react';
import Section from '@/components/ui/Section';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function ContactPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Initial Header Reveals
        tl.fromTo('.badge-reveal',
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.8 }
        )
            .fromTo('.title-reveal span',
                { opacity: 0, y: 100 },
                { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: 'power4.out' },
                "-=0.6"
            )
            .fromTo('.subtitle-reveal',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1 },
                "-=0.8"
            );

        // Staggered Card Reveals with ScrollTrigger
        gsap.fromTo('.contact-card',
            { opacity: 0, y: 50, filter: 'blur(10px)' },
            {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.cards-container',
                    start: 'top 85%',
                }
            }
        );

        // Map Section Reveal
        gsap.fromTo('.map-section',
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.map-section',
                    start: 'top 90%',
                }
            }
        );

        // Ambient background slow pan
        gsap.to('.ambient-blob-1', {
            y: 300,
            x: -200,
            duration: 20,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        gsap.to('.ambient-blob-2', {
            y: -200,
            x: 200,
            duration: 25,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="min-h-screen pt-40 pb-40 px-6 relative overflow-hidden bg-[#FAFAFA] text-gray-900 font-sans selection:bg-accent selection:text-white">
            {/* Ambient Background Lights */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[150vh] pointer-events-none z-0 overflow-hidden">
                <div className="ambient-blob-1 absolute -top-[10%] right-[-10%] w-[800px] h-[800px] bg-accent/5 blur-[150px] rounded-full" />
                <div className="ambient-blob-2 absolute top-[40%] left-[-20%] w-[1000px] h-[1000px] bg-blue-500/5 blur-[180px] rounded-full" />
            </div>

            <div className="max-w-[1400px] mx-auto space-y-32 relative z-10 w-full">
                {/* Header Section */}
                <Section className="!py-0 text-center space-y-10">
                    <div className="badge-reveal inline-flex items-center gap-2 px-6 py-3 bg-white border border-black/5 shadow-sm rounded-full text-[11px] font-bold text-gray-500 uppercase tracking-[0.3em] opacity-0">
                        <MessageCircle className="w-4 h-4 text-accent" />
                        Direct Channel
                    </div>

                    <h1 className="title-reveal text-6xl md:text-8xl lg:text-[110px] font-semibold tracking-tighter leading-[0.9] text-gray-900 overflow-hidden py-2 inline-flex flex-col relative">
                        <span>Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">Touch</span></span>
                    </h1>

                    <p className="subtitle-reveal text-xl md:text-3xl text-gray-500 max-w-4xl mx-auto leading-relaxed tracking-tight font-light opacity-0">
                        Whether you're exploring institutional partnerships or developer integrations,
                        our core team is here to escalate your on-chain potential.
                    </p>
                </Section>

                {/* Cards Container */}
                <div className="cards-container grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                    {[
                        { icon: Globe, label: 'Portfolio', value: 'markasaicharan.dev', href: 'https://www.markasaicharan.dev/', delay: 0 },
                        { icon: Twitter, label: 'Twitter / X', value: '@charan_mar68075', href: 'https://x.com/charan_mar68075', delay: 0.1 },
                        { icon: Github, label: 'GitHub', value: 'MARKASCHARAN', href: 'https://github.com/MARKASCHARAN', delay: 0.2 },
                        { icon: Linkedin, label: 'LinkedIn', value: 'Marka Sai Charan', href: 'https://www.linkedin.com/in/marka-sai-charan-0a4a9727a/', delay: 0.3 }
                    ].map((item, i) => (
                        <a
                            key={i}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block contact-card opacity-0"
                        >
                            <div className="p-12 md:p-16 group flex flex-col items-center justify-center text-center space-y-8 bg-white border border-black/5 shadow-sm hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.05)] transition-all duration-700 relative overflow-hidden h-full rounded-[48px] hover:-translate-y-2">
                                <div className="absolute top-0 right-0 w-44 h-44 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-accent/5 blur-[60px] pointer-events-none rounded-full" />

                                <div className="w-24 h-24 rounded-[2.5rem] bg-gray-50 border border-black/5 flex items-center justify-center group-hover:bg-white group-hover:scale-110 group-hover:shadow-2xl transition-all duration-700 relative z-10">
                                    <item.icon className="w-10 h-10 text-gray-400 group-hover:text-accent transition-colors duration-500" />
                                </div>

                                <div className="space-y-3 relative z-10">
                                    <div className="text-[12px] font-black uppercase tracking-[0.4em] text-accent">{item.label}</div>
                                    <div className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight group-hover:text-accent transition-colors duration-500">{item.value}</div>
                                </div>

                                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-accent transition-colors duration-500 pt-4 relative z-10">
                                    <Send className="w-4 h-4" /> Connect Now
                                </div>
                            </div>
                        </a>
                    ))}
                </div>


            </div>
        </div>
    );
}

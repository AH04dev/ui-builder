'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Star, Download, Layers } from 'lucide-react';
import { useRef } from 'react';
import Link from 'next/link';
import ColorBends from './ColorBends';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

    return (
        <section
            ref={containerRef}
            className="mesh-gradient"
            style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}
        >
            {/* Dot Grid */}
            <div className="dot-grid" style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.5,
                pointerEvents: 'none'
            }} />

            {/* ColorBends Background */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '1080px',
                height: '1080px',
                zIndex: 0,
            }}>
                <ColorBends
                    rotation={45}
                    speed={0.2}
                    colors={["#5227FF", "#FF9FFC", "#7cff67"]}
                    transparent
                    autoRotate={0}
                    scale={1}
                    frequency={1}
                    warpStrength={1}
                    mouseInfluence={1}
                    parallax={0.5}
                    noise={0.1}
                />
            </div>

            <motion.div
                style={{
                    maxWidth: '1000px',
                    margin: '0 auto',
                    padding: '120px 20px 80px',
                    position: 'relative',
                    zIndex: 10,
                    textAlign: 'center',
                    opacity,
                    scale,
                    pointerEvents: 'none',
                    width: '100%',
                }}
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <motion.div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '8px 18px',
                            borderRadius: '100px',
                            background: 'rgba(16, 185, 129, 0.08)',
                            border: '1px solid rgba(16, 185, 129, 0.2)',
                            marginBottom: '32px',
                            pointerEvents: 'auto'
                        }}
                        whileHover={{
                            borderColor: 'rgba(16, 185, 129, 0.35)',
                            background: 'rgba(16, 185, 129, 0.12)'
                        }}
                    >
                        <motion.span
                            style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #10B981, #06B6D4)'
                            }}
                            animate={{ opacity: [1, 0.4, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span style={{ fontSize: '13px', color: '#34D399', fontWeight: 500 }}>
                            v2.0 — Now with React Native & Flutter
                        </span>
                    </motion.div>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display"
                    style={{
                        fontSize: 'clamp(36px, 9vw, 82px)',
                        fontWeight: 700,
                        lineHeight: 1.05,
                        marginBottom: '28px',
                        letterSpacing: '-0.04em',
                    }}
                >
                    <span style={{ color: '#F0F0F5' }}>Build beautiful</span>
                    <br />
                    <span className="text-gradient">mobile interfaces</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        fontSize: 'clamp(14px, 4vw, 18px)',
                        color: '#6B7280',
                        maxWidth: '560px',
                        margin: '0 auto 48px',
                        lineHeight: 1.8,
                        padding: '0 16px',
                    }}
                >
                    An open-source collection of premium animated components
                    for building world-class mobile applications.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '16px',
                        pointerEvents: 'auto',
                        padding: '0 16px',
                        marginBottom: '56px',
                    }}
                >
                    <motion.button
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
                            color: '#FFFFFF',
                            padding: '16px 32px',
                            borderRadius: '14px',
                            fontSize: '15px',
                            fontWeight: 600,
                            border: 'none',
                            cursor: 'pointer',
                        }}
                        whileHover={{
                            scale: 1.02,
                            boxShadow: '0 0 50px rgba(16, 185, 129, 0.35)'
                        }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                        Browse Components
                        <ArrowRight style={{ width: '18px', height: '18px' }} />
                    </motion.button>
                    <Link href="/sandbox">
                        <motion.button
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                background: 'rgba(16, 185, 129, 0.08)',
                                color: '#F0F0F5',
                                padding: '16px 32px',
                                borderRadius: '14px',
                                fontSize: '15px',
                                fontWeight: 600,
                                border: '1px solid rgba(16, 185, 129, 0.2)',
                                cursor: 'pointer',
                            }}
                            whileHover={{
                                background: 'rgba(16, 185, 129, 0.12)',
                                borderColor: 'rgba(16, 185, 129, 0.35)'
                            }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        >
                            <Play style={{ width: '16px', height: '16px', fill: 'currentColor' }} />
                            Try Sandbox
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        display: 'inline-flex',
                        gap: '32px',
                        padding: '16px 32px',
                        borderRadius: '100px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        pointerEvents: 'auto',
                    }}
                >
                    {[
                        { icon: Star, label: '2.4k Stars', color: '#F59E0B' },
                        { icon: Download, label: '50k+ Downloads', color: '#10B981' },
                        { icon: Layers, label: '150+ Components', color: '#06B6D4' },
                    ].map((stat) => (
                        <div key={stat.label} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '13px',
                            color: '#9CA3AF',
                            fontWeight: 500,
                        }}>
                            <stat.icon size={14} style={{ color: stat.color }} />
                            <span>{stat.label}</span>
                        </div>
                    ))}
                </motion.div>

            </motion.div>

            {/* Bottom Gradient Line */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.2), transparent)'
            }} />
        </section>
    );
}

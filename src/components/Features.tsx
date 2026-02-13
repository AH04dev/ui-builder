'use client';

import { motion, Variants } from 'framer-motion';
import {
    Layers,
    Zap,
    Palette,
    Gauge,
    Smartphone,
    Code2
} from 'lucide-react';

const features = [
    {
        icon: Layers,
        title: '100+ Components',
        description: 'Beautifully crafted UI components ready for production.',
        color: '#10B981',
        span: false,
    },
    {
        icon: Zap,
        title: '50+ Animations',
        description: 'Smooth micro-interactions and stunning transitions.',
        color: '#06B6D4',
        span: false,
    },
    {
        icon: Palette,
        title: 'Customizable',
        description: 'Easy to customize colors, sizes, and behaviors.',
        color: '#F59E0B',
        span: false,
    },
    {
        icon: Gauge,
        title: '60fps Performance',
        description: 'Optimized for smooth, native-like experience.',
        color: '#10B981',
        span: false,
    },
    {
        icon: Smartphone,
        title: 'Cross Platform',
        description: 'Works on React Native & Flutter seamlessly.',
        color: '#06B6D4',
        span: false,
    },
    {
        icon: Code2,
        title: 'TypeScript',
        description: 'Full type safety and amazing DX.',
        color: '#22D3EE',
        span: false,
    }
];

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
};

const item: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    show: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
};

export default function Features() {
    return (
        <section
            id="features"
            style={{
                padding: '120px 0',
                position: 'relative',
                background: '#050505'
            }}
        >
            <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ textAlign: 'center', marginBottom: '80px' }}
                >
                    <motion.span
                        style={{
                            display: 'inline-block',
                            padding: '8px 16px',
                            borderRadius: '100px',
                            background: 'rgba(16, 185, 129, 0.08)',
                            border: '1px solid rgba(16, 185, 129, 0.2)',
                            fontSize: '13px',
                            color: '#34D399',
                            fontWeight: 500,
                            marginBottom: '24px',
                        }}
                    >
                        ✦ Features
                    </motion.span>
                    <h2 className="font-display" style={{
                        fontSize: 'clamp(36px, 5vw, 54px)',
                        fontWeight: 700,
                        marginBottom: '20px',
                        color: '#F0F0F5',
                        letterSpacing: '-0.03em'
                    }}>
                        Everything you need
                    </h2>
                    <p style={{
                        fontSize: '17px',
                        color: '#6B7280',
                        maxWidth: '480px',
                        margin: '0 auto',
                        lineHeight: 1.7
                    }}>
                        A complete toolkit for building world-class mobile applications with ease.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '16px'
                    }}
                >
                    {features.map((feature) => (
                        <motion.div
                            key={feature.title}
                            variants={item}
                            whileHover={{
                                y: -4,
                                borderColor: `${feature.color}33`,
                            }}
                            style={{
                                padding: '32px',
                                borderRadius: '24px',
                                background: 'linear-gradient(145deg, rgba(17, 17, 24, 0.7), rgba(10, 10, 15, 0.85))',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                cursor: 'pointer',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            {/* Hover glow */}
                            <div style={{
                                position: 'absolute',
                                top: '-20px',
                                left: '-20px',
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                background: feature.color,
                                opacity: 0.06,
                                filter: 'blur(40px)',
                                pointerEvents: 'none',
                            }} />

                            <motion.div
                                style={{
                                    width: '52px',
                                    height: '52px',
                                    borderRadius: '14px',
                                    background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)`,
                                    border: `1px solid ${feature.color}30`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '24px',
                                    position: 'relative',
                                }}
                                whileHover={{ scale: 1.05, rotate: 5 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            >
                                <feature.icon style={{ width: '26px', height: '26px', color: feature.color }} />
                            </motion.div>
                            <h3 style={{
                                fontSize: '18px',
                                fontWeight: 600,
                                color: '#F0F0F5',
                                marginBottom: '10px',
                                letterSpacing: '-0.01em'
                            }}>{feature.title}</h3>
                            <p style={{
                                fontSize: '14px',
                                color: '#6B7280',
                                lineHeight: 1.6
                            }}>{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

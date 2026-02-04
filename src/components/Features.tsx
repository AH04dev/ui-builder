'use client';

import { motion } from 'framer-motion';
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
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
        icon: Zap,
        title: '50+ Animations',
        description: 'Smooth micro-interactions and stunning transitions.',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
        icon: Palette,
        title: 'Customizable',
        description: 'Easy to customize colors, sizes, and behaviors.',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
        icon: Gauge,
        title: '60fps Performance',
        description: 'Optimized for smooth, native-like experience.',
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
        icon: Smartphone,
        title: 'Cross Platform',
        description: 'Works on React Native & Flutter seamlessly.',
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
        icon: Code2,
        title: 'TypeScript',
        description: 'Full type safety and amazing DX.',
        gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
};

const item = {
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
                background: '#09090B'
            }}
        >
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
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
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            fontSize: '13px',
                            color: '#A1A1AA',
                            fontWeight: 500,
                            marginBottom: '24px',
                        }}
                    >
                        ✦ Features
                    </motion.span>
                    <h2 style={{
                        fontSize: 'clamp(36px, 5vw, 54px)',
                        fontWeight: 700,
                        marginBottom: '20px',
                        color: '#FAFAFA',
                        letterSpacing: '-0.03em'
                    }}>
                        Everything you need
                    </h2>
                    <p style={{
                        fontSize: '17px',
                        color: '#71717A',
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
                        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                        gap: '16px'
                    }}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            variants={item}
                            whileHover={{
                                y: -4,
                                borderColor: 'rgba(255, 255, 255, 0.12)'
                            }}
                            style={{
                                padding: '32px',
                                borderRadius: '24px',
                                background: 'linear-gradient(145deg, rgba(24, 24, 27, 0.6), rgba(15, 15, 18, 0.8))',
                                border: '1px solid rgba(255, 255, 255, 0.06)',
                                cursor: 'pointer',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                        >
                            <motion.div
                                style={{
                                    width: '52px',
                                    height: '52px',
                                    borderRadius: '14px',
                                    background: feature.gradient,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '24px',
                                    boxShadow: `0 8px 32px ${feature.gradient.includes('#667eea') ? 'rgba(102, 126, 234, 0.3)' : 'rgba(0, 0, 0, 0.3)'}`
                                }}
                                whileHover={{ scale: 1.05, rotate: 5 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            >
                                <feature.icon style={{ width: '26px', height: '26px', color: 'white' }} />
                            </motion.div>
                            <h3 style={{
                                fontSize: '18px',
                                fontWeight: 600,
                                color: '#FAFAFA',
                                marginBottom: '10px',
                                letterSpacing: '-0.01em'
                            }}>{feature.title}</h3>
                            <p style={{
                                fontSize: '14px',
                                color: '#71717A',
                                lineHeight: 1.6
                            }}>{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

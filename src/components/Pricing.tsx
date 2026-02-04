'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles, Zap } from 'lucide-react';

const plans = [
    {
        name: 'Free',
        price: '$0',
        period: 'forever',
        description: 'Perfect for side projects',
        features: ['20+ Core Components', '10 Basic Animations', 'React Native Support', 'Community Support'],
        popular: false,
        gradient: 'transparent'
    },
    {
        name: 'Pro',
        price: '$49',
        period: 'one-time',
        description: 'Everything for professionals',
        features: ['100+ Premium Components', '50+ Smooth Animations', 'React Native + Flutter', 'TypeScript Definitions', 'Priority Support', 'Lifetime Updates'],
        popular: true,
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
        name: 'Enterprise',
        price: '$199',
        period: 'per seat/year',
        description: 'For teams and organizations',
        features: ['Everything in Pro', 'Custom Branding', 'Private Slack', 'Custom Components', 'SLA Guarantee'],
        popular: false,
        gradient: 'transparent'
    },
];

export default function Pricing() {
    return (
        <section
            id="pricing"
            className="mesh-gradient"
            style={{
                padding: '120px 0',
                position: 'relative',
            }}
        >
            <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />

            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ textAlign: 'center', marginBottom: '64px' }}
                >
                    <motion.span
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
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
                        <Zap size={14} />
                        Pricing
                    </motion.span>
                    <h2 style={{
                        fontSize: 'clamp(36px, 5vw, 54px)',
                        fontWeight: 700,
                        marginBottom: '20px',
                        color: '#FAFAFA',
                        letterSpacing: '-0.03em'
                    }}>
                        Simple, transparent pricing
                    </h2>
                    <p style={{
                        fontSize: '17px',
                        color: '#71717A',
                        maxWidth: '460px',
                        margin: '0 auto',
                        lineHeight: 1.7
                    }}>
                        No subscriptions, no hidden fees. Pay once, use forever.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '20px',
                    alignItems: 'stretch'
                }}>
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{
                                y: -6,
                                borderColor: plan.popular ? 'rgba(102, 126, 234, 0.4)' : 'rgba(255, 255, 255, 0.12)'
                            }}
                            style={{
                                position: 'relative',
                                padding: plan.popular ? '2px' : '0',
                                borderRadius: '28px',
                                background: plan.popular ? plan.gradient : 'transparent',
                            }}
                        >
                            <div style={{
                                height: '100%',
                                padding: '32px',
                                borderRadius: plan.popular ? '26px' : '28px',
                                background: 'linear-gradient(145deg, rgba(24, 24, 27, 0.95), rgba(15, 15, 18, 0.98))',
                                border: plan.popular ? 'none' : '1px solid rgba(255, 255, 255, 0.06)',
                            }}>
                                {/* Popular Badge */}
                                {plan.popular && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                            padding: '6px 14px',
                                            borderRadius: '100px',
                                            fontSize: '12px',
                                            fontWeight: 600,
                                            color: 'white',
                                            marginBottom: '20px',
                                            boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)'
                                        }}
                                    >
                                        <Sparkles size={12} />
                                        Most Popular
                                    </motion.div>
                                )}

                                {/* Plan Info */}
                                <div style={{ marginBottom: '24px' }}>
                                    <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#FAFAFA', marginBottom: '6px' }}>{plan.name}</h3>
                                    <p style={{ fontSize: '14px', color: '#71717A' }}>{plan.description}</p>
                                </div>

                                {/* Price */}
                                <div style={{ marginBottom: '28px' }}>
                                    <span style={{ fontSize: '48px', fontWeight: 700, color: '#FAFAFA', letterSpacing: '-0.03em' }}>{plan.price}</span>
                                    <span style={{ fontSize: '14px', color: '#71717A', marginLeft: '8px' }}>/{plan.period}</span>
                                </div>

                                {/* Features */}
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: '28px' }}>
                                    {plan.features.map((feature) => (
                                        <li
                                            key={feature}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                marginBottom: '14px'
                                            }}
                                        >
                                            <div style={{
                                                width: '20px',
                                                height: '20px',
                                                borderRadius: '50%',
                                                background: plan.popular ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255, 255, 255, 0.1)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0
                                            }}>
                                                <Check style={{ width: '12px', height: '12px', color: 'white' }} />
                                            </div>
                                            <span style={{ fontSize: '14px', color: '#A1A1AA' }}>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <motion.button
                                    style={{
                                        width: '100%',
                                        padding: '14px',
                                        borderRadius: '12px',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        background: plan.popular ? '#FAFAFA' : 'rgba(255, 255, 255, 0.05)',
                                        color: plan.popular ? '#09090B' : '#FAFAFA',
                                        boxShadow: plan.popular ? '0 0 30px rgba(255, 255, 255, 0.15)' : 'none'
                                    }}
                                    whileHover={{
                                        scale: 1.02,
                                        boxShadow: plan.popular ? '0 0 40px rgba(255, 255, 255, 0.25)' : 'none'
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                                >
                                    Get Started
                                    <ArrowRight size={16} />
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

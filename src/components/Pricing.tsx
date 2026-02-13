'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles, Zap } from 'lucide-react';

const plans = [
    {
        name: 'Free',
        price: '$0',
        period: 'forever',
        description: 'Perfect for getting started',
        features: ['50+ Components', 'Basic Animations', 'Community Support', 'React Native Only'],
        popular: false,
        gradient: 'transparent'
    },
    {
        name: 'Pro',
        price: '$49',
        period: 'lifetime',
        description: 'For professional developers',
        features: ['100+ Components', 'All Animations', 'Priority Support', 'React Native + Flutter', 'Figma Files'],
        popular: true,
        gradient: 'linear-gradient(135deg, #10B981, #06B6D4)'
    },
    {
        name: 'Team',
        price: '$149',
        period: 'lifetime',
        description: 'For teams and organizations',
        features: ['Everything in Pro', 'Custom Branding', 'Private Slack', 'Custom Components', 'SLA Guarantee'],
        popular: false,
        gradient: 'transparent'
    },
];

export default function Pricing() {
    return (
        <section id="pricing" style={{
            padding: '120px 0',
            position: 'relative',
            background: '#0A0A0F',
        }}>
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
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 16px',
                            borderRadius: '100px',
                            background: 'rgba(245, 158, 11, 0.08)',
                            border: '1px solid rgba(245, 158, 11, 0.2)',
                            fontSize: '13px',
                            color: '#F59E0B',
                            fontWeight: 500,
                            marginBottom: '24px',
                        }}
                    >
                        <Sparkles size={14} />
                        Pricing
                    </motion.span>
                    <h2 className="font-display" style={{
                        fontSize: 'clamp(36px, 5vw, 54px)',
                        fontWeight: 700,
                        marginBottom: '20px',
                        color: '#F0F0F5',
                        letterSpacing: '-0.03em'
                    }}>
                        Simple pricing
                    </h2>
                    <p style={{
                        fontSize: '17px',
                        color: '#6B7280',
                        maxWidth: '440px',
                        margin: '0 auto',
                        lineHeight: 1.7,
                    }}>
                        Pay once, build forever. No subscriptions.
                    </p>
                </motion.div>

                {/* Plans Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '20px',
                    maxWidth: '1000px',
                    margin: '0 auto',
                }}>
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            style={{
                                padding: plan.popular ? '3px' : '0',
                                borderRadius: '24px',
                                background: plan.popular ? 'linear-gradient(135deg, #10B981, #06B6D4)' : 'transparent',
                            }}
                        >
                            <div style={{
                                padding: '36px 32px',
                                borderRadius: plan.popular ? '22px' : '24px',
                                background: 'linear-gradient(145deg, rgba(17, 17, 24, 0.95), rgba(10, 10, 15, 0.98))',
                                border: plan.popular ? 'none' : '1px solid rgba(255, 255, 255, 0.05)',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                            }}>
                                {plan.popular && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '-12px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        background: 'linear-gradient(135deg, #10B981, #06B6D4)',
                                        padding: '6px 16px',
                                        borderRadius: '100px',
                                        fontSize: '11px',
                                        fontWeight: 600,
                                        color: '#FFFFFF',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px'
                                    }}>
                                        <Zap size={12} /> Most Popular
                                    </div>
                                )}

                                <h3 style={{
                                    fontSize: '18px',
                                    fontWeight: 600,
                                    color: '#F0F0F5',
                                    marginBottom: '8px'
                                }}>{plan.name}</h3>
                                <p style={{
                                    fontSize: '13px',
                                    color: '#6B7280',
                                    marginBottom: '24px'
                                }}>{plan.description}</p>

                                <div style={{ marginBottom: '32px' }}>
                                    <span className="font-display" style={{
                                        fontSize: '48px',
                                        fontWeight: 700,
                                        color: '#F0F0F5',
                                        letterSpacing: '-0.03em'
                                    }}>{plan.price}</span>
                                    <span style={{
                                        fontSize: '14px',
                                        color: '#6B7280',
                                        marginLeft: '4px'
                                    }}>/{plan.period}</span>
                                </div>

                                <div style={{ flex: 1, marginBottom: '32px' }}>
                                    {plan.features.map((feature) => (
                                        <div key={feature} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            marginBottom: '14px',
                                        }}>
                                            <Check size={16} style={{ color: '#10B981', flexShrink: 0 }} />
                                            <span style={{ fontSize: '14px', color: '#9CA3AF' }}>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <motion.button
                                    style={{
                                        width: '100%',
                                        padding: '14px',
                                        borderRadius: '14px',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        background: plan.popular
                                            ? 'linear-gradient(135deg, #10B981, #06B6D4)'
                                            : 'rgba(16, 185, 129, 0.08)',
                                        color: plan.popular ? '#FFFFFF' : '#10B981',
                                    }}
                                    whileHover={{
                                        scale: 1.02,
                                        boxShadow: plan.popular ? '0 0 40px rgba(16, 185, 129, 0.3)' : undefined,
                                    }}
                                    whileTap={{ scale: 0.98 }}
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

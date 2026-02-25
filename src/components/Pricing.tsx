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
    },
    {
        name: 'Pro',
        price: '$49',
        period: 'lifetime',
        description: 'For professional developers',
        features: ['100+ Components', 'All Animations', 'Priority Support', 'React Native + Flutter', 'Figma Files'],
        popular: true,
    },
    {
        name: 'Team',
        price: '$149',
        period: 'lifetime',
        description: 'For teams and organizations',
        features: ['Everything in Pro', 'Custom Branding', 'Private Slack', 'Custom Components', 'SLA Guarantee'],
        popular: false,
    },
];

export default function Pricing() {
    return (
        <section id="pricing" className="ui-section">
            <div className="ui-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-12 text-center"
                >
                    <span className="section-kicker">
                        <Sparkles size={13} />
                        Pricing
                    </span>
                    <h2 className="section-title mt-4">Simple pricing</h2>
                    <p className="section-subtitle mx-auto mt-4 max-w-md">
                        Pay once, build forever. No subscriptions.
                    </p>
                </motion.div>

                <div className="mx-auto grid max-w-[1000px] gap-5 md:grid-cols-3">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className={`relative rounded-3xl ${plan.popular
                                    ? 'bg-[linear-gradient(135deg,rgba(0,245,212,0.62),rgba(124,58,237,0.58),rgba(245,166,35,0.54))] p-[1px]'
                                    : ''
                                }`}
                        >
                            <div
                                className={`flex h-full flex-col rounded-3xl p-8 ${plan.popular
                                        ? 'glass-strong'
                                        : 'glass'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-[linear-gradient(135deg,var(--accent),var(--purple))] px-3 py-1 text-[11px] font-semibold text-[#04070f]">
                                        <Zap size={12} />
                                        Most Popular
                                    </div>
                                )}

                                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                                <p className="mt-1 text-sm text-[var(--text-muted)]">{plan.description}</p>

                                <div className="mt-6 mb-8">
                                    <span className="font-display text-5xl font-bold tracking-tight text-white">{plan.price}</span>
                                    <span className="ml-1 text-sm text-[var(--text-muted)]">/{plan.period}</span>
                                </div>

                                <div className="mb-8 flex-1 space-y-3.5">
                                    {plan.features.map((feature) => (
                                        <div key={feature} className="flex items-center gap-3">
                                            <Check size={16} className="shrink-0 text-[var(--accent)]" />
                                            <span className="text-sm text-[var(--text-dim)]">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <motion.button
                                    className={`w-full rounded-2xl py-3.5 text-sm font-semibold ${plan.popular
                                            ? 'btn-solid'
                                            : 'border border-white/8 bg-white/4 text-[var(--text)] hover:border-white/15 hover:bg-white/6'
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="inline-flex items-center gap-2">
                                        Get Started
                                        <ArrowRight size={15} />
                                    </span>
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

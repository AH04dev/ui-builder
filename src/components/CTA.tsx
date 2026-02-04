'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mail, Sparkles, Zap, Stars } from 'lucide-react';

export default function CTA() {
    return (
        <section
            style={{
                padding: '140px 0',
                position: 'relative',
                background: '#09090B',
                overflow: 'hidden'
            }}
        >
            {/* Gradient Line Top */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)'
            }} />

            {/* Background Glow */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '800px',
                height: '600px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(102, 126, 234, 0.08) 0%, transparent 60%)',
                filter: 'blur(80px)',
                pointerEvents: 'none'
            }} />

            <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ textAlign: 'center' }}
                >
                    {/* Icon */}
                    <motion.div
                        style={{
                            width: '72px',
                            height: '72px',
                            borderRadius: '24px',
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 36px',
                            boxShadow: '0 20px 60px rgba(102, 126, 234, 0.4)'
                        }}
                        animate={{
                            rotate: [0, 5, -5, 0],
                            scale: [1, 1.02, 1]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <Stars style={{ width: '36px', height: '36px', color: 'white' }} />
                    </motion.div>

                    {/* Heading */}
                    <h2 style={{
                        fontSize: 'clamp(36px, 7vw, 60px)',
                        fontWeight: 700,
                        marginBottom: '24px',
                        lineHeight: 1.1,
                        letterSpacing: '-0.04em'
                    }}>
                        <span style={{ color: '#FAFAFA' }}>Ready to build</span>
                        <br />
                        <span className="text-gradient">something amazing?</span>
                    </h2>
                    <p style={{
                        fontSize: '18px',
                        color: '#71717A',
                        marginBottom: '48px',
                        lineHeight: 1.8
                    }}>
                        Join 10,000+ developers building stunning mobile apps with MobileUI Pro.
                    </p>

                    {/* CTA Buttons */}
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '16px',
                        marginBottom: '72px'
                    }}>
                        <motion.button
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                background: '#FAFAFA',
                                color: '#09090B',
                                padding: '18px 36px',
                                borderRadius: '14px',
                                fontSize: '15px',
                                fontWeight: 600,
                                border: 'none',
                                cursor: 'pointer',
                            }}
                            whileHover={{
                                scale: 1.02,
                                boxShadow: '0 0 60px rgba(255, 255, 255, 0.3)'
                            }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        >
                            Get Started Free
                            <ArrowRight size={18} />
                        </motion.button>
                        <motion.button
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                background: 'rgba(255, 255, 255, 0.03)',
                                color: '#FAFAFA',
                                padding: '18px 36px',
                                borderRadius: '14px',
                                fontSize: '15px',
                                fontWeight: 600,
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                cursor: 'pointer',
                            }}
                            whileHover={{
                                background: 'rgba(255, 255, 255, 0.06)',
                                borderColor: 'rgba(255, 255, 255, 0.2)'
                            }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        >
                            View Documentation
                        </motion.button>
                    </div>

                    {/* Email Signup */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p style={{ fontSize: '14px', color: '#71717A', marginBottom: '20px' }}>
                            Or subscribe for updates and new components
                        </p>
                        <form style={{
                            display: 'flex',
                            gap: '12px',
                            maxWidth: '420px',
                            margin: '0 auto'
                        }}>
                            <div style={{ flex: 1, position: 'relative' }}>
                                <Mail style={{
                                    position: 'absolute',
                                    left: '18px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    width: '18px',
                                    height: '18px',
                                    color: '#71717A'
                                }} />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    style={{
                                        width: '100%',
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '12px',
                                        padding: '16px 18px 16px 50px',
                                        color: '#FAFAFA',
                                        fontSize: '14px',
                                        outline: 'none',
                                        transition: 'border-color 0.2s'
                                    }}
                                />
                            </div>
                            <motion.button
                                type="submit"
                                style={{
                                    padding: '16px 28px',
                                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                    color: 'white',
                                    borderRadius: '12px',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    border: 'none',
                                    cursor: 'pointer',
                                    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)'
                                }}
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow: '0 12px 40px rgba(102, 126, 234, 0.5)'
                                }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            >
                                Subscribe
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

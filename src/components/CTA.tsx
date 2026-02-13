'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function CTA() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setEmail('');
            }, 3000);
        }
    };

    return (
        <section style={{
            padding: '120px 0',
            position: 'relative',
            overflow: 'hidden',
            background: '#050505',
        }}>
            {/* Background Effects */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '800px',
                height: '600px',
                background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(16, 185, 129, 0.08), transparent)',
                pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute',
                top: '30%',
                right: '10%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(6, 182, 212, 0.06), transparent)',
                pointerEvents: 'none',
            }} />
            <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />

            <div style={{
                maxWidth: '700px',
                margin: '0 auto',
                padding: '0 24px',
                position: 'relative',
                zIndex: 10,
                textAlign: 'center',
            }}>
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
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
                        marginBottom: '32px',
                    }}
                >
                    🚀 Get Started
                </motion.div>

                {/* Heading */}
                <motion.h2
                    className="font-display"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        fontSize: 'clamp(36px, 5vw, 54px)',
                        fontWeight: 700,
                        marginBottom: '20px',
                        color: '#F0F0F5',
                        letterSpacing: '-0.03em',
                        lineHeight: 1.1,
                    }}
                >
                    Ready to build{' '}
                    <span className="text-shimmer">something amazing?</span>
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    style={{
                        fontSize: '17px',
                        color: '#6B7280',
                        marginBottom: '40px',
                        lineHeight: 1.7,
                    }}
                >
                    Join thousands of developers building world-class mobile applications.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '16px',
                        marginBottom: '48px',
                        flexWrap: 'wrap',
                        padding: '0 16px',
                    }}
                >
                    <motion.button
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: 'linear-gradient(135deg, #10B981, #06B6D4)',
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
                    >
                        Get Started Free
                        <ArrowRight size={18} />
                    </motion.button>

                    <motion.button
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: 'transparent',
                            color: '#F0F0F5',
                            padding: '16px 32px',
                            borderRadius: '14px',
                            fontSize: '15px',
                            fontWeight: 600,
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            cursor: 'pointer',
                        }}
                        whileHover={{
                            background: 'rgba(16, 185, 129, 0.05)',
                            borderColor: 'rgba(16, 185, 129, 0.25)'
                        }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <BookOpen size={18} />
                        View Documentation
                    </motion.button>
                </motion.div>

                {/* Email Signup */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <p style={{
                        fontSize: '13px',
                        color: '#6B7280',
                        marginBottom: '16px',
                    }}>
                        Stay updated with new components and features
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '12px',
                            maxWidth: '440px',
                            margin: '0 auto',
                        }}
                    >
                        <div style={{
                            flex: '1',
                            padding: '2px',
                            borderRadius: '12px',
                            background: submitted
                                ? 'linear-gradient(135deg, #10B981, #06B6D4)'
                                : 'rgba(255, 255, 255, 0.06)',
                            transition: 'all 0.3s',
                        }}>
                            <input
                                type="email"
                                placeholder={submitted ? 'Subscribed!' : 'Your email'}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={submitted}
                                style={{
                                    width: '100%',
                                    padding: '14px 20px',
                                    borderRadius: '10px',
                                    border: 'none',
                                    background: '#0A0A0F',
                                    color: submitted ? '#10B981' : '#F0F0F5',
                                    fontSize: '14px',
                                    outline: 'none',
                                }}
                            />
                        </div>
                        <motion.button
                            type="submit"
                            disabled={submitted}
                            style={{
                                padding: '14px 24px',
                                borderRadius: '12px',
                                background: submitted
                                    ? 'rgba(16, 185, 129, 0.2)'
                                    : 'linear-gradient(135deg, #10B981, #06B6D4)',
                                color: '#FFFFFF',
                                border: 'none',
                                cursor: submitted ? 'default' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '14px',
                                fontWeight: 600,
                            }}
                            whileHover={!submitted ? { scale: 1.02, boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)' } : {}}
                            whileTap={!submitted ? { scale: 0.98 } : {}}
                        >
                            {submitted ? <CheckCircle size={18} /> : <Send size={18} />}
                        </motion.button>
                    </form>
                </motion.div>
            </div>

            {/* Bottom gradient line */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.15), transparent)'
            }} />
        </section>
    );
}

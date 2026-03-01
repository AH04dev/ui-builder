'use client';

import { motion } from 'framer-motion';

const testimonials = [
    {
        name: 'Sarah Chen',
        role: 'Senior Mobile Developer at Spotify',
        content: 'MobileUI Pro has completely transformed our development workflow. The components are polished and the animations are buttery smooth.',
    },
    {
        name: 'Marcus Johnson',
        role: 'Lead Engineer at Airbnb',
        content: 'We switched from building everything from scratch. Our development velocity increased by 3x and our apps look amazing.',
    },
    {
        name: 'Emily Rodriguez',
        role: 'Freelance Developer',
        content: 'As a freelancer, time is money. MobileUI Pro lets me deliver beautiful apps to my clients in record time.',
    },
];

const logos = ['Spotify', 'Airbnb', 'Uber', 'Netflix', 'Stripe', 'Slack'];

export default function Testimonials() {
    return (
        <section
            style={{
                padding: '120px 0',
                position: 'relative',
                background: 'rgba(255,255,255,0.01)'
            }}
        >
            {/* Top line */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
            }} />

            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', marginBottom: '80px' }}
                >
                    <span style={{
                        fontSize: '13px',
                        color: '#52525b',
                        fontWeight: 500,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '16px'
                    }}>Testimonials</span>
                    <h2 style={{
                        fontSize: 'clamp(32px, 5vw, 48px)',
                        fontWeight: 600,
                        color: '#ffffff',
                        marginBottom: '20px',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.1
                    }}>
                        Loved by developers worldwide
                    </h2>
                    <p style={{
                        fontSize: '18px',
                        color: '#71717a',
                        maxWidth: '500px',
                        margin: '0 auto',
                        lineHeight: 1.7
                    }}>
                        Join thousands of developers building beautiful mobile apps faster.
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                    gap: '24px',
                    marginBottom: '80px'
                }}>
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            style={{
                                padding: '32px',
                                borderRadius: '16px',
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(255,255,255,0.06)'
                            }}
                        >
                            <p style={{
                                fontSize: '16px',
                                color: '#d4d4d8',
                                lineHeight: 1.7,
                                marginBottom: '24px'
                            }}>&ldquo;{testimonial.content}&rdquo;</p>
                            <div>
                                <div style={{ fontSize: '15px', fontWeight: 500, color: '#ffffff' }}>{testimonial.name}</div>
                                <div style={{ fontSize: '13px', color: '#52525b' }}>{testimonial.role}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Company Logos */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p style={{ textAlign: 'center', fontSize: '13px', color: '#52525b', marginBottom: '40px' }}>Trusted by developers at</p>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '48px'
                    }}>
                        {logos.map((logo) => (
                            <div
                                key={logo}
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 600,
                                    color: '#3f3f46'
                                }}
                            >
                                {logo}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Bottom line */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
            }} />
        </section>
    );
}

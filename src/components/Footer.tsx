'use client';

import { motion } from 'framer-motion';
import { Github, Twitter, Zap } from 'lucide-react';

const linkGroups = [
    {
        title: 'Product',
        links: [
            { name: 'Components', href: '/components' },
            { name: 'Animations', href: '/animations' },
            { name: 'Sandbox', href: '/sandbox' },
            { name: 'Pricing', href: '#' },
        ]
    },
    {
        title: 'Resources',
        links: [
            { name: 'Documentation', href: '#' },
            { name: 'Getting Started', href: '#' },
            { name: 'API Reference', href: '#' },
            { name: 'Examples', href: '#' },
        ]
    },
    {
        title: 'Company',
        links: [
            { name: 'About', href: '#' },
            { name: 'Blog', href: '#' },
            { name: 'Careers', href: '#' },
            { name: 'Contact', href: '#' },
        ]
    },
    {
        title: 'Legal',
        links: [
            { name: 'Privacy', href: '#' },
            { name: 'Terms', href: '#' },
            { name: 'License', href: '#' },
        ]
    }
];

const socials = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
];

export default function Footer() {
    return (
        <footer style={{
            padding: '80px 0 32px',
            background: '#050505',
            position: 'relative',
        }}>
            {/* Top border */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.15), transparent)'
            }} />

            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 24px',
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '48px',
                    marginBottom: '64px',
                }}>
                    {/* Brand Column */}
                    <div style={{ gridColumn: 'span 1' }}>
                        <motion.div
                            style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div style={{
                                width: '32px',
                                height: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '10px',
                                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(6, 182, 212, 0.25))'
                            }}>
                                <Zap size={18} color="#10B981" fill="currentColor" />
                            </div>
                            <span className="font-display" style={{
                                fontSize: '18px',
                                fontWeight: 700,
                                color: '#F0F0F5',
                                letterSpacing: '-0.02em'
                            }}>Native Bits</span>
                        </motion.div>
                        <p style={{
                            fontSize: '14px',
                            color: '#6B7280',
                            lineHeight: 1.6,
                            maxWidth: '200px',
                            marginBottom: '24px',
                        }}>
                            Premium UI components and animations for mobile apps.
                        </p>

                        {/* Social Icons */}
                        <div style={{ display: 'flex', gap: '12px' }}>
                            {socials.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'rgba(255, 255, 255, 0.04)',
                                        border: '1px solid rgba(255, 255, 255, 0.06)',
                                        color: '#9CA3AF',
                                        transition: 'all 0.3s',
                                    }}
                                    whileHover={{
                                        color: '#F0F0F5',
                                        background: 'rgba(16, 185, 129, 0.08)',
                                        borderColor: 'rgba(16, 185, 129, 0.2)',
                                    }}
                                >
                                    <social.icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {linkGroups.map((group) => (
                        <div key={group.title}>
                            <h4 style={{
                                fontSize: '13px',
                                fontWeight: 600,
                                color: '#6B7280',
                                textTransform: 'uppercase',
                                letterSpacing: '0.06em',
                                marginBottom: '20px',
                            }}>{group.title}</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {group.links.map((link) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        style={{
                                            color: '#9CA3AF',
                                            fontSize: '14px',
                                            textDecoration: 'none',
                                            transition: 'color 0.2s',
                                        }}
                                        whileHover={{ color: '#10B981', x: 3 }}
                                    >
                                        {link.name}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div style={{
                    paddingTop: '32px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                }}>
                    <span style={{ fontSize: '13px', color: '#6B7280' }}>
                        © {new Date().getFullYear()} Native Bits. All rights reserved.
                    </span>
                    <span style={{ fontSize: '13px', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Made with <span style={{ color: '#EF4444' }}>♥</span> for developers
                    </span>
                </div>
            </div>
        </footer>
    );
}

'use client';

import { motion } from 'framer-motion';
import { Sparkles, Github, Twitter, Heart, ArrowUpRight } from 'lucide-react';

const footerLinks = {
    Product: ['Components', 'Animations', 'Templates', 'Changelog'],
    Resources: ['Documentation', 'Tutorials', 'Blog', 'Examples'],
    Company: ['About', 'Contact', 'Support'],
    Legal: ['Privacy', 'Terms'],
};

export default function Footer() {
    return (
        <footer style={{
            background: 'linear-gradient(180deg, #09090B 0%, #0F0F12 100%)',
            borderTop: '1px solid rgba(255, 255, 255, 0.04)'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px 40px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: '48px',
                    marginBottom: '64px'
                }}>
                    {/* Brand */}
                    <div style={{ gridColumn: 'span 2' }}>
                        <motion.a
                            href="#"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '12px',
                                textDecoration: 'none',
                                marginBottom: '24px'
                            }}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        >
                            <motion.div
                                style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '14px',
                                    background: 'linear-gradient(135deg, #FAFAFA, #A1A1AA)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                whileHover={{ rotate: 5 }}
                            >
                                <Sparkles style={{ width: '22px', height: '22px', color: '#09090B' }} />
                            </motion.div>
                            <span style={{
                                fontSize: '22px',
                                fontWeight: 700,
                                color: '#FAFAFA',
                                letterSpacing: '-0.02em'
                            }}>MobileUI</span>
                        </motion.a>
                        <p style={{
                            fontSize: '14px',
                            color: '#71717A',
                            maxWidth: '280px',
                            lineHeight: 1.8,
                            marginBottom: '28px'
                        }}>
                            Beautiful, animated UI components for React Native and Flutter developers.
                        </p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <motion.a
                                href="#"
                                style={{
                                    width: '42px',
                                    height: '42px',
                                    borderRadius: '12px',
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#71717A',
                                    textDecoration: 'none'
                                }}
                                whileHover={{
                                    background: 'rgba(255, 255, 255, 0.06)',
                                    borderColor: 'rgba(255, 255, 255, 0.15)',
                                    color: '#FAFAFA'
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                <Github style={{ width: '18px', height: '18px' }} />
                            </motion.a>
                            <motion.a
                                href="#"
                                style={{
                                    width: '42px',
                                    height: '42px',
                                    borderRadius: '12px',
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#71717A',
                                    textDecoration: 'none'
                                }}
                                whileHover={{
                                    background: 'rgba(255, 255, 255, 0.06)',
                                    borderColor: 'rgba(255, 255, 255, 0.15)',
                                    color: '#FAFAFA'
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                <Twitter style={{ width: '18px', height: '18px' }} />
                            </motion.a>
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 style={{
                                fontSize: '13px',
                                fontWeight: 600,
                                color: '#FAFAFA',
                                marginBottom: '20px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em'
                            }}>{category}</h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {links.map((link) => (
                                    <li key={link} style={{ marginBottom: '12px' }}>
                                        <motion.a
                                            href="#"
                                            style={{
                                                fontSize: '14px',
                                                color: '#71717A',
                                                textDecoration: 'none',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }}
                                            whileHover={{ color: '#FAFAFA', x: 4 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {link}
                                        </motion.a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div style={{
                    paddingTop: '32px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px'
                }}>
                    <p style={{
                        fontSize: '13px',
                        color: '#71717A',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}>
                        Made with
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            <Heart style={{ width: '14px', height: '14px', color: '#f093fb', fill: '#f093fb' }} />
                        </motion.span>
                        by MobileUI Pro
                    </p>
                    <p style={{ fontSize: '13px', color: '#71717A' }}>
                        © 2024 MobileUI Pro. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

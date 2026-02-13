'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Star, ArrowUpRight, Zap, Heart } from 'lucide-react';

const navLinks = [
    { name: 'Components', href: '/components' },
    { name: 'Animations', href: '/animations' },
    { name: 'Sandbox', href: '/sandbox' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                pointerEvents: 'none',
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '20px',
            }}
        >
            <motion.div
                animate={{
                    borderColor: isScrolled
                        ? 'rgba(16, 185, 129, 0.15)'
                        : 'rgba(255, 255, 255, 0.06)',
                    background: isScrolled
                        ? 'rgba(5, 5, 5, 0.85)'
                        : 'rgba(5, 5, 5, 0.5)',
                }}
                transition={{ duration: 0.3 }}
                style={{
                    pointerEvents: 'auto',
                    width: 'calc(100% - 32px)',
                    maxWidth: '1000px',
                    padding: '8px 8px 8px 24px',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: isScrolled
                        ? '0 8px 40px -8px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(0,0,0,0.3), 0 0 60px rgba(16, 185, 129, 0.04)'
                        : '0 8px 32px -8px rgba(0, 0, 0, 0.5)',
                }}
            >
                {/* Logo */}
                <motion.a
                    href="/"
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <div style={{
                        position: 'relative',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, #10B981, #06B6D4)',
                            opacity: 0.25
                        }} />
                        <Zap size={18} color="#10B981" fill="currentColor" />
                    </div>
                    <span style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#F0F0F5',
                        letterSpacing: '-0.02em',
                        fontFamily: 'var(--font-display), sans-serif',
                    }}>Native Bits</span>
                </motion.a>

                {/* Desktop Nav */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', background: 'rgba(255,255,255,0.02)', padding: '4px', borderRadius: '100px' }} className="hidden md:flex">
                    {navLinks.map((link) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            style={{
                                color: '#9CA3AF',
                                textDecoration: 'none',
                                fontSize: '13px',
                                fontWeight: 500,
                                padding: '8px 16px',
                                borderRadius: '100px',
                                transition: 'all 0.2s',
                                position: 'relative'
                            }}
                            whileHover={{
                                color: '#F0F0F5',
                                background: 'rgba(16, 185, 129, 0.08)'
                            }}
                        >
                            {link.name}
                        </motion.a>
                    ))}
                </div>

                {/* Right Side: GitHub + Sponsor + CTA */}
                <div style={{ alignItems: 'center', gap: '12px' }} className="hidden md:flex">
                    <motion.a
                        href="#"
                        style={{
                            color: '#9CA3AF',
                            padding: '10px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'color 0.2s'
                        }}
                        whileHover={{ color: '#F0F0F5', background: 'rgba(255,255,255,0.05)' }}
                    >
                        <Github size={20} />
                    </motion.a>

                    <motion.button
                        style={{
                            background: 'rgba(245, 158, 11, 0.1)',
                            color: '#F59E0B',
                            padding: '10px 20px',
                            borderRadius: '100px',
                            fontSize: '13px',
                            fontWeight: 600,
                            border: '1px solid rgba(245, 158, 11, 0.2)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                        whileHover={{
                            scale: 1.05,
                            background: 'rgba(245, 158, 11, 0.15)',
                            boxShadow: '0 0 20px rgba(245, 158, 11, 0.15)'
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Heart size={14} fill="currentColor" />
                        Sponsor
                    </motion.button>

                    <motion.button
                        style={{
                            background: 'linear-gradient(135deg, #10B981, #06B6D4)',
                            color: '#FFFFFF',
                            padding: '10px 20px',
                            borderRadius: '100px',
                            fontSize: '13px',
                            fontWeight: 600,
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: '0 0 30px rgba(16, 185, 129, 0.35)'
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        Get Access
                        <ArrowUpRight size={14} />
                    </motion.button>
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: isMobileMenuOpen ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                        border: 'none',
                        color: '#F0F0F5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                    className="flex md:hidden"
                    whileTap={{ scale: 0.9 }}
                >
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.button>
            </motion.div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        style={{
                            position: 'absolute',
                            top: '80px',
                            left: '16px',
                            right: '16px',
                            padding: '20px',
                            background: 'rgba(10, 10, 15, 0.95)',
                            backdropFilter: 'blur(30px)',
                            border: '1px solid rgba(16, 185, 129, 0.1)',
                            borderRadius: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                            zIndex: 99,
                            pointerEvents: 'auto',
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(16, 185, 129, 0.05)'
                        }}
                        className="md:hidden"
                    >
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                style={{
                                    padding: '16px',
                                    borderRadius: '16px',
                                    background: 'rgba(16, 185, 129, 0.03)',
                                    color: '#9CA3AF',
                                    textDecoration: 'none',
                                    fontSize: '15px',
                                    fontWeight: 500,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                                <ArrowUpRight size={14} style={{ opacity: 0.5 }} />
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Github, Star, ArrowUpRight } from 'lucide-react';

const navLinks = [
    { name: 'Components', href: '#components' },
    { name: 'Animations', href: '#animations' },
    { name: 'Sandbox', href: '/sandbox' },
    { name: 'Pricing', href: '#pricing' },
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
                padding: '20px 0',
            }}
        >
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 24px',
            }}>
                <motion.div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: isScrolled ? '12px 24px' : '0',
                        background: isScrolled ? 'rgba(9, 9, 11, 0.8)' : 'transparent',
                        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
                        borderRadius: isScrolled ? '16px' : '0',
                        border: isScrolled ? '1px solid rgba(255, 255, 255, 0.06)' : 'none',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    {/* Logo */}
                    <motion.a
                        href="#"
                        style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                        <motion.div
                            style={{
                                width: '42px',
                                height: '42px',
                                borderRadius: '12px',
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

                    {/* Desktop Nav */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="hidden md:flex">
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * i, duration: 0.5 }}
                                style={{
                                    color: '#A1A1AA',
                                    textDecoration: 'none',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    padding: '10px 16px',
                                    borderRadius: '10px',
                                    transition: 'all 0.2s'
                                }}
                                whileHover={{
                                    color: '#FAFAFA',
                                    background: 'rgba(255, 255, 255, 0.05)'
                                }}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                    </div>

                    {/* CTA */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="hidden md:flex">
                        <motion.a
                            href="#"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                color: '#A1A1AA',
                                textDecoration: 'none',
                                fontSize: '14px',
                                padding: '10px 14px',
                                borderRadius: '10px',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                            }}
                            whileHover={{
                                color: '#FAFAFA',
                                borderColor: 'rgba(255, 255, 255, 0.15)',
                                background: 'rgba(255, 255, 255, 0.03)'
                            }}
                            transition={{ duration: 0.2 }}
                        >
                            <Github style={{ width: '16px', height: '16px' }} />
                            <Star style={{ width: '14px', height: '14px', fill: 'currentColor' }} />
                            <span style={{ fontWeight: 600 }}>2.5k</span>
                        </motion.a>
                        <motion.button
                            style={{
                                background: '#FAFAFA',
                                color: '#09090B',
                                padding: '10px 20px',
                                borderRadius: '10px',
                                fontSize: '14px',
                                fontWeight: 600,
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}
                            whileHover={{
                                scale: 1.02,
                                boxShadow: '0 0 30px rgba(255, 255, 255, 0.2)'
                            }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        >
                            Get Started
                            <ArrowUpRight style={{ width: '16px', height: '16px' }} />
                        </motion.button>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        style={{
                            display: 'none',
                            color: '#FAFAFA',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            padding: '10px'
                        }}
                        className="md:hidden flex"
                        whileTap={{ scale: 0.95 }}
                    >
                        {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </motion.button>
                </motion.div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: '20px',
                            right: '20px',
                            background: 'rgba(15, 15, 18, 0.98)',
                            backdropFilter: 'blur(40px)',
                            borderRadius: '20px',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            padding: '20px',
                            marginTop: '8px',
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
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
                                    display: 'block',
                                    color: '#A1A1AA',
                                    textDecoration: 'none',
                                    padding: '14px 16px',
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    borderRadius: '12px',
                                    marginBottom: '4px'
                                }}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            style={{
                                width: '100%',
                                marginTop: '12px',
                                background: '#FAFAFA',
                                color: '#09090B',
                                padding: '14px',
                                borderRadius: '12px',
                                fontSize: '14px',
                                fontWeight: 600,
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            Get Started
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

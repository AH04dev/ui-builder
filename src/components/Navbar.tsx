'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

const navItems = [
  { label: 'Components', href: '/components' },
  { label: 'Animations', href: '/animations' },
  { label: 'Docs', href: '/docs' },
  { label: 'Sandbox', href: '/sandbox' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 md:px-6"
      >
        <div
          className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border px-3 py-2.5 md:px-4"
          style={{
            borderColor: isScrolled ? 'rgba(255, 255, 255, 0.10)' : 'rgba(255, 255, 255, 0.06)',
            background: isScrolled ? 'rgba(8, 9, 14, 0.85)' : 'rgba(8, 9, 14, 0.60)',
            backdropFilter: 'blur(20px)',
            boxShadow: isScrolled
              ? '0 8px 32px rgba(0, 0, 0, 0.40)'
              : '0 4px 16px rgba(0, 0, 0, 0.20)',
          }}
        >
          <Link href="/" className="flex items-center">
            <BrandLogo textClassName="text-base md:text-lg" />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full px-3.5 py-1.5 text-sm font-medium text-[var(--text-dim)] transition hover:bg-white/5 hover:text-[var(--text)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/docs"
              className="btn-outline px-3.5 py-2 text-sm"
            >
              Install
            </Link>
            <Link
              href="/components"
              className="btn-solid px-3.5 py-2 text-sm"
            >
              Explore
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[var(--text-primary)] md:hidden"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed left-3 right-3 top-[78px] z-40 rounded-2xl border p-3 md:hidden"
            style={{
              background: 'rgba(11, 13, 20, 0.95)',
              borderColor: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 16px 48px rgba(0, 0, 0, 0.50)',
            }}
          >
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--text-dim)] transition hover:bg-white/5 hover:text-[var(--text)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

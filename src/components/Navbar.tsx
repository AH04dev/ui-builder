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
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 right-0 top-0 z-50 border-b border-white/8"
        style={{
          background: isScrolled ? 'rgba(6, 8, 16, 0.94)' : 'rgba(6, 8, 16, 0.72)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="ui-container flex h-[74px] items-center justify-between gap-4">
          <Link href="/" className="flex items-center">
            <BrandLogo textClassName="text-[1.6rem] md:text-[1.8rem]" />
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--text-muted)] transition hover:text-[var(--text)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link href="/docs" className="btn-outline px-3.5 py-2 text-xs">
              Install
            </Link>
            <Link href="/components" className="btn-solid px-3.5 py-2 text-xs">
              Explore
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/12 bg-white/5 text-[var(--text-primary)] md:hidden"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed left-0 right-0 top-[74px] z-40 border-b border-white/10 bg-[rgba(6,8,16,0.97)] p-4 backdrop-blur-xl md:hidden"
          >
            <div className="ui-container">
              <nav className="flex flex-col gap-1.5">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-md border border-transparent px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--text-dim)] transition hover:border-white/10 hover:bg-white/5 hover:text-[var(--text)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

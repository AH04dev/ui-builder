'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Globe } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

const groups = [
  {
    title: 'Library',
    links: [
      { label: 'Components', href: '/components' },
      { label: 'Animations', href: '/animations' },
      { label: 'Docs', href: '/docs' },
    ],
  },
  {
    title: 'Build',
    links: [
      { label: 'Sandbox', href: '/sandbox' },
      { label: 'Install', href: '/docs' },
      { label: 'Registry API', href: '/docs' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { label: 'React Native', href: '/components' },
      { label: 'Flutter', href: '/components' },
      { label: 'Motion Pack', href: '/animations' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="pb-10 pt-4">
      <div className="ui-container">
        <div className="glass rounded-3xl p-6 md:p-8">
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
            <div>
              <BrandLogo textClassName="text-lg text-white" />
              <p className="mt-3 max-w-xs text-sm leading-7 text-[var(--text-dim)]">
                Rebuilt mobile UI system with consistent React Native and Flutter implementations.
              </p>

              <div className="mt-4 flex items-center gap-2">
                <Link
                  href="https://github.com"
                  target="_blank"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/4 text-[var(--text-dim)] transition hover:border-white/15 hover:text-[var(--text)]"
                >
                  <Github size={15} />
                </Link>
                <Link
                  href="https://nativebits.dev"
                  target="_blank"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/4 text-[var(--text-dim)] transition hover:border-white/15 hover:text-[var(--text)]"
                >
                  <Globe size={15} />
                </Link>
              </div>
            </div>

            {groups.map((group, index) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.32, delay: index * 0.04 }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  {group.title}
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  {group.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-sm text-[var(--text-dim)] transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 border-t border-white/6 pt-4 text-xs text-[var(--text-muted)]">
            <p>Copyright {new Date().getFullYear()} native-bits. Rebuilt mobile UI experience.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

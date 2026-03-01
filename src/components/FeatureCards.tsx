'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Blocks, BookOpen, Sparkles, WandSparkles } from 'lucide-react';

const cards = [
  {
    title: 'Components',
    body: 'Production-ready UI building blocks for dashboards, forms, chat, and navigation.',
    href: '/components',
    icon: Blocks,
    color: '#00f5d4',
  },
  {
    title: 'Animations',
    body: 'Touch-friendly transitions, list staggering, counters, and gesture-driven effects.',
    href: '/animations',
    icon: WandSparkles,
    color: '#7c3aed',
  },
  {
    title: 'Documentation',
    body: 'Install commands, props tables, and direct source snippets for each item.',
    href: '/docs',
    icon: BookOpen,
    color: '#f5a623',
  },
];

export default function FeatureCards() {
  return (
    <section className="ui-section">
      <div className="ui-container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="mb-7"
        >
          <span className="section-kicker">
            <Sparkles size={13} />
            Explore
          </span>
          <h2 className="section-title mt-4">Everything you need in one workflow</h2>
          <p className="section-subtitle mt-4 max-w-3xl">
            Build layouts, apply motion, and ship with platform-specific snippets from the same
            source of truth.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {cards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <Link href={card.href} className="glass group block h-full rounded-3xl p-5 transition hover:border-white/12">
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className="inline-flex rounded-xl border p-2.5"
                    style={{
                      borderColor: `${card.color}30`,
                      background: `${card.color}12`,
                    }}
                  >
                    <card.icon size={18} color={card.color} />
                  </span>
                  <ArrowUpRight size={15} className="text-[var(--text-muted)] transition group-hover:text-[var(--text)]" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--text-dim)]">{card.body}</p>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}



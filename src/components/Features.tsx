'use client';

import { motion } from 'framer-motion';
import { Bolt, Brush, Fingerprint, Gauge, LayoutGrid, ShieldCheck } from 'lucide-react';

const items = [
  {
    title: 'Reusable architecture',
    text: 'Compose screens quickly with cards, toggles, inputs, and list primitives.',
    icon: LayoutGrid,
    color: '#00f5d4',
  },
  {
    title: 'Smooth interactions',
    text: 'Motion defaults are tuned for touch devices and low-jank transitions.',
    icon: Bolt,
    color: '#7c3aed',
  },
  {
    title: 'Gesture-aware',
    text: 'Swipe, drag, and dismiss patterns are included and production-safe.',
    icon: Fingerprint,
    color: '#f5a623',
  },
  {
    title: 'High readability',
    text: 'Visual hierarchy and spacing prioritize clarity on small screens.',
    icon: Brush,
    color: '#00f5d4',
  },
  {
    title: 'Performance targets',
    text: 'Examples are designed to hold 60fps on modern mobile hardware.',
    icon: Gauge,
    color: '#7c3aed',
  },
  {
    title: 'Shipping guardrails',
    text: 'Patterns include defaults for status states and accessibility basics.',
    icon: ShieldCheck,
    color: '#f5a623',
  },
];

export default function Features() {
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
          <span className="section-kicker">Why this rebuild</span>
          <h2 className="section-title mt-4">A complete UI foundation for mobile products</h2>
          <p className="section-subtitle mt-4 max-w-3xl">
            This rebuild focuses on practical quality: cleaner structure, stronger readability, and
            faster implementation paths.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.38, delay: index * 0.04 }}
              className="glass rounded-2xl p-4 transition hover:border-white/12 md:p-5"
            >
              <span
                className="mb-3 inline-flex rounded-xl border p-2.5"
                style={{
                  borderColor: `${item.color}30`,
                  background: `${item.color}12`,
                }}
              >
                <item.icon size={16} color={item.color} />
              </span>
              <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--text-dim)]">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}



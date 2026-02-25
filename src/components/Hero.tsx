'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Smartphone } from 'lucide-react';

const qualityPoints = ['Phone-first spacing', 'Accessible contrast', 'Cross-platform snippets'];
const kpis = [
  { label: 'Components', value: '12+' },
  { label: 'Animations', value: '12+' },
  { label: 'Dual API', value: 'RN + Flutter' },
  { label: 'Performance', value: '60fps ready' },
];

export default function Hero() {
  return (
    <section className="ui-section pt-28 md:pt-32">
      <div className="ui-container">
        <div className="grid min-h-[calc(100vh-110px)] items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="max-w-2xl"
          >
            <span className="section-kicker">
              <Smartphone size={13} />
              Mobile UI Toolkit
            </span>

            <h1 className="section-title mt-5">
              Build premium mobile UI
              <span className="text-gradient-cyan"> for React Native + Flutter</span>
            </h1>

            <p className="section-subtitle mt-5 max-w-xl">
              Complete redesign with cleaner spacing, stronger readability, and a richer set of
              reusable components and motion patterns for both ecosystems.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/components"
                className="btn-solid px-5 py-3 text-sm"
              >
                Browse Components
                <ArrowRight size={15} />
              </Link>

              <Link
                href="/animations"
                className="btn-outline px-5 py-3 text-sm"
              >
                Explore Animations
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {qualityPoints.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/4 px-3 py-1.5 text-xs text-[var(--text-dim)]"
                >
                  <CheckCircle2 size={13} color="var(--accent)" />
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {kpis.map((stat) => (
                <article key={stat.label} className="rounded-2xl border border-white/6 bg-white/3 p-3 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{stat.value}</p>
                  <p className="mt-0.5 text-xs text-[var(--text-muted)]">{stat.label}</p>
                </article>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto w-full max-w-[540px]"
          >
            <div className="glass-panel-strong rounded-3xl p-4 md:p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">Preview</p>
                  <p className="font-display text-2xl font-semibold text-white">Mobile Dashboard</p>
                </div>
                <span className="rounded-full border border-[var(--line-strong)] bg-[rgba(0,245,212,0.12)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">
                  Live
                </span>
              </div>

              <div className="rounded-2xl border border-white/6 bg-black/30 p-4">
                <p className="text-xs uppercase tracking-[0.08em] text-[var(--text-muted)]">Weekly active users</p>
                <div className="mt-2 flex items-end justify-between">
                  <p className="font-display text-4xl font-semibold text-white">184,320</p>
                  <p className="text-sm font-semibold text-[var(--accent)]">+12.3%</p>
                </div>
                <div className="mt-4 h-2 rounded-full bg-white/8">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '72%' }}
                    transition={{ duration: 1.1, delay: 0.2, ease: 'easeOut' }}
                    className="h-2 rounded-full"
                    style={{ background: 'linear-gradient(90deg, var(--accent) 0%, var(--purple) 100%)' }}
                  />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <article className="rounded-xl border border-white/6 bg-white/3 p-3">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-[var(--text-muted)]">Crash free</p>
                  <p className="mt-1 text-xl font-semibold text-white">99.94%</p>
                </article>
                <article className="rounded-xl border border-white/6 bg-white/3 p-3">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-[var(--text-muted)]">Frame time</p>
                  <p className="mt-1 text-xl font-semibold text-white">16.2ms</p>
                </article>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


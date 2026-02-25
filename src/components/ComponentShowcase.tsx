'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown, Copy, ExternalLink, Shapes } from 'lucide-react';
import { mobileComponents, Platform } from '@/lib/mobile-catalog';

function Preview({ slug, palette }: { slug: string; palette: [string, string] }) {
  const gradient = `linear-gradient(135deg, ${palette[0]} 0%, ${palette[1]} 100%)`;

  switch (slug) {
    case 'animated-button':
      return (
        <button
          className="rounded-xl px-5 py-2.5 text-sm font-semibold"
          style={{ background: gradient, color: '#04070f' }}
        >
          Continue
        </button>
      );
    case 'progress-ring':
      return (
        <div className="relative h-16 w-16">
          <svg width="64" height="64" className="-rotate-90">
            <circle cx="32" cy="32" r="24" stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="none" />
            <circle
              cx="32"
              cy="32"
              r="24"
              stroke={palette[0]}
              strokeWidth="6"
              fill="none"
              strokeDasharray="150"
              strokeDashoffset="42"
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">72%</span>
        </div>
      );
    case 'toggle-switch':
      return (
        <div className="rounded-full p-1" style={{ background: gradient }}>
          <motion.div
            className="h-6 w-6 rounded-full bg-white"
            animate={{ x: [0, 22, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      );
    default:
      return <div className="h-14 w-14 rounded-xl" style={{ background: gradient }} />;
  }
}

const categories = ['All', ...Array.from(new Set(mobileComponents.map((item) => item.category)))];

export default function ComponentShowcase({ previewOnly = false }: { previewOnly?: boolean }) {
  const [platform, setPlatform] = useState<Platform>('react-native');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const items = useMemo(() => {
    const filtered =
      selectedCategory === 'All'
        ? mobileComponents
        : mobileComponents.filter((item) => item.category === selectedCategory);

    return previewOnly ? filtered.slice(0, 6) : filtered;
  }, [previewOnly, selectedCategory]);

  const copySnippet = async (slug: string, snippet: string) => {
    await navigator.clipboard.writeText(snippet);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 1600);
  };

  return (
    <section className="ui-section" id="components">
      <div className="ui-container">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="section-kicker">
              <Shapes size={13} />
              Components
            </span>
            <h2 className="section-title mt-4">Production-ready mobile components</h2>
            <p className="section-subtitle mt-4 max-w-3xl">
              Expanded set of reusable blocks with matching React Native and Flutter snippets.
            </p>
          </div>

          {!previewOnly && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1 rounded-full border border-white/8 bg-white/4 p-1">
                {(['react-native', 'flutter'] as Platform[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setPlatform(option)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition ${platform === option
                        ? 'bg-[var(--accent)] text-[#04070f]'
                        : 'text-[var(--text-dim)] hover:text-[var(--text)]'
                      }`}
                  >
                    {option === 'react-native' ? 'React Native' : 'Flutter'}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] transition ${selectedCategory === category
                        ? 'border-[var(--line-strong)] bg-[rgba(0,245,212,0.12)] text-[var(--accent)]'
                        : 'border-white/8 bg-white/4 text-[var(--text-muted)] hover:text-[var(--text-dim)]'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => {
              const expanded = expandedSlug === item.slug;
              return (
                <motion.article
                  key={item.slug}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.38, delay: index * 0.03 }}
                  className="glass overflow-hidden rounded-3xl"
                >
                  <div className="flex min-h-[150px] items-center justify-center border-b border-white/6 bg-white/2 p-4">
                    <Preview slug={item.slug} palette={item.palette} />
                  </div>

                  <div className="p-4">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-xl font-semibold text-white">{item.name}</p>
                        <p className="text-xs uppercase tracking-[0.08em] text-[var(--text-muted)]">{item.category}</p>
                      </div>
                      <Link
                        href={`/docs/components/${item.slug}`}
                        className="inline-flex items-center gap-1 rounded-full border border-white/8 bg-white/4 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-dim)] transition hover:border-white/15 hover:text-[var(--text)]"
                      >
                        Docs
                        <ExternalLink size={11} />
                      </Link>
                    </div>

                    <p className="text-sm leading-7 text-[var(--text-dim)]">{item.summary}</p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span key={tag} className="pill">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {!previewOnly && (
                      <>
                        <button
                          type="button"
                          onClick={() => setExpandedSlug(expanded ? null : item.slug)}
                          className="mt-4 inline-flex items-center gap-1 rounded-full border border-white/8 bg-white/4 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-dim)] transition hover:border-white/15"
                        >
                          {expanded ? 'Hide code' : 'Show code'}
                          <motion.span animate={{ rotate: expanded ? 180 : 0 }}>
                            <ChevronDown size={12} />
                          </motion.span>
                        </button>

                        <AnimatePresence>
                          {expanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="code-shell mt-3 rounded-2xl p-3">
                                <div className="mb-2 flex items-center justify-between">
                                  <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                                    {platform === 'react-native' ? 'React Native' : 'Flutter'}
                                  </p>
                                  <button
                                    type="button"
                                    onClick={() => copySnippet(item.slug, item.code[platform])}
                                    className="inline-flex items-center gap-1 rounded-full border border-white/8 bg-white/4 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--text-dim)] transition hover:border-white/15"
                                  >
                                    {copiedSlug === item.slug ? <Check size={11} /> : <Copy size={11} />}
                                    {copiedSlug === item.slug ? 'Copied' : 'Copy'}
                                  </button>
                                </div>

                                <pre className="max-h-48 overflow-auto text-xs leading-6 text-slate-300">
                                  <code>{item.code[platform]}</code>
                                </pre>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}



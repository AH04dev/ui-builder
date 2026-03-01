'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown, Copy, ExternalLink, Sparkles } from 'lucide-react';
import { mobileAnimations, Platform } from '@/lib/mobile-catalog';

function MotionPreview({ slug, palette }: { slug: string; palette: [string, string] }) {
  const gradient = `linear-gradient(135deg, ${palette[0]} 0%, ${palette[1]} 100%)`;

  switch (slug) {
    case 'fade-in-up':
      return (
        <motion.div
          className="h-12 w-12 rounded-xl"
          style={{ background: gradient }}
          animate={{ opacity: [0, 1, 0], y: [14, 0, 14] }}
          transition={{ duration: 2.1, repeat: Infinity }}
        />
      );
    case 'bounce':
      return (
        <motion.div
          className="h-12 w-12 rounded-xl"
          style={{ background: gradient }}
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      );
    case 'shimmer':
      return (
        <div className="relative h-12 w-36 overflow-hidden rounded-xl border border-white/8 bg-white/4">
          <motion.div
            className="absolute inset-y-0 w-1/2"
            style={{ background: gradient }}
            animate={{ x: ['-100%', '140%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      );
    default:
      return <div className="h-12 w-12 rounded-xl" style={{ background: gradient }} />;
  }
}

const motionGroups = ['All', ...Array.from(new Set(mobileAnimations.map((item) => item.motionType)))];

export default function Animations({ previewOnly = false }: { previewOnly?: boolean }) {
  const [platform, setPlatform] = useState<Platform>('react-native');
  const [group, setGroup] = useState('All');
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const items = useMemo(() => {
    const filtered =
      group === 'All'
        ? mobileAnimations
        : mobileAnimations.filter((item) => item.motionType === group);

    return previewOnly ? filtered.slice(0, 6) : filtered;
  }, [group, previewOnly]);

  const copySnippet = async (slug: string, snippet: string) => {
    await navigator.clipboard.writeText(snippet);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 1600);
  };

  return (
    <section className="ui-section" id="animations">
      <div className="ui-container">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="section-kicker">
              <Sparkles size={13} />
              Motion
            </span>
            <h2 className="section-title mt-4">Animation presets for real products</h2>
            <p className="section-subtitle mt-4 max-w-3xl">
              Includes entrance, interactive, and gesture-driven effects mapped to both mobile
              frameworks.
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
                {motionGroups.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setGroup(item)}
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] transition ${group === item
                        ? 'border-[var(--line-strong)] bg-[rgba(0,245,212,0.12)] text-[var(--accent)]'
                        : 'border-white/8 bg-white/4 text-[var(--text-muted)] hover:text-[var(--text-dim)]'
                      }`}
                  >
                    {item}
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
                    <MotionPreview slug={item.slug} palette={item.palette} />
                  </div>

                  <div className="p-4">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-xl font-semibold text-white">{item.name}</p>
                        <p className="text-xs uppercase tracking-[0.08em] text-[var(--text-muted)]">{item.motionType}</p>
                      </div>
                      <Link
                        href={`/docs/animations/${item.slug}`}
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



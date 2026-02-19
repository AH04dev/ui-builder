'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  Copy,
  Layers,
  Sparkles,
  Terminal,
  TerminalSquare,
  Wand2,
} from 'lucide-react';
import { Footer, Navbar } from '@/components';
import { animations, components } from '@/registry';
import {
  DEFAULT_REGISTRY_URL_TEMPLATE,
  SHADCN_REGISTRY_NAMESPACE,
  shadcnRegistryCatalog,
} from '@/lib/shadcn-registry-catalog';

const installCommand = `npx shadcn@latest add ${SHADCN_REGISTRY_NAMESPACE}/animated-button`;

const steps = [
  {
    step: '01',
    title: 'Initialize shadcn/ui',
    code: 'npx shadcn@latest init',
  },
  {
    step: '02',
    title: 'Configure registry namespace',
    code: `// components.json
{
  "registries": {
    "${SHADCN_REGISTRY_NAMESPACE}": "${DEFAULT_REGISTRY_URL_TEMPLATE}"
  }
}`,
  },
  {
    step: '03',
    title: 'Install any component or animation',
    code: installCommand,
  },
];

// Separate blocks from component/animation items
const blocks = shadcnRegistryCatalog.filter((i) => i.type === 'registry:block');
const registryComponents = shadcnRegistryCatalog.filter(
  (i) => i.type === 'registry:component' && !i.categories?.includes('animation')
);
const registryAnimations = shadcnRegistryCatalog.filter(
  (i) => i.categories?.includes('animation')
);

export default function DocsPage() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'blocks' | 'components' | 'animations'>('all');

  const copyInstall = async () => {
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const filteredItems = useMemo(() => {
    if (activeTab === 'blocks') return blocks;
    if (activeTab === 'components') return registryComponents;
    if (activeTab === 'animations') return registryAnimations;
    return shadcnRegistryCatalog;
  }, [activeTab]);

  return (
    <main>
      <Navbar />

      <section className="ui-section pt-28">
        <div className="ui-container">
          {/* â”€â”€ Hero â”€â”€ */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="section-kicker">
              <TerminalSquare size={13} />
              Docs
            </span>
            <h1 className="section-title mt-4">
              Install any item with
              <span className="text-gradient-cyan"> one command</span>
            </h1>
            <p className="section-subtitle mt-4">
              {shadcnRegistryCatalog.length} registry items â€” blocks, components & animations â€”
              installable via the shadcn CLI.
            </p>

            <button
              type="button"
              onClick={copyInstall}
              className="code-shell mt-6 inline-flex items-center gap-3 rounded-2xl px-5 py-3 text-sm font-semibold text-slate-200"
            >
              <span className="text-[var(--text-muted)]">$</span>
              {installCommand}
              {copied ? (
                <Check size={14} color="#dff3ff" />
              ) : (
                <Copy size={14} color="#a7b4d4" />
              )}
            </button>
          </motion.div>

          {/* â”€â”€ Stats â”€â”€ */}
          <div className="mt-8 grid gap-4 md:grid-cols-5">
            {[
              { title: 'Registry items', value: shadcnRegistryCatalog.length },
              { title: 'Components', value: components.length },
              { title: 'Animations', value: animations.length },
              { title: 'Blocks', value: blocks.length },
              { title: 'Platforms', value: '2' },
            ].map((item) => (
              <article key={item.title} className="glass rounded-2xl p-4">
                <p className="text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  {item.title}
                </p>
                <p className="mt-2 font-display text-2xl font-semibold text-white">
                  {item.value}
                </p>
              </article>
            ))}
          </div>

          {/* â”€â”€ Getting started â”€â”€ */}
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {steps.map((item) => (
              <article key={item.step} className="glass rounded-2xl p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  Step {item.step}
                </p>
                <h2 className="font-display mt-2 text-xl font-semibold text-white">
                  {item.title}
                </h2>
                <pre className="code-shell mt-3 overflow-x-auto rounded-xl p-3 text-xs leading-6 text-slate-200">
                  <code>{item.code}</code>
                </pre>
              </article>
            ))}
          </div>

          {/* â”€â”€ Sandbox CTA â”€â”€ */}
          <Link
            href="/sandbox"
            className="glass group mt-8 flex items-center justify-between rounded-2xl p-5 transition hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/25 to-sky-500/25">
                <Wand2 size={18} className="text-cyan-400" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-white">
                  Interactive Sandbox
                </h3>
                <p className="text-sm text-[var(--text-dim)]">
                  Build, customize &amp; export components with the live code editor
                </p>
              </div>
            </div>
            <ArrowRight size={18} className="text-[var(--text-dim)] transition group-hover:translate-x-1 group-hover:text-white" />
          </Link>

          {/* â”€â”€ Full Registry â”€â”€ */}
          <section className="mt-10">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Layers size={18} color="#35d8ff" />
                <h2 className="font-display text-2xl font-semibold text-white">
                  Full registry
                </h2>
              </div>
              <div className="flex items-center gap-1 rounded-full border border-white/8 bg-white/4 p-1">
                {(['all', 'blocks', 'components', 'animations'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition ${activeTab === tab
                        ? 'bg-[linear-gradient(135deg,#35d8ff_0%,#15a9e9_100%)] text-[#031526]'
                        : 'text-[var(--text-dim)] hover:text-[var(--text)]'
                      }`}
                  >
                    {tab} ({tab === 'all'
                      ? shadcnRegistryCatalog.length
                      : tab === 'blocks'
                        ? blocks.length
                        : tab === 'components'
                          ? registryComponents.length
                          : registryAnimations.length})
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {filteredItems.map((item) => {
                const isAnimation = item.categories?.includes('animation');
                const docHref = isAnimation
                  ? `/docs/animations/${item.name}`
                  : item.type === 'registry:block'
                    ? undefined
                    : `/docs/components/${item.name}`;

                const content = (
                  <article className="glass h-full rounded-2xl p-4 transition hover:-translate-y-0.5">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded-full border border-white/8 bg-white/4 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">
                        {item.type.replace('registry:', '')}
                      </span>
                      {item.categories?.slice(0, 2).map((cat) => (
                        <span key={cat} className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                          {cat}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-display text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--text-dim)]">
                      {item.description}
                    </p>
                    <pre className="code-shell mt-3 overflow-x-auto rounded-xl p-2.5 text-[11px] leading-6 text-slate-200">
                      <code>{`npx shadcn@latest add ${SHADCN_REGISTRY_NAMESPACE}/${item.name}`}</code>
                    </pre>
                  </article>
                );

                return docHref ? (
                  <Link key={item.name} href={docHref}>
                    {content}
                  </Link>
                ) : (
                  <div key={item.name}>{content}</div>
                );
              })}
            </div>
          </section>

          {/* â”€â”€ Components grid â”€â”€ */}
          <div className="mt-10 space-y-10">
            <section>
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Layers size={18} color="#35d8ff" />
                  <h2 className="font-display text-2xl font-semibold text-white">Components</h2>
                </div>
                <Link
                  href="/components"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--text-dim)] hover:text-white"
                >
                  View all
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {components.map((item) => (
                  <Link key={item.slug} href={`/docs/components/${item.slug}`}>
                    <article className="glass h-full rounded-2xl p-4 transition hover:-translate-y-0.5">
                      <h3 className="font-display text-lg font-semibold text-white">
                        {item.name}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-[var(--text-dim)]">
                        {item.description}
                      </p>
                    </article>
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} color="#74d9ff" />
                  <h2 className="font-display text-2xl font-semibold text-white">Animations</h2>
                </div>
                <Link
                  href="/animations"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--text-dim)] hover:text-white"
                >
                  View all
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {animations.map((item) => (
                  <Link key={item.slug} href={`/docs/animations/${item.slug}`}>
                    <article className="glass h-full rounded-2xl p-4 transition hover:-translate-y-0.5">
                      <h3 className="font-display text-lg font-semibold text-white">
                        {item.name}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-[var(--text-dim)]">
                        {item.description}
                      </p>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}


'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Copy, Download, Sparkles, Wand2 } from 'lucide-react';
import { Footer, Navbar } from '@/components';
import { getRegistryItem } from '@/registry';
import { useParams } from 'next/navigation';
import {
  SHADCN_REGISTRY_NAMESPACE,
  shadcnRegistryCatalog,
} from '@/lib/shadcn-registry-catalog';

export default function AnimationDocPage() {
  const params = useParams();
  const slug = params.slug as string;
  const found = getRegistryItem(slug);
  const item = found?.category === 'animation' ? found : undefined;
  const catalogEntry = shadcnRegistryCatalog.find((entry) => entry.name === slug);
  const installCommand = `npx shadcn@latest add ${SHADCN_REGISTRY_NAMESPACE}/${slug}`;

  const [code, setCode] = useState('');
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (!item) return;

    fetch(`/api/registry/${item.file}`)
      .then((response) => response.text())
      .then(setCode)
      .catch(() => setCode('// Source could not be loaded'));
  }, [item]);

  const copyInstall = async () => {
    await navigator.clipboard.writeText(installCommand);
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 1600);
  };

  const copySource = async () => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 1600);
  };

  const downloadSource = () => {
    if (!code) return;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${slug}.tsx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!item) {
    return (
      <main>
        <Navbar />
        <section className="ui-section pt-28">
          <div className="ui-container text-center">
            <h1 className="font-display text-3xl font-semibold text-white">Animation not found</h1>
            <Link href="/docs" className="mt-4 inline-flex text-sm font-semibold text-[var(--text-dim)]">
              Back to docs
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Navbar />

      <section className="ui-section pt-28">
        <div className="ui-container max-w-5xl">
          <Link href="/docs" className="mb-4 inline-flex items-center gap-1 text-sm text-[var(--text-dim)] hover:text-white">
            <ArrowLeft size={14} />
            Back to docs
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass rounded-3xl p-5 md:p-7"
          >
            <span className="section-kicker">
              <Sparkles size={13} />
              Animation
            </span>
            <h1 className="font-display mt-4 text-3xl font-semibold text-white md:text-4xl">{item.name}</h1>
            <p className="mt-3 text-sm leading-7 text-[var(--text-dim)] md:text-base">{item.description}</p>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <div className="code-shell rounded-2xl p-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">Install</p>
                  <button
                    type="button"
                    onClick={copyInstall}
                    className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--text-dim)]"
                  >
                    {copiedInstall ? <Check size={11} /> : <Copy size={11} />}
                    {copiedInstall ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <pre className="overflow-x-auto text-xs leading-6 text-slate-200">
                  <code>{installCommand}</code>
                </pre>
              </div>

              <div className="glass rounded-2xl p-4">
                <p className="text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">Dependencies</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {item.dependencies.map((dep) => (
                    <span key={dep} className="pill">
                      {dep}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sandbox + Download actions */}
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/sandbox"
                className="btn-solid inline-flex items-center gap-2 text-xs"
              >
                <Wand2 size={13} />
                Try in Sandbox
              </Link>
              <button type="button" onClick={downloadSource} className="btn-outline text-xs">
                <Download size={13} />
                Download .tsx
              </button>
            </div>

            {/* Categories */}
            {catalogEntry?.categories && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {catalogEntry.categories.map((cat) => (
                  <span
                    key={cat}
                    className="rounded-full border border-white/8 bg-white/4 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          <section className="glass mt-6 overflow-hidden rounded-3xl">
            <div className="border-b border-white/10 px-4 py-3 md:px-5">
              <h2 className="font-display text-xl font-semibold text-white">Props</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-white/5 text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  <tr>
                    <th className="px-4 py-3 md:px-5">Prop</th>
                    <th className="px-4 py-3 md:px-5">Type</th>
                    <th className="px-4 py-3 md:px-5">Default</th>
                    <th className="px-4 py-3 md:px-5">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {item.props.map((prop, index) => (
                    <tr key={prop.name} className={index % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'}>
                      <td className="px-4 py-3 font-mono text-xs text-white md:px-5">{prop.name}</td>
                      <td className="px-4 py-3 font-mono text-xs text-[var(--accent)] md:px-5">{prop.type}</td>
                      <td className="px-4 py-3 font-mono text-xs text-[var(--text-dim)] md:px-5">
                        {prop.default || '-'}
                      </td>
                      <td className="px-4 py-3 text-sm text-[var(--text-dim)] md:px-5">{prop.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Usage docs from catalog */}
          {catalogEntry?.docs && (
            <section className="glass mt-6 rounded-3xl p-4 md:p-5">
              <h2 className="font-display mb-3 text-xl font-semibold text-white">Usage</h2>
              <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-xs leading-6 text-slate-200">
                <code>{catalogEntry.docs.replace(/^### Usage\n/, '')}</code>
              </pre>
            </section>
          )}

          <section className="code-shell mt-6 rounded-3xl p-4 md:p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-white">Source code</h2>
              <button
                type="button"
                onClick={copySource}
                className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--text-dim)]"
              >
                {copiedCode ? <Check size={11} /> : <Copy size={11} />}
                {copiedCode ? 'Copied' : 'Copy'}
              </button>
            </div>

            <pre className="max-h-[560px] overflow-auto rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-xs leading-6 text-slate-200">
              <code>{code || 'Loading...'}</code>
            </pre>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}

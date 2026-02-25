'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Mail, Rocket } from 'lucide-react';

export default function CTA() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;

    setDone(true);
    setTimeout(() => {
      setDone(false);
      setEmail('');
    }, 1800);
  };

  return (
    <section className="ui-section">
      <div className="ui-container">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.42 }}
          className="glass-strong rounded-3xl p-6 md:p-10"
        >
          <span className="section-kicker">
            <Rocket size={13} />
            Ship faster
          </span>
          <h2 className="section-title mt-4">
            Build once, deliver for
            <span className="text-gradient-warm"> both mobile stacks</span>
          </h2>
          <p className="section-subtitle mt-4 max-w-3xl">
            Use the rebuilt UI system, copy snippets, and ship consistent product experiences on
            React Native and Flutter.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/docs" className="btn-solid">
              Open docs
              <ArrowRight size={14} />
            </Link>
            <Link href="/sandbox" className="btn-outline">
              Try sandbox
            </Link>
          </div>

          <form onSubmit={submit} className="mt-7 max-w-xl">
            <label htmlFor="cta-email" className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">
              Product updates
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex flex-1 items-center gap-2 rounded-full border border-white/8 bg-white/4 px-4 py-2">
                <Mail size={14} color="var(--accent)" />
                <input
                  id="cta-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={done ? 'Subscribed' : 'you@company.com'}
                  className="w-full bg-transparent text-sm text-white placeholder:text-[var(--text-muted)] outline-none"
                />
              </div>
              <button type="submit" className="btn-outline">
                {done ? <Check size={14} /> : <Mail size={14} />}
                {done ? 'Subscribed' : 'Notify me'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}


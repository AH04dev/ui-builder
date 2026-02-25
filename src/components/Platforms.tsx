'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Code2, Smartphone } from 'lucide-react';

const rnBullets = ['Expo compatible', 'Reanimated examples', 'Type-safe props'];
const flBullets = ['Material and Cupertino', 'Null-safe Dart API', 'Matching behavior presets'];

export default function Platforms() {
  return (
    <section className="ui-section">
      <div className="ui-container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="mb-7 text-center"
        >
          <span className="section-kicker">Cross platform</span>
          <h2 className="section-title mt-4">React Native and Flutter stay aligned</h2>
          <p className="section-subtitle mx-auto mt-4 max-w-3xl">
            Every showcased element includes equivalent snippets and usage patterns for both
            frameworks.
          </p>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-2">
          <article className="glass rounded-3xl p-5 md:p-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex rounded-xl border p-2.5" style={{ borderColor: 'rgba(0,245,212,0.25)', background: 'rgba(0,245,212,0.12)' }}>
                <Smartphone size={16} color="var(--accent)" />
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold text-white">React Native</h3>
                <p className="text-sm text-[var(--text-dim)]">Reusable native UI patterns</p>
              </div>
            </div>

            <div className="space-y-2">
              {rnBullets.map((item) => (
                <p key={item} className="flex items-center gap-2 text-sm text-[var(--text-dim)]">
                  <CheckCircle2 size={14} color="var(--accent)" />
                  {item}
                </p>
              ))}
            </div>

            <pre className="code-shell mt-4 overflow-x-auto rounded-2xl p-3 text-xs leading-6 text-slate-300">
              <code>{`import SegmentedControl from './native-bits/segmented-control';

<SegmentedControl
  options={['Today', 'Week', 'Month']}
  value={range}
  onChange={setRange}
/>`}</code>
            </pre>
          </article>

          <article className="glass rounded-3xl p-5 md:p-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex rounded-xl border p-2.5" style={{ borderColor: 'rgba(124,58,237,0.3)', background: 'rgba(124,58,237,0.12)' }}>
                <Code2 size={16} color="var(--purple)" />
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold text-white">Flutter</h3>
                <p className="text-sm text-[var(--text-dim)]">Equivalent widgets and motion</p>
              </div>
            </div>

            <div className="space-y-2">
              {flBullets.map((item) => (
                <p key={item} className="flex items-center gap-2 text-sm text-[var(--text-dim)]">
                  <CheckCircle2 size={14} color="var(--purple)" />
                  {item}
                </p>
              ))}
            </div>

            <pre className="code-shell mt-4 overflow-x-auto rounded-2xl p-3 text-xs leading-6 text-slate-300">
              <code>{`import 'package:native_bits/native_bits.dart';

SegmentedControl(
  options: const ['Today', 'Week', 'Month'],
  value: range,
  onChanged: setRange,
)`}</code>
            </pre>
          </article>
        </div>
      </div>
    </section>
  );
}


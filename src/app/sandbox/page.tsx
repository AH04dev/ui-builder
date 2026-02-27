'use client';

import { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Check,
  ChevronDown,
  Code2,
  Copy,
  Download,
  FileCode2,
  Monitor,
  Play,
  Plus,
  RefreshCcw,
  Smartphone,
  Tablet,
  Terminal,
} from 'lucide-react';
import { Footer, Navbar } from '@/components';
import { registry, RegistryItem } from '@/registry';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type Platform = 'react-native' | 'flutter';
type Device = 'phone' | 'tablet' | 'desktop';

const deviceSize: Record<Device, { width: string; height: string }> = {
  phone: { width: '320px', height: '620px' },
  tablet: { width: '440px', height: '620px' },
  desktop: { width: '100%', height: '100%' },
};

// ---------------------------------------------------------------------------
// Code parser - extracts visual info from source code
// ---------------------------------------------------------------------------
interface ParsedPreview {
  componentName: string;
  texts: string[];
  colors: string[];
  borderRadius: number | null;
  hasGradient: boolean;
  hasAnimation: boolean;
  props: { name: string; value: string }[];
  type: 'button' | 'card' | 'input' | 'toggle' | 'ring' | 'toast' | 'list' | 'generic';
}

function parseCode(code: string): ParsedPreview {
  // Extract component/class name
  const fnMatch = code.match(/(?:export\s+default\s+)?function\s+(\w+)/);
  const classMatch = code.match(/class\s+(\w+)/);
  const componentName = fnMatch?.[1] ?? classMatch?.[1] ?? 'Component';

  // Extract string literals used as text content
  const texts: string[] = [];
  const textMatches = code.matchAll(/[>'"]([A-Z][a-z][\w\s]{2,30})['"<]/g);
  for (const m of textMatches) texts.push(m[1]);
  // Also check Text components
  const rnTextMatches = code.matchAll(/<Text[^>]*>([^<]+)<\/Text>/g);
  for (const m of rnTextMatches) texts.push(m[1]);
  // Flutter text
  const flTextMatches = code.matchAll(/Text\(\s*['"]([^'"]+)['"]/g);
  for (const m of flTextMatches) texts.push(m[1]);
  // title prop
  const titleMatch = code.match(/title[=:]\s*['"]([^'"]+)['"]/);
  if (titleMatch) texts.unshift(titleMatch[1]);

  // Extract colors
  const colors: string[] = [];
  const colorMatches = code.matchAll(/#[0-9A-Fa-f]{6}/g);
  for (const m of colorMatches) colors.push(m[0]);

  // Border radius
  const brMatch = code.match(/borderRadius[:\s]*(\d+)/);
  const borderRadius = brMatch ? parseInt(brMatch[1]) : null;

  // Gradient
  const hasGradient =
    /gradient/i.test(code) || /LinearGradient/i.test(code) || /gradientColors/i.test(code);

  // Animation
  const hasAnimation =
    /animate|Animated|withSpring|withTiming|useSharedValue|Reanimated|opacity\.value|scale\.value|translateY/i.test(
      code
    );

  // Props from interface
  const props: { name: string; value: string }[] = [];
  const propMatches = code.matchAll(/(\w+)[?]?\s*:\s*([\w\s|'"[\]()=>]+);/g);
  for (const m of propMatches) {
    if (!['React', 'styles', 'StyleSheet'].includes(m[1])) {
      props.push({ name: m[1], value: m[2].trim() });
    }
  }

  // Detect type
  let type: ParsedPreview['type'] = 'generic';
  const lower = code.toLowerCase();
  if (/button|pressable|onpress|ontap/i.test(lower)) type = 'button';
  else if (/card|surface|container.*padding/i.test(lower) && /border/i.test(lower)) type = 'card';
  else if (/input|textfield|textinput/i.test(lower)) type = 'input';
  else if (/toggle|switch/i.test(lower)) type = 'toggle';
  else if (/progress|ring|circle|svg/i.test(lower)) type = 'ring';
  else if (/toast|notification|snack/i.test(lower)) type = 'toast';
  else if (/list|stagger|flatlist/i.test(lower)) type = 'list';

  return { componentName, texts, colors, borderRadius, hasGradient, hasAnimation, props, type };
}

// ---------------------------------------------------------------------------
// Dynamic preview renderer
// ---------------------------------------------------------------------------
function DynamicPreview({ parsed }: { parsed: ParsedPreview | null }) {
  if (!parsed) {
    return (
      <div className="text-center">
        <Code2 size={32} className="mx-auto mb-3 text-[var(--text-muted)]" />
        <p className="font-display text-lg font-semibold text-white">Your component</p>
        <p className="mt-1 text-xs text-[var(--text-dim)]">
          Write code and press <strong>Run</strong> to preview
        </p>
      </div>
    );
  }

  const primary = parsed.colors[0] ?? '#00f5d4';
  const secondary = parsed.colors[1] ?? '#7c3aed';
  const bg = parsed.hasGradient
    ? `linear-gradient(135deg, ${primary}, ${secondary})`
    : primary;
  const radius = parsed.borderRadius ?? 14;
  const label = parsed.texts[0] ?? parsed.componentName;

  // ---- Button ----
  if (parsed.type === 'button') {
    return (
      <div className="flex flex-col items-center gap-4">
        <motion.button
          className="px-6 py-3 font-semibold text-white"
          style={{ background: bg, borderRadius: radius }}
          whileTap={{ scale: 0.95 }}
          {...(parsed.hasAnimation
            ? { animate: { scale: [1, 1.03, 1] }, transition: { duration: 2, repeat: Infinity } }
            : {})}
        >
          {label}
        </motion.button>
        <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
          {parsed.componentName}
        </p>
      </div>
    );
  }

  // ---- Card ----
  if (parsed.type === 'card') {
    return (
      <div className="flex flex-col items-center gap-3">
        <div
          className="w-56 p-5 text-left"
          style={{
            borderRadius: radius,
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="mb-3 h-8 w-8 rounded-lg" style={{ background: bg }} />
          <p className="text-base font-semibold text-white">{label}</p>
          {parsed.texts[1] && (
            <p className="mt-1 text-xs text-[var(--text-dim)]">{parsed.texts[1]}</p>
          )}
        </div>
        <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
          {parsed.componentName}
        </p>
      </div>
    );
  }

  // ---- Input ----
  if (parsed.type === 'input') {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="w-56">
          <p className="mb-1 text-xs font-medium" style={{ color: primary }}>
            {label}
          </p>
          <div
            className="flex items-center gap-2 border px-3 py-2.5"
            style={{ borderRadius: radius, borderColor: `${primary}50`, background: 'rgba(255,255,255,0.04)' }}
          >
            <span className="text-sm text-[var(--text-muted)]">Type here...</span>
          </div>
        </div>
        <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
          {parsed.componentName}
        </p>
      </div>
    );
  }

  // ---- Toggle ----
  if (parsed.type === 'toggle') {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="rounded-full p-1" style={{ background: bg, width: 52 }}>
          <motion.div
            className="h-6 w-6 rounded-full bg-white"
            animate={{ x: [0, 22, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
          {parsed.componentName}
        </p>
      </div>
    );
  }

  // ---- Progress Ring ----
  if (parsed.type === 'ring') {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="relative h-20 w-20">
          <svg width="80" height="80" className="-rotate-90">
            <circle cx="40" cy="40" r="30" stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="none" />
            <motion.circle
              cx="40"
              cy="40"
              r="30"
              stroke={primary}
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="188"
              animate={{ strokeDashoffset: [188, 50, 188] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white">
            72%
          </span>
        </div>
        <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
          {parsed.componentName}
        </p>
      </div>
    );
  }

  // ---- Toast ----
  if (parsed.type === 'toast') {
    return (
      <div className="flex flex-col items-center gap-3">
        <motion.div
          className="flex w-64 items-center gap-3 px-4 py-3"
          style={{
            borderRadius: radius,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
          animate={{ y: [20, 0], opacity: [0, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
        >
          <div className="h-5 w-5 rounded-full" style={{ background: primary }} />
          <p className="text-sm text-white">{label}</p>
        </motion.div>
        <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
          {parsed.componentName}
        </p>
      </div>
    );
  }

  // ---- List ----
  if (parsed.type === 'list') {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="w-56 space-y-2">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/4 px-3 py-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12, duration: 0.4, repeat: Infinity, repeatDelay: 3 }}
            >
              <div className="h-4 w-4 rounded" style={{ background: primary }} />
              <div className="h-2.5 flex-1 rounded-full bg-white/10" />
            </motion.div>
          ))}
        </div>
        <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
          {parsed.componentName}
        </p>
      </div>
    );
  }

  // ---- Generic fallback ----
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        className="h-16 w-16"
        style={{ background: bg, borderRadius: radius }}
        {...(parsed.hasAnimation
          ? {
            animate: { scale: [0.9, 1.05, 0.9], rotate: [0, 5, -5, 0] },
            transition: { duration: 2.4, repeat: Infinity },
          }
          : {})}
      />
      <div className="text-center">
        <p className="font-display text-lg font-semibold text-white">{parsed.componentName}</p>
        {parsed.texts[0] && (
          <p className="mt-1 text-xs text-[var(--text-dim)]">{parsed.texts[0]}</p>
        )}
      </div>

      {parsed.props.length > 0 && (
        <div className="w-56 space-y-1 rounded-xl border border-white/6 bg-black/20 p-3">
          <p className="mb-1 text-[10px] uppercase tracking-widest text-[var(--text-muted)]">Props</p>
          {parsed.props.slice(0, 5).map((p) => (
            <div key={p.name} className="flex items-center justify-between text-[11px]">
              <span className="text-[var(--accent)]">{p.name}</span>
              <span className="text-[var(--text-muted)]">{p.value.slice(0, 18)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Grouped categories
// ---------------------------------------------------------------------------
const grouped = (() => {
  const map = new Map<string, RegistryItem[]>();
  for (const item of registry) {
    const group = item.category === 'component' ? 'Components' : 'Animations';
    const arr = map.get(group) ?? [];
    arr.push(item);
    map.set(group, arr);
  }
  return Array.from(map.entries());
})();

// ---------------------------------------------------------------------------
// Blank starters
// ---------------------------------------------------------------------------
const blankCode: Record<Platform, string> = {
  'react-native': `import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function MyButton() {
  return (
    <Pressable style={styles.button}>
      <Text style={styles.label}>Get Started</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#00f5d4',
    alignItems: 'center',
  },
  label: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});`,
  flutter: `import 'package:flutter/material.dart';

class MyButton extends StatelessWidget {
  const MyButton({super.key});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () {},
      style: ElevatedButton.styleFrom(
        backgroundColor: const Color(0xFF38BDF8),
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(14),
        ),
      ),
      child: const Text(
        'Get Started',
        style: TextStyle(
          color: Colors.white,
          fontSize: 16,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }
}`,
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function SandboxPage() {
  const [platform, setPlatform] = useState<Platform>('react-native');
  const [device, setDevice] = useState<Device>('phone');
  const [running, setRunning] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showCli, setShowCli] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RegistryItem | null>(null);
  const [code, setCode] = useState(blankCode['react-native']);
  const [fileName, setFileName] = useState('my-component.tsx');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [parsed, setParsed] = useState<ParsedPreview | null>(() => parseCode(blankCode['react-native']));
  const [logs, setLogs] = useState<string[]>(['> Sandbox ready', '> Write code and press Run to preview']);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const addLog = useCallback((msg: string) => setLogs((p) => [...p, msg]), []);

  // ---------- Template selection ----------
  const selectTemplate = useCallback((item: RegistryItem, platformOverride?: Platform) => {
    const targetPlatform = platformOverride ?? platform;
    setSelectedItem(item);
    const snippet = item.props
      .map((p) => `  ${p.name}: ${p.type}; // ${p.description}`)
      .join('\n');

    const importName = item.name.replace(/ /g, '');
    const newCode =
      targetPlatform === 'react-native'
        ? `// native-bits: ${item.name}\n// Dependencies: ${item.dependencies.join(', ')}\n\nimport React from 'react';\nimport { View, StyleSheet } from 'react-native';\n\ninterface ${importName}Props {\n${snippet}\n}\n\nexport default function ${importName}(props: ${importName}Props) {\n  return (\n    <View style={styles.container}>\n      {/* ${item.description} */}\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    padding: 16,\n    borderRadius: 12,\n  },\n});`
        : `// native-bits: ${item.name}\n// Dependencies: ${item.dependencies.join(', ')}\n\nimport 'package:flutter/material.dart';\n\nclass ${importName} extends StatelessWidget {\n  ${item.props.map((p) => `final ${p.type} ${p.name};`).join('\n  ')}\n\n  const ${importName}({super.key${item.props.map((p) => `, required this.${p.name}`).join('')}});\n\n  @override\n  Widget build(BuildContext context) {\n    // ${item.description}\n    return Container(\n      padding: const EdgeInsets.all(16),\n      decoration: BoxDecoration(\n        borderRadius: BorderRadius.circular(12),\n      ),\n    );\n  }\n}`;

    if (platformOverride) {
      setPlatform(platformOverride);
    }
    setCode(newCode);
    setParsed(parseCode(newCode));
    setFileName(`${item.slug}${targetPlatform === 'react-native' ? '.tsx' : '.dart'}`);
    setPickerOpen(false);
    addLog(`> Loaded template: ${item.name}`);
  }, [addLog, platform]);

  const startBlank = () => {
    setSelectedItem(null);
    const newCode = blankCode[platform];
    setCode(newCode);
    setParsed(parseCode(newCode));
    setFileName(`my-component${platform === 'react-native' ? '.tsx' : '.dart'}`);
    setPickerOpen(false);
    addLog('> Started blank component');
  };

  // ---------- Platform switch ----------
  const switchPlatform = (p: Platform) => {
    setPlatform(p);
    if (selectedItem) {
      selectTemplate(selectedItem, p);
    } else {
      const newCode = blankCode[p];
      setCode(newCode);
      setParsed(parseCode(newCode));
      setFileName(`my-component${p === 'react-native' ? '.tsx' : '.dart'}`);
    }
  };

  // ---------- Actions ----------
  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    addLog('> Code copied to clipboard');
    setTimeout(() => setCopied(false), 1600);
  };

  const downloadFile = () => {
    const ext = platform === 'react-native' ? '.tsx' : '.dart';
    const name = fileName.replace(/\.\w+$/, ext);
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
    addLog(`> Downloaded ${name}`);
  };

  const resetCode = () => {
    if (selectedItem) {
      selectTemplate(selectedItem, platform);
    } else {
      const newCode = blankCode[platform];
      setCode(newCode);
      setParsed(parseCode(newCode));
    }
    addLog('> Code reset');
  };

  const runPreview = () => {
    setRunning(false);
    addLog('> Parsing code...');
    setTimeout(() => {
      const result = parseCode(code);
      setParsed(result);
      setRunning(true);
      addLog(`> Preview: ${result.componentName} (${result.type})`);
      if (result.colors.length) addLog(`> Colors: ${result.colors.join(', ')}`);
      if (result.hasAnimation) addLog('> Animation detected');
      if (result.props.length) addLog(`> ${result.props.length} prop(s) found`);
    }, 400);
  };

  const cliCommand = selectedItem
    ? `npx shadcn add @native-bits/${selectedItem.slug}`
    : null;

  return (
    <main>
      <Navbar />

      <section className="ui-section pt-28">
        <div className="ui-container">
          <div className="mb-5">
            <span className="section-kicker">
              <Terminal size={13} />
              Sandbox
            </span>
            <h1 className="section-title mt-4">Build, customize & export</h1>
            <p className="section-subtitle mt-4 max-w-3xl">
              Pick any component or animation as a starting point, edit the code to fit your
              product, then press <strong>Run</strong> to preview and export the result.
            </p>
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.04fr_0.96fr]">
            {/* --------- LEFT: Editor --------- */}
            <section className="glass rounded-3xl p-4 md:p-5">
              {/* Toolbar */}
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                {/* Platform toggle */}
                <div className="flex items-center gap-1 rounded-full border border-white/8 bg-white/4 p-1">
                  {(['react-native', 'flutter'] as Platform[]).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => switchPlatform(option)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition ${platform === option
                          ? 'bg-[var(--accent)] text-[#04070f]'
                          : 'text-[var(--text-dim)] hover:text-[var(--text)]'
                        }`}
                    >
                      {option === 'react-native' ? 'React Native' : 'Flutter'}
                    </button>
                  ))}
                </div>

                {/* Template picker */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setPickerOpen(!pickerOpen)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/4 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-dim)] transition hover:border-white/15"
                  >
                    <FileCode2 size={12} />
                    {selectedItem ? selectedItem.name : 'Pick template'}
                    <motion.span animate={{ rotate: pickerOpen ? 180 : 0 }}>
                      <ChevronDown size={12} />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {pickerOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full z-50 mt-2 max-h-80 w-72 overflow-auto rounded-2xl border border-white/8 bg-[#0F1119] p-2 shadow-2xl"
                      >
                        <button
                          type="button"
                          onClick={startBlank}
                          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-[var(--text-dim)] transition hover:bg-white/6"
                        >
                          <Plus size={14} className="text-[var(--accent)]" />
                          Start blank
                        </button>

                        <div className="my-1.5 border-t border-white/6" />

                        {grouped.map(([group, items]) => (
                          <div key={group}>
                            <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                              {group}
                            </p>
                            {items.map((item) => (
                              <button
                                key={item.slug}
                                type="button"
                                onClick={() => selectTemplate(item)}
                                className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm transition ${selectedItem?.slug === item.slug
                                    ? 'bg-[rgba(0,245,212,0.12)] text-[var(--accent)]'
                                    : 'text-[var(--text-dim)] hover:bg-white/6'
                                  }`}
                              >
                                {item.name}
                              </button>
                            ))}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* File name bar */}
              <div className="mb-2 flex items-center gap-2">
                <FileCode2 size={13} className="text-[var(--accent)]" />
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="flex-1 bg-transparent text-xs font-semibold text-[var(--text-dim)] outline-none"
                  spellCheck={false}
                />
              </div>

              {/* Code editor */}
              <div className="code-shell rounded-2xl p-3">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                    {platform === 'react-native' ? 'TypeScript - Editable' : 'Dart - Editable'}
                  </p>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={resetCode}
                      className="inline-flex items-center gap-1 rounded-full border border-white/8 bg-white/4 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--text-dim)] transition hover:border-white/15"
                    >
                      <RefreshCcw size={11} />
                      Reset
                    </button>
                    <button
                      type="button"
                      onClick={copyCode}
                      className="inline-flex items-center gap-1 rounded-full border border-white/8 bg-white/4 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--text-dim)] transition hover:border-white/15"
                    >
                      {copied ? <Check size={11} /> : <Copy size={11} />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                <textarea
                  ref={textareaRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck={false}
                  className="h-[340px] w-full resize-none rounded-xl border border-white/6 bg-black/30 p-3 font-mono text-xs leading-6 text-slate-300 outline-none selection:bg-[rgba(0,245,212,0.25)]"
                />
              </div>

              {/* Export bar */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button type="button" onClick={runPreview} className="btn-solid text-xs">
                  <Play size={13} />
                  Run preview
                </button>
                <button type="button" onClick={downloadFile} className="btn-outline text-xs">
                  <Download size={13} />
                  Download {platform === 'react-native' ? '.tsx' : '.dart'}
                </button>
                <button type="button" onClick={copyCode} className="btn-outline text-xs">
                  <Copy size={13} />
                  Copy
                </button>
                {cliCommand && (
                  <button
                    type="button"
                    onClick={() => setShowCli(!showCli)}
                    className="btn-outline text-xs"
                  >
                    <Terminal size={13} />
                    CLI
                  </button>
                )}
              </div>

              {/* CLI command panel */}
              <AnimatePresence>
                {showCli && cliCommand && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 flex items-center gap-2 rounded-2xl border border-white/6 bg-black/20 px-4 py-3">
                      <code className="flex-1 font-mono text-xs text-[var(--accent)]">{cliCommand}</code>
                      <button
                        type="button"
                        onClick={async () => {
                          await navigator.clipboard.writeText(cliCommand);
                          addLog('> CLI command copied');
                        }}
                        className="text-[var(--text-dim)] transition hover:text-white"
                      >
                        <Copy size={13} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Console */}
              <div className="mt-3 rounded-2xl border border-white/6 bg-black/20 p-3">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  Console
                </p>
                <div className="max-h-24 space-y-1 overflow-auto pr-1">
                  {logs.map((line, i) => (
                    <p key={`${line}-${i}`} className="font-mono text-xs text-[var(--text-dim)]">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </section>

            {/* --------- RIGHT: Preview --------- */}
            <section className="glass rounded-3xl p-4 md:p-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {([
                    { id: 'phone' as Device, icon: Smartphone },
                    { id: 'tablet' as Device, icon: Tablet },
                    { id: 'desktop' as Device, icon: Monitor },
                  ]).map(({ id, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setDevice(id)}
                      className={`rounded-full border p-2 transition ${device === id
                          ? 'border-[var(--line-strong)] bg-[rgba(0,245,212,0.12)] text-[var(--accent)]'
                          : 'border-white/8 bg-white/4 text-[var(--text-dim)] hover:border-white/15'
                        }`}
                    >
                      <Icon size={14} />
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={runPreview}
                  className="btn-solid text-xs uppercase tracking-[0.08em]"
                >
                  <Play size={12} />
                  Run
                </button>
              </div>

              <div className="flex min-h-[540px] items-center justify-center rounded-2xl border border-white/6 bg-black/20 p-4">
                <motion.div
                  key={`${device}-${running}-${parsed?.componentName ?? 'empty'}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    width: deviceSize[device].width,
                    height: deviceSize[device].height,
                    maxWidth: '100%',
                    maxHeight: '100%',
                  }}
                >
                  <div
                    className={`h-full w-full overflow-hidden ${device === 'desktop'
                        ? 'rounded-2xl border border-white/10'
                        : 'rounded-[2rem] border border-white/10 p-2'
                      }`}
                  >
                    <div className="flex h-full w-full items-center justify-center rounded-[1.5rem] bg-black/40 p-4">
                      {running ? (
                        <DynamicPreview parsed={parsed} />
                      ) : (
                        <div className="flex gap-2">
                          {[0, 1, 2].map((dot) => (
                            <motion.span
                              key={dot}
                              className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]"
                              animate={{ scale: [1, 1.35, 1], opacity: [0.45, 1, 0.45] }}
                              transition={{ duration: 0.8, repeat: Infinity, delay: dot * 0.14 }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}



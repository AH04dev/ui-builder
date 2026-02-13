'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ChevronRight, Sparkles } from 'lucide-react';
import { useState } from 'react';

type Platform = 'react-native' | 'flutter';

interface Component {
    name: string;
    category: string;
    color: string;
    preview: React.ReactNode;
    code: {
        'react-native': string;
        flutter: string;
    };
}

const components: Component[] = [
    {
        name: 'Animated Button',
        category: 'Buttons',
        color: '#10B981',
        preview: (
            <motion.button
                style={{
                    padding: '14px 28px',
                    background: 'linear-gradient(135deg, #10B981, #06B6D4)',
                    color: 'white',
                    borderRadius: '12px',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '14px',
                    cursor: 'pointer',
                    boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3)'
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(16, 185, 129, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
                Click me
            </motion.button>
        ),
        code: {
            'react-native': `import { AnimatedButton } from 'mobileui-pro';

<AnimatedButton
  title="Click me"
  variant="primary"
  onPress={() => console.log('Pressed!')}
/>`,
            flutter: `import 'package:mobileui_pro/mobileui_pro.dart';

AnimatedButton(
  text: 'Click me',
  variant: ButtonVariant.primary,
  onPressed: () => print('Pressed!'),
)`
        }
    },
    {
        name: 'Gradient Card',
        category: 'Cards',
        color: '#06B6D4',
        preview: (
            <motion.div
                style={{
                    width: '140px',
                    padding: '20px',
                    background: 'linear-gradient(145deg, rgba(17, 17, 24, 0.9), rgba(10, 10, 15, 0.95))',
                    borderRadius: '16px',
                    border: '1px solid rgba(6, 182, 212, 0.2)',
                    boxShadow: '0 8px 32px rgba(6, 182, 212, 0.1)'
                }}
                whileHover={{ scale: 1.02, borderColor: 'rgba(6, 182, 212, 0.4)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg, #06B6D4, #22D3EE)', marginBottom: '12px' }} />
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#F0F0F5', marginBottom: '4px' }}>Card Title</div>
                <div style={{ fontSize: '11px', color: '#6B7280' }}>Description</div>
            </motion.div>
        ),
        code: {
            'react-native': `import { GradientCard } from 'mobileui-pro';

<GradientCard
  gradient={['#667eea', '#764ba2']}
  title="Card Title"
  description="Description text"
/>`,
            flutter: `import 'package:mobileui_pro/mobileui_pro.dart';

GradientCard(
  gradient: [Color(0xFF667eea), Color(0xFF764ba2)],
  title: 'Card Title',
  description: 'Description text',
)`
        }
    },
    {
        name: 'Pulse Loader',
        category: 'Loaders',
        color: '#22D3EE',
        preview: (
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #06B6D4, #22D3EE)'
                        }}
                        animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                    />
                ))}
            </div>
        ),
        code: {
            'react-native': `import { PulseLoader } from 'mobileui-pro';

<PulseLoader
  color="#4facfe"
  size={12}
  count={3}
/>`,
            flutter: `import 'package:mobileui_pro/mobileui_pro.dart';

PulseLoader(
  color: Color(0xFF4facfe),
  size: 12,
  count: 3,
)`
        }
    },
    {
        name: 'Gradient Input',
        category: 'Forms',
        color: '#10B981',
        preview: (
            <div style={{
                padding: '2px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #10B981, #34D399)',
                width: '160px'
            }}>
                <input
                    type="text"
                    placeholder="Type here..."
                    style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: 'none',
                        background: '#111118',
                        color: '#F0F0F5',
                        fontSize: '13px',
                        outline: 'none'
                    }}
                />
            </div>
        ),
        code: {
            'react-native': `import { GradientInput } from 'mobileui-pro';

<GradientInput
  placeholder="Type here..."
  gradient={['#43e97b', '#38f9d7']}
  value={text}
  onChangeText={setText}
/>`,
            flutter: `import 'package:mobileui_pro/mobileui_pro.dart';

GradientInput(
  placeholder: 'Type here...',
  gradient: [Color(0xFF43e97b), Color(0xFF38f9d7)],
  controller: textController,
)`
        }
    },
    {
        name: 'Toggle Switch',
        category: 'Controls',
        color: '#F59E0B',
        preview: (
            <div style={{
                width: '52px',
                height: '28px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #F59E0B, #EF4444)',
                padding: '3px',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(245, 158, 11, 0.3)'
            }}>
                <motion.div
                    style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '11px',
                        background: 'white'
                    }}
                    animate={{ x: [0, 22, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </div>
        ),
        code: {
            'react-native': `import { AnimatedSwitch } from 'mobileui-pro';

<AnimatedSwitch
  value={isEnabled}
  onValueChange={setIsEnabled}
  activeGradient={['#fa709a', '#fee140']}
/>`,
            flutter: `import 'package:mobileui_pro/mobileui_pro.dart';

AnimatedSwitch(
  value: isEnabled,
  onChanged: (value) => setState(() => isEnabled = value),
  activeGradient: [Color(0xFFfa709a), Color(0xFFfee140)],
)`
        }
    },
    {
        name: 'Floating Action',
        category: 'Buttons',
        color: '#06B6D4',
        preview: (
            <motion.button
                style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #10B981, #06B6D4)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3)'
                }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
                <span style={{ fontSize: '24px', color: '#FFFFFF', fontWeight: 300 }}>+</span>
            </motion.button>
        ),
        code: {
            'react-native': `import { FloatingActionButton } from 'mobileui-pro';

<FloatingActionButton
  icon="plus"
  gradient={['#a8edea', '#fed6e3']}
  onPress={() => showModal()}
/>`,
            flutter: `import 'package:mobileui_pro/mobileui_pro.dart';

FloatingActionButton(
  icon: Icons.add,
  gradient: [Color(0xFFa8edea), Color(0xFFfed6e3)],
  onPressed: () => showModal(),
)`
        }
    },
    {
        name: 'Progress Ring',
        category: 'Progress',
        color: '#10B981',
        preview: (
            <div style={{ position: 'relative', width: '56px', height: '56px' }}>
                <svg width="56" height="56" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                    <motion.circle
                        cx="28" cy="28" r="22" fill="none"
                        stroke="url(#gradient-new)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 0.75 }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                        style={{ strokeDasharray: '138', strokeDashoffset: '0' }}
                    />
                    <defs>
                        <linearGradient id="gradient-new" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#10B981" />
                            <stop offset="100%" stopColor="#06B6D4" />
                        </linearGradient>
                    </defs>
                </svg>
                <span style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#F0F0F5'
                }}>75%</span>
            </div>
        ),
        code: {
            'react-native': `import { ProgressRing } from 'mobileui-pro';

<ProgressRing
  progress={0.75}
  size={56}
  gradient={['#667eea', '#764ba2']}
  animated
/>`,
            flutter: `import 'package:mobileui_pro/mobileui_pro.dart';

ProgressRing(
  progress: 0.75,
  size: 56,
  gradient: [Color(0xFF667eea), Color(0xFF764ba2)],
  animated: true,
)`
        }
    },
    {
        name: 'Skeleton Loader',
        category: 'Loaders',
        color: '#6B7280',
        preview: (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <motion.div
                    style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.06)' }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
                <div>
                    <motion.div
                        style={{ height: '10px', width: '80px', borderRadius: '5px', background: 'rgba(255, 255, 255, 0.06)', marginBottom: '6px' }}
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
                    />
                    <motion.div
                        style={{ height: '8px', width: '60px', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.06)' }}
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    />
                </div>
            </div>
        ),
        code: {
            'react-native': `import { Skeleton } from 'mobileui-pro';

<Skeleton.Group>
  <Skeleton.Circle size={36} />
  <Skeleton.Box width={80} height={10} />
  <Skeleton.Box width={60} height={8} />
</Skeleton.Group>`,
            flutter: `import 'package:mobileui_pro/mobileui_pro.dart';

SkeletonGroup(
  children: [
    SkeletonCircle(size: 36),
    SkeletonBox(width: 80, height: 10),
    SkeletonBox(width: 60, height: 8),
  ],
)`
        }
    }
];

const categories = ['All', 'Buttons', 'Cards', 'Forms', 'Controls', 'Loaders', 'Progress'];

export default function ComponentShowcase() {
    const [platform, setPlatform] = useState<Platform>('react-native');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const filteredComponents = selectedCategory === 'All'
        ? components
        : components.filter(c => c.category === selectedCategory);

    const handleCopy = (index: number, code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <section
            id="components"
            className="mesh-gradient-alt"
            style={{
                padding: '120px 0',
                position: 'relative',
                background: '#0A0A0F',
            }}
        >
            <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ textAlign: 'center', marginBottom: '48px' }}
                >
                    <motion.span
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 16px',
                            borderRadius: '100px',
                            background: 'rgba(16, 185, 129, 0.06)',
                            border: '1px solid rgba(16, 185, 129, 0.15)',
                            fontSize: '13px',
                            color: '#34D399',
                            fontWeight: 500,
                            marginBottom: '24px',
                        }}
                    >
                        <Sparkles size={14} />
                        Components
                    </motion.span>
                    <h2 className="font-display" style={{
                        fontSize: 'clamp(36px, 5vw, 54px)',
                        fontWeight: 700,
                        marginBottom: '20px',
                        color: '#F0F0F5',
                        letterSpacing: '-0.03em'
                    }}>
                        Ready-to-use UI components
                    </h2>
                    <p style={{
                        fontSize: '17px',
                        color: '#6B7280',
                        maxWidth: '500px',
                        margin: '0 auto',
                        lineHeight: 1.7
                    }}>
                        Copy, paste, and customize. Supports React Native and Flutter.
                    </p>
                </motion.div>

                {/* Platform Toggle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}
                >
                    <div style={{
                        display: 'inline-flex',
                        padding: '4px',
                        borderRadius: '14px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                    }}>
                        {(['react-native', 'flutter'] as Platform[]).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPlatform(p)}
                                style={{
                                    padding: '12px 24px',
                                    borderRadius: '10px',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    background: platform === p
                                        ? 'linear-gradient(135deg, #10B981, #06B6D4)'
                                        : 'transparent',
                                    color: platform === p ? '#FFFFFF' : '#6B7280',
                                }}
                            >
                                {p === 'react-native' ? 'React Native' : 'Flutter'}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        display: 'flex',
                        gap: '8px',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        marginBottom: '48px'
                    }}
                >
                    {categories.map((cat) => (
                        <motion.button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            style={{
                                padding: '8px 18px',
                                borderRadius: '10px',
                                fontSize: '13px',
                                fontWeight: 500,
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                background: selectedCategory === cat ? 'rgba(16, 185, 129, 0.12)' : 'transparent',
                                color: selectedCategory === cat ? '#34D399' : '#6B7280'
                            }}
                            whileHover={{ color: '#F0F0F5' }}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Components Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '16px'
                }}>
                    <AnimatePresence mode="popLayout">
                        {filteredComponents.map((component, index) => (
                            <motion.div
                                key={component.name}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                style={{
                                    background: 'linear-gradient(145deg, rgba(17, 17, 24, 0.85), rgba(10, 10, 15, 0.95))',
                                    borderRadius: '20px',
                                    border: '1px solid rgba(255, 255, 255, 0.05)',
                                    overflow: 'hidden',
                                    transition: 'border-color 0.3s',
                                }}
                            >
                                {/* Preview */}
                                <div style={{
                                    height: '120px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'rgba(0, 0, 0, 0.3)',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.04)'
                                }}>
                                    {component.preview}
                                </div>

                                {/* Info */}
                                <div style={{ padding: '16px 20px' }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginBottom: '12px'
                                    }}>
                                        <div>
                                            <div style={{ fontSize: '14px', fontWeight: 600, color: '#F0F0F5' }}>{component.name}</div>
                                            <div style={{ fontSize: '12px', color: '#6B7280' }}>{component.category}</div>
                                        </div>
                                        <motion.button
                                            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                                padding: '8px 12px',
                                                borderRadius: '8px',
                                                background: expandedIndex === index ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.04)',
                                                border: 'none',
                                                color: expandedIndex === index ? '#34D399' : '#9CA3AF',
                                                fontSize: '12px',
                                                fontWeight: 500,
                                                cursor: 'pointer'
                                            }}
                                            whileHover={{ background: 'rgba(16, 185, 129, 0.1)', color: '#34D399' }}
                                        >
                                            Code
                                            <motion.span
                                                animate={{ rotate: expandedIndex === index ? 90 : 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <ChevronRight size={14} />
                                            </motion.span>
                                        </motion.button>
                                    </div>

                                    {/* Code Panel */}
                                    <AnimatePresence>
                                        {expandedIndex === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                                style={{ overflow: 'hidden' }}
                                            >
                                                <div style={{
                                                    background: 'rgba(0, 0, 0, 0.4)',
                                                    borderRadius: '12px',
                                                    padding: '14px',
                                                    marginTop: '8px',
                                                    border: '1px solid rgba(16, 185, 129, 0.08)',
                                                }}>
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        marginBottom: '12px'
                                                    }}>
                                                        <span style={{
                                                            fontSize: '11px',
                                                            color: '#6B7280',
                                                            fontWeight: 600,
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.05em'
                                                        }}>
                                                            {platform === 'react-native' ? 'React Native' : 'Flutter'}
                                                        </span>
                                                        <motion.button
                                                            onClick={() => handleCopy(index, component.code[platform])}
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '6px',
                                                                padding: '6px 10px',
                                                                borderRadius: '6px',
                                                                background: copiedIndex === index ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                                                                border: 'none',
                                                                color: copiedIndex === index ? '#10B981' : '#9CA3AF',
                                                                fontSize: '11px',
                                                                cursor: 'pointer'
                                                            }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            {copiedIndex === index ? <Check size={12} /> : <Copy size={12} />}
                                                            {copiedIndex === index ? 'Copied!' : 'Copy'}
                                                        </motion.button>
                                                    </div>
                                                    <pre style={{
                                                        margin: 0,
                                                        fontSize: '11px',
                                                        color: '#9CA3AF',
                                                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                                        whiteSpace: 'pre-wrap',
                                                        lineHeight: 1.6
                                                    }}>
                                                        <code>{component.code[platform]}</code>
                                                    </pre>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

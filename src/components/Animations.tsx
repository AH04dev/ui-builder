'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ChevronRight, Sparkles } from 'lucide-react';
import { useState } from 'react';

type Platform = 'react-native' | 'flutter';

interface Animation {
    name: string;
    color: string;
    animation: object;
    code: {
        'react-native': string;
        flutter: string;
    };
}

const animations: Animation[] = [
    {
        name: 'Fade In Up',
        color: '#667eea',
        animation: { opacity: [0, 1], y: [30, 0] },
        code: {
            'react-native': `import { FadeInUp } from 'mobileui-pro/animations';

<FadeInUp duration={600} delay={0}>
  <YourComponent />
</FadeInUp>`,
            flutter: `import 'package:mobileui_pro/animations.dart';

FadeInUp(
  duration: Duration(milliseconds: 600),
  child: YourWidget(),
)`
        }
    },
    {
        name: 'Scale Pop',
        color: '#f093fb',
        animation: { scale: [0, 1.1, 1] },
        code: {
            'react-native': `import { ScalePop } from 'mobileui-pro/animations';

<ScalePop overshoot={1.1}>
  <YourComponent />
</ScalePop>`,
            flutter: `import 'package:mobileui_pro/animations.dart';

ScalePop(
  overshoot: 1.1,
  child: YourWidget(),
)`
        }
    },
    {
        name: 'Rotate In',
        color: '#4facfe',
        animation: { rotate: [180, 0], scale: [0, 1] },
        code: {
            'react-native': `import { RotateIn } from 'mobileui-pro/animations';

<RotateIn degrees={180} duration={500}>
  <YourComponent />
</RotateIn>`,
            flutter: `import 'package:mobileui_pro/animations.dart';

RotateIn(
  degrees: 180,
  child: YourWidget(),
)`
        }
    },
    {
        name: 'Slide In Right',
        color: '#43e97b',
        animation: { x: [-50, 0], opacity: [0, 1] },
        code: {
            'react-native': `import { SlideInRight } from 'mobileui-pro/animations';

<SlideInRight distance={50}>
  <YourComponent />
</SlideInRight>`,
            flutter: `import 'package:mobileui_pro/animations.dart';

SlideInRight(
  distance: 50,
  child: YourWidget(),
)`
        }
    },
    {
        name: 'Bounce',
        color: '#fa709a',
        animation: { y: [0, -20, 0] },
        code: {
            'react-native': `import { Bounce } from 'mobileui-pro/animations';

<Bounce height={20} loop>
  <YourComponent />
</Bounce>`,
            flutter: `import 'package:mobileui_pro/animations.dart';

Bounce(
  height: 20,
  loop: true,
  child: YourWidget(),
)`
        }
    },
    {
        name: 'Flip',
        color: '#a8edea',
        animation: { rotateY: [0, 180, 360] },
        code: {
            'react-native': `import { Flip } from 'mobileui-pro/animations';

<Flip axis="y" duration={800}>
  <YourComponent />
</Flip>`,
            flutter: `import 'package:mobileui_pro/animations.dart';

Flip(
  axis: Axis.vertical,
  child: YourWidget(),
)`
        }
    },
    {
        name: 'Shake',
        color: '#f5576c',
        animation: { x: [0, -10, 10, -10, 10, 0] },
        code: {
            'react-native': `import { Shake } from 'mobileui-pro/animations';

<Shake intensity={10}>
  <YourComponent />
</Shake>`,
            flutter: `import 'package:mobileui_pro/animations.dart';

Shake(
  intensity: 10,
  child: YourWidget(),
)`
        }
    },
    {
        name: 'Pulse',
        color: '#764ba2',
        animation: { scale: [1, 1.08, 1], opacity: [1, 0.7, 1] },
        code: {
            'react-native': `import { Pulse } from 'mobileui-pro/animations';

<Pulse scale={1.08} loop>
  <YourComponent />
</Pulse>`,
            flutter: `import 'package:mobileui_pro/animations.dart';

Pulse(
  scale: 1.08,
  loop: true,
  child: YourWidget(),
)`
        }
    }
];

export default function Animations() {
    const [platform, setPlatform] = useState<Platform>('react-native');
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleCopy = (index: number, code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <section
            id="animations"
            style={{
                padding: '120px 0',
                position: 'relative',
                background: '#09090B'
            }}
        >
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
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
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            fontSize: '13px',
                            color: '#A1A1AA',
                            fontWeight: 500,
                            marginBottom: '24px',
                        }}
                    >
                        <Sparkles size={14} />
                        Animations
                    </motion.span>
                    <h2 style={{
                        fontSize: 'clamp(36px, 5vw, 54px)',
                        fontWeight: 700,
                        marginBottom: '20px',
                        color: '#FAFAFA',
                        letterSpacing: '-0.03em'
                    }}>
                        Stunning animations
                    </h2>
                    <p style={{
                        fontSize: '17px',
                        color: '#71717A',
                        maxWidth: '480px',
                        margin: '0 auto',
                        lineHeight: 1.7
                    }}>
                        50+ smooth, customizable animations for both platforms.
                    </p>
                </motion.div>

                {/* Platform Toggle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px' }}
                >
                    <div style={{
                        display: 'inline-flex',
                        padding: '4px',
                        borderRadius: '14px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
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
                                    background: platform === p ? '#FAFAFA' : 'transparent',
                                    color: platform === p ? '#09090B' : '#71717A',
                                }}
                            >
                                {p === 'react-native' ? 'React Native' : 'Flutter'}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Animations Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
                    gap: '16px'
                }}>
                    {animations.map((anim, index) => (
                        <motion.div
                            key={anim.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                borderRadius: '20px',
                                background: 'linear-gradient(145deg, rgba(24, 24, 27, 0.8), rgba(15, 15, 18, 0.9))',
                                border: '1px solid rgba(255, 255, 255, 0.06)',
                                overflow: 'hidden',
                            }}
                        >
                            {/* Preview */}
                            <div style={{
                                height: '110px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'rgba(0, 0, 0, 0.2)',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.04)'
                            }}>
                                <motion.div
                                    style={{
                                        width: '44px',
                                        height: '44px',
                                        borderRadius: '12px',
                                        background: `linear-gradient(135deg, ${anim.color}, ${anim.color}88)`,
                                        boxShadow: `0 8px 32px ${anim.color}40`
                                    }}
                                    animate={anim.animation}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        repeatDelay: 0.5,
                                        ease: 'easeInOut'
                                    }}
                                />
                            </div>

                            {/* Info */}
                            <div style={{ padding: '14px 18px' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#FAFAFA' }}>{anim.name}</span>
                                    <motion.button
                                        onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            padding: '6px 10px',
                                            borderRadius: '6px',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: 'none',
                                            color: '#A1A1AA',
                                            fontSize: '11px',
                                            fontWeight: 500,
                                            cursor: 'pointer'
                                        }}
                                        whileHover={{ background: 'rgba(255, 255, 255, 0.08)' }}
                                    >
                                        Code
                                        <motion.span
                                            animate={{ rotate: expandedIndex === index ? 90 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ChevronRight size={12} />
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
                                            style={{ overflow: 'hidden', marginTop: '12px' }}
                                        >
                                            <div style={{
                                                background: 'rgba(0, 0, 0, 0.3)',
                                                borderRadius: '10px',
                                                padding: '12px'
                                            }}>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    marginBottom: '10px'
                                                }}>
                                                    <span style={{
                                                        fontSize: '10px',
                                                        color: '#71717A',
                                                        fontWeight: 600,
                                                        textTransform: 'uppercase'
                                                    }}>
                                                        {platform === 'react-native' ? 'React Native' : 'Flutter'}
                                                    </span>
                                                    <motion.button
                                                        onClick={() => handleCopy(index, anim.code[platform])}
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '4px',
                                                            padding: '4px 8px',
                                                            borderRadius: '4px',
                                                            background: copiedIndex === index ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                                                            border: 'none',
                                                            color: copiedIndex === index ? '#22C55E' : '#A1A1AA',
                                                            fontSize: '10px',
                                                            cursor: 'pointer'
                                                        }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        {copiedIndex === index ? <Check size={10} /> : <Copy size={10} />}
                                                        {copiedIndex === index ? 'Copied' : 'Copy'}
                                                    </motion.button>
                                                </div>
                                                <pre style={{
                                                    margin: 0,
                                                    fontSize: '10px',
                                                    color: '#A1A1AA',
                                                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                                    whiteSpace: 'pre-wrap',
                                                    lineHeight: 1.5
                                                }}>
                                                    <code>{anim.code[platform]}</code>
                                                </pre>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ChevronRight, Zap } from 'lucide-react';
import { useState } from 'react';

type Platform = 'react-native' | 'flutter';

interface AnimationType {
    name: string;
    preview: React.ReactNode;
    code: {
        'react-native': string;
        flutter: string;
    };
}

const animations: AnimationType[] = [
    {
        name: 'Fade In Up',
        preview: (
            <motion.div
                style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #10B981, #06B6D4)' }}
                animate={{ y: [20, 0, 20], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        ),
        code: {
            'react-native': `import { FadeInUp } from 'mobileui-pro/animations';

<FadeInUp delay={200} duration={600}>
  <YourComponent />
</FadeInUp>`,
            flutter: `import 'package:mobileui_pro/animations.dart';

FadeInUp(
  delay: Duration(milliseconds: 200),
  duration: Duration(milliseconds: 600),
  child: YourWidget(),
)`
        }
    },
    {
        name: 'Scale Pop',
        preview: (
            <motion.div
                style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #06B6D4, #22D3EE)' }}
                animate={{ scale: [0.5, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            />
        ),
        code: {
            'react-native': `import { ScalePop } from 'mobileui-pro/animations';

<ScalePop delay={100} spring={{ damping: 12 }}>
  <YourComponent />
</ScalePop>`,
            flutter: `import 'package:mobileui_pro/animations.dart';

ScalePop(
  delay: Duration(milliseconds: 100),
  curve: Curves.elasticOut,
  child: YourWidget(),
)`
        }
    },
    {
        name: 'Rotate In',
        preview: (
            <motion.div
                style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #F59E0B, #EF4444)' }}
                animate={{ rotate: [0, 360], scale: [0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        ),
        code: {
            'react-native': `import { RotateIn } from 'mobileui-pro/animations';

<RotateIn degrees={360} duration={800}>
  <YourComponent />
</RotateIn>`,
            flutter: `import 'package:mobileui_pro/animations.dart';

RotateIn(
  degrees: 360,
  duration: Duration(milliseconds: 800),
  child: YourWidget(),
)`
        }
    },
    {
        name: 'Slide In Right',
        preview: (
            <motion.div
                style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #10B981, #34D399)' }}
                animate={{ x: [-40, 0, -40] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        ),
        code: {
            'react-native': `import { SlideInRight } from 'mobileui-pro/animations';

<SlideInRight offset={100} duration={500}>
  <YourComponent />
</SlideInRight>`,
            flutter: `import 'package:mobileui_pro/animations.dart';

SlideInRight(
  offset: 100,
  duration: Duration(milliseconds: 500),
  child: YourWidget(),
)`
        }
    },
    {
        name: 'Bounce',
        preview: (
            <motion.div
                style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #06B6D4, #10B981)' }}
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
            />
        ),
        code: {
            'react-native': `import { Bounce } from 'mobileui-pro/animations';

<Bounce height={20} duration={600}>
  <YourComponent />
</Bounce>`,
            flutter: `import 'package:mobileui_pro/animations.dart';

Bounce(
  height: 20,
  duration: Duration(milliseconds: 600),
  child: YourWidget(),
)`
        }
    },
    {
        name: 'Flip',
        preview: (
            <motion.div
                style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #22D3EE, #06B6D4)' }}
                animate={{ rotateY: [0, 180, 360] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        ),
        code: {
            'react-native': `import { Flip } from 'mobileui-pro/animations';

<Flip direction="horizontal" duration={800}>
  <YourComponent />
</Flip>`,
            flutter: `import 'package:mobileui_pro/animations.dart';

Flip(
  direction: FlipDirection.horizontal,
  duration: Duration(milliseconds: 800),
  child: YourWidget(),
)`
        }
    },
    {
        name: 'Shimmer',
        preview: (
            <div style={{
                width: '100px',
                height: '48px',
                borderRadius: '14px',
                overflow: 'hidden',
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.06)'
            }}>
                <motion.div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.15), transparent)'
                    }}
                    animate={{ left: ['−100%', '200%'] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
            </div>
        ),
        code: {
            'react-native': `import { Shimmer } from 'mobileui-pro/animations';

<Shimmer
  width={200}
  height={48}
  baseColor="#1a1a2e"
  highlightColor="#667eea33"
/>`,
            flutter: `import 'package:mobileui_pro/animations.dart';

Shimmer(
  width: 200,
  height: 48,
  baseColor: Color(0xFF1a1a2e),
  highlightColor: Color(0x33667eea),
)`
        }
    },
    {
        name: 'Stagger List',
        preview: (
            <div style={{ display: 'flex', gap: '6px' }}>
                {[0, 1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        style={{
                            width: '16px',
                            height: '32px',
                            borderRadius: '6px',
                            background: `linear-gradient(135deg, #10B981, #06B6D4)`
                        }}
                        animate={{ scaleY: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                    />
                ))}
            </div>
        ),
        code: {
            'react-native': `import { StaggerList } from 'mobileui-pro/animations';

<StaggerList
  staggerDelay={100}
  animation="fadeInUp"
>
  {items.map(item => <ListItem key={item.id} />)}
</StaggerList>`,
            flutter: `import 'package:mobileui_pro/animations.dart';

StaggerList(
  staggerDelay: Duration(milliseconds: 100),
  animation: StaggerAnimation.fadeInUp,
  children: items.map((item) => ListItem(data: item)).toList(),
)`
        }
    }
];

export default function Animations() {
    const [platform, setPlatform] = useState<Platform>('react-native');
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

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
                background: '#050505',
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
                            background: 'rgba(6, 182, 212, 0.06)',
                            border: '1px solid rgba(6, 182, 212, 0.15)',
                            fontSize: '13px',
                            color: '#22D3EE',
                            fontWeight: 500,
                            marginBottom: '24px',
                        }}
                    >
                        <Zap size={14} />
                        Animations
                    </motion.span>
                    <h2 className="font-display" style={{
                        fontSize: 'clamp(36px, 5vw, 54px)',
                        fontWeight: 700,
                        marginBottom: '20px',
                        color: '#F0F0F5',
                        letterSpacing: '-0.03em'
                    }}>
                        Beautiful animations
                    </h2>
                    <p style={{
                        fontSize: '17px',
                        color: '#6B7280',
                        maxWidth: '500px',
                        margin: '0 auto',
                        lineHeight: 1.7
                    }}>
                        Stunning motion effects you can drop straight into your app.
                    </p>
                </motion.div>

                {/* Platform Toggle */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px' }}>
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
                                        ? 'linear-gradient(135deg, #06B6D4, #22D3EE)'
                                        : 'transparent',
                                    color: platform === p ? '#FFFFFF' : '#6B7280',
                                }}
                            >
                                {p === 'react-native' ? 'React Native' : 'Flutter'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Animations Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '16px'
                }}>
                    {animations.map((anim, index) => (
                        <motion.div
                            key={anim.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.06 }}
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
                                {anim.preview}
                            </div>

                            {/* Info */}
                            <div style={{ padding: '16px 20px' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: '12px'
                                }}>
                                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#F0F0F5' }}>{anim.name}</span>
                                    <motion.button
                                        onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            padding: '8px 12px',
                                            borderRadius: '8px',
                                            background: expandedIndex === index ? 'rgba(6, 182, 212, 0.1)' : 'rgba(255, 255, 255, 0.04)',
                                            border: 'none',
                                            color: expandedIndex === index ? '#22D3EE' : '#9CA3AF',
                                            fontSize: '12px',
                                            fontWeight: 500,
                                            cursor: 'pointer'
                                        }}
                                        whileHover={{ background: 'rgba(6, 182, 212, 0.1)', color: '#22D3EE' }}
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
                                                border: '1px solid rgba(6, 182, 212, 0.08)',
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
                                                        onClick={() => handleCopy(index, anim.code[platform])}
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '6px',
                                                            padding: '6px 10px',
                                                            borderRadius: '6px',
                                                            background: copiedIndex === index ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                                                            border: 'none',
                                                            color: copiedIndex === index ? '#06B6D4' : '#9CA3AF',
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

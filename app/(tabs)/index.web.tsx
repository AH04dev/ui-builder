import { View, Text, Pressable, ScrollView } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

const SIDEBAR_LINKS = [
  { section: 'Getting Started', items: [
    { label: 'Introduction', href: '/' },
    { label: 'Installation', href: '/' },
    { label: 'Theming', href: '/' },
  ]},
  { section: 'Components', items: [
    { label: 'Button',    href: '/button' },
    { label: 'Card',      href: '/card' },
    { label: 'Switch',    href: '/switch' },
    { label: 'Checkbox',  href: '/checkbox' },
    { label: 'Progress',  href: '/progress' },
    { label: 'Badge',     href: '/badge' },
    { label: 'Avatar',    href: '/avatar' },
    { label: 'Separator', href: '/separator' },
    { label: 'Text',      href: '/text' },
  ]},
];

const COMPONENTS = [
  { name: 'Button',    desc: 'Pressable with variants, sizes & haptics',   tag: 'Core',     color: '#6e54ff' },
  { name: 'Card',      desc: 'Elevated container with header and footer',   tag: 'Layout',   color: '#ff54c8' },
  { name: 'Switch',    desc: 'iOS-style toggle via rn-primitives',          tag: 'Input',    color: '#54ffcb' },
  { name: 'Checkbox',  desc: 'Accessible checkbox with animated check',     tag: 'Input',    color: '#ffb054' },
  { name: 'Progress',  desc: 'Animated progress bar with color variants',   tag: 'Feedback', color: '#6e54ff' },
  { name: 'Badge',     desc: 'Status labels with multiple variants',        tag: 'Display',  color: '#ff54c8' },
  { name: 'Avatar',    desc: 'Image with fallback initials & status dot',   tag: 'Display',  color: '#54ffcb' },
  { name: 'Separator', desc: 'Horizontal and vertical divider line',        tag: 'Layout',   color: '#ffb054' },
  { name: 'Text',      desc: 'Typography with iOS-style size scale',        tag: 'Core',     color: '#6e54ff' },
];

function Sidebar({ active }: { active: string }) {
  return (
    <View style={{
      width: 240,
      position: 'fixed' as any,
      top: 0, left: 0, bottom: 0,
      backgroundColor: '#04040a',
      borderRightWidth: 1,
      borderRightColor: 'rgba(255,255,255,0.06)',
      paddingTop: 24,
      overflowY: 'auto' as any,
    }}>
      {/* LOGO */}
      <View style={{
        flexDirection: 'row', alignItems: 'center', gap: 10,
        paddingHorizontal: 20, paddingBottom: 24,
        borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)',
        marginBottom: 16,
      }}>
        <View style={{
          width: 30, height: 30, borderRadius: 8,
          backgroundColor: '#6e54ff',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <Text style={{ color: '#fff', fontWeight: '800', fontSize: 14 }}>C</Text>
        </View>
        <Text style={{ color: '#fff', fontWeight: '800', fontSize: 15, letterSpacing: -0.5 }}>
          Crossbits
        </Text>
      </View>

      {/* NAV SECTIONS */}
      {SIDEBAR_LINKS.map((section) => (
        <View key={section.section} style={{ marginBottom: 24 }}>
          <Text style={{
            color: 'rgba(255,255,255,0.25)',
            fontSize: 10, fontWeight: '700',
            letterSpacing: 1.5, textTransform: 'uppercase',
            paddingHorizontal: 20, marginBottom: 6,
          }}>
            {section.section}
          </Text>
          {section.items.map((item) => {
            const isActive = active === item.label;
            return (
              <Pressable
                key={item.label}
                onPress={() => router.push(item.href as any)}
                style={({ pressed, hovered }: any) => ({
                  paddingHorizontal: 20, paddingVertical: 7,
                  backgroundColor: isActive
                    ? 'rgba(110,84,255,0.12)'
                    : pressed || hovered
                    ? 'rgba(255,255,255,0.04)'
                    : 'transparent',
                  borderRightWidth: isActive ? 2 : 0,
                  borderRightColor: '#6e54ff',
                })}
              >
                <Text style={{
                  fontSize: 13, fontWeight: isActive ? '600' : '400',
                  color: isActive ? '#a08bff' : 'rgba(255,255,255,0.5)',
                }}>
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ))}

      {/* BOTTOM LINKS */}
      <View style={{
        position: 'absolute' as any, bottom: 0, left: 0, right: 0,
        borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)',
        padding: 16, gap: 12,
      }}>
        {['GitHub', 'Twitter', 'Discord'].map((link) => (
          <Pressable key={link}>
            <Text style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>{link} ↗</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function TopBar() {
  return (
    <View style={{
      position: 'fixed' as any,
      top: 0, left: 240, right: 0,
      zIndex: 50,
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      paddingHorizontal: 40, paddingVertical: 16,
      backgroundColor: 'rgba(4,4,10,0.85)',
      backdropFilter: 'blur(12px)' as any,
      borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)',
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#54ffcb' }} />
        <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: '500' }}>
          v1.0.0-beta
        </Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Pressable style={({ pressed }) => ({
          backgroundColor: 'rgba(255,255,255,0.06)',
          borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
          paddingHorizontal: 16, paddingVertical: 8,
          borderRadius: 8, opacity: pressed ? 0.7 : 1,
        })}>
          <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: '500' }}>
            GitHub ↗
          </Text>
        </Pressable>
        <Pressable style={({ pressed }) => ({
          backgroundColor: '#6e54ff',
          paddingHorizontal: 16, paddingVertical: 8,
          borderRadius: 8, opacity: pressed ? 0.85 : 1,
        })}>
          <Text style={{ color: '#fff', fontSize: 13, fontWeight: '600' }}>
            Get Started →
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function WebHome() {
  return (
    <View style={{ flex: 1, backgroundColor: '#04040a', flexDirection: 'row' }}>
      <Sidebar active="Introduction" />

      {/* MAIN CONTENT */}
      <View style={{ flex: 1, marginLeft: 240 }}>
        <TopBar />

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingTop: 80 }}
          showsVerticalScrollIndicator={false}
        >
          {/* HERO */}
          <View style={{
            paddingHorizontal: 64, paddingTop: 80, paddingBottom: 80,
            borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)',
          }}>
            {/* BADGE */}
            <View style={{
              flexDirection: 'row', alignItems: 'center', gap: 8,
              backgroundColor: 'rgba(110,84,255,0.1)',
              borderWidth: 1, borderColor: 'rgba(110,84,255,0.2)',
              paddingHorizontal: 12, paddingVertical: 5,
              borderRadius: 99, marginBottom: 28, alignSelf: 'flex-start',
            }}>
              <View style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: '#54ffcb' }} />
              <Text style={{ color: '#a08bff', fontSize: 11, fontWeight: '600', letterSpacing: 0.5 }}>
                In Development · Crossbits UI
              </Text>
            </View>

            <Text style={{
              fontSize: 72, fontWeight: '900',
              color: '#fff', letterSpacing: -3,
              lineHeight: 76, marginBottom: 6,
            }}>
              Build native UIs
            </Text>
            <Text style={{
              fontSize: 72, fontWeight: '900',
              color: '#6e54ff', letterSpacing: -3,
              lineHeight: 76, marginBottom: 28,
            }}>
              faster.
            </Text>

            <Text style={{
              fontSize: 17, color: '#4a4a6a',
              lineHeight: 28, maxWidth: 540, marginBottom: 40,
            }}>
              A component library built on Expo, NativeWind v4, and rn-primitives.
              One codebase — iOS, Android, and Web. Every component feels native because it is.
            </Text>

            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Pressable
                onPress={() => router.push('/button' as any)}
                style={({ pressed }) => ({
                  backgroundColor: '#6e54ff',
                  paddingHorizontal: 28, paddingVertical: 14,
                  borderRadius: 12, opacity: pressed ? 0.85 : 1,
                  shadowColor: '#6e54ff',
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.35, shadowRadius: 20,
                })}
              >
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>
                  Browse Components →
                </Text>
              </Pressable>
              <Pressable style={({ pressed }) => ({
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
                paddingHorizontal: 28, paddingVertical: 14,
                borderRadius: 12, opacity: pressed ? 0.7 : 1,
              })}>
                <Text style={{ color: 'rgba(255,255,255,0.5)', fontWeight: '600', fontSize: 15 }}>
                  View on GitHub ↗
                </Text>
              </Pressable>
            </View>
          </View>

          {/* COMPONENT GRID */}
          <View style={{ paddingHorizontal: 64, paddingTop: 64, paddingBottom: 80 }}>
            <Text style={{
              fontSize: 11, fontWeight: '700', letterSpacing: 2,
              color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase',
              marginBottom: 12,
            }}>
              Components
            </Text>
            <Text style={{
              fontSize: 36, fontWeight: '900', color: '#fff',
              letterSpacing: -1.5, marginBottom: 8,
            }}>
              Everything you need
            </Text>
            <Text style={{
              fontSize: 15, color: '#4a4a6a', marginBottom: 40,
              lineHeight: 24, maxWidth: 480,
            }}>
              Production-ready components for iOS, Android, and Web.
            </Text>

            {/* GRID — 3 columns */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
              {COMPONENTS.map((comp) => (
                <Pressable
                  key={comp.name}
                  onPress={() => router.push(`/${comp.name.toLowerCase()}` as any)}
                  style={({ pressed, hovered }: any) => ({
                    width: 'calc(33.33% - 11px)' as any,
                    backgroundColor: hovered
                      ? 'rgba(255,255,255,0.05)'
                      : 'rgba(255,255,255,0.02)',
                    borderWidth: 1,
                    borderColor: hovered
                      ? 'rgba(110,84,255,0.3)'
                      : 'rgba(255,255,255,0.06)',
                    borderRadius: 16, padding: 24,
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                    cursor: 'pointer' as any,
                  })}
                >
                  <View style={{
                    flexDirection: 'row', justifyContent: 'space-between',
                    alignItems: 'flex-start', marginBottom: 16,
                  }}>
                    <View style={{
                      width: 40, height: 40, borderRadius: 10,
                      backgroundColor: `${comp.color}18`,
                      alignItems: 'center', justifyContent: 'center',
                    }}>
                      <View style={{
                        width: 16, height: 16, borderRadius: 4,
                        backgroundColor: comp.color,
                      }} />
                    </View>
                    <View style={{
                      backgroundColor: `${comp.color}18`,
                      paddingHorizontal: 8, paddingVertical: 3,
                      borderRadius: 99,
                    }}>
                      <Text style={{ color: comp.color, fontSize: 10, fontWeight: '700' }}>
                        {comp.tag}
                      </Text>
                    </View>
                  </View>
                  <Text style={{ color: '#fff', fontSize: 15, fontWeight: '700', marginBottom: 6 }}>
                    {comp.name}
                  </Text>
                  <Text style={{ color: '#4a4a6a', fontSize: 13, lineHeight: 20 }}>
                    {comp.desc}
                  </Text>
                  <Text style={{ color: 'rgba(110,84,255,0.5)', fontSize: 16, marginTop: 16 }}>→</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* FOOTER */}
          <View style={{
            borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)',
            paddingHorizontal: 64, paddingVertical: 28,
            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <Text style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13 }}>
              © 2025 Crossbits UI. Built with Expo & NativeWind.
            </Text>
            <View style={{ flexDirection: 'row', gap: 24 }}>
              {['GitHub', 'Twitter', 'Discord'].map((l) => (
                <Pressable key={l}>
                  <Text style={{ color: 'rgba(255,255,255,0.25)', fontSize: 13 }}>{l}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
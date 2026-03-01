import { View, Text, Pressable, ScrollView, useWindowDimensions } from 'react-native';
import { useEffect } from 'react';
import Animated, {
  FadeInDown,
  FadeInUp,
  withRepeat,
  withTiming,
  withSequence,
  useSharedValue,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

const BRAND = {
  bg: '#020916',
  bgSoft: '#081A30',
  surface: 'rgba(8, 20, 38, 0.78)',
  border: 'rgba(84, 168, 238, 0.24)',
  text: '#E9F7FF',
  textMuted: '#8EA7C4',
  deepBlue: '#0D4E93',
  electricBlue: '#1BBEFF',
  skyBlue: '#7BD9FF',
  white: '#FFFFFF',
};

// --- DATA ---
const COMPONENTS = [
  { name: 'Button', desc: 'Pressable with variants & haptics', tag: 'Core', color: '#0D4E93' },
  { name: 'Card', desc: 'Elevated container with headers', tag: 'Layout', color: '#1888CF' },
  { name: 'Switch', desc: 'iOS-style toggle switch', tag: 'Input', color: '#1BBEFF' },
  { name: 'Checkbox', desc: 'Accessible animated checkbox', tag: 'Input', color: '#53D7FF' },
  { name: 'Progress', desc: 'Animated progress indicator', tag: 'Feedback', color: '#1F73BD' },
  { name: 'Badge', desc: 'Status labels and tags', tag: 'Display', color: '#8BDFFF' },
];

// --- ANIMATED HELPERS ---
function BrandMark({ size = 38, idSuffix = 'brand' }: { size?: number; idSuffix?: string }) {
  const strokeWidth = Math.max(4, Math.round(size * 0.16));
  const topGradientId = `chain-top-${idSuffix}`;
  const bottomGradientId = `chain-bottom-${idSuffix}`;

  return (
    <Svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <Defs>
        <LinearGradient id={topGradientId} x1="14" y1="102" x2="92" y2="16" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor="#07142E" />
          <Stop offset="0.45" stopColor={BRAND.deepBlue} />
          <Stop offset="1" stopColor={BRAND.electricBlue} />
        </LinearGradient>
        <LinearGradient id={bottomGradientId} x1="42" y1="40" x2="112" y2="112" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor={BRAND.electricBlue} />
          <Stop offset="1" stopColor={BRAND.skyBlue} />
        </LinearGradient>
      </Defs>
      <Rect
        x="14"
        y="14"
        width="64"
        height="64"
        rx="16"
        stroke={`url(#${topGradientId})`}
        strokeWidth={strokeWidth}
      />
      <Rect
        x="42"
        y="42"
        width="64"
        height="64"
        rx="16"
        stroke={`url(#${bottomGradientId})`}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
}

function FloatingElement({ children, delay = 0, duration = 3000, translateY = 15, style }: any) {
  const offset = useSharedValue(0);

  useEffect(() => {
    setTimeout(() => {
      offset.value = withRepeat(
        withSequence(
          withTiming(translateY, { duration, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    }, delay);
  }, [delay, duration, offset, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  return <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>;
}

// --- SECTIONS ---

function GlassyNav() {
  return (
    <Animated.View
      entering={FadeInDown.duration(800)}
      style={{
        position: 'fixed' as any,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
        paddingVertical: 16,
        backgroundColor: BRAND.surface,
        backdropFilter: 'blur(20px)' as any,
        borderBottomWidth: 1,
        borderBottomColor: BRAND.border,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <BrandMark size={38} idSuffix="nav" />
        <Text style={{ color: BRAND.text, fontWeight: '800', fontSize: 18, letterSpacing: -0.5 }}>Cross Bits</Text>
      </View>

      <View style={{ flexDirection: 'row', gap: 32, display: 'flex' }}>
        {['Showcase', 'Components', 'Community'].map((item) => (
          <Pressable key={item}>
            <Text style={{ color: BRAND.textMuted, fontSize: 14, fontWeight: '500' }}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        style={({ pressed }) => ({
          backgroundColor: BRAND.electricBlue,
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 99,
          transform: [{ scale: pressed ? 0.95 : 1 }],
        })}
      >
        <Text style={{ color: BRAND.bg, fontSize: 14, fontWeight: '700' }}>Get Started</Text>
      </Pressable>
    </Animated.View>
  );
}

function HeroSection({ isDesktop }: { isDesktop: boolean }) {
  return (
    <View style={{ alignItems: 'center', paddingTop: 160, paddingBottom: 80, paddingHorizontal: 24 }}>
      <Animated.View
        entering={FadeInUp.delay(200).springify()}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          backgroundColor: 'rgba(27, 190, 255, 0.12)',
          borderWidth: 1,
          borderColor: 'rgba(27, 190, 255, 0.28)',
          paddingHorizontal: 16,
          paddingVertical: 6,
          borderRadius: 99,
          marginBottom: 32,
        }}
      >
        <View
          style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: BRAND.electricBlue,
            shadowColor: BRAND.electricBlue,
            shadowOpacity: 1,
            shadowRadius: 8,
          }}
        />
        <Text style={{ color: BRAND.skyBlue, fontSize: 12, fontWeight: '600', letterSpacing: 0.5 }}>
          WORK IN PROGRESS
        </Text>
      </Animated.View>

      <Animated.Text
        entering={FadeInUp.delay(300).springify()}
        style={{
          fontSize: isDesktop ? 84 : 52,
          fontWeight: '900',
          color: BRAND.text,
          letterSpacing: -3,
          textAlign: 'center',
          lineHeight: isDesktop ? 90 : 56,
        }}
      >
        Write once. <Text style={{ color: BRAND.electricBlue }}>Thrill</Text> everywhere.
      </Animated.Text>

      <Animated.Text
        entering={FadeInUp.delay(400).springify()}
        style={{
          fontSize: isDesktop ? 20 : 16,
          color: BRAND.textMuted,
          textAlign: 'center',
          maxWidth: 600,
          marginTop: 24,
          lineHeight: 30,
        }}
      >
        The ultimate headless, beautifully styled component library for Expo. Deliver flawless UIs on iOS, Android,
        and Web simultaneously.
      </Animated.Text>

      <Animated.View entering={FadeInUp.delay(500).springify()} style={{ flexDirection: 'row', gap: 16, marginTop: 40 }}>
        <Pressable
          style={{
            backgroundColor: BRAND.electricBlue,
            paddingHorizontal: 32,
            paddingVertical: 16,
            borderRadius: 14,
            shadowColor: BRAND.electricBlue,
            shadowOpacity: 0.35,
            shadowRadius: 20,
            shadowOffset: { width: 0, height: 8 },
          }}
        >
          <Text style={{ color: BRAND.bg, fontSize: 16, fontWeight: '700' }}>Explore Documentation</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: 'rgba(8, 29, 50, 0.6)',
            borderWidth: 1,
            borderColor: BRAND.border,
            paddingHorizontal: 32,
            paddingVertical: 16,
            borderRadius: 14,
          }}
        >
          <Text style={{ color: BRAND.text, fontSize: 16, fontWeight: '600' }}>npm install</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

function ShowcaseArea({ isDesktop }: { isDesktop: boolean }) {
  return (
    <View style={{ height: 500, alignItems: 'center', justifyContent: 'center', marginTop: 40, overflow: 'hidden' }}>
      <View
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          backgroundColor: BRAND.electricBlue,
          opacity: 0.08,
          borderRadius: 300,
          filter: 'blur(100px)' as any,
        }}
      />

      <FloatingElement delay={0} duration={4000} translateY={-10}>
        <View
          style={{
            width: 320,
            height: 420,
            backgroundColor: 'rgba(8, 20, 38, 0.8)',
            borderWidth: 1,
            borderColor: BRAND.border,
            borderRadius: 24,
            padding: 24,
            backdropFilter: 'blur(20px)' as any,
            shadowColor: '#000',
            shadowOpacity: 0.5,
            shadowRadius: 30,
            shadowOffset: { width: 0, height: 20 },
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 }}>
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: BRAND.deepBlue }} />
            <View style={{ width: 80, height: 12, borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.14)', marginTop: 14 }} />
          </View>
          <View style={{ height: 120, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.06)', marginBottom: 16 }} />
          <View style={{ height: 60, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.06)', marginBottom: 16 }} />
          <View
            style={{
              height: 60,
              borderRadius: 16,
              backgroundColor: BRAND.electricBlue,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View style={{ width: 100, height: 12, borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.5)' }} />
          </View>
        </View>
      </FloatingElement>

      {isDesktop && (
        <>
          <FloatingElement
            delay={500}
            duration={3500}
            translateY={20}
            style={{ position: 'absolute', left: 'calc(50% - 350px)' }}
          >
            <View
              style={{
                width: 180,
                height: 180,
                backgroundColor: BRAND.surface,
                borderWidth: 1,
                borderColor: BRAND.border,
                borderRadius: 24,
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  borderWidth: 8,
                  borderColor: BRAND.electricBlue,
                  borderRightColor: 'transparent',
                  transform: [{ rotate: '45deg' }],
                }}
              />
              <Text style={{ color: BRAND.text, marginTop: 16, fontWeight: '700' }}>78% Usage</Text>
            </View>
          </FloatingElement>

          <FloatingElement
            delay={1000}
            duration={4500}
            translateY={-25}
            style={{ position: 'absolute', right: 'calc(50% - 380px)' }}
          >
            <View
              style={{
                width: 220,
                height: 140,
                backgroundColor: BRAND.surface,
                borderWidth: 1,
                borderColor: BRAND.border,
                borderRadius: 24,
                padding: 20,
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ color: BRAND.textMuted, fontSize: 13, fontWeight: '600' }}>Enable Analytics</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: BRAND.text, fontSize: 18, fontWeight: '700' }}>Active</Text>
                <View
                  style={{
                    width: 50,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: BRAND.electricBlue,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    padding: 4,
                  }}
                >
                  <View style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: BRAND.white }} />
                </View>
              </View>
            </View>
          </FloatingElement>
        </>
      )}
    </View>
  );
}

function BrowseContent({ isDesktop }: { isDesktop: boolean }) {
  return (
    <View style={{ paddingHorizontal: isDesktop ? '10%' : 24, paddingTop: 120, paddingBottom: 80 }}>
      <Animated.Text entering={FadeInUp.delay(200)} style={{ fontSize: 40, fontWeight: '900', color: BRAND.text, letterSpacing: -1 }}>
        Building blocks of <Text style={{ color: BRAND.electricBlue }}>perfection</Text>.
      </Animated.Text>
      <Text style={{ fontSize: 16, color: BRAND.textMuted, marginTop: 12, marginBottom: 48, maxWidth: 500, lineHeight: 26 }}>
        Stop writing boilerplates. Use our meticulously crafted components to build your SaaS instantly.
      </Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20 }}>
        {COMPONENTS.map((comp, idx) => (
          <Animated.View
            key={comp.name}
            entering={FadeInUp.delay(300 + idx * 100).springify()}
            style={{ width: isDesktop ? ('calc(33.33% - 14px)' as any) : '100%' }}
          >
            <Pressable
              style={({ pressed, hovered }: any) => ({
                backgroundColor: hovered ? 'rgba(13, 37, 62, 0.82)' : 'rgba(7, 17, 32, 0.62)',
                borderWidth: 1,
                borderColor: hovered ? comp.color : BRAND.border,
                borderRadius: 20,
                padding: 32,
                transform: [{ scale: pressed ? 0.96 : 1 }],
                transition: 'all 0.3s ease',
              })}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  backgroundColor: `${comp.color}20`,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 24,
                }}
              >
                <View style={{ width: 20, height: 20, borderRadius: 6, backgroundColor: comp.color }} />
              </View>
              <Text style={{ color: BRAND.text, fontSize: 20, fontWeight: '800', marginBottom: 8 }}>{comp.name}</Text>
              <Text style={{ color: BRAND.textMuted, fontSize: 14, lineHeight: 22 }}>{comp.desc}</Text>
            </Pressable>
          </Animated.View>
        ))}
      </View>
    </View>
  );
}

function ConnectType({ isDesktop }: { isDesktop: boolean }) {
  return (
    <View style={{ paddingHorizontal: isDesktop ? '10%' : 24, paddingVertical: 100 }}>
      <View
        style={{
          backgroundColor: 'rgba(13, 78, 147, 0.18)',
          borderWidth: 1,
          borderColor: BRAND.border,
          borderRadius: 32,
          padding: isDesktop ? 64 : 32,
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: -100,
            width: 300,
            height: 300,
            backgroundColor: BRAND.electricBlue,
            opacity: 0.2,
            filter: 'blur(80px)' as any,
            borderRadius: 150,
          }}
        />

        <Text
          style={{
            fontSize: isDesktop ? 48 : 36,
            fontWeight: '900',
            color: BRAND.text,
            textAlign: 'center',
            letterSpacing: -1,
            marginBottom: 16,
          }}
        >
          Join the movement.
        </Text>
        <Text style={{ fontSize: 16, color: BRAND.textMuted, textAlign: 'center', maxWidth: 400, marginBottom: 40, lineHeight: 26 }}>
          Cross Bits is open source. Come build the future of cross-platform UI with us.
        </Text>

        <View style={{ flexDirection: isDesktop ? 'row' : 'column', gap: 16, width: '100%', justifyContent: 'center' }}>
          {['GitHub', 'Discord', 'Twitter'].map((social) => (
            <Pressable
              key={social}
              style={{
                backgroundColor: 'rgba(8, 24, 43, 0.65)',
                borderWidth: 1,
                borderColor: BRAND.border,
                paddingVertical: 16,
                paddingHorizontal: 32,
                borderRadius: 16,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: BRAND.text, fontSize: 16, fontWeight: '600' }}>{social}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}

function Footer({ isDesktop }: { isDesktop: boolean }) {
  return (
    <View
      style={{
        borderTopWidth: 1,
        borderTopColor: BRAND.border,
        paddingHorizontal: isDesktop ? '10%' : 24,
        paddingVertical: 40,
        flexDirection: isDesktop ? 'row' : 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <BrandMark size={28} idSuffix="footer" />
        <Text style={{ color: BRAND.text, fontWeight: '800', fontSize: 16 }}>Cross Bits</Text>
      </View>

      <Text style={{ color: 'rgba(233, 247, 255, 0.45)', fontSize: 14 }}>(c) 2026 Cross Bits Project. All rights reserved.</Text>

      <View style={{ flexDirection: 'row', gap: 24 }}>
        <Text style={{ color: BRAND.textMuted, fontSize: 14 }}>Privacy</Text>
        <Text style={{ color: BRAND.textMuted, fontSize: 14 }}>Terms</Text>
      </View>
    </View>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function WebLandingPage() {
  const { width } = useWindowDimensions();
  const isDesktop = width > 768;

  return (
    <View style={{ flex: 1, backgroundColor: BRAND.bg }}>
      <GlassyNav />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <HeroSection isDesktop={isDesktop} />
        <ShowcaseArea isDesktop={isDesktop} />
        <BrowseContent isDesktop={isDesktop} />
        <ConnectType isDesktop={isDesktop} />
        <Footer isDesktop={isDesktop} />
      </ScrollView>
    </View>
  );
}

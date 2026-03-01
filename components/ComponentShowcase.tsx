import { View, Text, Pressable, ScrollView } from 'react-native';

const COMPONENTS = [
  { name: 'Button',       desc: 'Pressable with variants, sizes & haptics',  tag: 'Core',        color: '#6e54ff' },
  { name: 'Card',         desc: 'Elevated container with header and footer',  tag: 'Layout',      color: '#ff54c8' },
  { name: 'Dialog',       desc: 'Accessible modal with overlay & animation',  tag: 'Overlay',     color: '#54ffcb' },
  { name: 'Switch',       desc: 'iOS-style toggle using rn-primitives',       tag: 'Input',       color: '#ffb054' },
  { name: 'Checkbox',     desc: 'Accessible checkbox with animated check',    tag: 'Input',       color: '#6e54ff' },
  { name: 'Progress',     desc: 'Animated progress bar with color variants',  tag: 'Feedback',    color: '#ff54c8' },
  { name: 'Badge',        desc: 'Status labels with multiple variants',       tag: 'Display',     color: '#54ffcb' },
  { name: 'Avatar',       desc: 'Image with fallback initials & status dot',  tag: 'Display',     color: '#ffb054' },
  { name: 'Select',       desc: 'Native dropdown using rn-primitives',        tag: 'Input',       color: '#6e54ff' },
  { name: 'Slider',       desc: 'Touch-friendly range slider component',      tag: 'Input',       color: '#ff54c8' },
  { name: 'Separator',    desc: 'Horizontal and vertical divider line',       tag: 'Layout',      color: '#54ffcb' },
  { name: 'Text',         desc: 'Typography with iOS-style size variants',    tag: 'Core',        color: '#ffb054' },
];

const TAG_COLORS: Record<string, string> = {
  Core:     'rgba(110,84,255,0.15)',
  Layout:   'rgba(255,84,200,0.12)',
  Overlay:  'rgba(84,255,203,0.12)',
  Input:    'rgba(255,176,84,0.12)',
  Feedback: 'rgba(110,84,255,0.12)',
  Display:  'rgba(84,255,203,0.12)',
};

const TAG_TEXT: Record<string, string> = {
  Core:     '#a08bff',
  Layout:   '#ff90e0',
  Overlay:  '#54ffcb',
  Input:    '#ffb054',
  Feedback: '#a08bff',
  Display:  '#54ffcb',
};

export function ComponentShowcase() {
  return (
    <View style={{ paddingHorizontal: 48, paddingBottom: 80 }}>

      {/* SECTION HEADER */}
      <View style={{ marginBottom: 48, alignItems: 'center' }}>
        <View style={{
          flexDirection: 'row', alignItems: 'center', gap: 8,
          backgroundColor: 'rgba(110,84,255,0.1)',
          borderWidth: 1, borderColor: 'rgba(110,84,255,0.2)',
          paddingHorizontal: 14, paddingVertical: 6,
          borderRadius: 99, marginBottom: 20,
        }}>
          <Text style={{ color: '#a08bff', fontSize: 12, fontWeight: '600', letterSpacing: 0.5 }}>
            ALL COMPONENTS
          </Text>
        </View>
        <Text style={{
          color: '#fff', fontSize: 40, fontWeight: '900',
          letterSpacing: -1.5, textAlign: 'center', marginBottom: 12,
        }}>
          Everything you need
        </Text>
        <Text style={{
          color: '#4a4a6a', fontSize: 16, textAlign: 'center',
          maxWidth: 480, lineHeight: 26,
        }}>
          Production-ready components built with rn-primitives and NativeWind. Works on iOS, Android, and Web.
        </Text>
      </View>

      {/* GRID */}
      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
      }}>
        {COMPONENTS.map((comp) => (
          <Pressable
            key={comp.name}
            style={({ pressed, hovered }: any) => ({
              width: 'calc(33.33% - 11px)' as any,
              backgroundColor: pressed || hovered
                ? 'rgba(255,255,255,0.05)'
                : 'rgba(255,255,255,0.02)',
              borderWidth: 1,
              borderColor: pressed || hovered
                ? 'rgba(110,84,255,0.3)'
                : 'rgba(255,255,255,0.06)',
              borderRadius: 20,
              padding: 24,
              transform: [{ scale: pressed ? 0.98 : 1 }],
              transition: 'all 0.2s' as any,
            })}
          >
            {/* TOP ROW */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 14,
            }}>
              {/* ICON */}
              <View style={{
                width: 44, height: 44, borderRadius: 12,
                backgroundColor: `${comp.color}18`,
                alignItems: 'center', justifyContent: 'center',
              }}>
                <View style={{
                  width: 18, height: 18, borderRadius: 4,
                  backgroundColor: comp.color, opacity: 0.9,
                }} />
              </View>

              {/* TAG */}
              <View style={{
                backgroundColor: TAG_COLORS[comp.tag],
                paddingHorizontal: 10, paddingVertical: 4,
                borderRadius: 99,
              }}>
                <Text style={{
                  color: TAG_TEXT[comp.tag],
                  fontSize: 10, fontWeight: '700', letterSpacing: 0.5,
                }}>
                  {comp.tag}
                </Text>
              </View>
            </View>

            {/* NAME */}
            <Text style={{
              color: '#fff', fontSize: 16,
              fontWeight: '700', marginBottom: 6,
            }}>
              {comp.name}
            </Text>

            {/* DESC */}
            <Text style={{
              color: '#4a4a6a', fontSize: 13, lineHeight: 20,
            }}>
              {comp.desc}
            </Text>

            {/* ARROW */}
            <Text style={{
              color: 'rgba(110,84,255,0.5)',
              fontSize: 18, marginTop: 16,
            }}>
              →
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
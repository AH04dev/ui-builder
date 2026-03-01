import { View, Text, Pressable } from 'react-native';

export function Navbar() {
  return (
    <View style={{
      position: 'fixed' as any,
      top: 0, left: 0, right: 0,
      zIndex: 100,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 48,
      paddingVertical: 20,
      backgroundColor: 'rgba(4,4,10,0.8)',
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255,255,255,0.06)',
      backdropFilter: 'blur(12px)' as any,
    }}>
      {/* LOGO */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View style={{
          width: 32, height: 32, borderRadius: 8,
          backgroundColor: '#6e54ff',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <Text style={{ color: '#fff', fontWeight: '800', fontSize: 14 }}>C</Text>
        </View>
        <Text style={{ color: '#fff', fontWeight: '800', fontSize: 16, letterSpacing: -0.5 }}>
          Crossbits
        </Text>
      </View>

      {/* LINKS */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 32 }}>
        {['Components', 'Docs', 'GitHub'].map((link) => (
          <Pressable key={link}>
            <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: '500' }}>
              {link}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* CTA */}
      <Pressable style={({ pressed }) => ({
        backgroundColor: '#6e54ff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        opacity: pressed ? 0.85 : 1,
      })}>
        <Text style={{ color: '#fff', fontWeight: '700', fontSize: 13 }}>
          Get Started →
        </Text>
      </Pressable>
    </View>
  );
}
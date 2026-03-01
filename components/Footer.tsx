import { View, Text, Pressable } from 'react-native';

export function Footer() {
  return (
    <View style={{
      borderTopWidth: 1,
      borderTopColor: 'rgba(255,255,255,0.06)',
      paddingHorizontal: 48,
      paddingVertical: 32,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#04040a',
    }}>
      <Text style={{ color: '#4a4a6a', fontSize: 13 }}>
        © 2026 Crossbits. Built with Expo & NativeWind.
      </Text>
      <View style={{ flexDirection: 'row', gap: 24 }}>
        {['GitHub', 'Twitter', 'Discord'].map((link) => (
          <Pressable key={link}>
            <Text style={{ color: '#4a4a6a', fontSize: 13 }}>{link}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
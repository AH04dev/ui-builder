export interface RegistryItem {
  name: string;
  slug: string;
  description: string;
  category: 'component' | 'animation';
  dependencies: string[];
  file: string;
  preview: string;
  props: {
    name: string;
    type: string;
    default?: string;
    description: string;
  }[];
}

export const registry: RegistryItem[] = [
  {
    name: 'Animated Button',
    slug: 'animated-button',
    description: 'Pressable button with spring scaling and optional gradient skin.',
    category: 'component',
    dependencies: ['react-native-reanimated', 'react-native-linear-gradient'],
    file: 'components/animated-button.tsx',
    preview: 'components/animated-button',
    props: [
      { name: 'title', type: 'string', description: 'Button label' },
      { name: 'onPress', type: '() => void', description: 'Press callback' },
      { name: 'variant', type: "'solid' | 'outline' | 'ghost'", default: "'solid'", description: 'Visual style' },
      { name: 'gradientColors', type: '[string, string]', default: "['#10B981', '#06B6D4']", description: 'Gradient colors' },
    ],
  },
  {
    name: 'Glass Card',
    slug: 'glass-card',
    description: 'Blurred frosted card surface for profile and billing modules.',
    category: 'component',
    dependencies: ['react-native-reanimated', 'expo-blur'],
    file: 'components/glass-card.tsx',
    preview: 'components/glass-card',
    props: [
      { name: 'children', type: 'ReactNode', description: 'Card content' },
      { name: 'intensity', type: 'number', default: '40', description: 'Blur intensity' },
      { name: 'tint', type: "'dark' | 'light'", default: "'dark'", description: 'Blur tint' },
    ],
  },
  {
    name: 'Input Field',
    slug: 'input-field',
    description: 'Input field with floating label and animated focus state.',
    category: 'component',
    dependencies: ['react-native-reanimated'],
    file: 'components/input-field.tsx',
    preview: 'components/input-field',
    props: [
      { name: 'label', type: 'string', description: 'Field label' },
      { name: 'value', type: 'string', description: 'Current value' },
      { name: 'onChangeText', type: '(text: string) => void', description: 'Change callback' },
      { name: 'error', type: 'string', description: 'Validation message' },
    ],
  },
  {
    name: 'Toggle Switch',
    slug: 'toggle-switch',
    description: 'Compact switch with smooth thumb motion and custom colors.',
    category: 'component',
    dependencies: ['react-native-reanimated'],
    file: 'components/toggle-switch.tsx',
    preview: 'components/toggle-switch',
    props: [
      { name: 'value', type: 'boolean', description: 'Active state' },
      { name: 'onToggle', type: '(value: boolean) => void', description: 'Toggle callback' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Switch size' },
    ],
  },
  {
    name: 'Notification Toast',
    slug: 'notification-toast',
    description: 'Slide toast with status presets and swipe dismissal.',
    category: 'component',
    dependencies: ['react-native-reanimated', 'react-native-gesture-handler'],
    file: 'components/notification-toast.tsx',
    preview: 'components/notification-toast',
    props: [
      { name: 'message', type: 'string', description: 'Toast message' },
      { name: 'type', type: "'success' | 'error' | 'warning' | 'info'", default: "'info'", description: 'Toast variant' },
      { name: 'duration', type: 'number', default: '3000', description: 'Auto dismiss in ms' },
    ],
  },
  {
    name: 'Floating Action Button',
    slug: 'floating-action-button',
    description: 'Floating button with spring interactions and gradient fill.',
    category: 'component',
    dependencies: ['react-native-reanimated', 'react-native-linear-gradient'],
    file: 'components/floating-action-button.tsx',
    preview: 'components/floating-action-button',
    props: [
      { name: 'icon', type: 'ReactNode', description: 'Displayed icon' },
      { name: 'onPress', type: '() => void', description: 'Press callback' },
      { name: 'size', type: 'number', default: '56', description: 'Diameter in px' },
    ],
  },
  {
    name: 'Progress Ring',
    slug: 'progress-ring',
    description: 'Circular progress with animated gradient arc and center label.',
    category: 'component',
    dependencies: ['react-native-reanimated', 'react-native-svg'],
    file: 'components/progress-ring.tsx',
    preview: 'components/progress-ring',
    props: [
      { name: 'progress', type: 'number', description: 'Progress 0-100' },
      { name: 'size', type: 'number', default: '96', description: 'Ring diameter' },
      { name: 'animated', type: 'boolean', default: 'true', description: 'Animate value changes' },
    ],
  },
  {
    name: 'Skeleton Loader',
    slug: 'skeleton-loader',
    description: 'Shimmer placeholder block for loading states.',
    category: 'component',
    dependencies: ['react-native-reanimated', 'react-native-linear-gradient'],
    file: 'components/skeleton-loader.tsx',
    preview: 'components/skeleton-loader',
    props: [
      { name: 'width', type: 'number | string', default: "'100%'", description: 'Skeleton width' },
      { name: 'height', type: 'number', default: '16', description: 'Skeleton height' },
      { name: 'borderRadius', type: 'number', default: '8', description: 'Corner radius' },
    ],
  },
  {
    name: 'OTP Input',
    slug: 'otp-input',
    description: 'Verification input with one-cell-per-digit focus flow.',
    category: 'component',
    dependencies: ['react-native-reanimated'],
    file: 'components/otp-input.tsx',
    preview: 'components/otp-input',
    props: [
      { name: 'length', type: 'number', default: '6', description: 'Number of input cells' },
      { name: 'onFilled', type: '(code: string) => void', description: 'Triggered when all cells are filled' },
      { name: 'autoFocus', type: 'boolean', default: 'true', description: 'Focus first cell on mount' },
    ],
  },
  {
    name: 'Segmented Control',
    slug: 'segmented-control',
    description: 'Sliding segmented tabs for view or filter selection.',
    category: 'component',
    dependencies: ['react-native-reanimated'],
    file: 'components/segmented-control.tsx',
    preview: 'components/segmented-control',
    props: [
      { name: 'options', type: 'string[]', description: 'Segment labels' },
      { name: 'value', type: 'string', description: 'Active option' },
      { name: 'onChange', type: '(value: string) => void', description: 'Selection callback' },
    ],
  },
  {
    name: 'Chat Bubble',
    slug: 'chat-bubble',
    description: 'Chat message bubble with sender variants and timestamp.',
    category: 'component',
    dependencies: ['react-native-reanimated'],
    file: 'components/chat-bubble.tsx',
    preview: 'components/chat-bubble',
    props: [
      { name: 'sender', type: "'self' | 'bot' | 'other'", description: 'Message owner' },
      { name: 'message', type: 'string', description: 'Message text' },
      { name: 'time', type: 'string', description: 'Timestamp label' },
    ],
  },
  {
    name: 'Bottom Sheet Handle',
    slug: 'bottom-sheet-handle',
    description: 'Handle bar and snap utility for bottom-sheet surfaces.',
    category: 'component',
    dependencies: ['react-native-reanimated', 'react-native-gesture-handler'],
    file: 'components/bottom-sheet-handle.tsx',
    preview: 'components/bottom-sheet-handle',
    props: [
      { name: 'snapPoints', type: 'number[]', description: 'Supported snap fractions' },
      { name: 'onSnap', type: '(index: number) => void', description: 'Snap callback' },
      { name: 'initialIndex', type: 'number', default: '0', description: 'Initial snap index' },
    ],
  },

  {
    name: 'Fade In Up',
    slug: 'fade-in-up',
    description: 'Reveal children by fading and translating up.',
    category: 'animation',
    dependencies: ['react-native-reanimated'],
    file: 'animations/fade-in-up.tsx',
    preview: 'animations/fade-in-up',
    props: [
      { name: 'children', type: 'ReactNode', description: 'Animated content' },
      { name: 'delay', type: 'number', default: '0', description: 'Delay in ms' },
      { name: 'duration', type: 'number', default: '600', description: 'Duration in ms' },
    ],
  },
  {
    name: 'Scale Pop',
    slug: 'scale-pop',
    description: 'Elastic pop-in animation for icons and badges.',
    category: 'animation',
    dependencies: ['react-native-reanimated'],
    file: 'animations/scale-pop.tsx',
    preview: 'animations/scale-pop',
    props: [
      { name: 'children', type: 'ReactNode', description: 'Animated content' },
      { name: 'stiffness', type: 'number', default: '120', description: 'Spring stiffness' },
      { name: 'damping', type: 'number', default: '12', description: 'Spring damping' },
    ],
  },
  {
    name: 'Rotate In',
    slug: 'rotate-in',
    description: 'Rotating entrance with scale-up for playful UI accents.',
    category: 'animation',
    dependencies: ['react-native-reanimated'],
    file: 'animations/rotate-in.tsx',
    preview: 'animations/rotate-in',
    props: [
      { name: 'children', type: 'ReactNode', description: 'Animated content' },
      { name: 'degrees', type: 'number', default: '300', description: 'Rotation amount' },
      { name: 'duration', type: 'number', default: '700', description: 'Duration in ms' },
    ],
  },
  {
    name: 'Slide In Right',
    slug: 'slide-in-right',
    description: 'Move in from the right edge for panel transitions.',
    category: 'animation',
    dependencies: ['react-native-reanimated'],
    file: 'animations/slide-in-right.tsx',
    preview: 'animations/slide-in-right',
    props: [
      { name: 'children', type: 'ReactNode', description: 'Animated content' },
      { name: 'offset', type: 'number', default: '80', description: 'Initial x offset' },
      { name: 'duration', type: 'number', default: '500', description: 'Duration in ms' },
    ],
  },
  {
    name: 'Bounce',
    slug: 'bounce',
    description: 'Looping vertical bounce useful for hint indicators.',
    category: 'animation',
    dependencies: ['react-native-reanimated'],
    file: 'animations/bounce.tsx',
    preview: 'animations/bounce',
    props: [
      { name: 'children', type: 'ReactNode', description: 'Animated content' },
      { name: 'height', type: 'number', default: '18', description: 'Bounce distance' },
      { name: 'duration', type: 'number', default: '650', description: 'Cycle duration' },
    ],
  },
  {
    name: 'Flip',
    slug: 'flip',
    description: '3D horizontal or vertical flip transition.',
    category: 'animation',
    dependencies: ['react-native-reanimated'],
    file: 'animations/flip.tsx',
    preview: 'animations/flip',
    props: [
      { name: 'children', type: 'ReactNode', description: 'Animated content' },
      { name: 'direction', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Flip axis' },
      { name: 'duration', type: 'number', default: '800', description: 'Duration in ms' },
    ],
  },
  {
    name: 'Shimmer',
    slug: 'shimmer',
    description: 'Horizontal light sweep for skeleton placeholders.',
    category: 'animation',
    dependencies: ['react-native-reanimated', 'react-native-linear-gradient'],
    file: 'animations/shimmer.tsx',
    preview: 'animations/shimmer',
    props: [
      { name: 'width', type: 'number', default: '180', description: 'Shimmer width' },
      { name: 'height', type: 'number', default: '16', description: 'Shimmer height' },
      { name: 'duration', type: 'number', default: '1300', description: 'Cycle duration' },
    ],
  },
  {
    name: 'Stagger List',
    slug: 'stagger-list',
    description: 'Applies staggered reveal to list children.',
    category: 'animation',
    dependencies: ['react-native-reanimated'],
    file: 'animations/stagger-list.tsx',
    preview: 'animations/stagger-list',
    props: [
      { name: 'children', type: 'ReactNode[]', description: 'List rows' },
      { name: 'staggerDelay', type: 'number', default: '80', description: 'Delay between rows' },
      { name: 'duration', type: 'number', default: '420', description: 'Per-item duration' },
    ],
  },
  {
    name: 'Parallax Tilt',
    slug: 'parallax-tilt',
    description: 'Interactive tilt effect for cards and media previews.',
    category: 'animation',
    dependencies: ['react-native-reanimated', 'react-native-gesture-handler'],
    file: 'animations/parallax-tilt.tsx',
    preview: 'animations/parallax-tilt',
    props: [
      { name: 'children', type: 'ReactNode', description: 'Animated content' },
      { name: 'intensity', type: 'number', default: '10', description: 'Maximum tilt degrees' },
      { name: 'perspective', type: 'number', default: '650', description: '3D perspective value' },
    ],
  },
  {
    name: 'Spring Reveal',
    slug: 'spring-reveal',
    description: 'Spring-based reveal from x or y axis.',
    category: 'animation',
    dependencies: ['react-native-reanimated'],
    file: 'animations/spring-reveal.tsx',
    preview: 'animations/spring-reveal',
    props: [
      { name: 'children', type: 'ReactNode', description: 'Animated content' },
      { name: 'axis', type: "'x' | 'y'", default: "'y'", description: 'Reveal axis' },
      { name: 'from', type: 'number', default: '24', description: 'Initial offset value' },
    ],
  },
  {
    name: 'Swipe Dismiss',
    slug: 'swipe-dismiss',
    description: 'Swipe-to-dismiss wrapper with threshold callback.',
    category: 'animation',
    dependencies: ['react-native-reanimated', 'react-native-gesture-handler'],
    file: 'animations/swipe-dismiss.tsx',
    preview: 'animations/swipe-dismiss',
    props: [
      { name: 'children', type: 'ReactNode', description: 'Dismissable content' },
      { name: 'threshold', type: 'number', default: '80', description: 'Dismiss threshold in px' },
      { name: 'onDismiss', type: '() => void', description: 'Dismiss callback' },
    ],
  },
  {
    name: 'Number Counter',
    slug: 'number-counter',
    description: 'Animated numeric transitions for KPI values.',
    category: 'animation',
    dependencies: ['react-native-reanimated'],
    file: 'animations/number-counter.tsx',
    preview: 'animations/number-counter',
    props: [
      { name: 'from', type: 'number', default: '0', description: 'Initial value' },
      { name: 'to', type: 'number', description: 'Target value' },
      { name: 'duration', type: 'number', default: '900', description: 'Animation duration in ms' },
    ],
  },
];

export const components = registry.filter((item) => item.category === 'component');
export const animations = registry.filter((item) => item.category === 'animation');

export function getRegistryItem(slug: string): RegistryItem | undefined {
  return registry.find((item) => item.slug === slug);
}

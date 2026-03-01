export type RegistryFileType =
  | 'registry:lib'
  | 'registry:block'
  | 'registry:component'
  | 'registry:ui'
  | 'registry:hook'
  | 'registry:theme'
  | 'registry:page'
  | 'registry:file'
  | 'registry:base'
  | 'registry:item';

export interface RegistrySourceFile {
  sourcePath: string;
  type: RegistryFileType;
  target?: string;
}

export interface RegistryCatalogItem {
  name: string;
  type: RegistryFileType;
  title: string;
  description: string;
  author: string;
  dependencies?: string[];
  registryDependencies?: string[];
  categories?: string[];
  docs?: string;
  envVars?: Record<string, string>;
  files: RegistrySourceFile[];
}

export const SHADCN_REGISTRY_NAME = 'native-bits';
export const SHADCN_REGISTRY_NAMESPACE = '@native-bits';
export const DEFAULT_REGISTRY_URL_TEMPLATE = 'http://localhost:3000/r/{name}.json';

// ---------------------------------------------------------------------------
// Helper to generate usage docs
// ---------------------------------------------------------------------------
function componentDocs(importPath: string, usage: string): string {
  return [
    '### Usage',
    '```tsx',
    `import { ${importPath.split('/').pop()} } from '@/components/native-bits/${importPath}'`,
    '',
    usage,
    '```',
  ].join('\n');
}

// ---------------------------------------------------------------------------
// Catalog — blocks (existing 3) + 12 components + 12 animations
// ---------------------------------------------------------------------------
export const shadcnRegistryCatalog: RegistryCatalogItem[] = [
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  BLOCKS (existing)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    name: 'dashboard',
    type: 'registry:block',
    title: 'Mobile Analytics Dashboard',
    description:
      'Animated dashboard shell with KPI cards, tabs, and progress bars built for shadcn/ui.',
    author: 'native-bits <https://nativebits.dev>',
    dependencies: ['framer-motion', 'lucide-react'],
    registryDependencies: ['badge', 'button', 'card', 'progress', 'tabs'],
    categories: ['dashboard', 'analytics', 'mobile'],
    docs: [
      '### Usage',
      '```tsx',
      "import { DashboardShell } from '@/components/native-bits/dashboard-shell'",
      '',
      'export default function Page() {',
      '  return <DashboardShell />',
      '}',
      '```',
    ].join('\n'),
    files: [
      {
        sourcePath: 'blocks/dashboard/dashboard-shell.tsx',
        type: 'registry:block',
        target: 'components/native-bits/dashboard-shell.tsx',
      },
      {
        sourcePath: 'blocks/dashboard/metric-card.tsx',
        type: 'registry:block',
        target: 'components/native-bits/metric-card.tsx',
      },
    ],
  },
  {
    name: 'motion-kpi',
    type: 'registry:component',
    title: 'Motion KPI Counter',
    description:
      'Animated KPI card with spring-driven count-up values and subtle gradient surfaces.',
    author: 'native-bits <https://nativebits.dev>',
    dependencies: ['framer-motion'],
    registryDependencies: ['badge', 'card'],
    categories: ['analytics', 'counter', 'animation'],
    docs: [
      '### Usage',
      '```tsx',
      "import { MotionKpi } from '@/components/native-bits/motion-kpi'",
      '',
      '<MotionKpi label="WAU" value={184320} suffix="+12.3%" />',
      '```',
    ].join('\n'),
    files: [
      {
        sourcePath: 'blocks/motion/motion-kpi.tsx',
        type: 'registry:component',
        target: 'components/native-bits/motion-kpi.tsx',
      },
    ],
  },
  {
    name: 'stripe-pricing',
    type: 'registry:block',
    title: 'Stripe Pricing Block',
    description:
      'Pricing cards with monthly and lifetime plans plus a Stripe Checkout API route.',
    author: 'native-bits <https://nativebits.dev>',
    dependencies: ['framer-motion', 'lucide-react', 'stripe', 'zod'],
    registryDependencies: ['badge', 'button', 'card', 'separator'],
    categories: ['payments', 'pricing', 'stripe'],
    envVars: {
      STRIPE_SECRET_KEY: 'sk_live_xxx',
      STRIPE_PRICE_MONTHLY: 'price_monthly_xxx',
      STRIPE_PRICE_LIFETIME: 'price_lifetime_xxx',
      NEXT_PUBLIC_SITE_URL: 'https://your-domain.com',
    },
    docs: [
      '### Usage',
      '```tsx',
      "import { StripePricing } from '@/components/native-bits/stripe-pricing'",
      '',
      '<StripePricing />',
      '```',
      '',
      '### Next Step',
      'Create your Stripe products and copy their price IDs into your `.env` file.',
    ].join('\n'),
    files: [
      {
        sourcePath: 'blocks/stripe/stripe-pricing.tsx',
        type: 'registry:block',
        target: 'components/native-bits/stripe-pricing.tsx',
      },
      {
        sourcePath: 'blocks/stripe/pricing.ts',
        type: 'registry:file',
        target: 'lib/native-bits/pricing.ts',
      },
      {
        sourcePath: 'blocks/stripe/checkout-route.ts',
        type: 'registry:file',
        target: 'app/api/stripe/checkout/route.ts',
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  COMPONENTS (12)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    name: 'animated-button',
    type: 'registry:component',
    title: 'Animated Button',
    description: 'Pressable button with spring scaling and optional gradient skin.',
    author: 'native-bits <https://nativebits.dev>',
    dependencies: ['react-native-reanimated', 'react-native-linear-gradient'],
    categories: ['actions', 'cta', 'mobile'],
    docs: componentDocs(
      'animated-button',
      '<AnimatedButton title="Continue" variant="solid" onPress={onContinue} />'
    ),
    files: [
      {
        sourcePath: 'components/animated-button.tsx',
        type: 'registry:component',
        target: 'components/native-bits/animated-button.tsx',
      },
    ],
  },
  {
    name: 'glass-card',
    type: 'registry:component',
    title: 'Glass Card',
    description: 'Blurred frosted card surface for profile and billing modules.',
    author: 'native-bits <https://nativebits.dev>',
    dependencies: ['react-native-reanimated', 'expo-blur'],
    categories: ['surfaces', 'card', 'mobile'],
    docs: componentDocs(
      'glass-card',
      '<GlassCard intensity={42}>\n  <ProfileSummary />\n</GlassCard>'
    ),
    files: [
      {
        sourcePath: 'components/glass-card.tsx',
        type: 'registry:component',
        target: 'components/native-bits/glass-card.tsx',
      },
    ],
  },
  {
    name: 'input-field',
    type: 'registry:component',
    title: 'Input Field',
    description: 'Input field with floating label and animated focus state.',
    author: 'native-bits <https://nativebits.dev>',
    dependencies: ['react-native-reanimated'],
    categories: ['forms', 'input', 'mobile'],
    docs: componentDocs(
      'input-field',
      '<InputField label="Email" value={email} onChangeText={setEmail} />'
    ),
    files: [
      {
        sourcePath: 'components/input-field.tsx',
        type: 'registry:component',
        target: 'components/native-bits/input-field.tsx',
      },
    ],
  },
  {
    name: 'toggle-switch',
    type: 'registry:component',
    title: 'Toggle Switch',
    description: 'Compact switch with smooth thumb motion and custom colors.',
    author: 'native-bits <https://nativebits.dev>',
    dependencies: ['react-native-reanimated'],
    categories: ['controls', 'settings', 'mobile'],
    docs: componentDocs(
      'toggle-switch',
      '<ToggleSwitch value={enabled} onToggle={setEnabled} />'
    ),
    files: [
      {
        sourcePath: 'components/toggle-switch.tsx',
        type: 'registry:component',
        target: 'components/native-bits/toggle-switch.tsx',
      },
    ],
  },
  {
    name: 'notification-toast',
    type: 'registry:component',
    title: 'Notification Toast',
    description: 'Slide toast with status presets and swipe dismissal.',
    author: 'native-bits <https://nativebits.dev>',
    dependencies: ['react-native-reanimated', 'react-native-gesture-handler'],
    categories: ['feedback', 'toast', 'mobile'],
    docs: componentDocs(
      'notification-toast',
      '<NotificationToast type="success" message="Saved successfully" onDismiss={hideToast} />'
    ),
    files: [
      {
        sourcePath: 'components/notification-toast.tsx',
        type: 'registry:component',
        target: 'components/native-bits/notification-toast.tsx',
      },
    ],
  },
  {
    name: 'floating-action-button',
    type: 'registry:component',
    title: 'Floating Action Button',
    description: 'Floating button with spring interactions and gradient fill.',
    author: 'native-bits <https://nativebits.dev>',
    dependencies: ['react-native-reanimated', 'react-native-linear-gradient'],
    categories: ['actions', 'navigation', 'mobile'],
    docs: componentDocs(
      'floating-action-button',
      '<FloatingActionButton icon={<PlusIcon />} onPress={openComposer} />'
    ),
    files: [
      {
        sourcePath: 'components/floating-action-button.tsx',
        type: 'registry:component',
        target: 'components/native-bits/floating-action-button.tsx',
      },
    ],
  },
  {
    name: 'progress-ring',
    type: 'registry:component',
    title: 'Progress Ring',
    description: 'Circular progress with animated gradient arc and center label.',
    author: 'native-bits <https://nativebits.dev>',
    dependencies: ['react-native-reanimated', 'react-native-svg'],
    categories: ['data-display', 'chart', 'mobile'],
    docs: componentDocs(
      'progress-ring',
      '<ProgressRing progress={72} size={96} animated />'
    ),
    files: [
      {
        sourcePath: 'components/progress-ring.tsx',
        type: 'registry:component',
        target: 'components/native-bits/progress-ring.tsx',
      },
    ],
  },
  {
    name: 'skeleton-loader',
    type: 'registry:component',
    title: 'Skeleton Loader',
    description: 'Shimmer placeholder block for loading states.',
    author: 'native-bits <https://nativebits.dev>',
    dependencies: ['react-native-reanimated', 'react-native-linear-gradient'],
    categories: ['feedback', 'loading', 'mobile'],
    docs: componentDocs(
      'skeleton-loader',
      '<SkeletonLoader width="100%" height={18} borderRadius={9} />'
    ),
    files: [
      {
        sourcePath: 'components/skeleton-loader.tsx',
        type: 'registry:component',
        target: 'components/native-bits/skeleton-loader.tsx',
      },
    ],
  },
  {
    name: 'otp-input',
    type: 'registry:component',
    title: 'OTP Input',
    description: 'Verification input with one-cell-per-digit focus flow.',
    author: 'native-bits <https://nativebits.dev>',
    dependencies: ['react-native-reanimated'],
    categories: ['forms', 'auth', 'mobile'],
    docs: componentDocs(
      'otp-input',
      '<OtpInput length={6} onFilled={verifyCode} />'
    ),
    files: [
      {
        sourcePath: 'components/otp-input.tsx',
        type: 'registry:component',
        target: 'components/native-bits/otp-input.tsx',
      },
    ],
  },
  {
    name: 'segmented-control',
    type: 'registry:component',
    title: 'Segmented Control',
    description: 'Sliding segmented tabs for view or filter selection.',
    author: 'native-bits <https://nativebits.dev>',
    dependencies: ['react-native-reanimated'],
    categories: ['controls', 'navigation', 'mobile'],
    docs: componentDocs(
      'segmented-control',
      "<SegmentedControl options={['Day', 'Week', 'Month']} value={range} onChange={setRange} />"
    ),
    files: [
      {
        sourcePath: 'components/segmented-control.tsx',
        type: 'registry:component',
        target: 'components/native-bits/segmented-control.tsx',
      },
    ],
  },
  {
    name: 'chat-bubble',
    type: 'registry:component',
    title: 'Chat Bubble',
    description: 'Chat message bubble with sender variants and timestamp.',
    author: 'native-bits <https://nativebits.dev>',
    dependencies: ['react-native-reanimated'],
    categories: ['data-display', 'messaging', 'mobile'],
    docs: componentDocs(
      'chat-bubble',
      '<ChatBubble sender="bot" message="Your ride arrives in 3 min" time="09:42" />'
    ),
    files: [
      {
        sourcePath: 'components/chat-bubble.tsx',
        type: 'registry:component',
        target: 'components/native-bits/chat-bubble.tsx',
      },
    ],
  },
  {
    name: 'bottom-sheet-handle',
    type: 'registry:component',
    title: 'Bottom Sheet Handle',
    description: 'Handle bar and snap utility for bottom-sheet surfaces.',
    author: 'native-bits <https://nativebits.dev>',
    dependencies: ['react-native-reanimated', 'react-native-gesture-handler'],
    categories: ['surfaces', 'gesture', 'mobile'],
    docs: componentDocs(
      'bottom-sheet-handle',
      '<BottomSheetHandle snapPoints={[0.25, 0.6, 0.92]} onSnap={setSnapIndex} />'
    ),
    files: [
      {
        sourcePath: 'components/bottom-sheet-handle.tsx',
        type: 'registry:component',
        target: 'components/native-bits/bottom-sheet-handle.tsx',
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  ANIMATIONS (12)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    name: 'fade-in-up',
    type: 'registry:component',
    title: 'Fade In Up',
    description: 'Reveal children by fading and translating up.',
    author: 'native-bits <https://nativebits.dev>',
    dependencies: ['react-native-reanimated'],
    categories: ['animation', 'entrance', 'mobile'],
    docs: componentDocs(
      'fade-in-up',
      '<FadeInUp delay={120}>\n  <Card />\n</FadeInUp>'
    ),
    files: [
      {
        sourcePath: 'animations/fade-in-up.tsx',
        type: 'registry:component',
        target: 'components/native-bits/fade-in-up.tsx',
      },
    ],
  },
  {
    name: 'scale-pop',
    type: 'registry:component',
    title: 'Scale Pop',
    description: 'Elastic pop-in animation for icons and badges.',
    author: 'native-bits <https://nativebits.dev>',
    dependencies: ['react-native-reanimated'],
    categories: ['animation', 'entrance', 'mobile'],
    docs: componentDocs(
      'scale-pop',
      '<ScalePop stiffness={140}>\n  <Badge />\n</ScalePop>'
    ),
    files: [
      {
        sourcePath: 'animations/scale-pop.tsx',
        type: 'registry:component',
        target: 'components/native-bits/scale-pop.tsx',
      },
    ],
  },
  {
    name: 'rotate-in',
    type: 'registry:component',
    title: 'Rotate In',
    description: 'Rotating entrance with scale-up for playful UI accents.',
    author: 'native-bits <https://nativebits.dev>',
    dependencies: ['react-native-reanimated'],
    categories: ['animation', 'entrance', 'mobile'],
    docs: componentDocs(
      'rotate-in',
      '<RotateIn degrees={260} duration={680}>\n  <ActionIcon />\n</RotateIn>'
    ),
    files: [
      {
        sourcePath: 'animations/rotate-in.tsx',
        type: 'registry:component',
        target: 'components/native-bits/rotate-in.tsx',
      },
    ],
  },
  {
    name: 'slide-in-right',
    type: 'registry:component',
    title: 'Slide In Right',
    description: 'Move in from the right edge for panel transitions.',
    author: 'native-bits <https://nativebits.dev>',
    dependencies: ['react-native-reanimated'],
    categories: ['animation', 'entrance', 'mobile'],
    docs: componentDocs(
      'slide-in-right',
      '<SlideInRight offset={80}>\n  <MenuPanel />\n</SlideInRight>'
    ),
    files: [
      {
        sourcePath: 'animations/slide-in-right.tsx',
        type: 'registry:component',
        target: 'components/native-bits/slide-in-right.tsx',
      },
    ],
  },
  {
    name: 'bounce',
    type: 'registry:component',
    title: 'Bounce',
    description: 'Looping vertical bounce useful for hint indicators.',
    author: 'native-bits <https://nativebits.dev>',
    dependencies: ['react-native-reanimated'],
    categories: ['animation', 'loop', 'mobile'],
    docs: componentDocs(
      'bounce',
      '<Bounce height={16} duration={620}>\n  <HintDot />\n</Bounce>'
    ),
    files: [
      {
        sourcePath: 'animations/bounce.tsx',
        type: 'registry:component',
        target: 'components/native-bits/bounce.tsx',
      },
    ],
  },
  {
    name: 'flip',
    type: 'registry:component',
    title: 'Flip',
    description: '3D horizontal or vertical flip transition.',
    author: 'native-bits <https://nativebits.dev>',
    dependencies: ['react-native-reanimated'],
    categories: ['animation', 'transition', 'mobile'],
    docs: componentDocs(
      'flip',
      '<Flip direction="horizontal">\n  <DealCard />\n</Flip>'
    ),
    files: [
      {
        sourcePath: 'animations/flip.tsx',
        type: 'registry:component',
        target: 'components/native-bits/flip.tsx',
      },
    ],
  },
  {
    name: 'shimmer',
    type: 'registry:component',
    title: 'Shimmer',
    description: 'Horizontal light sweep for skeleton placeholders.',
    author: 'native-bits <https://nativebits.dev>',
    dependencies: ['react-native-reanimated', 'react-native-linear-gradient'],
    categories: ['animation', 'loop', 'mobile'],
    docs: componentDocs(
      'shimmer',
      '<Shimmer width={180} height={18} />'
    ),
    files: [
      {
        sourcePath: 'animations/shimmer.tsx',
        type: 'registry:component',
        target: 'components/native-bits/shimmer.tsx',
      },
    ],
  },
  {
    name: 'stagger-list',
    type: 'registry:component',
    title: 'Stagger List',
    description: 'Applies staggered reveal to list children.',
    author: 'native-bits <https://nativebits.dev>',
    dependencies: ['react-native-reanimated'],
    categories: ['animation', 'sequence', 'mobile'],
    docs: componentDocs(
      'stagger-list',
      '<StaggerList staggerDelay={80}>\n  {items.map(renderItem)}\n</StaggerList>'
    ),
    files: [
      {
        sourcePath: 'animations/stagger-list.tsx',
        type: 'registry:component',
        target: 'components/native-bits/stagger-list.tsx',
      },
    ],
  },
  {
    name: 'parallax-tilt',
    type: 'registry:component',
    title: 'Parallax Tilt',
    description: 'Interactive tilt effect for cards and media previews.',
    author: 'native-bits <https://nativebits.dev>',
    dependencies: ['react-native-reanimated', 'react-native-gesture-handler'],
    categories: ['animation', 'interactive', 'mobile'],
    docs: componentDocs(
      'parallax-tilt',
      '<ParallaxTilt intensity={10}>\n  <MediaCard />\n</ParallaxTilt>'
    ),
    files: [
      {
        sourcePath: 'animations/parallax-tilt.tsx',
        type: 'registry:component',
        target: 'components/native-bits/parallax-tilt.tsx',
      },
    ],
  },
  {
    name: 'spring-reveal',
    type: 'registry:component',
    title: 'Spring Reveal',
    description: 'Spring-based reveal from x or y axis.',
    author: 'native-bits <https://nativebits.dev>',
    dependencies: ['react-native-reanimated'],
    categories: ['animation', 'entrance', 'mobile'],
    docs: componentDocs(
      'spring-reveal',
      '<SpringReveal axis="y" from={32}>\n  <BottomTray />\n</SpringReveal>'
    ),
    files: [
      {
        sourcePath: 'animations/spring-reveal.tsx',
        type: 'registry:component',
        target: 'components/native-bits/spring-reveal.tsx',
      },
    ],
  },
  {
    name: 'swipe-dismiss',
    type: 'registry:component',
    title: 'Swipe Dismiss',
    description: 'Swipe-to-dismiss wrapper with threshold callback.',
    author: 'native-bits <https://nativebits.dev>',
    dependencies: ['react-native-reanimated', 'react-native-gesture-handler'],
    categories: ['animation', 'gesture', 'mobile'],
    docs: componentDocs(
      'swipe-dismiss',
      '<SwipeDismiss onDismiss={removeItem}>\n  <InboxCard />\n</SwipeDismiss>'
    ),
    files: [
      {
        sourcePath: 'animations/swipe-dismiss.tsx',
        type: 'registry:component',
        target: 'components/native-bits/swipe-dismiss.tsx',
      },
    ],
  },
  {
    name: 'number-counter',
    type: 'registry:component',
    title: 'Number Counter',
    description: 'Animated numeric transitions for KPI values.',
    author: 'native-bits <https://nativebits.dev>',
    dependencies: ['react-native-reanimated'],
    categories: ['animation', 'data', 'mobile'],
    docs: componentDocs(
      'number-counter',
      '<NumberCounter from={0} to={18420} duration={900} />'
    ),
    files: [
      {
        sourcePath: 'animations/number-counter.tsx',
        type: 'registry:component',
        target: 'components/native-bits/number-counter.tsx',
      },
    ],
  },
];

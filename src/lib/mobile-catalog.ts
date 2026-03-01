export type Platform = 'react-native' | 'flutter';

export interface CatalogComponent {
  name: string;
  slug: string;
  category: string;
  summary: string;
  palette: [string, string];
  tags: string[];
  code: Record<Platform, string>;
}

export interface CatalogAnimation {
  name: string;
  slug: string;
  motionType: string;
  summary: string;
  palette: [string, string];
  tags: string[];
  code: Record<Platform, string>;
}

export const mobileComponents: CatalogComponent[] = [
  {
    name: 'Animated Button',
    slug: 'animated-button',
    category: 'Actions',
    summary: 'Primary CTA button with spring press feedback and gradient fill.',
    palette: ['#00f5d4', '#f0f2ff'],
    tags: ['CTA', 'Spring', 'Accessible'],
    code: {
      'react-native': `import { AnimatedButton } from 'native-bits';

<AnimatedButton
  title="Continue"
  variant="solid"
  onPress={onContinue}
/>`,
      flutter: `import 'package:native_bits/native_bits.dart';

AnimatedButton(
  text: 'Continue',
  variant: ButtonVariant.solid,
  onPressed: onContinue,
)`
    }
  },
  {
    name: 'Glass Card',
    slug: 'glass-card',
    category: 'Surfaces',
    summary: 'Frosted surface card for profile and payment summaries.',
    palette: ['#00f5d4', '#7c3aed'],
    tags: ['Blur', 'Card', 'Dashboard'],
    code: {
      'react-native': `import { GlassCard } from 'native-bits';

<GlassCard intensity={42}>
  <ProfileSummary />
</GlassCard>`,
      flutter: `import 'package:native_bits/native_bits.dart';

GlassCard(
  intensity: 42,
  child: ProfileSummary(),
)`
    }
  },
  {
    name: 'Input Field',
    slug: 'input-field',
    category: 'Forms',
    summary: 'Floating label field with validation and icon support.',
    palette: ['#7c3aed', '#dff3ff'],
    tags: ['Forms', 'Label', 'Validation'],
    code: {
      'react-native': `import { InputField } from 'native-bits';

<InputField
  label="Email"
  value={email}
  onChangeText={setEmail}
/>`,
      flutter: `import 'package:native_bits/native_bits.dart';

InputField(
  label: 'Email',
  value: email,
  onChanged: setEmail,
)`
    }
  },
  {
    name: 'Toggle Switch',
    slug: 'toggle-switch',
    category: 'Controls',
    summary: 'Animated state toggle for settings and preferences screens.',
    palette: ['#00f5d4', '#00b8a9'],
    tags: ['Settings', 'State', 'Compact'],
    code: {
      'react-native': `import { ToggleSwitch } from 'native-bits';

<ToggleSwitch
  value={enabled}
  onToggle={setEnabled}
/>`,
      flutter: `import 'package:native_bits/native_bits.dart';

ToggleSwitch(
  value: enabled,
  onChanged: setEnabled,
)`
    }
  },
  {
    name: 'Notification Toast',
    slug: 'notification-toast',
    category: 'Feedback',
    summary: 'Top or bottom swipeable toast with success and error states.',
    palette: ['#f0f2ff', '#00f5d4'],
    tags: ['Toast', 'Status', 'Dismiss'],
    code: {
      'react-native': `import { NotificationToast } from 'native-bits';

<NotificationToast
  type="success"
  message="Saved successfully"
  onDismiss={hideToast}
/>`,
      flutter: `import 'package:native_bits/native_bits.dart';

NotificationToast(
  type: ToastType.success,
  message: 'Saved successfully',
  onDismissed: hideToast,
)`
    }
  },
  {
    name: 'Floating Action Button',
    slug: 'floating-action-button',
    category: 'Actions',
    summary: 'Contextual floating action with drag resistance and bounce.',
    palette: ['#7c3aed', '#dff3ff'],
    tags: ['FAB', 'Navigation', 'Floating'],
    code: {
      'react-native': `import { FloatingActionButton } from 'native-bits';

<FloatingActionButton
  icon={<PlusIcon />}
  onPress={openComposer}
/>`,
      flutter: `import 'package:native_bits/native_bits.dart';

FloatingActionButtonPlus(
  icon: Icons.add,
  onPressed: openComposer,
)`
    }
  },
  {
    name: 'Progress Ring',
    slug: 'progress-ring',
    category: 'Data Display',
    summary: 'Circular progress ring with label and animated stroke.',
    palette: ['#00f5d4', '#7c3aed'],
    tags: ['Progress', 'Chart', 'KPI'],
    code: {
      'react-native': `import { ProgressRing } from 'native-bits';

<ProgressRing
  progress={72}
  size={96}
  animated
/>`,
      flutter: `import 'package:native_bits/native_bits.dart';

ProgressRing(
  progress: 72,
  size: 96,
  animated: true,
)`
    }
  },
  {
    name: 'Skeleton Loader',
    slug: 'skeleton-loader',
    category: 'Feedback',
    summary: 'Shimmer placeholder for feed cards and list loading states.',
    palette: ['#00f5d4', '#7c3aed'],
    tags: ['Loading', 'Shimmer', 'Placeholder'],
    code: {
      'react-native': `import { SkeletonLoader } from 'native-bits';

<SkeletonLoader
  width="100%"
  height={18}
  borderRadius={9}
/>`,
      flutter: `import 'package:native_bits/native_bits.dart';

SkeletonLoader(
  width: double.infinity,
  height: 18,
  borderRadius: 9,
)`
    }
  },
  {
    name: 'OTP Input',
    slug: 'otp-input',
    category: 'Forms',
    summary: 'Multi-cell verification input with focus transitions.',
    palette: ['#dff3ff', '#7c3aed'],
    tags: ['OTP', 'Auth', 'Keyboard'],
    code: {
      'react-native': `import { OtpInput } from 'native-bits';

<OtpInput
  length={6}
  onFilled={verifyCode}
/>`,
      flutter: `import 'package:native_bits/native_bits.dart';

OtpInput(
  length: 6,
  onFilled: verifyCode,
)`
    }
  },
  {
    name: 'Segmented Control',
    slug: 'segmented-control',
    category: 'Controls',
    summary: 'Sliding indicator segmented control for app filters.',
    palette: ['#00f5d4', '#f0f2ff'],
    tags: ['Tabs', 'Filters', 'Navigation'],
    code: {
      'react-native': `import { SegmentedControl } from 'native-bits';

<SegmentedControl
  options={['Day', 'Week', 'Month']}
  value={range}
  onChange={setRange}
/>`,
      flutter: `import 'package:native_bits/native_bits.dart';

SegmentedControl(
  options: const ['Day', 'Week', 'Month'],
  value: range,
  onChanged: setRange,
)`
    }
  },
  {
    name: 'Chat Bubble',
    slug: 'chat-bubble',
    category: 'Data Display',
    summary: 'Message bubble with typing state and timestamp support.',
    palette: ['#00f5d4', '#7c3aed'],
    tags: ['Messaging', 'Chat', 'Realtime'],
    code: {
      'react-native': `import { ChatBubble } from 'native-bits';

<ChatBubble
  sender="bot"
  message="Your ride arrives in 3 min"
  time="09:42"
/>`,
      flutter: `import 'package:native_bits/native_bits.dart';

ChatBubble(
  sender: ChatSender.bot,
  message: 'Your ride arrives in 3 min',
  time: '09:42',
)`
    }
  },
  {
    name: 'Bottom Sheet Handle',
    slug: 'bottom-sheet-handle',
    category: 'Surfaces',
    summary: 'Handle + snap indicator for modal sheets and drawers.',
    palette: ['#7c3aed', '#dff3ff'],
    tags: ['Bottom Sheet', 'Gesture', 'Modal'],
    code: {
      'react-native': `import { BottomSheetHandle } from 'native-bits';

<BottomSheetHandle
  snapPoints={[0.25, 0.6, 0.92]}
  onSnap={setSnapIndex}
/>`,
      flutter: `import 'package:native_bits/native_bits.dart';

BottomSheetHandle(
  snapPoints: const [0.25, 0.6, 0.92],
  onSnap: setSnapIndex,
)`
    }
  }
];

export const mobileAnimations: CatalogAnimation[] = [
  {
    name: 'Fade In Up',
    slug: 'fade-in-up',
    motionType: 'Entrance',
    summary: 'Gentle entrance motion for text blocks and cards.',
    palette: ['#00f5d4', '#f0f2ff'],
    tags: ['Onboarding', 'Cards', 'Hero'],
    code: {
      'react-native': `import { FadeInUp } from 'native-bits/animations';

<FadeInUp delay={120}>
  <Card />
</FadeInUp>`,
      flutter: `import 'package:native_bits/animations.dart';

FadeInUp(
  delay: const Duration(milliseconds: 120),
  child: Card(),
)`
    }
  },
  {
    name: 'Scale Pop',
    slug: 'scale-pop',
    motionType: 'Entrance',
    summary: 'Elastic scale-in effect ideal for badges and icons.',
    palette: ['#00f5d4', '#7c3aed'],
    tags: ['Badges', 'Icons', 'Rewards'],
    code: {
      'react-native': `import { ScalePop } from 'native-bits/animations';

<ScalePop stiffness={140}>
  <Badge />
</ScalePop>`,
      flutter: `import 'package:native_bits/animations.dart';

ScalePop(
  stiffness: 140,
  child: Badge(),
)`
    }
  },
  {
    name: 'Rotate In',
    slug: 'rotate-in',
    motionType: 'Entrance',
    summary: 'Spin-in motion for action icons and playful alerts.',
    palette: ['#7c3aed', '#dff3ff'],
    tags: ['Icons', 'Alerts', 'Playful'],
    code: {
      'react-native': `import { RotateIn } from 'native-bits/animations';

<RotateIn degrees={260} duration={680}>
  <ActionIcon />
</RotateIn>`,
      flutter: `import 'package:native_bits/animations.dart';

RotateIn(
  degrees: 260,
  duration: const Duration(milliseconds: 680),
  child: ActionIcon(),
)`
    }
  },
  {
    name: 'Slide In Right',
    slug: 'slide-in-right',
    motionType: 'Entrance',
    summary: 'Horizontal reveal for drawers and panel content.',
    palette: ['#00f5d4', '#00b8a9'],
    tags: ['Drawer', 'Panels', 'Navigation'],
    code: {
      'react-native': `import { SlideInRight } from 'native-bits/animations';

<SlideInRight offset={80}>
  <MenuPanel />
</SlideInRight>`,
      flutter: `import 'package:native_bits/animations.dart';

SlideInRight(
  offset: 80,
  child: MenuPanel(),
)`
    }
  },
  {
    name: 'Bounce',
    slug: 'bounce',
    motionType: 'Loop',
    summary: 'Looping bounce for callouts, pointers, and hints.',
    palette: ['#f0f2ff', '#00f5d4'],
    tags: ['Hints', 'Pointers', 'Loop'],
    code: {
      'react-native': `import { Bounce } from 'native-bits/animations';

<Bounce height={16} duration={620}>
  <HintDot />
</Bounce>`,
      flutter: `import 'package:native_bits/animations.dart';

Bounce(
  height: 16,
  duration: const Duration(milliseconds: 620),
  child: HintDot(),
)`
    }
  },
  {
    name: 'Flip',
    slug: 'flip',
    motionType: 'Transition',
    summary: '3D flip transition for cards, deals, and coupons.',
    palette: ['#00f5d4', '#7c3aed'],
    tags: ['Cards', '3D', 'Offer'],
    code: {
      'react-native': `import { Flip } from 'native-bits/animations';

<Flip direction="horizontal">
  <DealCard />
</Flip>`,
      flutter: `import 'package:native_bits/animations.dart';

Flip(
  direction: FlipDirection.horizontal,
  child: DealCard(),
)`
    }
  },
  {
    name: 'Shimmer',
    slug: 'shimmer',
    motionType: 'Loop',
    summary: 'Sweep shimmer for skeleton screens and placeholders.',
    palette: ['#00f5d4', '#7c3aed'],
    tags: ['Loader', 'Skeleton', 'Feed'],
    code: {
      'react-native': `import { Shimmer } from 'native-bits/animations';

<Shimmer width={180} height={18} />`,
      flutter: `import 'package:native_bits/animations.dart';

Shimmer(
  width: 180,
  height: 18,
)`
    }
  },
  {
    name: 'Stagger List',
    slug: 'stagger-list',
    motionType: 'Sequence',
    summary: 'Sequential reveal for feed rows and settings lists.',
    palette: ['#00f5d4', '#f0f2ff'],
    tags: ['List', 'Sequence', 'Feed'],
    code: {
      'react-native': `import { StaggerList } from 'native-bits/animations';

<StaggerList staggerDelay={80}>
  {items.map(renderItem)}
</StaggerList>`,
      flutter: `import 'package:native_bits/animations.dart';

StaggerList(
  staggerDelay: const Duration(milliseconds: 80),
  children: items.map(renderItem).toList(),
)`
    }
  },
  {
    name: 'Parallax Tilt',
    slug: 'parallax-tilt',
    motionType: 'Interactive',
    summary: 'Sensor-like card tilt for product and media previews.',
    palette: ['#7c3aed', '#dff3ff'],
    tags: ['Parallax', 'Media', 'Interactive'],
    code: {
      'react-native': `import { ParallaxTilt } from 'native-bits/animations';

<ParallaxTilt intensity={10}>
  <MediaCard />
</ParallaxTilt>`,
      flutter: `import 'package:native_bits/animations.dart';

ParallaxTilt(
  intensity: 10,
  child: MediaCard(),
)`
    }
  },
  {
    name: 'Spring Reveal',
    slug: 'spring-reveal',
    motionType: 'Entrance',
    summary: 'Snappy reveal used for bottom bars and action trays.',
    palette: ['#00f5d4', '#f0f2ff'],
    tags: ['Tray', 'Bottom Bar', 'Spring'],
    code: {
      'react-native': `import { SpringReveal } from 'native-bits/animations';

<SpringReveal axis="y" from={32}>
  <BottomTray />
</SpringReveal>`,
      flutter: `import 'package:native_bits/animations.dart';

SpringReveal(
  axis: Axis.vertical,
  from: 32,
  child: BottomTray(),
)`
    }
  },
  {
    name: 'Swipe Dismiss',
    slug: 'swipe-dismiss',
    motionType: 'Gesture',
    summary: 'Swipe-to-dismiss behavior for notifications and items.',
    palette: ['#7c3aed', '#dff3ff'],
    tags: ['Gesture', 'Dismiss', 'Inbox'],
    code: {
      'react-native': `import { SwipeDismiss } from 'native-bits/animations';

<SwipeDismiss onDismiss={removeItem}>
  <InboxCard />
</SwipeDismiss>`,
      flutter: `import 'package:native_bits/animations.dart';

SwipeDismiss(
  onDismissed: removeItem,
  child: InboxCard(),
)`
    }
  },
  {
    name: 'Number Counter',
    slug: 'number-counter',
    motionType: 'Data',
    summary: 'Smooth counting transition for KPI and finance values.',
    palette: ['#00f5d4', '#7c3aed'],
    tags: ['Analytics', 'Finance', 'KPI'],
    code: {
      'react-native': `import { NumberCounter } from 'native-bits/animations';

<NumberCounter
  from={0}
  to={18420}
  duration={900}
/>`,
      flutter: `import 'package:native_bits/animations.dart';

NumberCounter(
  from: 0,
  to: 18420,
  duration: const Duration(milliseconds: 900),
)`
    }
  }
];

export const mobileStats = [
  { label: 'Components', value: '12+' },
  { label: 'Animations', value: '12+' },
  { label: 'React Native + Flutter', value: 'Dual API' },
  { label: 'Mobile breakpoints', value: 'Phone first' }
];



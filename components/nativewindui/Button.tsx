import * as React from 'react';
import { Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '~/lib/utils';
import { Text } from './Text';

const buttonVariants = cva(
  'flex-row items-center justify-center gap-2 rounded-full active:opacity-80',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        secondary: 'bg-secondary',
        destructive: 'bg-destructive',
        outline: 'border border-input bg-background',
        ghost: 'bg-transparent',
      },
      size: {
        sm: 'h-9 px-4 gap-1.5',
        md: 'h-11 px-5',
        lg: 'h-14 px-6 rounded-2xl',
        icon: 'h-11 w-11 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const buttonTextVariants = cva('font-semibold', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
      destructive: 'text-destructive-foreground',
      outline: 'text-foreground',
      ghost: 'text-foreground',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      icon: 'text-base',
    },
  },
  defaultVariants: { variant: 'default', size: 'md' },
});

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof buttonVariants> & {
    label?: string;
    labelClasses?: string;
  };

function Button({
  children,
  className,
  variant,
  size,
  label,
  labelClasses,
  onPress,
  ...props
}: ButtonProps) {
  const handlePress: React.ComponentPropsWithoutRef<typeof Pressable>['onPress'] =
    (ev) => {
      if (process.env.EXPO_OS === 'ios') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      onPress?.(ev);
    };

  return (
    <Pressable
      className={cn(buttonVariants({ variant, size }), className)}
      onPress={handlePress}
      {...props}
    >
      {label ? (
        <Text className={cn(buttonTextVariants({ variant, size }), labelClasses)}>
          {label}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

export { Button, buttonVariants, buttonTextVariants };

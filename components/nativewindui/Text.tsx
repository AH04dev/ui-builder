import * as React from 'react';
import { Text as RNText } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '~/lib/utils';

const textVariants = cva('text-foreground', {
  variants: {
    variant: {
      largeTitle: 'text-4xl font-bold',
      title1: 'text-2xl font-bold',
      title2: 'text-xl font-bold',
      title3: 'text-lg font-semibold',
      heading: 'text-base font-semibold',
      body: 'text-base font-normal',
      callout: 'text-[15px] font-normal',
      subhead: 'text-sm font-normal',
      footnote: 'text-[13px] font-normal',
      caption1: 'text-xs font-normal',
      caption2: 'text-[11px] font-normal',
    },
    color: {
      primary: '',
      secondary: 'text-muted-foreground',
      destructive: 'text-destructive',
    },
  },
  defaultVariants: {
    variant: 'body',
    color: 'primary',
  },
});

type TextProps = React.ComponentPropsWithoutRef<typeof RNText> &
  VariantProps<typeof textVariants>;

function Text({ className, variant, color, ...props }: TextProps) {
  return (
    <RNText
      className={cn(textVariants({ variant, color }), className)}
      {...props}
    />
  );
}

export { Text, textVariants };

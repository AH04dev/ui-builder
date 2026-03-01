import * as React from 'react';
import * as AvatarPrimitive from '@rn-primitives/avatar';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '~/lib/utils';
import { Text } from './Text';

const avatarVariants = cva('relative overflow-hidden rounded-full bg-secondary', {
  variants: {
    size: {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-14 w-14',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

type AvatarProps = Omit<
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
  'children'
> &
  VariantProps<typeof avatarVariants> & {
    src?: string;
    fallback: string;
    imageClassName?: string;
    fallbackClassName?: string;
  };

function Avatar({
  className,
  size,
  src,
  fallback,
  imageClassName,
  fallbackClassName,
  ...props
}: AvatarProps) {
  return (
    <AvatarPrimitive.Root className={cn(avatarVariants({ size }), className)} {...props}>
      {src ? (
        <AvatarPrimitive.Image
          source={{ uri: src }}
          className={cn('h-full w-full', imageClassName)}
        />
      ) : null}
      <AvatarPrimitive.Fallback
        className={cn('absolute inset-0 items-center justify-center bg-secondary', fallbackClassName)}
      >
        <Text variant="subhead" className="font-semibold text-secondary-foreground">
          {fallback}
        </Text>
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}

export { Avatar };

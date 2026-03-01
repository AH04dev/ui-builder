import * as React from 'react';
import * as SeparatorPrimitive from '@rn-primitives/separator';
import { cn } from '~/lib/utils';

function Separator({
  className,
  orientation = 'horizontal',
  ...props
}: React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      orientation={orientation}
      className={cn(
        orientation === 'horizontal' ? 'h-px w-full bg-border' : 'h-full w-px bg-border',
        className
      )}
      {...props}
    />
  );
}

export { Separator };

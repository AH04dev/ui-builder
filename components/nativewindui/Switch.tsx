import * as React from 'react';
import * as SwitchPrimitive from '@rn-primitives/switch';
import { cn } from '~/lib/utils';

function Switch({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        'h-8 w-14 rounded-full border-2 border-transparent',
        'transition-colors duration-200',
        'data-[state=checked]:bg-primary',
        'data-[state=unchecked]:bg-input',
        'disabled:opacity-40',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'h-6 w-6 rounded-full bg-background shadow-md',
          'transition-transform duration-200',
          'data-[state=checked]:translate-x-6',
          'data-[state=unchecked]:translate-x-0.5'
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };

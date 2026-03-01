import * as React from 'react';
import * as CheckboxPrimitive from '@rn-primitives/checkbox';
import { Check } from 'lucide-react-native';
import { cn } from '~/lib/utils';

function Checkbox({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        'h-6 w-6 rounded-md border-2 border-primary',
        'items-center justify-center',
        'data-[state=checked]:bg-primary',
        'disabled:opacity-40',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="items-center justify-center">
        <Check size={14} strokeWidth={3} className="text-primary-foreground" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };

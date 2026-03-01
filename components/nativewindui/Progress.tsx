import * as React from 'react';
import * as ProgressPrimitive from '@rn-primitives/progress';
import { cn } from '~/lib/utils';

function Progress({
  className,
  indicatorClassName,
  ...props
}: React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  indicatorClassName?: string;
}) {
  return (
    <ProgressPrimitive.Root
      className={cn('h-2 w-full overflow-hidden rounded-full bg-secondary', className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn('h-full rounded-full bg-primary transition-all', indicatorClassName)}
        style={{ width: `${props.value ?? 0}%` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };

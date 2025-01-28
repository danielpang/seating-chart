import React from 'react';
import { cn } from '../../lib/utils';

const Alert = React.forwardRef(({ className, variant = 'default', ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(
      'relative w-full rounded-lg border p-4',
      {
        'bg-destructive/15 text-destructive border-destructive/50': variant === 'destructive',
        'bg-background text-foreground': variant === 'default',
      },
      className
    )}
    {...props}
  />
));

export { Alert };
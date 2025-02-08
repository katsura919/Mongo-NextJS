'use client';

import { Button as ShadButton } from '@/components/ui/button';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'destructive' | 'secondary' | 'ghost' | 'link';
}

export function Button({ variant = 'default', ...props }: ButtonProps) {
  return <ShadButton variant={variant} {...props} />;
}

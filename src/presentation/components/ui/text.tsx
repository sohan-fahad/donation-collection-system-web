/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '@/presentation/lib/utils';
import React, { forwardRef, JSX, ReactNode } from 'react';

// Define types for custom props
type Variant =
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'heading4'
  | 'heading5'
  | 'body'
  | 'small'
  | 'extra-small';

type Color = 'primary' | 'secondary' | 'white' | 'black';

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: Variant;
  color?: Color;
  className?: string;
  children?: ReactNode;
}

// Map variants to HTML elements
const elementMap: Record<Variant, keyof JSX.IntrinsicElements> = {
  heading1: 'h1',
  heading2: 'h2',
  heading3: 'h3',
  heading4: 'h4',
  heading5: 'h5',
  body: 'p',
  small: 'span',
  'extra-small': 'span',
};

// Map variants and colors to classes
const textVariants: Record<Variant, string> = {
  heading1: 'text-2xl sm:text-3xl lg:text-4xl font-bold',
  heading2: 'text-xl sm:text-2xl lg:text-3xl font-bold',
  heading3: 'text-lg sm:text-xl lg:text-2xl font-bold',
  heading4: 'text-lg lg:text-xl font-semibold',
  heading5: 'text-base lg:text-lg font-semibold',
  body: 'text-base font-normal',
  small: 'text-xs lg:text-sm font-normal',
  'extra-small': 'text-xs font-normal',
};

const colorVariants: Record<Color, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  white: 'text-white',
  black: 'text-black',
};

// Forward ref to support usage in higher-order components
const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      variant = 'body',
      color = 'black',
      className,
      children,
      ...restProps
    }: TextProps,
    ref
  ) => {
    // Determine the HTML element to use
    const Element: any = elementMap[variant] || 'p';

    // Combine classes
    const combinedClass = cn(
      'transition-colors', // Default transition class
      textVariants[variant], // Add variant-specific classes
      colorVariants[color], // Add color-specific classes
      className // Custom user-defined classes
    );

    return (
      <Element ref={ref as React.Ref<HTMLElement>} className={combinedClass} {...restProps}>
        {children}
      </Element>
    );
  }
);

Text.displayName = 'Text';

export default Text;

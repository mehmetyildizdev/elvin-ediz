import React from 'react';
import Link from 'next/link';

export type ButtonVariant = 'primary' | 'secondary' | 'outline-on-dark' | 'outline-on-light' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

export type ButtonProps = BaseButtonProps &
  (
    | (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined; target?: string; rel?: string })
    | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; target?: string; rel?: string })
  );

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-accent-foreground hover:bg-accent-hover shadow-sm border border-transparent',
  secondary:
    'bg-bg-primary text-text-on-dark hover:bg-bg-primary/90 shadow-sm border border-transparent',
  'outline-on-dark':
    'border border-border-on-dark text-text-on-dark hover:border-accent hover:bg-accent hover:text-accent-foreground',
  'outline-on-light':
    'border border-border-subtle text-text-main hover:border-accent hover:bg-accent hover:text-accent-foreground',
  ghost: 'text-text-main hover:bg-bg-surface',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs font-semibold tracking-wider uppercase',
  md: 'px-6 py-3.5 text-xs font-semibold tracking-wider uppercase',
  lg: 'px-8 py-4 text-sm font-semibold tracking-wider uppercase',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  href,
  target,
  rel,
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-sm transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer no-underline';
  const combinedClasses = `${baseClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('//');
    const isScheme = href.startsWith('mailto:') || href.startsWith('tel:');
    const computedTarget = target || (isExternal ? '_blank' : undefined);
    const computedRel = rel || (isExternal ? 'noopener noreferrer' : undefined);

    if (isExternal || isScheme) {
      return (
        <a
          href={href}
          target={computedTarget}
          rel={computedRel}
          className={combinedClasses}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={combinedClasses}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={combinedClasses}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}

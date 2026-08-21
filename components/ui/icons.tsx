import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export function ArrowLink({ children }: { children: React.ReactNode }) {
  return (
    <span className="group inline-flex items-center gap-1.5 font-medium transition-colors">
      {children}
      <ArrowUpRight
        size={17}
        strokeWidth={1.7}
        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </span>
  );
}

export function ServiceIcon({ Icon }: { Icon: LucideIcon }) {
  return (
    <span className="border-border-subtle text-accent bg-bg-surface flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300">
      <Icon size={22} strokeWidth={1.4} />
    </span>
  );
}

export function TextLink({
  children,
  href = '#contact',
}: {
  children: React.ReactNode;
  href?: string;
}) {
  const content = (
    <>
      {children}
      <ChevronRight
        size={15}
        className="transition-transform duration-200 group-hover:translate-x-0.5"
      />
    </>
  );

  const classes =
    'text-accent hover:text-accent-hover group inline-flex items-center gap-1 text-xs font-semibold tracking-wider uppercase transition-colors';

  if (href.startsWith('/')) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes}>
      {content}
    </a>
  );
}

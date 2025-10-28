import { type ReactNode } from 'react';

const sizes = {
  h1: 'text-3xl font-bold',
  h2: 'text-xl font-bold',
  h3: 'text-3xl font-medium',
  h4: 'text-3xl font-bold text-center',
};

type HeadingProps = { children: ReactNode; level: keyof typeof sizes };
export default function Heading({ children, level }: HeadingProps) {
  const className = sizes[level];
  return <div className={className}>{children}</div>;
}

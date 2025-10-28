import { type ReactNode } from 'react';

const rowStyles = {
  horizontal: 'flex items-center justify-between',
  vertical: 'flex flex-col gap-4',
};

type RowProps = { children: ReactNode; type?: 'horizontal' | 'vertical' };
export default function Row({ type = 'vertical', children }: RowProps) {
  return <div className={rowStyles[type]}>{children}</div>;
}

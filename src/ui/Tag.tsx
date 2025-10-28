import type { ReactNode } from 'react';

const tagStyles = {
  blue: 'text-blue-700 bg-blue-100',
  green: 'text-green-700 bg-green-100',
  silver: 'text-silver-700 bg-silver-100',
};

type TagProps = { children: ReactNode; type: keyof typeof tagStyles };
export default function Tag({ children, type }: TagProps) {
  const tagClass = tagStyles[type] || 'text-gray-700 bg-gray-100';

  return (
    <span
      className={`w-fit rounded-2xl px-3 py-1 text-xs font-semibold uppercase ${tagClass}`}
    >
      {children}
    </span>
  );
}

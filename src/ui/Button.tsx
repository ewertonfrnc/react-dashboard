import { type ReactNode, type ButtonHTMLAttributes } from 'react';

const sizes = {
  small: 'px-2 py-1 text-center text-xs font-semibold uppercase',
  medium: 'px-4 py-3 text-sm font-medium',
  large: 'px-6 py-3 text-base font-medium',
};

const variations = {
  primary:
    'text-brand-50 bg-brand-600 hover:bg-brand-700 hover:cursor-pointer disabled:cursor-not-allowed',
  secondary:
    'text-gray-600 bg-gray-0 border border-gray-200 hover:bg-gray-50 hover:cursor-pointer disabled:cursor-not-allowed',
  danger:
    'text-red-100 bg-red-700 hover:bg-red-800 hover:cursor-pointer disabled:cursor-not-allowed',
};

type ButtonProps = {
  children: ReactNode;
  level?: keyof typeof sizes;
  variation?: keyof typeof variations;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  level = 'medium',
  variation = 'primary',
  ...otherProps
}: ButtonProps) {
  const size = sizes[level];
  const variationClass = variations[variation];

  return (
    <button
      className={`${size} ${variationClass} rounded transition`}
      {...otherProps}
    >
      {children}
    </button>
  );
}

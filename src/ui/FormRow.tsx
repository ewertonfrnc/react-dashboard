import type { ReactElement } from 'react';

type FormRowProps = {
  label: string;
  errorMessage?: string;
  children: ReactElement<{ id: string }>;
};
export default function FormRow({
  label,
  errorMessage,
  children,
}: FormRowProps) {
  return (
    <div className="grid grid-cols-[15rem_1fr_1.2fr] items-center gap-6 border-gray-200 px-0 py-3 not-last:border-b first:pt-0 last:pb-0">
      {label && (
        <label htmlFor={children.props.id} className="font-medium">
          {label}
        </label>
      )}

      {children}

      {errorMessage && (
        <small className="text-sm text-red-700">{errorMessage}</small>
      )}
    </div>
  );
}

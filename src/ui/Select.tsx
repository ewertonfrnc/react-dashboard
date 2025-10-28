import type { ChangeEvent } from 'react';

type SelectProps = {
  options: { value: string; label: string }[];
  activeValue: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};
export default function Select({
  options,
  activeValue,
  onChange,
}: SelectProps) {
  return (
    <select
      value={activeValue}
      onChange={onChange}
      className="bg-gray-0 rounded-sm px-3 py-2 text-sm font-medium shadow-sm"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

// const StyledSelect = styled.select`
// font-size: 1.4rem;
// padding: 0.8rem 1.2rem;

//   border: 1px solid
//     ${(props) =>
//       props.type === 'white'
//         ? 'var(--color-grey-100)'
//         : 'var(--color-grey-300)'};

//   border-radius: var(--border-radius-sm);
//   background-color: var(--color-grey-0);
//   font-weight: 500;
//   box-shadow: var(--shadow-sm);
// `;

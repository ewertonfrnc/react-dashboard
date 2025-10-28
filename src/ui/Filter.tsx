import { useSearchParams } from 'react-router-dom';

type FilterProps = {
  filterField: string;
  options: { value: string; label: string }[];
};
export default function Filter({ filterField, options }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilter = searchParams.get(filterField) || options[0].value;

  function handleClick(value: string) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }

  return (
    <div className="bg-gray-0 flex gap-1 rounded-sm border border-gray-100 p-1 shadow-sm">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleClick(option.value)}
          className={`hover:bg-brand-600 hover:text-brand-50 rounded-sm border-none px-2 py-1 text-sm font-medium transition hover:cursor-pointer ${
            currentFilter === option.value
              ? 'bg-brand-600 text-brand-50'
              : 'bg-gray-0'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

// const FilterButton = styled.button`
//   ${(props) =>
//     props.active &&
//     css`
//       background-color: var(--color-brand-600);
//       color: var(--color-brand-50);
//     `}

//   &:hover:not(:disabled) {
//     background-color: var(--color-brand-600);
//     color: var(--color-brand-50);
//   }
// `;

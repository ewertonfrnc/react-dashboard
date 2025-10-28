import type { ChangeEvent } from 'react';
import Select from './Select';
import { useSearchParams } from 'react-router-dom';

type SortByProps = { options: { value: string; label: string }[] };
export default function SortBy({ options }: SortByProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    searchParams.set('sortBy', event.target.value);
    setSearchParams(searchParams);
  }

  return (
    <div>
      <Select activeValue={sortBy} options={options} onChange={handleChange} />
    </div>
  );
}

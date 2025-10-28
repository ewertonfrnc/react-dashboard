import Filter from '@/ui/Filter';
import SortBy from '@/ui/SortBy';
import Sort from '@/ui/SortBy';

export default function CabinTableOperations() {
  return (
    <div className="flex items-center gap-2.5">
      <Filter
        filterField="discount"
        options={[
          { value: 'all', label: 'All' },
          { value: 'no-discount', label: 'No discount' },
          { value: 'with-discount', label: 'With discount' },
        ]}
      />

      <SortBy
        options={[
          { value: 'name-asc', label: 'Sort by name (A to Z)' },
          { value: 'name-desc', label: 'Sort by name (Z to A)' },
          { value: 'regularPrice-asc', label: 'Sort by price (low first)' },
          { value: 'regularPrice-desc', label: 'Sort by price (high first)' },
          { value: 'maxCapacity-asc', label: 'Sort by capacity (low first)' },
          { value: 'maxCapacity-desc', label: 'Sort by capacity (high first)' },
        ]}
      />
    </div>
  );
}

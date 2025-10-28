import Table from '@/ui/Table';
import Spinner from '@/ui/Spinner';
import Menus from '@/ui/Menus';
import Empty from '@/ui/Empty';

import CabinRow from './CabinRow';
import { useCabins } from './hooks/useCabins';
import { useSearchParams } from 'react-router-dom';

export default function CabinTable() {
  const { isPending, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  const currentLayout = '0.6fr 1fr 2fr 1fr 1fr 1fr';

  const filterValue = searchParams.get('discount') || 'all';
  let filteredCabins;
  if (filterValue === 'all') {
    filteredCabins = cabins;
  }
  if (filterValue === 'no-discount') {
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);
  }
  if (filterValue === 'with-discount') {
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);
  }

  // Sort
  const sortBy = searchParams.get('sortBy') || 'startDate-asc';
  const [sortField, sortDirection] = sortBy.split('-');
  const modifier = sortDirection === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins?.sort((a, b) => {
    return (a[sortField] - b[sortField]) * modifier;
  });

  if (isPending) {
    return <Spinner />;
  }

  if (!cabins.length) return <Empty resource="cabins" />;

  return (
    <Menus>
      <Table columns={currentLayout}>
        <Table.Header>
          <div role="columnheader"></div>
          <div role="columnheader">Cabin</div>
          <div role="columnheader">Capacity</div>
          <div role="columnheader">Price</div>
          <div role="columnheader">Discount</div>
          <div role="columnheader"></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins ?? []}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

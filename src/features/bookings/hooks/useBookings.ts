import { getBookings } from '@/services/apiBookings';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

export function useBookings() {
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };

  // SORT
  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  // Pagination
  const page = searchParams.get('page');
  const currentPage = !page ? 1 : Number(page);

  const {
    isPending,
    data: { data: bookings, count } = { data: [], count: 0 },
    isError,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, currentPage],
    queryFn: () => getBookings({ filter, sortBy, page: currentPage }),
  });

  return { isPending, bookings, count, isError };
}

import { useQuery } from '@tanstack/react-query';

import { QueryClientKey } from '../types';
import { getSettings } from '../../../services/apiSettings';

export function useSettings() {
  const {
    isPending,
    error,
    data: settings,
  } = useQuery({
    queryKey: [QueryClientKey],
    queryFn: getSettings,
  });

  return { isPending, error, settings };
}

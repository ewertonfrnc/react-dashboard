import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteCabin } from '../../../services/apiCabins';

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteCabinMutation } = useMutation({
    mutationFn: (cabinId: number) => deleteCabin(cabinId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });

      toast.success('Cabin deleted successfully');
    },
    onError: (error) => toast.error(error.message),
  });

  return { isDeleting, deleteCabinMutation };
}

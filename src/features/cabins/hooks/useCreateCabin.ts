import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createEditCabin } from '../../../services/apiCabins';

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createCabinMutation } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      toast.success('Cabin created successfully');
    },
    onError: (error) => toast.error(error.message),
  });

  return { isCreating, createCabinMutation };
}

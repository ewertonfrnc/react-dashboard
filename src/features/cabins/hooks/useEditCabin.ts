import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { type MutationPayload } from '../types';
import { createEditCabin } from '../../../services/apiCabins';

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutate: editCabinMutation } = useMutation({
    mutationFn: ({ newCabinData, id }: MutationPayload) =>
      createEditCabin(newCabinData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      toast.success('Cabin edited successfully');
    },
    onError: (error) => toast.error(error.message),
  });

  return { isEditing, editCabinMutation };
}

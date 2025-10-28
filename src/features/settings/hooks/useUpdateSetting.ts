import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { QueryClientKey } from '../types';
import { updateSetting } from '../../../services/apiSettings';

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateSettingMutation } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success('Setting updated successfully');
      queryClient.invalidateQueries({ queryKey: [QueryClientKey] });
    },
    onError: () => toast.error('Failed to update setting'),
  });

  return { isUpdating, updateSettingMutation };
}

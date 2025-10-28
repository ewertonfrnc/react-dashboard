import { useForm } from 'react-hook-form';

import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';

import { useCreateCabin } from './hooks/useCreateCabin';
import { useEditCabin } from './hooks/useEditCabin';
import type { Cabin, CabinFormData } from './types';

type CreateCabinFormProps = {
  cabinToEdit?: Cabin;
  onCloseModal?: VoidFunction;
};
function CreateCabinForm({ cabinToEdit, onCloseModal }: CreateCabinFormProps) {
  const { id: editId, ...editValues } = cabinToEdit || {};
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<CabinFormData>({
    defaultValues: isEditSession ? editValues : {},
  });

  const { isCreating, createCabinMutation } = useCreateCabin();
  const { isEditing, editCabinMutation } = useEditCabin();

  const isWorking = isCreating || isEditing;

  function onSubmit(data: CabinFormData) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession)
      editCabinMutation(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabinMutation(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`bg-gray-0 overflow-hidden rounded-md border border-gray-100 px-10 py-6 text-sm ${onCloseModal && 'w-4xl border-none'}`}
    >
      <FormRow label="Cabin name" errorMessage={errors.name?.message}>
        <input
          id="name"
          type="text"
          disabled={isWorking}
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        errorMessage={errors.maxCapacity?.message}
      >
        <input
          id="maxCapacity"
          type="number"
          disabled={isWorking}
          {...register('maxCapacity', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        errorMessage={errors.regularPrice?.message}
      >
        <input
          id="regularPrice"
          type="number"
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Price must be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" errorMessage={errors.discount?.message}>
        <input
          id="discount"
          type="number"
          disabled={isWorking}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              'Discount must be less than regular price',
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        errorMessage={errors.description?.message}
      >
        <textarea
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register('description', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Cabin photo" errorMessage={errors.image?.message}>
        <input
          id="image"
          type="file"
          accept="image/*"
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <div className="flex justify-end gap-3 border-t border-gray-200 px-3 py-6">
        <Button
          variation="secondary"
          level="medium"
          type="reset"
          disabled={isWorking}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button level="medium" disabled={isWorking}>
          {isEditSession ? 'Edit cabin' : 'Create cabin'}
        </Button>
      </div>
    </form>
  );
}

export default CreateCabinForm;

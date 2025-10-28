import FormRow from '../../ui/FormRow';
import Spinner from '../../ui/Spinner';

import { useSettings, useUpdateSetting } from './hooks';
import { type Settings } from './types';

function UpdateSettingsForm() {
  const {
    isPending,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { isUpdating, updateSettingMutation } = useUpdateSetting();

  function handleUpdate(
    event: React.FocusEvent<HTMLInputElement>,
    field: keyof Settings
  ) {
    const value = Number(event.target.value);
    if (!value) return;

    updateSettingMutation({ [field]: value });
  }

  if (isPending) return <Spinner />;

  return (
    <div className="bg-gray-0 rounded-md border border-gray-100 px-10 py-6">
      <FormRow label="Minimum nights/booking">
        <input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, 'minBookingLength')}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <input
          type="number"
          id="max-nights"
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <input
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
        />
      </FormRow>
    </div>
  );
}

export default UpdateSettingsForm;

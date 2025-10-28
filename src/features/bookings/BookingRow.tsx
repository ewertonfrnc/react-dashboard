import { format, isToday } from 'date-fns';

import Tag from '@/ui/Tag';
import Table from '@/ui/Table';

import { type Booking } from './types';
import { formatCurrency } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';

type BookingRowProps = { booking: Booking };
function BookingRow({
  booking: {
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}: BookingRowProps) {
  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  } as const;

  function getStatusTag(
    status: 'unconfirmed' | 'checked-in' | 'checked-out'
  ): 'blue' | 'green' | 'silver' {
    return statusToTagName[status] || 'blue';
  }

  return (
    <Table.Row>
      <div className="font-sono text-base font-semibold text-gray-600">
        {cabinName}
      </div>

      <div className="flex flex-col gap-0.5">
        <span className="font-medium">{guestName}</span>
        <span className="text-sm text-gray-500">{email}</span>
      </div>

      <div className="flex flex-col">
        <span className="font-medium">
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}{' '}
          &rarr; {numNights} night stay
        </span>

        <span className="text-sm text-gray-500">
          {format(new Date(startDate), 'MMM dd yyyy')} &mdash;{' '}
          {format(new Date(endDate), 'MMM dd yyyy')}
        </span>
      </div>

      <Tag type={getStatusTag(status)}>{status.replace('-', ' ')}</Tag>

      <div className="font-sono font-medium">{formatCurrency(totalPrice)}</div>
    </Table.Row>
  );
}

export default BookingRow;

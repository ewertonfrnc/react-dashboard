import type { Cabin } from '@/features/cabins/types';

export type Booking = {
  id: number;
  startDate: string;
  endDate: string;
  numNights: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: 'unconfirmed' | 'checked-in' | 'checked-out';
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  cabinId: number;
  guestId: number;
  cabins: Cabin;
  guests: { id: number; fullName: string; email: string };
};

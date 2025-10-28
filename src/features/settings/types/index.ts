export type Settings = {
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
};

export type SettingsUpdate = {
  [K in keyof Settings]?: number;
};

export const QueryClientKey = 'settings';

export type Cabin = {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
};

export type CabinFormData = Omit<Cabin, 'id' | 'image'> & {
  image: FileList;
};

export type CabinFormPayload = Omit<Cabin, 'id' | 'image'> & {
  image: File | string;
};

export type MutationPayload = {
  newCabinData: CabinFormPayload;
  id?: number;
};

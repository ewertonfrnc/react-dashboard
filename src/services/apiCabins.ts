import supabase, { supabaseUrl } from './supabase';
import type { Cabin, CabinFormPayload } from '../features/cabins/types';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    throw new Error('Failed to fetch cabins');
  }

  return data as Cabin[];
}

export async function createEditCabin(
  cabinPayload: CabinFormPayload,
  id?: number
) {
  const isNewImage = cabinPayload.image instanceof File;

  let imagePath = '';

  if (isNewImage) {
    const imageName =
      `${Math.random()}-${(cabinPayload.image as File).name}`.replaceAll(
        '/',
        ''
      );
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    const { error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, cabinPayload.image);

    if (storageError) {
      throw new Error('Failed to upload cabin image. Cabin creation failed');
    }
  } else {
    imagePath = cabinPayload.image as string;
  }

  const dataToInsert = {
    ...(id && { id }),
    ...cabinPayload,
    image: imagePath,
  };

  const { data, error: dbError } = await supabase
    .from('cabins')
    .upsert(dataToInsert)
    .select()
    .single();

  const errorMessage = id
    ? 'Failed to update cabin. Please try again.'
    : 'Failed to create cabin. Please try again.';

  if (dbError) {
    throw new Error(errorMessage);
  }

  return data;
}

export async function deleteCabin(cabinId: number) {
  const { error } = await supabase.from('cabins').delete().eq('id', cabinId);

  if (error) {
    throw new Error('Failed to delete cabin');
  }
}

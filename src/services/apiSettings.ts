import supabase from './supabase';
import type { Settings, SettingsUpdate } from '../features/settings/types';

export async function getSettings() {
  const { data, error } = await supabase.from('settings').select('*').single();

  if (error) {
    throw new Error('Settings could not be loaded');
  }

  return data as Settings;
}

export async function updateSetting(newSetting: SettingsUpdate) {
  // There is only ONE row of settings, and it has the ID=1
  const UNIQUE_SETTINGS_ID = 1;

  const { data, error } = await supabase
    .from('settings')
    .update(newSetting)
    .eq('id', UNIQUE_SETTINGS_ID)
    .single();

  if (error) {
    throw new Error('Settings could not be updated');
  }

  return data;
}

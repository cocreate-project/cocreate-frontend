import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

interface User {
  id: number;
  username: string;
  content_type: string;
  target_audience: string;
  additional_context: string;
  generations: number[];
  favorite_generations: number[];
}

export const userAtom = atomWithStorage<User | null>('userData', null);
export const isUserDataLoadingAtom = atom(true);

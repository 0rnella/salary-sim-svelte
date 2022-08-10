import { writable } from 'svelte/store';
import type { UserInfo, Calculations } from './utils/types';

export const formComplete = writable(false);

export let userInfo = writable({
    selectedSalary: 0,
} as UserInfo);
export let calculations = writable({} as Calculations);

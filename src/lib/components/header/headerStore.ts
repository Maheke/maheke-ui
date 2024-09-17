import { writable } from 'svelte/store';

export const isMenuVisible = writable(false);
export const isHamburgerMenuVisible = writable(false);
export const currentPage = writable('');
export const isConnectMenuVisible = writable(false);

import type { ICreateProposal } from 'src/lib/components/proposals/ICreateProposal';
import { writable } from 'svelte/store';

export const proposal = writable({
    name: '',
    description: '',
    creator: '',
} as ICreateProposal);

export const xdr = writable('');
export const proposalStatus = writable('');
export const sendingProposal = writable(false);
export const sendingError = writable(false);
export const sendingSuccess = writable(false);

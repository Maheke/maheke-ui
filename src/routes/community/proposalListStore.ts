import type { IProposalsList } from "@/lib/components/proposals/IProposalsList";
import { writable } from "svelte/store";

export const proposalsList = writable([] as IProposalsList[]);
export const sort = writable("");

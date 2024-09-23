import { writable } from "svelte/store";

export const voteStore = writable({
  amount: "",
  registeredVote: "",
  xlmBalance: "",
  remainingVotingDays: 0,
  confirmedVote: false,
});

export const isModalVisible = writable(false);
export const votingError = writable(false);
export const sendingVoteError = writable(false);
export const voteStatus = writable("");

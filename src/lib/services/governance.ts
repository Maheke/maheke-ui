import FetchDataError from "./errors/FetchDataError";
import type { ICreateProposal } from "@/lib/components/proposals/ICreateProposal";
import type { IProposal } from "@/lib/components/proposals/IProposal";
import type { IProposalVote } from "@/lib/components/proposals/IProposalVote";
import type { IProposalList } from "@/lib/components/proposals/proposalList/IProposalList";
import { is404 } from "@/lib/store/store";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

async function fetchData(url: string): Promise<any> {
  const fetchData = await fetch(url);
  if (fetchData.ok) {
    return fetchData.json();
  } else {
    if (fetchData.status === 404) {
      is404.set(true);
    }
    throw new FetchDataError(fetchData.status);
  }
}

export async function getProposal(proposalID: string): Promise<IProposal> {
  return await fetchData(`${SERVER_URL}/proposal/${proposalID}`);
}

export async function getProposalList(
  limit: number,
  page: number
): Promise<IProposalList> {
  return await fetchData(`${SERVER_URL}/proposal?limit=${limit}&page=${page}`);
}

export async function voteProposal(
  proposalID: string,
  voteInfo: IProposalVote
): Promise<string> {
  const result = await fetch(`${SERVER_URL}/${proposalID}/VoteIntent`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(voteInfo),
  });

  return result.json();
}

export async function saveProposal(
  proposal: ICreateProposal
): Promise<Response> {
  const result = await fetch(`${SERVER_URL}/proposal`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(proposal),
  });
  return result;
}

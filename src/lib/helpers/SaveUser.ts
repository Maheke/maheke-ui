import type IProposalVotes from "../components/proposals/proposalVotes/IProposalVotes";
import type IStorage from "../storage/IStorage";

export default class SaveUser {
  private storage: IStorage;
  public accountKey = "account";
  constructor(storage: IStorage) {
    this.storage = storage;
  }

  public account(publicKey: string) {
    this.storage.storeItem(this.accountKey, publicKey);
  }

  public vote(proposalID: string, vote: string, publicKey: string) {
    let proposals: IProposalVotes[] = [];
    const userVotes = this.storage.getItem(proposalID);
    if (userVotes) {
      const proposalsFromStorage = JSON.parse(userVotes) as IProposalVotes[];
      proposals = proposalsFromStorage;
    }
    proposals.push({ publicKey, vote });
    const proposalsString = JSON.stringify(proposals);
    this.storage.storeItem(proposalID, proposalsString);
  }
}

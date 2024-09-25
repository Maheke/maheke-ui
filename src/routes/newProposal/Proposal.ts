import type { IProposal } from '../../lib/components/proposals/IProposal';
import type { IProposalItem } from '../../lib/components/proposals/IProposalItem';

export default class Proposal {
    public proposalResponse: IProposal;
    public proposalIdentifierList: IProposalItem;

    constructor(proposalResponse: IProposal, proposalIdentifierList: IProposalItem) {
        this.proposalResponse = proposalResponse;
        this.proposalIdentifierList = proposalIdentifierList;
    }
}

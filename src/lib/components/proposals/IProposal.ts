import type { IProposalOption } from './IProposalOption';
import type { IWhitelistedProposalAsset } from './IWhitelistedProposalAsset';

export interface IProposal {
    name: string;
    description: string;
    creator: string;
    deadline: string;
    created: string;
    whitelistedAssets: Array<IWhitelistedProposalAsset>;
    options: Array<IProposalOption>;
    votingResult: 'FOR' | 'AGAINST' | 'DRAW';
}

import type BigNumber from 'bignumber.js';

import type { IAsset } from './IAsset';
import type { IProposalOption } from './IProposalOption';

export interface IProposalVote {
    voter: string;
    option: IProposalOption;
    asset: IAsset;
    amount: BigNumber;
}

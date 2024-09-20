import type { IProposal } from './IProposal';
import type IStatus from './IStatus';

export interface IProposalsList {
    id: string;
    data: IProposal;
    status: IStatus['status'];
    remainingTime: number;
    remainingTimeMeasure: 'DAYS' | 'DAY' | 'HOURS' | 'HOUR' | 'MINUTES' | 'MINUTE';
}

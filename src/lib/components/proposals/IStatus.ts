import type { IProposal } from './IProposal';

export default interface IStatus {
    status: 'CLOSED' | 'ACTIVE' | 'CLOSING' | IProposal['votingResult'];
}

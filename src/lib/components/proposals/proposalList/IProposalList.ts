import type { IProposalItem } from '../IProposalItem';
import type { ILinkedResourceType } from './ILinkedResourceType';

export interface IProposalList {
    currentPage: number;
    totalItems: number;
    totalPages: number;
    items: IProposalItem[];
    links: ILinkedResourceType;
}

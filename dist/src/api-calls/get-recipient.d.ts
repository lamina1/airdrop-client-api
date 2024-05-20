import { RewardData } from './common';
export interface GetRecipientResponse {
    success: boolean;
    rewards?: RewardData[];
    error?: string;
}
export declare function getRecipient(apiKey: string, apiUrl: string, recipientHash: string): Promise<GetRecipientResponse>;

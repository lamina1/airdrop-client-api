import { RewardData } from './common';
export interface GetAirdropResponse {
    success: boolean;
    rewards?: RewardData[];
    error?: string;
}
export declare function getAirdrop(apiKey: string, apiUrl: string, airdropID: number): Promise<GetAirdropResponse>;

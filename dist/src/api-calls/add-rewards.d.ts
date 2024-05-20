import { RewardData } from './common';
export interface AddRewardsResponse {
    success: boolean;
    missing?: RewardData[];
    error?: string;
}
export declare function addRewards(apiKey: string, apiUrl: string, rewards: RewardData[]): Promise<AddRewardsResponse>;

import { RewardKey, RewardData } from './common';
export interface GetRewardsResponse {
    success: boolean;
    rewards?: RewardData[];
    missingKeys?: RewardKey[];
    error?: string;
}
export declare function getRewards(apiKey: string, apiUrl: string, keys: RewardKey[]): Promise<GetRewardsResponse>;

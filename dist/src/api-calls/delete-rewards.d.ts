import { RewardKey } from './common';
export interface RemoveRewardsResponse {
    success: boolean;
    missingKeys?: RewardKey[];
    error?: string;
}
export declare function deleteRewards(apiKey: string, apiUrl: string, keys: RewardKey[]): Promise<RemoveRewardsResponse>;

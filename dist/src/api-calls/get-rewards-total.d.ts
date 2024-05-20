export interface GetRewardsTotalResponse {
    success: boolean;
    total?: string;
    error?: string;
}
export declare function getRewardsTotal(apiKey: string, apiUrl: string, airdropID: number): Promise<GetRewardsTotalResponse>;

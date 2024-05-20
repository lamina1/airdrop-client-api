export interface GetRewardsCountResponse {
    success: boolean;
    count?: number;
    error?: string;
}
export declare function getRewardsCount(apiKey: string, apiUrl: string, airdropID: number): Promise<GetRewardsCountResponse>;

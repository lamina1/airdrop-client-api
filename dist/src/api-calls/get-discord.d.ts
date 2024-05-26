import { RewardData } from './common';
export interface GetDiscordResponse {
    success: boolean;
    rewards?: RewardData[];
    error?: string;
}
export declare function getDiscord(apiKey: string, apiUrl: string, discordId: string): Promise<GetDiscordResponse>;

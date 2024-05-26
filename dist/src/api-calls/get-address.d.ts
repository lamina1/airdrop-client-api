import { RewardData } from './common';
export interface GetAddressResponse {
    success: boolean;
    rewards?: RewardData[];
    error?: string;
}
export declare function getAddress(apiKey: string, apiUrl: string, address: string): Promise<GetAddressResponse>;

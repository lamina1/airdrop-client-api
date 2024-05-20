export interface DeleteAirdropResponse {
    success: boolean;
    error?: string;
}
export declare function deleteAirdrop(apiKey: string, apiUrl: string, airdropID: number): Promise<DeleteAirdropResponse>;

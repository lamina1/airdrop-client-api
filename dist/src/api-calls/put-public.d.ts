export interface PutPublicResponse {
    success: boolean;
    error?: string;
}
export declare function putPublic(apiKey: string, apiUrl: string, airdropID: number, isPublic: boolean): Promise<PutPublicResponse>;

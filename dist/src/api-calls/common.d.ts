export interface RewardData {
    AirdropID: number;
    NodeID: string;
    RecipientHash: string;
    RewardAmount: string;
    MerkleProof: string[];
    IsPublic: boolean;
}
export interface RewardKey {
    AirdropID: number;
    NodeID: string;
}

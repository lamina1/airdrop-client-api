export interface RewardData {
  AirdropID: number;
  NodeID: string;
  Address?: string;
  DiscordID?: string;
  Salt?: string;
  RewardAmount: string;
  MerkleProof: string[];
  IsPublic: boolean;
}

export interface RewardKey {
  AirdropID: number;
  NodeID: string;
}

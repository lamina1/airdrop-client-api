import { AddRewardsResponse } from './api-calls/add-rewards';
import { DeleteAirdropResponse } from './api-calls/delete-airdrop';
import { RemoveRewardsResponse } from './api-calls/delete-rewards';
import { GetAirdropResponse } from './api-calls/get-airdrop';
import { GetRecipientResponse } from './api-calls/get-recipient';
import { GetRewardsCountResponse } from './api-calls/get-rewards-count';
import { GetRewardsTotalResponse } from './api-calls/get-rewards-total';
import { GetRewardsResponse } from './api-calls/get-rewards';
import { SetMaintenanceResponse } from './api-calls/put-maintenance';
import { PutPublicResponse } from './api-calls/put-public';
import { RewardData as RewardDataInterface, RewardKey as RewardKeyInterface } from './api-calls/common';
export type RewardData = RewardDataInterface;
export type RewardKey = RewardKeyInterface;
export declare function addRewards(rewards: RewardData[]): Promise<AddRewardsResponse>;
export declare function getRewards(keys: RewardKey[]): Promise<GetRewardsResponse>;
export declare function deleteAirdrop(airdropId: number): Promise<DeleteAirdropResponse>;
export declare function deleteRewards(keys: RewardKey[]): Promise<RemoveRewardsResponse>;
export declare function getAirdrop(airdropId: number): Promise<GetAirdropResponse>;
export declare function getRecipient(recipientId: string): Promise<GetRecipientResponse>;
export declare function getRewardsCount(airdropId: number): Promise<GetRewardsCountResponse>;
export declare function getRewardsTotal(airdropId: number): Promise<GetRewardsTotalResponse>;
export declare function putMaintenance(maintenance: boolean): Promise<SetMaintenanceResponse>;
export declare function putPublic(airdropId: number, isPublic: boolean): Promise<PutPublicResponse>;
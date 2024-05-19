import dotenv from 'dotenv';
import {
  addRewards as addRewardsFunction,
  AddRewardsResponse
} from './api-calls/add-rewards';
import {
  deleteAirdrop as deleteAirdropFunction,
  DeleteAirdropResponse
} from './api-calls/delete-airdrop';
import {
  deleteRewards as deleteRewardsFunction,
  RemoveRewardsResponse
} from './api-calls/delete-rewards';
import {
  getAirdrop as getAirdropFunction,
  GetAirdropResponse
} from './api-calls/get-airdrop';
import {
  getRecipient as getRecipientFunction,
  GetRecipientResponse
} from './api-calls/get-recipient';
import {
  getRewardsCount as getRewardsCountFunction,
  GetRewardsCountResponse
} from './api-calls/get-rewards-count';
import {
  getRewardsTotal as getRewardsTotalFunction,
  GetRewardsTotalResponse
} from './api-calls/get-rewards-total';
import {
  getRewards as getRewardsFunction,
  GetRewardsResponse
} from './api-calls/get-rewards';
import {
  putMaintenance as putMaintenanceFunction,
  SetMaintenanceResponse
} from './api-calls/put-maintenance';
import {
  putPublic as putPublicFunction,
  PutPublicResponse
} from './api-calls/put-public';
import {
  RewardData as RewardDataInterface,
  RewardKey as RewardKeyInterface
} from './api-calls/common';

dotenv.config();

const ADMIN_API_URL = process.env.ADMIN_API_ENDPOINT || '';
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || '';

if (!ADMIN_API_KEY) {
  throw new Error('API key is not set in the environment variables');
}

if (!ADMIN_API_URL) {
  throw new Error('API endpoint is not set in the environment variables');
}

export type RewardData = RewardDataInterface;
export type RewardKey = RewardKeyInterface;

export async function addRewards(
  rewards: RewardData[]
): Promise<AddRewardsResponse> {
  return addRewardsFunction(ADMIN_API_KEY, ADMIN_API_URL, rewards);
}

export async function getRewards(
  keys: RewardKey[]
): Promise<GetRewardsResponse> {
  return getRewardsFunction(ADMIN_API_KEY, ADMIN_API_URL, keys);
}

export async function deleteAirdrop(
  airdropId: number
): Promise<DeleteAirdropResponse> {
  return deleteAirdropFunction(ADMIN_API_KEY, ADMIN_API_URL, airdropId);
}

export async function deleteRewards(
  keys: RewardKey[]
): Promise<RemoveRewardsResponse> {
  return deleteRewardsFunction(ADMIN_API_KEY, ADMIN_API_URL, keys);
}

export async function getAirdrop(
  airdropId: number
): Promise<GetAirdropResponse> {
  return getAirdropFunction(ADMIN_API_KEY, ADMIN_API_URL, airdropId);
}

export async function getRecipient(
  recipientId: string
): Promise<GetRecipientResponse> {
  return getRecipientFunction(ADMIN_API_KEY, ADMIN_API_URL, recipientId);
}

export async function getRewardsCount(
  airdropId: number
): Promise<GetRewardsCountResponse> {
  return getRewardsCountFunction(ADMIN_API_KEY, ADMIN_API_URL, airdropId);
}

export async function getRewardsTotal(
  airdropId: number
): Promise<GetRewardsTotalResponse> {
  return getRewardsTotalFunction(ADMIN_API_KEY, ADMIN_API_URL, airdropId);
}

export async function putMaintenance(
  maintenance: boolean
): Promise<SetMaintenanceResponse> {
  return putMaintenanceFunction(ADMIN_API_KEY, ADMIN_API_URL, maintenance);
}

export async function putPublic(
  airdropId: number,
  isPublic: boolean
): Promise<PutPublicResponse> {
  return putPublicFunction(ADMIN_API_KEY, ADMIN_API_URL, airdropId, isPublic);
}

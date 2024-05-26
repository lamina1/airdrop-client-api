import dotenv from 'dotenv';
import {
  getAddress as getAddressFunction,
  GetAddressResponse
} from './api-calls/get-address';
import {
  getRewards as getRewardsFunction,
  GetRewardsResponse
} from './api-calls/get-rewards';
import { RewardKey } from './api-calls/common';

dotenv.config();

const PUBLIC_API_URL = process.env.PUBLIC_API_ENDPOINT || '';
const PUBLIC_API_KEY = process.env.PUBLIC_API_KEY || '';

if (!PUBLIC_API_KEY) {
  throw new Error('API key is not set in the environment variables');
}

if (!PUBLIC_API_URL) {
  throw new Error('API endpoint is not set in the environment variables');
}

export async function getRewards(
  keys: RewardKey[]
): Promise<GetRewardsResponse> {
  return getRewardsFunction(PUBLIC_API_KEY, PUBLIC_API_URL, keys);
}

export async function getAddress(address: string): Promise<GetAddressResponse> {
  return getAddressFunction(PUBLIC_API_KEY, PUBLIC_API_URL, address);
}

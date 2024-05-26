import { GetAddressResponse } from './api-calls/get-address';
import { GetRewardsResponse } from './api-calls/get-rewards';
import { RewardKey } from './api-calls/common';
export declare function getRewards(keys: RewardKey[]): Promise<GetRewardsResponse>;
export declare function getAddress(address: string): Promise<GetAddressResponse>;

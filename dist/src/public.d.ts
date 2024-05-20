import { GetRecipientResponse } from './api-calls/get-recipient';
import { GetRewardsResponse } from './api-calls/get-rewards';
import { RewardKey } from './api-calls/common';
export declare function getRewards(keys: RewardKey[]): Promise<GetRewardsResponse>;
export declare function getRecipient(recipientId: string): Promise<GetRecipientResponse>;

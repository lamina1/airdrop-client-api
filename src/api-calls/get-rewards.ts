import { RewardKey, RewardData } from './common';
export interface GetRewardsResponse {
  success: boolean;
  rewards?: RewardData[];
  missingKeys?: RewardKey[];
  error?: string;
}

export async function getRewards(
  apiKey: string,
  apiUrl: string,
  keys: RewardKey[]
): Promise<GetRewardsResponse> {
  const response = await fetch(`${apiUrl}/airdrop/get/rewards`, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(keys)
  });

  const responseData = await response.json();

  if (response.status === 200) {
    return {
      success: true,
      rewards: responseData
    };
  } else if (response.status === 207) {
    return {
      success: true,
      rewards: responseData.rewards,
      missingKeys: responseData.missingKeys
    };
  } else if (response.status === 503) {
    return {
      success: false,
      error: 'Airdrop service unavailable due to maintenance.'
    };
  } else if (response.status === 404) {
    return {
      success: false,
      missingKeys: responseData.missingKeys,
      error: 'No rewards found'
    };
  } else if (response.status === 400 || response.status === 500) {
    return {
      success: false,
      error: responseData.error
    };
  } else {
    return {
      success: false,
      error: 'Unexpected error occurred: ' + responseData.error
    };
  }
}

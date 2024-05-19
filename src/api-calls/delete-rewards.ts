import { RewardKey } from './common';
export interface RemoveRewardsResponse {
  success: boolean;
  missingKeys?: RewardKey[];
  error?: string;
}

export async function deleteRewards(
  apiKey: string,
  apiUrl: string,
  keys: RewardKey[]
): Promise<RemoveRewardsResponse> {
  const response = await fetch(`${apiUrl}/airdrop/delete/rewards`, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(keys),
  });

  if (response.status === 204) {
    return {
      success: true,
    };
  } else if (response.status === 207) {
    const responseData = await response.json();
    return {
      success: true,
      missingKeys: responseData.missingKeys,
    };
  } else if (response.status === 400 || response.status === 500) {
    const responseData = await response.json();
    return {
      success: false,
      error: responseData.error,
    };
  } else if (response.status === 403) {
    return {
      success: false,
      error: 'Unauthorized to delete rewards',
    };
  } else if (response.status === 404) {
    return {
      success: true,
      error: 'No rewards found for deletion',
    };
  } else {
    return {
      success: false,
      error: 'Unexpected error occurred',
    };
  }
}

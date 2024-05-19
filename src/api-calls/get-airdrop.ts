import { RewardData } from './common';
export interface GetAirdropResponse {
  success: boolean;
  rewards?: RewardData[];
  error?: string;
}

export async function getAirdrop(
  apiKey: string,
  apiUrl: string,
  airdropID: number
): Promise<GetAirdropResponse> {
  const response = await fetch(`${apiUrl}/airdrop/${airdropID}`, {
    method: 'GET',
    headers: {
      'x-api-key': apiKey,
    },
  });

  const responseData = await response.json();

  if (response.status === 200) {
    return {
      success: true,
      rewards: responseData,
    };
  } else if (response.status === 400 || response.status === 500) {
    return {
      success: false,
      error: responseData.error,
    };
  } else if (response.status === 404) {
    return {
      success: false,
      error: responseData.message,
    };
  } else {
    return {
      success: false,
      error: 'Unexpected error occurred',
    };
  }
}

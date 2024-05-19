export interface GetRewardsCountResponse {
  success: boolean;
  count?: number;
  error?: string;
}

export async function getRewardsCount(
  apiKey: string,
  apiUrl: string,
  airdropID: number
): Promise<GetRewardsCountResponse> {
  const response = await fetch(`${apiUrl}/airdrop/${airdropID}/reward-count`, {
    method: 'GET',
    headers: {
      'x-api-key': apiKey,
    },
  });

  const responseData = await response.json();

  if (response.status === 200) {
    return {
      success: true,
      count: responseData.count,
    };
  } else if (response.status === 400 || response.status === 500) {
    return {
      success: false,
      error: responseData.error,
    };
  } else if (response.status === 403) {
    return {
      success: false,
      error: 'Unauthorized to access reward count',
    };
  } else if (response.status === 404) {
    return {
      success: false,
      error: 'Airdrop not found',
    };
  } else {
    return {
      success: false,
      error: 'Unexpected error occurred',
    };
  }
}

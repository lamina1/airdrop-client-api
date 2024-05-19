export interface DeleteAirdropResponse {
  success: boolean;
  error?: string;
}

export async function deleteAirdrop(
  apiKey: string,
  apiUrl: string,
  airdropID: number
): Promise<DeleteAirdropResponse> {
  const response = await fetch(`${apiUrl}/airdrop/${airdropID}`, {
    method: 'DELETE',
    headers: {
      'x-api-key': apiKey,
    },
  });

  if (response.status === 204) {
    return {
      success: true,
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
      error: 'Unauthorized to delete airdrop rewards',
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

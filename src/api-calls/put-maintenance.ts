export interface SetMaintenanceResponse {
  success: boolean;
  error?: string;
}

export async function putMaintenance(
  apiKey: string,
  apiUrl: string,
  maintenance: boolean
): Promise<SetMaintenanceResponse> {
  const response = await fetch(`${apiUrl}/airdrop/maintenance/${maintenance}`, {
    method: 'PUT',
    headers: {
      'x-api-key': apiKey
    }
  });

  if (response.status === 204) {
    return {
      success: true
    };
  } else if (response.status === 400 || response.status === 500) {
    const responseData = await response.json();
    return {
      success: false,
      error: responseData.error
    };
  } else if (response.status === 403) {
    return {
      success: false,
      error: 'Unauthorized to update Lambda function environment'
    };
  } else if (response.status === 404) {
    return {
      success: false,
      error: 'Lambda function not found'
    };
  } else {
    return {
      success: false,
      error: 'Unexpected error occurred'
    };
  }
}

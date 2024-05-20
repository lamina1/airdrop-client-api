"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRewardsTotal = void 0;
async function getRewardsTotal(apiKey, apiUrl, airdropID) {
    const response = await fetch(`${apiUrl}/airdrop/${airdropID}/reward-total`, {
        method: 'GET',
        headers: {
            'x-api-key': apiKey,
        },
    });
    const responseData = await response.json();
    if (response.status === 200) {
        return {
            success: true,
            total: responseData.total,
        };
    }
    else if (response.status === 400 || response.status === 500) {
        return {
            success: false,
            error: responseData.error,
        };
    }
    else if (response.status === 403) {
        return {
            success: false,
            error: 'Unauthorized to access reward total',
        };
    }
    else if (response.status === 404) {
        return {
            success: false,
            error: 'Airdrop not found',
        };
    }
    else {
        return {
            success: false,
            error: 'Unexpected error occurred',
        };
    }
}
exports.getRewardsTotal = getRewardsTotal;

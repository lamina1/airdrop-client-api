"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAirdrop = void 0;
async function getAirdrop(apiKey, apiUrl, airdropID) {
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
    }
    else if (response.status === 400 || response.status === 500) {
        return {
            success: false,
            error: responseData.error,
        };
    }
    else if (response.status === 404) {
        return {
            success: false,
            error: responseData.message,
        };
    }
    else {
        return {
            success: false,
            error: 'Unexpected error occurred',
        };
    }
}
exports.getAirdrop = getAirdrop;

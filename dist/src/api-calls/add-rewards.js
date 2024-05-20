"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRewards = void 0;
async function addRewards(apiKey, apiUrl, rewards) {
    const response = await fetch(`${apiUrl}/airdrop/rewards`, {
        method: 'POST',
        headers: {
            'x-api-key': apiKey,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(rewards),
    });
    const responseData = await response.json();
    if (response.status === 201) {
        return {
            success: true,
        };
    }
    else if (response.status === 207) {
        return {
            success: true,
            missing: responseData.failedRewards.map((fr) => fr.RewardData),
            error: 'Some rewards failed to be added',
        };
    }
    else if (response.status === 409) {
        return {
            success: false,
            missing: responseData.failedRewards.map((fr) => fr.RewardData),
            error: 'All rewards failed to be added',
        };
    }
    else if (response.status === 400 || response.status === 500) {
        return {
            success: false,
            error: responseData.error,
        };
    }
    else {
        return {
            success: false,
            error: 'Unexpected error occurred',
        };
    }
}
exports.addRewards = addRewards;

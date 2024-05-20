"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putPublic = void 0;
async function putPublic(apiKey, apiUrl, airdropID, isPublic) {
    const response = await fetch(`${apiUrl}/airdrop/${airdropID}/public/${isPublic}`, {
        method: 'PUT',
        headers: {
            'x-api-key': apiKey,
        },
    });
    if (response.status === 204) {
        return {
            success: true,
        };
    }
    else if (response.status === 400 || response.status === 500) {
        const responseData = await response.json();
        return {
            success: false,
            error: responseData.error,
        };
    }
    else if (response.status === 403) {
        return {
            success: false,
            error: 'Unauthorized to update airdrop public status',
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
exports.putPublic = putPublic;

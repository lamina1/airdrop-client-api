"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecipient = void 0;
/*
GET RECIPIENT IS DEPRECATED, USE GETREWARDS OR GETDISCORD INSTEAD
*/
async function getRecipient(apiKey, apiUrl, recipientHash) {
    const response = await fetch(`${apiUrl}/airdrop/recipient/${recipientHash}/rewards`, {
        method: 'GET',
        headers: {
            'x-api-key': apiKey
        }
    });
    const responseData = await response.json();
    if (response.status === 200) {
        return {
            success: true,
            rewards: responseData
        };
    }
    else if (response.status === 400 || response.status === 500) {
        return {
            success: false,
            error: responseData.error
        };
    }
    else if (response.status === 503) {
        return {
            success: false,
            error: 'Airdrop service unavailable due to maintenance.'
        };
    }
    else if (response.status === 404) {
        return {
            success: false,
            error: responseData.message
        };
    }
    else {
        return {
            success: false,
            error: 'Unexpected error occurred'
        };
    }
}
exports.getRecipient = getRecipient;

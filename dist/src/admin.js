"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putPublic = exports.putMaintenance = exports.getRewardsTotal = exports.getRewardsCount = exports.getDiscord = exports.getAddress = exports.getAirdrop = exports.deleteRewards = exports.deleteAirdrop = exports.getRewards = exports.addRewards = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const add_rewards_1 = require("./api-calls/add-rewards");
const delete_airdrop_1 = require("./api-calls/delete-airdrop");
const delete_rewards_1 = require("./api-calls/delete-rewards");
const get_airdrop_1 = require("./api-calls/get-airdrop");
const get_address_1 = require("./api-calls/get-address");
const get_discord_1 = require("./api-calls/get-discord");
const get_rewards_count_1 = require("./api-calls/get-rewards-count");
const get_rewards_total_1 = require("./api-calls/get-rewards-total");
const get_rewards_1 = require("./api-calls/get-rewards");
const put_maintenance_1 = require("./api-calls/put-maintenance");
const put_public_1 = require("./api-calls/put-public");
dotenv_1.default.config();
const ADMIN_API_URL = process.env.ADMIN_API_ENDPOINT || '';
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || '';
if (!ADMIN_API_KEY) {
    throw new Error('API key is not set in the environment variables');
}
if (!ADMIN_API_URL) {
    throw new Error('API endpoint is not set in the environment variables');
}
async function addRewards(rewards) {
    return (0, add_rewards_1.addRewards)(ADMIN_API_KEY, ADMIN_API_URL, rewards);
}
exports.addRewards = addRewards;
async function getRewards(keys) {
    return (0, get_rewards_1.getRewards)(ADMIN_API_KEY, ADMIN_API_URL, keys);
}
exports.getRewards = getRewards;
async function deleteAirdrop(airdropId) {
    return (0, delete_airdrop_1.deleteAirdrop)(ADMIN_API_KEY, ADMIN_API_URL, airdropId);
}
exports.deleteAirdrop = deleteAirdrop;
async function deleteRewards(keys) {
    return (0, delete_rewards_1.deleteRewards)(ADMIN_API_KEY, ADMIN_API_URL, keys);
}
exports.deleteRewards = deleteRewards;
async function getAirdrop(airdropId) {
    return (0, get_airdrop_1.getAirdrop)(ADMIN_API_KEY, ADMIN_API_URL, airdropId);
}
exports.getAirdrop = getAirdrop;
async function getAddress(address) {
    return (0, get_address_1.getAddress)(ADMIN_API_KEY, ADMIN_API_URL, address);
}
exports.getAddress = getAddress;
async function getDiscord(discordId) {
    return (0, get_discord_1.getDiscord)(ADMIN_API_KEY, ADMIN_API_URL, discordId);
}
exports.getDiscord = getDiscord;
async function getRewardsCount(airdropId) {
    return (0, get_rewards_count_1.getRewardsCount)(ADMIN_API_KEY, ADMIN_API_URL, airdropId);
}
exports.getRewardsCount = getRewardsCount;
async function getRewardsTotal(airdropId) {
    return (0, get_rewards_total_1.getRewardsTotal)(ADMIN_API_KEY, ADMIN_API_URL, airdropId);
}
exports.getRewardsTotal = getRewardsTotal;
async function putMaintenance(maintenance) {
    return (0, put_maintenance_1.putMaintenance)(ADMIN_API_KEY, ADMIN_API_URL, maintenance);
}
exports.putMaintenance = putMaintenance;
async function putPublic(airdropId, isPublic) {
    return (0, put_public_1.putPublic)(ADMIN_API_KEY, ADMIN_API_URL, airdropId, isPublic);
}
exports.putPublic = putPublic;

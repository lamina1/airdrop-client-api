"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAddress = exports.getRewards = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const get_address_1 = require("./api-calls/get-address");
const get_rewards_1 = require("./api-calls/get-rewards");
dotenv_1.default.config();
const PUBLIC_API_URL = process.env.PUBLIC_API_ENDPOINT || '';
const PUBLIC_API_KEY = process.env.PUBLIC_API_KEY || '';
if (!PUBLIC_API_KEY) {
    throw new Error('API key is not set in the environment variables');
}
if (!PUBLIC_API_URL) {
    throw new Error('API endpoint is not set in the environment variables');
}
async function getRewards(keys) {
    return (0, get_rewards_1.getRewards)(PUBLIC_API_KEY, PUBLIC_API_URL, keys);
}
exports.getRewards = getRewards;
async function getAddress(address) {
    return (0, get_address_1.getAddress)(PUBLIC_API_KEY, PUBLIC_API_URL, address);
}
exports.getAddress = getAddress;

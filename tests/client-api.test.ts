import { adminApi } from '../index';
import { publicApi } from '../index';
import { RewardData, RewardKey } from '../src/api-calls/common';

const sampleRewards: RewardData[] = [
  {
    AirdropID: 1,
    NodeID: '0x1234567890123456789012345678901234567890',
    DiscordID: '123456',
    RewardAmount: '1000000000000000000',
    MerkleProof: [
      '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      'Proof2'
    ],
    IsPublic: false
  },
  {
    AirdropID: 1,
    NodeID: '0x2345678901234567890123456789012345678901',
    Address: '0xbcdef1234567890abcdef1234567890abcdef',
    RewardAmount: '2000000000000000000',
    MerkleProof: [
      '0x2345678901abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      'Proof2'
    ],
    IsPublic: false
  },
  {
    AirdropID: 2,
    NodeID: '0x3456789012345678901234567890123456789012',
    DiscordID: '54321',
    RewardAmount: '3000000000000000000',
    MerkleProof: [
      '0x3456789012abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      'Proof2'
    ],
    IsPublic: false
  }
];

const publicRewards: RewardData[] = [
  {
    AirdropID: 1,
    NodeID: '0x1234567890123456789012345678901234567890',
    RewardAmount: '1000000000000000000',
    MerkleProof: [
      '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      'Proof2'
    ],
    IsPublic: false
  },
  {
    AirdropID: 1,
    NodeID: '0x2345678901234567890123456789012345678901',
    RewardAmount: '2000000000000000000',
    MerkleProof: [
      '0x2345678901abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      'Proof2'
    ],
    IsPublic: false
  },
  {
    AirdropID: 2,
    NodeID: '0x3456789012345678901234567890123456789012',
    RewardAmount: '3000000000000000000',
    MerkleProof: [
      '0x3456789012abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      'Proof2'
    ],
    IsPublic: false
  }
];

const sampleKeys: RewardKey[] = [
  { AirdropID: 1, NodeID: '0x1234567890123456789012345678901234567890' },
  { AirdropID: 1, NodeID: '0x2345678901234567890123456789012345678901' },
  { AirdropID: 2, NodeID: '0x3456789012345678901234567890123456789012' }
];

describe('Unified Test Suite for Admin and Public APIs', () => {
  beforeAll(async () => {
    // Clear rewards before starting tests
    const rewardKeys: RewardKey[] = sampleRewards.map((reward) => ({
      AirdropID: reward.AirdropID,
      NodeID: reward.NodeID
    }));
    let response = await adminApi.deleteRewards(rewardKeys);
    if (!response.success) {
      throw new Error(response.error);
    }
  });

  test('Add rewards', async () => {
    const response = await adminApi.addRewards(sampleRewards);
    expect(!response.error);
    expect(response.success);
  });

  test('Get rewards', async () => {
    // Get rewards
    let response = await adminApi.getRewards(sampleKeys);
    expect(response.success).toBe(true);
    expect(response.rewards).toEqual(expect.arrayContaining(sampleRewards));

    response = await publicApi.getRewards(sampleKeys);
    expect(response.success).toBe(false);
    expect(!response.rewards);
    expect(response.error).toBe('No rewards found');

    response = await adminApi.putPublic(1, true);
    expect(response.success).toBe(true);
    response = await adminApi.putPublic(2, true);
    expect(response.success).toBe(true);

    for (const reward of sampleRewards) {
      reward.IsPublic = true;
    }
    for (const reward of publicRewards) {
      reward.IsPublic = true;
    }
    response = await publicApi.getRewards(sampleKeys);
    expect(response.success).toBe(true);
    expect(response.rewards).toEqual(expect.arrayContaining(publicRewards));
    expect(!response.error);
  });

  test('Public API - Get rewards by Address', async () => {
    const address = '0xbcdef1234567890abcdef1234567890abcdef';
    let response = await adminApi.getAddress(address);
    expect(response.success).toBe(true);
    expect(!response.error);

    const expectedRewards = publicRewards.filter(
      (reward) => reward.Address === address
    );
    expect(response.rewards).toEqual(expect.arrayContaining(expectedRewards));

    response = await publicApi.getAddress(address);
    expect(response.success).toBe(true);
    expect(!response.error);
    expect(response.rewards).toEqual(expect.arrayContaining(expectedRewards));
  });

  test('Admin API - Get rewards by airdrop ID', async () => {
    const airdropID = 1;
    const response = await adminApi.getAirdrop(airdropID);
    expect(response.success).toBe(true);
    expect(!response.error);

    const expectedRewards = sampleRewards.filter(
      (reward) => reward.AirdropID === airdropID
    );
    expect(response.rewards).toEqual(expect.arrayContaining(expectedRewards));
  });

  test('Admin API - Get reward count by airdrop ID', async () => {
    const airdropID = 1;
    const response = await adminApi.getRewardsCount(airdropID);
    expect(response.success).toBe(true);
    expect(!response.error);

    const expectedCount = sampleRewards.filter(
      (reward) => reward.AirdropID === airdropID
    ).length;
    expect(response.count).toBe(expectedCount);
  });

  test('Admin API - Get total reward amount by airdrop ID', async () => {
    const airdropID = 1;
    const response = await adminApi.getRewardsTotal(airdropID);
    expect(response.success).toBe(true);
    expect(!response.error);

    const expectedTotal = sampleRewards
      .filter((reward) => reward.AirdropID === airdropID)
      .reduce(
        (total, reward) => total + BigInt(reward.RewardAmount),
        BigInt(0)
      );
    expect(response.total);
    if (response.total) expect(BigInt(response.total)).toBe(expectedTotal);
  });

  test('Admin API - Delete rewards', async () => {
    const rewardKeys: RewardKey[] = sampleRewards.map((reward) => ({
      AirdropID: reward.AirdropID,
      NodeID: reward.NodeID
    }));
    const response = await adminApi.deleteRewards(rewardKeys);
    expect(response.success).toBe(true);
    expect(!response.error);

    const getResponse = await adminApi.getRewards(rewardKeys);
    expect(getResponse.success).toBe(false);
    expect(!getResponse.rewards);
  });
  jest.setTimeout(30000);

  test('Admin API - Set maintenance mode', async () => {
    let response = await adminApi.putMaintenance(true);
    expect(response.success).toBe(true);
    expect(!response.error);
    await new Promise((r) => setTimeout(r, 5000));

    // Verify that public API calls are restricted during maintenance mode
    const publicResponse = await publicApi.getRewards(sampleKeys);
    expect(publicResponse.success).toBe(false);
    expect(publicResponse.error).toBe(
      'Airdrop service unavailable due to maintenance.'
    );

    response = await adminApi.putMaintenance(false);
    expect(response.success).toBe(true);
    expect(!response.error);
  });

  afterAll(async () => {
    // Clean up rewards after tests
    const rewardKeys: RewardKey[] = sampleRewards.map((reward) => ({
      AirdropID: reward.AirdropID,
      NodeID: reward.NodeID
    }));
    await adminApi.deleteRewards(rewardKeys);
    const response = await adminApi.putMaintenance(false);
  });
});

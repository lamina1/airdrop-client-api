import * as adminClient from '../../src/admin';
import * as publicClient from '../../src/public';
import { RewardData, RewardKey } from '../../src/admin';

const sampleRewards: RewardData[] = [
  {
    AirdropID: 1,
    NodeID: '0x1234567890123456789012345678901234567890',
    RecipientHash:
      '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
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
    RecipientHash:
      '0xbcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890a',
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
    RecipientHash:
      '0xcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab',
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
    let response = await adminClient.deleteRewards(rewardKeys);
    if (!response.success) {
      throw new Error(response.error);
    }
  });

  test('Admin API - Add rewards', async () => {
    const response = await adminClient.addRewards(sampleRewards);
    expect(!response.error);
    expect(response.success);
  });

  test('Admin API - Get rewards', async () => {
    // Get rewards
    let response = await adminClient.getRewards(sampleKeys);
    expect(response.success);
    expect(response.rewards).toEqual(expect.arrayContaining(sampleRewards));

    response = await publicClient.getRewards(sampleKeys);
    expect(!response.success);
    expect(!response.rewards);
    expect(response.error).toBe('No rewards found');

    response = await adminClient.putPublic(1, true);
    expect(response.success);
    response = await adminClient.putPublic(2, true);
    expect(response.success);

    for (const reward of sampleRewards) {
      reward.IsPublic = true;
    }

    response = await publicClient.getRewards(sampleKeys);
    expect(response.success);
    expect(response.rewards).toEqual(expect.arrayContaining(sampleRewards));
    expect(!response.error);
  });

  test('Public API - Get rewards by recipient hash', async () => {
    const recipientHash =
      '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890';
    let response = await adminClient.getRecipient(recipientHash);
    expect(response.success);
    expect(!response.error);

    const expectedRewards = sampleRewards.filter(
      (reward) => reward.RecipientHash === recipientHash
    );
    expect(response.rewards).toEqual(expect.arrayContaining(expectedRewards));

    response = await publicClient.getRecipient(recipientHash);
    expect(response.success);
    expect(!response.error);
    expect(response.rewards).toEqual(expect.arrayContaining(expectedRewards));
  });

  test('Admin API - Get rewards by airdrop ID', async () => {
    const airdropID = 1;
    const response = await adminClient.getAirdrop(airdropID);
    expect(response.success);
    expect(!response.error);

    const expectedRewards = sampleRewards.filter(
      (reward) => reward.AirdropID === airdropID
    );
    expect(response.rewards).toEqual(expect.arrayContaining(expectedRewards));
  });

  test('Admin API - Get reward count by airdrop ID', async () => {
    const airdropID = 1;
    const response = await adminClient.getRewardsCount(airdropID);
    expect(response.success);
    expect(!response.error);

    const expectedCount = sampleRewards.filter(
      (reward) => reward.AirdropID === airdropID
    ).length;
    expect(response.count).toBe(expectedCount);
  });

  test('Admin API - Get total reward amount by airdrop ID', async () => {
    const airdropID = 1;
    const response = await adminClient.getRewardsTotal(airdropID);
    expect(response.success);
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
    const response = await adminClient.deleteRewards(rewardKeys);
    expect(response.success);
    expect(!response.error);

    const getResponse = await adminClient.getRewards(rewardKeys);
    expect(getResponse.success);
    expect(!getResponse.rewards);
  });
  jest.setTimeout(30000);

  test('Admin API - Set maintenance mode', async () => {
    let response = await adminClient.putMaintenance(true);
    expect(response.success);
    expect(!response.error);
    await new Promise((r) => setTimeout(r, 5000));

    // Verify that public API calls are restricted during maintenance mode
    const publicResponse = await publicClient.getRewards(sampleKeys);
    expect(!publicResponse.success);
    expect(publicResponse.error).toBe(
      'Airdrop service unavailable due to maintenance.'
    );

    response = await adminClient.putMaintenance(false);
    expect(response.success);
    expect(!response.error);
  });

  afterAll(async () => {
    // Clean up rewards after tests
    const rewardKeys: RewardKey[] = sampleRewards.map((reward) => ({
      AirdropID: reward.AirdropID,
      NodeID: reward.NodeID
    }));
    await adminClient.deleteRewards(rewardKeys);
    const response = await adminClient.putMaintenance(false);
  });
});
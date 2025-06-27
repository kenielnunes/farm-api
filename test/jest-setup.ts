console.log('Jest setup file is running!');

jest.mock('crypto', () => ({
  randomUUID: jest.fn(() => 'mock-uuid'),
  createHash: jest.fn(() => ({
    update: jest.fn().mockReturnThis(),
    digest: jest.fn(() => 'mocked_hash_value'),
  })),
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn(() => 'hashedPassword'),
  compare: jest.fn(() => true),
})); 
import { createHandler } from '../create-game';

describe('create game lambda', () => {
  it('should create a random game ID and store it under a new session in Redis', async () => {
    const redis = {
      set: jest.fn().mockResolvedValue(true),
    };

    const logger = {
      info: jest.fn(),
    };

    const uuid = () => '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';
    const createGame = createHandler(logger, redis, uuid);

    const result = await createGame();

    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        gameCode: '9b1deb4d'
      }),
    });

    expect(redis.set).toHaveBeenCalledTimes(1);
    expect(redis.set).toHaveBeenCalledWith('9b1deb4d', JSON.stringify({}));
  });
});

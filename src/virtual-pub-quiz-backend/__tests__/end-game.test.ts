import { createHandler } from '../end-game';

describe('end game lambda', () => {
  it('should delete the given game code key from Redis', async () => {
    const logger = {
      info: jest.fn(),
    };

    const redis = {
      del: jest.fn().mockResolvedValue(1),
    };

    const gameCode = 'abcd';
    const event = { gameCode };

    const endGame = createHandler(logger, redis);
    const result = await endGame(event);

    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    });

    expect(redis.del).toHaveBeenCalledTimes(1);
    expect(redis.del).toHaveBeenCalledWith(gameCode);
  });
});

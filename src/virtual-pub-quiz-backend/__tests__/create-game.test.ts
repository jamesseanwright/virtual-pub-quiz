import { createHandler } from '../create-game';

describe('create game lambda', () => {
  const logger = {
    info: jest.fn(),
  };

  it('should create a random game ID and store it under a new session in Redis', async () => {
    const redis = {
      exists: jest.fn().mockResolvedValue(false),
      set: jest.fn().mockResolvedValue(true),
    };

    const getUuid = () => '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';
    const createGame = createHandler(logger, redis, getUuid);
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

  it('should generate another game code if the current one exists', async () => {
    const uuids = [
      '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      '7d261f9d-a038-4f7c-b1d7-ce7481e9118e',
      '78138c67-8241-4b24-a466-6e308e8cea7f',
    ];

    const existingUuids = uuids.slice(0, 2);

    const redis = {
      set: jest.fn().mockResolvedValue(true),
      exists: jest.fn().mockImplementation(key => Promise.resolve(existingUuids.includes(key))),
    };

    const getUuid = jest.fn();

    uuids.forEach(uuid => getUuid.mockReturnValueOnce(uuid));

    const createGame = createHandler(logger, redis, getUuid);
    const result = await createGame();

    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        gameCode: '78138c67'
      }),
    });

    expect(redis.set).toHaveBeenCalledTimes(1);
    expect(redis.set).toHaveBeenCalledWith('78138c67', JSON.stringify({}));
    expect(redis.exists).toHaveBeenCalledTimes(3);

    uuids.forEach(uuid => expect(redis.exists).toHaveBeenCalledWith(uuid));
  });
});

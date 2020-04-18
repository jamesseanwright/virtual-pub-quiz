import { createHandler } from '../create-game';
import { createGame as createGameModel } from '../models';

describe('create game lambda', () => {
  const logger = {
    info: jest.fn(),
  };

  const expectedExpiry = ['EX', 43200];

  it('should create a random game ID and store it under a new session in Redis', async () => {
    const redis = {
      exists: jest.fn().mockResolvedValue(false),
      hmset: jest.fn().mockResolvedValue(true),
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

    expect(redis.hmset).toHaveBeenCalledTimes(1);
    expect(redis.hmset).toHaveBeenCalledWith('9b1deb4d', ...createGameModel(), ...expectedExpiry);
  });

  it('should generate another game code if the current one exists', async () => {
    const uuids = [
      '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      '7d261f9d-a038-4f7c-b1d7-ce7481e9118e',
      '78138c67-8241-4b24-a466-6e308e8cea7f',
    ];

    const gameCodes = uuids.map(code => (code.match(/^[a-f0-9]+/i) || [])[0]);
    const existingGameCodes = gameCodes.slice(0, 2);

    const redis = {
      hmset: jest.fn().mockResolvedValue(true),
      exists: jest.fn().mockImplementation(key => Promise.resolve(existingGameCodes.includes(key))),
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

    expect(redis.hmset).toHaveBeenCalledTimes(1);
    expect(redis.hmset).toHaveBeenCalledWith('78138c67', ...createGameModel(), ...expectedExpiry);
    expect(redis.exists).toHaveBeenCalledTimes(3);

    gameCodes.forEach(gameCode => expect(redis.exists).toHaveBeenCalledWith(gameCode));
  });

  /* uuid() should always return a UUID, but
   * this valids our fallback when our regex
   * for extracting the first portion of the
   * generated UUID somehow fails. */
  it('should compute a new game code if the previously-computed UUID is falsy', async () => {
    const uuids = [
      '',
      '7d261f9d-a038-4f7c-b1d7-ce7481e9118e',
    ];

    const redis = {
      hmset: jest.fn().mockResolvedValue(true),
      exists: jest.fn().mockResolvedValue(false),
    };

    const getUuid = jest.fn();

    uuids.forEach(uuid => getUuid.mockReturnValueOnce(uuid));

    const createGame = createHandler(logger, redis, getUuid);
    const result = await createGame();

    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        gameCode: '7d261f9d',
      }),
    });

    expect(redis.hmset).toHaveBeenCalledTimes(1);
    expect(redis.hmset).toHaveBeenCalledWith('7d261f9d', ...createGameModel(), ...expectedExpiry);
    expect(redis.exists).toHaveBeenCalledTimes(1);
  });
});

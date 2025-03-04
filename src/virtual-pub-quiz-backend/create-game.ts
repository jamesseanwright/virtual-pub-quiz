import type { Redis } from 'ioredis';
import { v4String } from 'uuid/interfaces';
import lazilyResolve from './dependencies';
import { createGame } from './models';

type GamesStorage = Pick<Redis, 'exists' | 'hmset' | 'expire'>;

const GAME_TTL_DAYS = 0.5;
const SECONDS_PER_DAY = 86400;

/* Although our game codes are taken from
 * UUIDs, the likehood of a collision is
 * increased given that we're only using the
 * leading portion. This therefore checks that
 * a computed game code isn't already in use. */
const getGameCode = async (games: GamesStorage, getUuid: v4String): Promise<string> => {
  const [gameCode] = getUuid().match(/^[a-f0-9]+/i) || [];

  return !gameCode || await games.exists(gameCode)
    ? await getGameCode(games, getUuid)
    : gameCode;
};

export const createHandler = (logger: Pick<Console, 'info'>, games: GamesStorage, getUuid: v4String) => async () => {
  logger.info('Creating new game...');

  const gameCode = await getGameCode(games, getUuid);

  /* TODO: apparently, hmset is deprecated, but hset's
   * TS signature is wrong; update DefinitelyTyped's
   * definition once confirmed as true to support this */
  await games.hmset(gameCode, createGame());
  await games.expire(gameCode, Math.floor(GAME_TTL_DAYS * SECONDS_PER_DAY))

  logger.info('Created game with code', gameCode);

  return {
    statusCode: 200,
    body: JSON.stringify({
      gameCode,
    }),
  };
};

export default lazilyResolve('logger', 'redis', 'uuid')(createHandler);

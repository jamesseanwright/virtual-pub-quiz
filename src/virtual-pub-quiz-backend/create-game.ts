import type { Redis } from 'ioredis';
import lazilyResolve from './dependencies';
import { v4String } from 'uuid/interfaces';

type GamesStorage = Pick<Redis, 'exists' | 'set'>;

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

  /* TODO: flesh out value cached as we
   * figure out what we'll need to store. */
  await games.set(gameCode, JSON.stringify({}));

  logger.info('Creating game with code', gameCode);

  return {
    statusCode: 200,
    body: JSON.stringify({
      gameCode,
    }),
  };
};

export default {
  handler: lazilyResolve('redis', 'uuid')(createHandler),
};

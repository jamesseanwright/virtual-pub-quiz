import type { Redis } from 'ioredis';
import lazilyResolve from './dependencies';

type GamesStorage = Pick<Redis, 'del'>;

interface EndGameEvent {
  gameCode: string;
}

export const createHandler = (logger: Pick<Console, 'info'>, games: GamesStorage) =>
  async ({ gameCode }: EndGameEvent) => {
    logger.info(`Ending game ${gameCode}...`);

    await games.del(gameCode);

    logger.info('Successfully ended game, gameCode');

    /* TODO: Build shared response builder if
     * not using API Gateway lambda proxy */
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  };

export default {
  handler: lazilyResolve('logger', 'redis')(createHandler),
};

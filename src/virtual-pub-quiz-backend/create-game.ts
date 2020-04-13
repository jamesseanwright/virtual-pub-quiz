import type { Redis } from 'ioredis';
import lazilyResolve from './dependencies';
import { v4String } from 'uuid/interfaces';

export const createHandler = (logger: Pick<Console, 'info'>, redis: Pick<Redis, 'set'>, getUuid: v4String) => async () => {
  logger.info('Creating new game...');

  const [gameCode] = getUuid().match(/^[a-f0-9]+/i) || [];

  /* TODO: flesh out value cached as we
   * figure out what we'll need to store. */
  await redis.set(gameCode, JSON.stringify({}));

  logger.info('Creating game with code', gameCode);

  return {
    statusCode: 200,
    body: JSON.stringify({
      gameCode,
    }),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

export default {
  handler: lazilyResolve('redis', 'uuid')(createHandler),
};

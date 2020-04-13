import { Handler } from 'aws-lambda';
import type { Redis } from 'ioredis';
import lazilyResolve from './dependencies';
import { v4String } from 'uuid/interfaces';

export const createHandler = (logger: Pick<Console, 'info'>, redis: Pick<Redis, 'set'>, getUuid: v4String) => async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      roomCode: undefined,
    }),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

export default {
  handler: lazilyResolve('redis', 'uuid')(createHandler),
};

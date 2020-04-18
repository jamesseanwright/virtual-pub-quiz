import * as Redis from 'ioredis';
import { v4 } from 'uuid';

const { REDIS_HOST } = process.env;

interface Dependencies {
  redis: Redis.Redis;
  uuid: typeof v4;
  logger: Console;
}

/* Despite calling this function
 * memoise, it doesn't currently cache
 * by input arguments, as
 * createDependencies doesn't take any. */
const memoise = <TReturn>(func: CallableFunction) => {
  let result: TReturn;

  return () => {
    if (!result) {
      result = func();
    }

    return result;
  }
};

/* By returning our dependencies object from
 * a function, we can ensure that we only
 * instatiate any deps on demand. */
const createDependencies = memoise<Readonly<Dependencies>>((): Dependencies => ({
  redis: new Redis(6379, REDIS_HOST),
  uuid: v4,
  logger: console,
}));

/* This function resolves any dependencies
 * for the inner function in a lazy fashion,
 * to avoid eagerly boostrapping concrete
 * dependencies and creating actual resources
 * when it isn't necessary e.g. in unit tests */
const lazilyResolve = <TFactoryFunc extends CallableFunction>(...dependencyNames: (keyof Dependencies)[]) =>
  (factory: TFactoryFunc) =>
    // TODO: make this signature lambda specific?
    // TODO: improve type safety
    (...args: unknown[]) => {
      const dependencies = createDependencies();
      const resolvedDependencies = dependencyNames.map(name => dependencies[name]);
      return factory(...resolvedDependencies)(...args);
    };

export default lazilyResolve;

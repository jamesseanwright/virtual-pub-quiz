import * as Redis from 'ioredis';
import { v4 } from 'uuid';

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
 * instatiate any deps once binding takes place */
const createDependencies = memoise<Readonly<Dependencies>>((): Dependencies => ({
  redis: new Redis({ lazyConnect: true }),
  uuid: v4,
  logger: console,
}));

const lazilyResolve = <TFactoryFunc extends CallableFunction>(...dependencyNames: (keyof Dependencies)[]) =>
  (factory: TFactoryFunc) => {
    const dependencies = createDependencies();
    const resolvedDependencies = dependencyNames.map(name => dependencies[name]);
    return factory(...resolvedDependencies);
  };

export default lazilyResolve;

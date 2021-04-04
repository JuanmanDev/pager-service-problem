import { container } from './inversify.config';

function bindDependencies(func: Function, dependencies: any) {
  const handler = {
    get(target: any, dependency: any) {
      if (!(dependency in target)) {
        try {
          // eslint-disable-next-line no-param-reassign
          target[dependency] = container.get(dependencies[dependency]);
        } catch (error) {
          console.error(`Dependency with name '${dependency}' not found for ${func.name} `);
          throw error;
        }
      }
      return target[dependency];
    },
  };

  const injections = new Proxy({}, handler);

  return func.bind(func, injections);
}

export { bindDependencies };
export default bindDependencies;

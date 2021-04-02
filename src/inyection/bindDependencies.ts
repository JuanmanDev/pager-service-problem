import { container } from './inversify.config';

function bindDependencies(func: any, dependencies: any) {
  const handler = {
    get(target: any, dependency: any) {
      if (!(dependency in target)) {
        // eslint-disable-next-line no-param-reassign
        target[dependency] = container.get(dependencies[dependency]);
      }
      return target[dependency];
    },
  };

  const injections = new Proxy({}, handler);
  // const injections: any = dependencies.map((dependency: any) => container.get(dependency));

  return func.bind(func, injections);
}

export { bindDependencies };
export default bindDependencies;

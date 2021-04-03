import { DomainLogicGetServices, Service } from '@interfaces/DomainLogic';
import { GetServices } from '@interfaces/PersistanceAdapter';
import bindDependencies from '@inyection/bindDependencies';

import TYPES from '@inyection/types';

export const DomainLogicGetServicesServerless = async function DomainLogicGetServicesServerless(
  { getServices }: {
    getServices: GetServices,
  },
  // TODO Filter, pagination, etc...
): Promise<Service[]> {
  const results = await getServices();
  if (!results) {
    return [];
  }
  return results;
};
export const DomainLogicGetServicesServerlessInjected: DomainLogicGetServices = bindDependencies(
  DomainLogicGetServicesServerless,
  {
    getServices: TYPES.PersistanceAdapterGetServices,
  },
);

import { DomainLogicCreateService, Service } from '@interfaces/DomainLogic';
import { CreateService } from '@interfaces/PersistanceAdapter';
import bindDependencies from '@inyection/bindDependencies';

import TYPES from '@inyection/types';

export const DomainLogicCreateServiceServerless = async function DomainLogicCreateServiceServerless(
  { createService }: { createService: CreateService },
  service: Omit<Service, 'Id'>,
) {
  // TODO Validations https://github.com/woutervh-/typescript-is

  const serviceCreated = await createService(service);

  return serviceCreated;
};

export const dependencies = {
  createService: TYPES.PersistanceAdapterCreateService,
};

export const DomainLogicCreateServiceServerlessInjected: DomainLogicCreateService = bindDependencies(
  DomainLogicCreateServiceServerless,
  dependencies,
);

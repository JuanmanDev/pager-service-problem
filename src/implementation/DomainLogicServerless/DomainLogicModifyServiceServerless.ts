import { Service, DomainLogicModifyService } from '@interfaces/DomainLogic';
import { GetServices, ModifyService } from '@interfaces/PersistanceAdapter';
import bindDependencies from '@inyection/bindDependencies';

import TYPES from '@inyection/types';
import ERROR from '../Errors/DomainLogicServerless';

export const DomainLogicModifyServiceServerless = async function DomainLogicModifyServiceServerless(
  { getServices, modifyService }: {
    getServices: GetServices,
    modifyService: ModifyService,
  },
  service: Service,
) {
  // TODO Validations https://github.com/woutervh-/typescript-is

  const servicesFound = await getServices({ id: service.Id });
  if (!servicesFound || servicesFound.length === 0) {
    throw new Error(ERROR.DL_Serverless_ServiceNotFound);
  } else if (servicesFound.length > 1) {
    throw new Error(ERROR.DL_Serverless_ServiceAmbiguous);
  }

  const serviceToModify = servicesFound[0];
  return modifyService(serviceToModify);
};

export const dependencies = {
  getServices: TYPES.PersistanceAdapterGetServices,
  modifyService: TYPES.PersistanceAdapterModifyService,
};

export const DomainLogicModifyServiceServerlessInjected: DomainLogicModifyService = bindDependencies(
  DomainLogicModifyServiceServerless,
  dependencies,
);

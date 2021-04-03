import { DomainLogicDeleteService, Service } from '@interfaces/DomainLogic';
import { DeleteService } from '@interfaces/PersistanceAdapter';
import bindDependencies from '@inyection/bindDependencies';
import TYPES from '@inyection/types';

export const DomainLogicDeleteServiceServerless = async function DomainLogicDeleteServiceServerless(
  { deleteService }: { deleteService: DeleteService },
  service: Service,
) {
  // Shoild check the service exist before delete? or the Persistante will throw the correct exception?

  await deleteService(service);
  // TODO: catch posible exceptions
};
export const DomainLogicDeleteServiceServerlessInjected: DomainLogicDeleteService = bindDependencies(
  DomainLogicDeleteServiceServerless,
  { deleteService: TYPES.PersistanceAdapterDeleteService },
);

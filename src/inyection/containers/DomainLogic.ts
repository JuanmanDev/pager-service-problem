import {
  DomainLogicCreateService, DomainLogicDeleteService, DomainLogicGetServices, DomainLogicModifyService,
} from '@interfaces/DomainLogic';
import { ContainerModule } from 'inversify';
import TYPES from '@inyection/types';

import { DomainLogicCreateServiceServerlessInjected } from '@DomainLogicServerless/DomainLogicCreateServiceServerless';
import { DomainLogicModifyServiceServerlessInjected } from '@DomainLogicServerless/DomainLogicModifyServiceServerless';
import { DomainLogicDeleteServiceServerlessInjected } from '@DomainLogicServerless/DomainLogicDeleteServiceServerless';
import { DomainLogicGetServicesServerlessInjected } from '@DomainLogicServerless/DomainLogicGetServicesServerless';

export const DomainLogicContainerModule = new ContainerModule(async (bind) => {
  bind<DomainLogicCreateService>(TYPES.DomainLogicCreateService).toConstantValue(
    DomainLogicCreateServiceServerlessInjected,
  );
  bind<DomainLogicModifyService>(TYPES.DomainLogicModifyService).toConstantValue(
    DomainLogicModifyServiceServerlessInjected,
  );
  bind<DomainLogicDeleteService>(TYPES.DomainLogicDeleteService).toConstantValue(
    DomainLogicDeleteServiceServerlessInjected,
  );
  bind<DomainLogicGetServices>(TYPES.DomainLogicGetServices).toConstantValue(
    DomainLogicGetServicesServerlessInjected,
  );
});

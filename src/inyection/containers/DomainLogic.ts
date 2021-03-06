import {
  DomainLogicCheckAlert,
  DomainLogicCreateAlert,
  DomainLogicCreateService,
  DomainLogicDeleteService,
  DomainLogicGetServices,
  DomainLogicModifyService,
  DomainLogicNotifyPerson,
  DomainLogicReceiveTimeout,
  DomainLogicStepUpLevelAlert,
} from '@interfaces/DomainLogic';
import { ContainerModule } from 'inversify';
import TYPES from '@inyection/types';

import { DomainLogicCreateServiceServerlessInjected } from '@DomainLogicServerless/DomainLogicCreateServiceServerless';
import { DomainLogicModifyServiceServerlessInjected } from '@DomainLogicServerless/DomainLogicModifyServiceServerless';
import { DomainLogicDeleteServiceServerlessInjected } from '@DomainLogicServerless/DomainLogicDeleteServiceServerless';
import { DomainLogicGetServicesServerlessInjected } from '@DomainLogicServerless/DomainLogicGetServicesServerless';
import { DomainLogicCreateAlertServerlessInjected } from '@DomainLogicServerless/DomainLogicCreateAlertServerless';
import {
  DomainLogicReceiveTimeoutServerlessInjected,
} from '@DomainLogicServerless/DomainLogicReceiveTimeoutServerless';
import {
  DomainLogicServerlessStepUpLevelAlertInjected,
} from '@DomainLogicServerless/DomainLogicStepUpLevelAlertServerless';
import { DomainLogicCheckAlertServerlessInjected } from '@DomainLogicServerless/DomainLogicCheckAlertServerless';
import { DomainLogicNotifyPersonServerlessInjected } from '@DomainLogicServerless/DomainLogicNotifyPersonServerless';

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

  bind<DomainLogicCreateAlert>(TYPES.DomainLogicCreateAlert).toConstantValue(
    DomainLogicCreateAlertServerlessInjected,
  );

  bind<DomainLogicReceiveTimeout>(TYPES.DomainLogicReceiveTimeout).toConstantValue(
    DomainLogicReceiveTimeoutServerlessInjected,
  );

  bind<DomainLogicStepUpLevelAlert>(TYPES.DomainLogicStepUpLevelAlert).toConstantValue(
    DomainLogicServerlessStepUpLevelAlertInjected,
  );
  bind<DomainLogicCheckAlert>(TYPES.DomainLogicCheckAlert).toConstantValue(
    DomainLogicCheckAlertServerlessInjected,
  );
  bind<DomainLogicNotifyPerson>(TYPES.DomainLogicNotifyPerson).toConstantValue(
    DomainLogicNotifyPersonServerlessInjected,
  );
});

import { DomainLogicCreateService } from '@interfaces/DomainLogic';
import { ContainerModule } from 'inversify';
import TYPES from '@inyection/types';
import { DomainLogicCreateServiceServerlessInjected } from '@DomainLogicServerless/DomainLogicCreateServiceServerless';

export const DomainLogicContainerModule = new ContainerModule(async (bind) => {
  bind<DomainLogicCreateService>(TYPES.DomainLogicCreateService).toConstantValue(
    DomainLogicCreateServiceServerlessInjected,
  );
});

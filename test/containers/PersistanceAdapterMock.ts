import { CreateService } from '@interfaces/PersistanceAdapter';
import TYPES from '@inyection/types';
import { CreateServiceMock } from '@MockServices/PersistanceAdapter';
import { ContainerModule } from 'inversify';

export const PersistanceAdapterMockContainerModule = new ContainerModule((bind) => {
  bind<CreateService>(TYPES.PersistanceAdapterCreateService).toConstantValue(
    CreateServiceMock,
  );
});

import {
  CreateService, DeleteService, GetServices, ModifyService,
} from '@interfaces/PersistanceAdapter';
import TYPES from '@inyection/types';
import {
  CreateServiceMock,
  DeleteServiceMock,
  GetServicesMock,
  ModifyServiceMock,
} from '@MockServices/PersistanceAdapter';
import { ContainerModule } from 'inversify';

export const PersistanceAdapterMockContainerModule = new ContainerModule((bind) => {
  bind<CreateService>(TYPES.PersistanceAdapterCreateService).toConstantValue(
    CreateServiceMock,
  );
  bind<GetServices>(TYPES.PersistanceAdapterGetServices).toConstantValue(
    GetServicesMock,
  );
  bind<ModifyService>(TYPES.PersistanceAdapterModifyService).toConstantValue(
    ModifyServiceMock,
  );
  bind<DeleteService>(TYPES.PersistanceAdapterDeleteService).toConstantValue(
    DeleteServiceMock,
  );
});

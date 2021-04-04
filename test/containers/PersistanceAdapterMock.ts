import {
  CreateAlert,
  CreateAlertPerson,
  CreateService, DeleteService, GetAlert, GetServices, ModifyAlert, ModifyAlertIfNotClosed, ModifyService,
} from '@interfaces/PersistanceAdapter';
import TYPES from '@inyection/types';
import {
  CreateAlertMock,
  CreateAlertPersonMock,
  CreateServiceMock,
  DeleteServiceMock,
  GetAlertMock,
  GetServicesMock,
  ModifyAlertIfNotClosedMock,
  ModifyAlertMock,
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

  bind<CreateAlertPerson>(TYPES.PersistanceAdapterCreateAlertPerson).toConstantValue(
    CreateAlertPersonMock,
  );
  bind<GetAlert>(TYPES.PersistanceAdapterGetAlert).toConstantValue(
    GetAlertMock,
  );
  bind<CreateAlert>(TYPES.PersistanceAdapterCreateAlert).toConstantValue(
    CreateAlertMock,
  );
  bind<ModifyAlert>(TYPES.PersistanceAdapterModifyAlert).toConstantValue(
    ModifyAlertMock,
  );
  bind<ModifyAlertIfNotClosed>(TYPES.PersistanceAdapterModifyAlertIfNotClosed).toConstantValue(
    ModifyAlertIfNotClosedMock,
  );
});

import { CreateTimer } from '@interfaces/TimerAdapter';
import TYPES from '@inyection/types';
import { CreateTimerFalseMock } from '@MockServices/TimerAdapterMock';
import { ContainerModule } from 'inversify';

export const TimerAdapterMockContainerModule = new ContainerModule((bind) => {
  bind<CreateTimer>(TYPES.TimerAdapterCreateTimerMock).toConstantValue(
    CreateTimerFalseMock,
  );
});

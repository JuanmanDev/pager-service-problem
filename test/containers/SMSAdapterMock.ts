import { SendSMS } from '@interfaces/SMSAdapter';
import TYPES from '@inyection/types';
import { SendSMSMock } from '@MockServices/SMSApadterMock';
import { ContainerModule } from 'inversify';

export const TimerAdapterMockContainerModule = new ContainerModule((bind) => {
  bind<SendSMS>(TYPES.SMSAdapterSendSMS).toConstantValue(
    SendSMSMock,
  );
});

import { SendSMS } from '@interfaces/SMSAdapter';
import TYPES from '@inyection/types';
import { SendSMSMock } from '@MockServices/SMSApadterMock';
import { ContainerModule } from 'inversify';

export const SMSAdapterMockContainerModule = new ContainerModule((bind) => {
  bind<SendSMS>(TYPES.SMSAdapterSendSMS).toConstantValue(
    SendSMSMock,
  );
});

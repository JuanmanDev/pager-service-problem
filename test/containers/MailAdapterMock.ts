import { SendEmail } from '@interfaces/MailAdapter';
import TYPES from '@inyection/types';
import { SendEmailMockKO } from '@MockServices/MailAdapterMock';
import { ContainerModule } from 'inversify';

export const TimerAdapterMockContainerModule = new ContainerModule((bind) => {
  bind<SendEmail>(TYPES.MailAdapterSendEmail).toConstantValue(
    SendEmailMockKO,
  );
});

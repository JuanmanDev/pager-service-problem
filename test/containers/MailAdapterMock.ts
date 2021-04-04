import { SendEmail } from '@interfaces/MailAdapter';
import TYPES from '@inyection/types';
import { SendEmailMockOK } from '@MockServices/MailAdapterMock';
import { ContainerModule } from 'inversify';

export const MailAdapterMockContainerModule = new ContainerModule((bind) => {
  bind<SendEmail>(TYPES.MailAdapterSendEmail).toConstantValue(
    SendEmailMockOK,
  );
});

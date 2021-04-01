import { SendEmail } from '@interfaces/MailAdapter';

const SendEmailMockOK: SendEmail = async function SendEmailMockOK() {
  console.log('email sent.');
};

const SendEmailMockKO: SendEmail = async function SendEmailMockKO() {
  throw Error('Unexpected closed connection');
};

export { SendEmailMockOK, SendEmailMockKO };

import { SendSMS } from '@interfaces/SMSAdapter';

export const SendSMSMock: SendSMS = async function SendSMSMock() {
  console.log('SMS sent.');
};

export const SendSMSMockKO: SendSMS = async function SendSMSMockKO() {
  throw Error('Invalid credentials');
};

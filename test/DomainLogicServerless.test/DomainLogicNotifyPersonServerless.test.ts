import { DomainLogicNotifyPersonServerless } from '@DomainLogicServerless/DomainLogicNotifyPersonServerless';
import { AlertPerson } from '@interfaces/DomainLogic';
import {
  personWithEmail2, personWithEmailAndSMS1, personWithOUTEmailAndSMS5, personWithSMS3,
} from '@MockServices/EscalationPolicyAdapterMock';
import ERROR from '../../src/implementation/Errors/DomainLogicServerless';

import {
  AlertMock,
} from '../mockServices/PersistanceAdapter';

const serviceName = 'Service Failing 734';
const description = 'Database is not responding';
const level = 2;

describe('DomainLogicNotifyPersonServerless', () => {
  it('Dual alert SMS + Email', async () => {
    const sendEmailMock = jest.fn(async () => {});
    const sendSMSMock = jest.fn(async () => {});
    const createAlertPersonMock = jest.fn(async (alertPerson: AlertPerson) => alertPerson);

    await DomainLogicNotifyPersonServerless(
      {
        sendEmail: sendEmailMock,
        sendSMS: sendSMSMock,
        createAlertPerson: createAlertPersonMock,
      },
      personWithEmailAndSMS1,
      serviceName,
      description,
      level,
      AlertMock,
    );

    expect(sendEmailMock.mock.calls.length).toBe(1);
    expect(sendSMSMock.mock.calls.length).toBe(1);
    expect(createAlertPersonMock.mock.calls.length).toBe(2);
  });

  it('Simple alert Email', async () => {
    const sendEmailMock = jest.fn(async () => {});
    const sendSMSMock = jest.fn(async () => {});
    const createAlertPersonMock = jest.fn(async (alertPerson: AlertPerson) => alertPerson);

    await DomainLogicNotifyPersonServerless(
      {
        sendEmail: sendEmailMock,
        sendSMS: sendSMSMock,
        createAlertPerson: createAlertPersonMock,
      },
      personWithEmail2,
      serviceName,
      description,
      level,
      AlertMock,
    );

    expect(sendEmailMock.mock.calls.length).toBe(1);
    expect(sendSMSMock.mock.calls.length).toBe(0);
    expect(createAlertPersonMock.mock.calls.length).toBe(1);
  });

  it('Simple alert SMS', async () => {
    const sendEmailMock = jest.fn(async () => {});
    const sendSMSMock = jest.fn(async () => {});
    const createAlertPersonMock = jest.fn(async (alertPerson: AlertPerson) => alertPerson);

    await DomainLogicNotifyPersonServerless(
      {
        sendEmail: sendEmailMock,
        sendSMS: sendSMSMock,
        createAlertPerson: createAlertPersonMock,
      },
      personWithSMS3,
      serviceName,
      description,
      level,
      AlertMock,
    );

    expect(sendEmailMock.mock.calls.length).toBe(0);
    expect(sendSMSMock.mock.calls.length).toBe(1);
    expect(createAlertPersonMock.mock.calls.length).toBe(1);
  });

  it('Alert with no data', async () => {
    // expect.assertions(1+);

    const sendEmailMock = jest.fn(async () => {});
    const sendSMSMock = jest.fn(async () => {});
    const createAlertPersonMock = jest.fn(async (alertPerson: AlertPerson) => alertPerson);

    try {
      await DomainLogicNotifyPersonServerless(
        {
          sendEmail: sendEmailMock,
          sendSMS: sendSMSMock,
          createAlertPerson: createAlertPersonMock,
        },
        personWithOUTEmailAndSMS5,
        serviceName,
        description,
        level,
        AlertMock,
      );
    } catch (error) {
      expect(error.message.startsWith(ERROR.DL_Serverless_EscalationPolicyPersonWithoutContactData)).toBeTruthy();
    }

    expect(sendEmailMock.mock.calls.length).toBe(0);
    expect(sendSMSMock.mock.calls.length).toBe(0);
    expect(createAlertPersonMock.mock.calls.length).toBe(0);
  });

  it('Alert error on send every contact data', async () => {
    // expect.assertions(1+);

    const sendEmailMock = jest.fn(async () => { throw new Error('Unconnected test'); });
    const sendSMSMock = jest.fn(async () => { throw new Error('Unconnected test'); });
    const createAlertPersonMock = jest.fn(async (alertPerson: AlertPerson) => alertPerson);

    try {
      await DomainLogicNotifyPersonServerless(
        {
          sendEmail: sendEmailMock,
          sendSMS: sendSMSMock,
          createAlertPerson: createAlertPersonMock,
        },
        personWithEmailAndSMS1,
        serviceName,
        description,
        level,
        AlertMock,
      );
    } catch (error) {
      expect(error.message).toBe(ERROR.DL_Serverless_AllNotifiedError);
    }

    expect(sendEmailMock.mock.calls.length).toBe(1);
    expect(sendSMSMock.mock.calls.length).toBe(1);
    expect(createAlertPersonMock.mock.calls.length).toBe(0);
  });
});

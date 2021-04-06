import { DomainLogicCreateAlertServerless } from '@DomainLogicServerless/DomainLogicCreateAlertServerless';
import ERROR from '../../src/implementation/Errors/DomainLogicServerless';

import {
  AlertMock, ServiceMock,
} from '../mockServices/PersistanceAdapter';

describe('DomainLogicCreateAlertServerless', () => {
  it('Multiples services configured', async () => {
    expect.assertions(1);

    try {
      await DomainLogicCreateAlertServerless(
        {
          getServices: async () => [ServiceMock, ServiceMock],
          createAlert: async () => AlertMock,
          stepUpLevelAlert: async () => undefined,
        },
        ServiceMock.Id,
        'Test',
      );
    } catch (error) {
      expect(error.message).toEqual(ERROR.DL_Serverless_ServiceAmbiguous);
    }
  });

  it('No service configured', async () => {
    expect.assertions(1);

    try {
      await DomainLogicCreateAlertServerless(
        {
          getServices: async () => [],
          createAlert: async () => AlertMock,
          stepUpLevelAlert: async () => undefined,
        },
        ServiceMock.Id,
        'Test',
      );
    } catch (error) {
      expect(error.message).toEqual(ERROR.DL_Serverless_ServiceNotFound);
    }
  });

  it('No Escalation Policy for a service', async () => {
    expect.assertions(1);

    const serviceMockNoEcalationPolicy = { ...ServiceMock };
    (serviceMockNoEcalationPolicy as any).EscalationPolicy = null;

    try {
      await DomainLogicCreateAlertServerless(
        {
          getServices: async () => [serviceMockNoEcalationPolicy],
          createAlert: async () => AlertMock,
          stepUpLevelAlert: async () => undefined,
        },
        ServiceMock.Id,
        'Test',
      );
    } catch (error) {
      expect(error.message).toEqual(ERROR.DL_Serverless_ServiceWithoutEscalationPolicy);
    }
  });

  it('The Escalation Policy has no persons', async () => {
    expect.assertions(1);

    const serviceMockNoEcalationPolicy = { ...ServiceMock };
    serviceMockNoEcalationPolicy.EscalationPolicy = { ...ServiceMock.EscalationPolicy };
    serviceMockNoEcalationPolicy.EscalationPolicy.PersonsLevels = {};

    try {
      await DomainLogicCreateAlertServerless(
        {
          getServices: async () => [serviceMockNoEcalationPolicy],
          createAlert: async () => AlertMock,
          stepUpLevelAlert: async () => undefined,
        },
        ServiceMock.Id,
        'Test',
      );
    } catch (error) {
      expect(error.message).toEqual(ERROR.DL_Serverless_EscalationPolicyWithoutPersons);
    }
  });

  it('Created', async () => {
    const getServiceMock = jest.fn(async () => [ServiceMock]);
    const createAlertMock = jest.fn(async () => AlertMock);
    const stepUpLevelAlertMock = jest.fn(async () => undefined);
    const result = await DomainLogicCreateAlertServerless(
      {
        getServices: getServiceMock,
        createAlert: createAlertMock,
        stepUpLevelAlert: stepUpLevelAlertMock,
      },
      ServiceMock.Id,
      'Test',
    );
    expect(result).toBeDefined();
    expect(getServiceMock.mock.calls.length).toBe(1);
    expect(createAlertMock.mock.calls.length).toBe(1);
    expect(createAlertMock.mock.calls.length).toBe(1);
    expect(stepUpLevelAlertMock.mock.calls.length).toBe(1);
  });
});

import DomainLogicServerlessStepUpLevelAlert from '@DomainLogicServerless/DomainLogicStepUpLevelAlert';
import { FunctionsToReceive } from '@DomainLogicServerless/FunctionsToReceive';
import { Alert } from '@interfaces/DomainLogic';
import { GetEscalationPolicyMock } from '@MockServices/EscalationPolicyAdapterMock';

import {
  AlertMock, GetAlertClosedMock, ServiceMock,
} from '../mockServices/PersistanceAdapter';

describe('DomainLogicCreateAlertServerless', () => {
  it('alert one level and await', async () => {
    const createTimerMock = jest.fn(async ({
      functionIdentifier,
      timeSpanMillisecons,
      params,
    }) => {
      expect(functionIdentifier).toBe(FunctionsToReceive.CheckAlertStatus);
      expect(timeSpanMillisecons).toBe(15 * 60 * 1000);
      expect(params.length).toBe(1);
      expect(params[0].serviceIdentifier).toBe(ServiceMock.Id);
      expect(params[0].alertIdentifier).toBe(AlertMock.Id);
      return 'TimerIdentifier';
    });
    const modifyAlertMock = jest.fn(async (alert: Alert) => alert);
    const modifyAlertIfNotClosedMock = jest.fn(async () => true);
    const getAlertMock = jest.fn(async () => AlertMock);
    const notifyPersonMock = jest.fn(async () => {});
    const stepUpAlertMock = jest.fn(async () => {});

    const escalationPolicy = await GetEscalationPolicyMock();

    const description = 'This is a test alert (description)';

    await DomainLogicServerlessStepUpLevelAlert(
      {
        createTimer: createTimerMock,
        modifyAlert: modifyAlertMock,
        modifyAlertIfNotClosed: modifyAlertIfNotClosedMock,
        getAlert: getAlertMock,
        notifyPerson: notifyPersonMock,
        stepUpAlert: stepUpAlertMock,
      },
      escalationPolicy,
      AlertMock,
      ServiceMock,
      description,
    );

    expect(createTimerMock.mock.calls.length).toBe(1);
    expect(modifyAlertMock.mock.calls.length).toBe(0);
    expect(modifyAlertIfNotClosedMock.mock.calls.length).toBe(2);
    expect(getAlertMock.mock.calls.length).toBe(0);
    expect(stepUpAlertMock.mock.calls.length).toBe(0);
    expect(notifyPersonMock.mock.calls.length).toBe(escalationPolicy.PersonsLevels[1].length);
  });

  it('no left next level to notify', async () => {
    const createTimerMock = jest.fn(async () => {
      throw new Error('Code not should be evaluated');
    });
    const modifyAlertMock = jest.fn(async (alert: Alert) => alert);
    const modifyAlertIfNotClosedMock = jest.fn(async () => true);
    const getAlertMock = jest.fn(async () => AlertMock);
    const notifyPersonMock = jest.fn(async () => {});
    const stepUpAlertMock = jest.fn(async () => {});

    const escalationPolicy = await GetEscalationPolicyMock();

    // Empty levels to notify
    escalationPolicy.PersonsLevels = {};

    const description = 'This is a test alert (description)';

    await DomainLogicServerlessStepUpLevelAlert(
      {
        createTimer: createTimerMock,
        modifyAlert: modifyAlertMock,
        modifyAlertIfNotClosed: modifyAlertIfNotClosedMock,
        getAlert: getAlertMock,
        notifyPerson: notifyPersonMock,
        stepUpAlert: stepUpAlertMock,
      },
      escalationPolicy,
      AlertMock,
      ServiceMock,
      description,
    );

    expect(createTimerMock.mock.calls.length).toBe(0);
    expect(modifyAlertMock.mock.calls.length).toBe(0);
    expect(modifyAlertIfNotClosedMock.mock.calls.length).toBe(0);
    expect(getAlertMock.mock.calls.length).toBe(0);
    expect(stepUpAlertMock.mock.calls.length).toBe(0);
    expect(notifyPersonMock.mock.calls.length).toBe(0);
  });

  it('alert closed before run', async () => {
    const closedAlert = await GetAlertClosedMock();

    const createTimerMock = jest.fn(async () => {
      throw new Error('Code not should be evaluated');
    });
    const modifyAlertMock = jest.fn(async (alert: Alert) => alert);
    const modifyAlertIfNotClosedMock = jest.fn(async () => false);
    const getAlertMock = jest.fn(async () => closedAlert);
    const notifyPersonMock = jest.fn(async () => {});
    const stepUpAlertMock = jest.fn(async () => {});

    const escalationPolicy = await GetEscalationPolicyMock();

    const description = 'This is a test alert (description)';

    await DomainLogicServerlessStepUpLevelAlert(
      {
        createTimer: createTimerMock,
        modifyAlert: modifyAlertMock,
        modifyAlertIfNotClosed: modifyAlertIfNotClosedMock,
        getAlert: getAlertMock,
        notifyPerson: notifyPersonMock,
        stepUpAlert: stepUpAlertMock,
      },
      escalationPolicy,
      closedAlert,
      ServiceMock,
      description,
    );

    expect(createTimerMock.mock.calls.length).toBe(0);
    expect(modifyAlertMock.mock.calls.length).toBe(1);
    expect(modifyAlertIfNotClosedMock.mock.calls.length).toBe(1);
    expect(getAlertMock.mock.calls.length).toBe(1);
    expect(stepUpAlertMock.mock.calls.length).toBe(0);
    expect(notifyPersonMock.mock.calls.length).toBe(0);
  });

  it('all notification for a level fails', async () => {
    const closedAlert = await GetAlertClosedMock();

    const createTimerMock = jest.fn(async () => {
      throw new Error('Code not should be evaluated');
    });
    const modifyAlertMock = jest.fn(async (alert: Alert) => alert);
    const modifyAlertIfNotClosedMock = jest.fn(async () => true);
    const getAlertMock = jest.fn(async () => closedAlert);
    const notifyPersonMock = jest.fn(async () => { throw new Error('All notifications fails test'); });
    const stepUpAlertMock = jest.fn(async () => {});

    const escalationPolicy = await GetEscalationPolicyMock();

    const description = 'This is a test alert (description)';

    await DomainLogicServerlessStepUpLevelAlert(
      {
        createTimer: createTimerMock,
        modifyAlert: modifyAlertMock,
        modifyAlertIfNotClosed: modifyAlertIfNotClosedMock,
        getAlert: getAlertMock,
        notifyPerson: notifyPersonMock,
        stepUpAlert: stepUpAlertMock,
      },
      escalationPolicy,
      closedAlert,
      ServiceMock,
      description,
    );

    expect(createTimerMock.mock.calls.length).toBe(0);
    expect(modifyAlertMock.mock.calls.length).toBe(0);
    expect(modifyAlertIfNotClosedMock.mock.calls.length).toBe(1);
    expect(getAlertMock.mock.calls.length).toBe(0);
    expect(stepUpAlertMock.mock.calls.length).toBe(1);
    expect(notifyPersonMock.mock.calls.length).toBe(1);
  });

  it('aclosed alert while notifying', async () => {
    const createTimerMock = jest.fn(async ({
      functionIdentifier,
      timeSpanMillisecons,
      params,
    }) => {
      expect(functionIdentifier).toBe(FunctionsToReceive.CheckAlertStatus);
      expect(timeSpanMillisecons).toBe(15 * 60 * 1000);
      expect(params.length).toBe(1);
      expect(params[0].serviceIdentifier).toBe(ServiceMock.Id);
      expect(params[0].alertIdentifier).toBe(AlertMock.Id);
      return 'TimerIdentifier';
    });
    const modifyAlertMock = jest.fn(async (alert: Alert) => alert);
    const modifyAlertIfNotClosedMock = jest.fn(
      async (): Promise<boolean> => (modifyAlertIfNotClosedMock.mock.calls.length !== 2),
    );
    const getAlertMock = jest.fn(async () => AlertMock);
    const notifyPersonMock = jest.fn(async () => {});
    const stepUpAlertMock = jest.fn(async () => {});

    const escalationPolicy = await GetEscalationPolicyMock();

    const description = 'This is a test alert (description)';

    await DomainLogicServerlessStepUpLevelAlert(
      {
        createTimer: createTimerMock,
        modifyAlert: modifyAlertMock,
        modifyAlertIfNotClosed: modifyAlertIfNotClosedMock,
        getAlert: getAlertMock,
        notifyPerson: notifyPersonMock,
        stepUpAlert: stepUpAlertMock,
      },
      escalationPolicy,
      AlertMock,
      ServiceMock,
      description,
    );

    expect(createTimerMock.mock.calls.length).toBeLessThan(2);
    expect(modifyAlertMock.mock.calls.length).toBe(1);
    expect(modifyAlertIfNotClosedMock.mock.calls.length).toBe(2);
    expect(getAlertMock.mock.calls.length).toBe(1);
    expect(stepUpAlertMock.mock.calls.length).toBe(0);
    expect(notifyPersonMock.mock.calls.length).toBe(escalationPolicy.PersonsLevels[1].length);
  });
});

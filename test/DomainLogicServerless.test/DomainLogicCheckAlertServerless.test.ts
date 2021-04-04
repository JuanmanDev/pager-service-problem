import { DomainLogicCheckAlertServerless } from '@DomainLogicServerless/DomainLogicCheckAlertServerless';

import { AlertMock, AlertClosedMock } from '../mockServices/PersistanceAdapter';

describe('DomainLogicCheckAlertServerless', () => {
  it('Check alert no closed', async () => {
    await DomainLogicCheckAlertServerless({
      getAlert: async () => AlertMock,
      stepUpLevelAlert: async (
        escalationPolicy,
        alert,
        service,
        description,
      ) => {
        expect(escalationPolicy).toBe(AlertMock.Service.EscalationPolicy);
        expect(alert).toBe(AlertMock);
        expect(service).toBe(alert.Service);
        expect(description).toBe(alert.Description);
      },
    },
    {
      alertIdentifier: AlertMock.Id,
      serviceIdentifier: AlertMock.Service.Id,
    });
  });

  it('Check alert closed', async () => {
    const emptyFunction = jest.fn();
    await DomainLogicCheckAlertServerless({
      getAlert: async () => AlertClosedMock,
      stepUpLevelAlert: emptyFunction,
    },
    {
      alertIdentifier: AlertClosedMock.Id,
      serviceIdentifier: AlertClosedMock.Service.Id,
    });
    expect(emptyFunction).not.toBeCalled();
  });
});

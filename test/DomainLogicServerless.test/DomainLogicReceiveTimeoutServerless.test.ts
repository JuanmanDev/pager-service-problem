import { DomainLogicReceiveTimeoutServerless } from '@DomainLogicServerless/DomainLogicReceiveTimeoutServerless';
import { FunctionsToReceive } from '@DomainLogicServerless/FunctionsToReceive';

describe('DomainLogicReceiveTimeoutServerless', () => {
  it('CheckAlertStatus', async () => {
    const params = [1, 2, 3, 4];
    const checkAlertMock = jest.fn(async (...paramsReceived) => {
      expect(paramsReceived).toStrictEqual(params);
    });
    await DomainLogicReceiveTimeoutServerless({
      checkAlert: checkAlertMock,
    }, {
      functionIdentifier: FunctionsToReceive.CheckAlertStatus,
      params,
    });
    expect(checkAlertMock.mock.calls.length).toBe(1);
  });

  it('None function', async () => {
    const checkAlertMock = jest.fn(async () => {});
    await DomainLogicReceiveTimeoutServerless({
      checkAlert: checkAlertMock,
    }, {
      functionIdentifier: null as any,
    });
    expect(checkAlertMock.mock.calls.length).toBe(0);
  });
});

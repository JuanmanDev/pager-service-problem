import { DomainLogicCloseAlertServerless } from '@DomainLogicServerless/DomainLogicCloseAlertServerless';
import ERROR from '../../src/implementation/Errors/DomainLogicServerless';

import { AlertMock, AlertClosedMock, AlertPersonMock } from '../mockServices/PersistanceAdapter';

describe('DomainLogicCloseAlertServerless', () => {
  it('Not params', async () => {
    expect.assertions(1);

    try {
      await DomainLogicCloseAlertServerless({
        getAlert: async () => ({ ...AlertMock }),
        getAlertPerson: async () => ({ ...AlertPersonMock }),
        modifyAlertIfNotClosed: async () => false,
      });
    } catch (error) {
      expect(error.message).toEqual(ERROR.DL_Serverless_AlertNotFound);
    }
  });

  it('with alertPersonIdentifier', async () => {
    const result = await DomainLogicCloseAlertServerless(
      {
        getAlert: async () => ({ ...AlertMock }),
        getAlertPerson: async () => ({ ...AlertPersonMock }),
        modifyAlertIfNotClosed: async () => true,
      },
      AlertMock.Id,
      undefined,
    );
    expect(result).toStrictEqual(true);
  });

  it('with alertPersonIdentifier', async () => {
    const result = await DomainLogicCloseAlertServerless(
      {
        getAlert: async () => ({ ...AlertMock }),
        getAlertPerson: async () => ({ ...AlertPersonMock }),
        modifyAlertIfNotClosed: async () => true,
      },
      undefined,
      AlertPersonMock.Id,
    );
    expect(result).toStrictEqual(true);
  });

  it('already closed', async () => {
    const result = await DomainLogicCloseAlertServerless(
      {
        getAlert: async () => ({ ...AlertClosedMock }),
        getAlertPerson: async () => ({ ...AlertPersonMock }),
        modifyAlertIfNotClosed: async () => true,
      },
      AlertMock.Id,
      undefined,
    );
    expect(result).toStrictEqual(false);
  });

  it('closed after retriying Alert info', async () => {
    const result = await DomainLogicCloseAlertServerless(
      {
        getAlert: async () => ({ ...AlertMock }),
        getAlertPerson: async () => ({ ...AlertPersonMock }),
        modifyAlertIfNotClosed: async () => false,
      },
      AlertMock.Id,
      undefined,
    );
    expect(result).toStrictEqual(false);
  });
});

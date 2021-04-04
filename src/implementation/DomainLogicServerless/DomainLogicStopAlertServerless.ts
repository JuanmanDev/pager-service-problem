import { DomainLogicStopAlert } from '@interfaces/DomainLogic';
import { GetAlert, ModifyAlertIfNotClosed } from '@interfaces/PersistanceAdapter';
import bindDependencies from '@inyection/bindDependencies';

import TYPES from '@inyection/types';
import { CreateTimerMock } from '@MockServices/TimerAdapterMock';
import ERROR from '../Errors/DomainLogicServerless';

export const DomainLogicStopAlertServerless = async function DomainLogicStopAlertServerless(
  { modifyAlertIfNotClosed, getAlert }: {
    modifyAlertIfNotClosed: ModifyAlertIfNotClosed,
    getAlert: GetAlert,
  },
  alertIdentifier: String,
) {
  const alert = await getAlert(alertIdentifier);

  if (alert.ClosedTime) {
    throw new Error(ERROR.DL_Serverless_AlertAlreadyClosed);
  }

  alert.ClosedTime = new Date();

  if (modifyAlertIfNotClosed(alert)) {
    throw new Error(ERROR.DL_Serverless_AlertAlreadyClosed);
  }

  return true;
};
export const DomainLogicStopAlertServerlessInjected: DomainLogicStopAlert = bindDependencies(
  CreateTimerMock,
  {
    modifyAlertIfNotClosed: TYPES.PersistanceAdapterModifyAlertIfNotClosed,
    getAlert: TYPES.PersistanceAdapterGetAlert,
  },
);

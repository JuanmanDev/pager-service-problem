import { Alert, DomainLogicCloseAlert } from '@interfaces/DomainLogic';
import { GetAlert, GetAlertPerson, ModifyAlertIfNotClosed } from '@interfaces/PersistanceAdapter';
import bindDependencies from '@inyection/bindDependencies';
import TYPES from '@inyection/types';
import ERROR from '../Errors/DomainLogicServerless';

export const DomainLogicCloseAlertServerless = async function DomainLogicCloseAlertServerless({
  getAlert, getAlertPerson, modifyAlertIfNotClosed,
}: {
  getAlert: GetAlert,
  getAlertPerson: GetAlertPerson,
  modifyAlertIfNotClosed: ModifyAlertIfNotClosed,
},
alertIdentifier?: String,
alertPersonIdentifier?: String) {
  console.info(`Closing: ${alertIdentifier} - ${alertPersonIdentifier}.`);

  let alert: Alert;

  if (alertPersonIdentifier) {
    const alertPerson = await getAlertPerson(alertPersonIdentifier);
    console.info(`Alert closed by person: ${alertPerson.Person.Id}`);
    alert = alertPerson.Alert;
  } else if (alertIdentifier) {
    alert = await getAlert(alertIdentifier);
    console.info(`Alert closed by aplication - ${alertIdentifier}`);
  } else {
    throw new Error(ERROR.DL_Serverless_AlertNotFound);
  }

  if (alert.ClosedTime) {
    console.info(ERROR.DL_Serverless_AlertAlreadyClosed);
    return false;
  }

  alert.ClosedTime = new Date();

  if (!await modifyAlertIfNotClosed(alert)) {
    console.info(ERROR.DL_Serverless_AlertAlreadyClosed);
    // TODO cancel timer
    return false;
  }

  return true;
};

export const dependencies = {
  getAlert: TYPES.PersistanceAdapterGetAlert,
  getAlertPerson: TYPES.PersistanceAdapterGetAlertPerson,
  modifyAlertIfNotClosed: TYPES.PersistanceAdapterModifyAlertIfNotClosed,
};

export const DomainLogicCloseAlertServerlessInjected: DomainLogicCloseAlert = bindDependencies(
  DomainLogicCloseAlertServerless,
  dependencies,
);

import { DomainLogicCheckAlert, DomainLogicStepUpLevelAlert } from '@interfaces/DomainLogic';
import { GetAlert } from '@interfaces/PersistanceAdapter';
import bindDependencies from '@inyection/bindDependencies';
import TYPES from '@inyection/types';

export const DomainLogicCheckAlertServerless = async function DomainLogicCheckAlertServerless(
  {
    getAlert, stepUpLevelAlert,
  }: {
    getAlert: GetAlert,
    stepUpLevelAlert: DomainLogicStepUpLevelAlert
  },
  { alertIdentifier }: {
    serviceIdentifier: String,
    alertIdentifier: String
  },
) {
  console.info(`Scaling up alert with identifier: ${alertIdentifier}.`);
  const alert = await getAlert(alertIdentifier);

  if (alert.ClosedTime) {
    console.info(`Alert with identifier: ${alertIdentifier} has been already closed.`);
    return;
  }

  const escalationPolicy = alert.Service.EscalationPolicy;

  await stepUpLevelAlert(escalationPolicy, alert, alert.Service, alert.Description);
};

export const dependencies = {
  getAlert: TYPES.PersistanceAdapterGetAlert,
  stepUpLevelAlert: TYPES.DomainLogicStepUpLevelAlert,
};

export const DomainLogicCheckAlertServerlessInjected: DomainLogicCheckAlert = bindDependencies(
  DomainLogicCheckAlertServerless,
  dependencies,
);
